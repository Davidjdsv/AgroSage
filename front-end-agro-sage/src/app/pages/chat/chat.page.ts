import { Component, OnInit, ViewChild, ElementRef, WritableSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass, DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { 
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonFooter, 
  IonSpinner, IonIcon, IonButton 
} from '@ionic/angular/standalone'; 
import { addIcons } from 'ionicons';
import { sendOutline, chatbubbleEllipsesOutline, leafSharp } from 'ionicons/icons'; 

// 🚨 Se elimina la importación de PlanParams para resolver TS2305
import { AiChatService, BackendResponse } from '../../services/ai-chat.service'; 

interface ChatMessage {
  text: string;
  sender: 'user' | 'agent'; 
  timestamp?: Date; 
}

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, NgClass, DatePipe, 
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, 
    IonMenuButton, IonFooter, IonSpinner, IonIcon, IonButton
  ],
  providers: [
    AiChatService,
  ]
})
export class ChatPage implements OnInit {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  messages: WritableSignal<ChatMessage[]> = signal([]);
  userInput: string = '';
  isLoading: WritableSignal<boolean> = signal(false); 

  // 🚨 Se elimina testPlanParams ya que no se usa en la lógica revertida.
  
  constructor(
    private chatService: AiChatService, 
  ) {
    addIcons({ sendOutline, chatbubbleEllipsesOutline, leafSharp });
  }

  ngOnInit() {
    this.messages.update(msgs => [
      ...msgs,
      {
        // 🚨 Mensaje revertido para reflejar que la funcionalidad de plan está deshabilitada
        text: '¡Hola! Soy GaIA. Debido a un error de conexión, solo puedo recibir tu texto por ahora. Escribe tu pregunta.',
        sender: 'agent',
        timestamp: new Date()
      }
    ]);
    setTimeout(() => this.scrollToBottom(), 200);
  }

  /**
   * Envía el mensaje del usuario. 
   */
  sendMessage(): void {
    const prompt = this.userInput.trim();
    if (!prompt) return;

    // 1. Agregar el mensaje del usuario
    this.messages.update(msgs => [
      ...msgs, 
      { text: prompt, sender: 'user', timestamp: new Date() }
    ]);
    this.userInput = '';
    this.scrollToBottom(); 
    
    this.isLoading.set(true); 

    // 🚨 Lógica revertida al método original 'sendPrompt' para resolver TS2339
    this.chatService.sendPrompt(prompt).subscribe({
      next: (response: BackendResponse) => {
        // Añadir respuesta del agente
        this.addAgentMessage(response.reply || 'Error: El agente no devolvió respuesta.', 'agent');
        this.isLoading.set(false); 
        this.scrollToBottom(); // Scroll de nuevo después de la respuesta del agente
      },
      error: (err: Error) => { // Usamos el tipo Error para capturar el error del servicio
        // Manejo de errores
        // Nota: Este código ahora generará un error 400 porque solo envía 'prompt'
        this.addAgentMessage(`❌ Error al conectar con el servidor: ${err.message}.`, 'agent');
        this.isLoading.set(false); 
        this.scrollToBottom(); // Scroll de nuevo después del error
      }
    });
  }

  // === Helpers ===

  private addAgentMessage(text: string, sender: 'user' | 'agent' = 'agent') {
    this.messages.update(msgs => [...msgs, { text, sender, timestamp: new Date() }]); 
  }

  private scrollToBottom(): void {
    requestAnimationFrame(() => {
        if (this.messagesContainer?.nativeElement) {
            this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
        }
    });
  }
}
