import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonNote,
  IonFooter,
  IonInput,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-chat-agent-weather',
  templateUrl: './chat-agent-weather.page.html',
  styleUrls: ['./chat-agent-weather.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonNote,
    IonFooter,
    IonInput,
    IonButton,
    IonIcon,
    CommonModule,
    FormsModule,
  ],
})
export class ChatAgentWeatherPage implements OnInit {
  messages: { from: 'user' | 'ai'; text: string; time: string }[] = [
    {
      from: 'ai',
      text: 'Hola, soy GaIA 🌿. ¿En qué puedo ayudarte con el clima de tu cultivo?',
      time: this.formatTime(new Date()),
    },
  ];
  newMessage = '';

  constructor() {}

  ngOnInit() {}

  sendMessage() {
    const text = this.newMessage?.trim();
    if (!text) return;

    const now = new Date();
    this.messages.push({ from: 'user', text, time: this.formatTime(now) });
    this.newMessage = '';

    // Respuesta básica simulada de la IA
    setTimeout(() => {
      this.messages.push({
        from: 'ai',
        text:
          'Gracias por tu mensaje. Estoy consultando el pronóstico y recomendaciones. 🌦️',
        time: this.formatTime(new Date()),
      });
    }, 600);
  }

  private formatTime(date: Date): string {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }
}
