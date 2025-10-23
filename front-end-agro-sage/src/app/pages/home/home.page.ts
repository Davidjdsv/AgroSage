import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
// 👈 Importar la directiva 'NgClass'
import { NgClass } from '@angular/common'; 
import { 
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent,
  IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
  IonButton, IonListHeader, IonGrid, IonRow, IonCol, IonIcon
} from '@ionic/angular/standalone';

import { 
  leafSharp, barChartSharp, chatbubbleEllipsesSharp, calendarSharp, 
  alertCircleOutline, checkmarkCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // === Configuración Standalone Corregida ===
  standalone: true,
  imports: [
    // 👈 1. Añadir NgClass para resolver el error NG8002
    NgClass, 
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonMenuButton, 
    IonTitle, 
    IonContent,
    IonLabel, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent, 
    IonButton, 
    IonListHeader, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonIcon
  ],
  // ==========================================
})
export class HomePage implements OnInit {

  public isParcelaRegistered: boolean = true;
  public hasActivePlan: boolean = true;

  // 👈 2. Cambiar la visibilidad del 'router' a public para acceso desde el HTML
  constructor(public router: Router) { 
    addIcons({ 
      leafSharp, barChartSharp, chatbubbleEllipsesSharp, calendarSharp,
      alertCircleOutline, checkmarkCircleOutline
    });
  }

  ngOnInit() {
    // ... (Lógica de inicialización) ...
  }

  startRecommendation() {
    this.router.navigateByUrl('/recomendacion-chat');
  }
  
  viewCalendar() {
    this.router.navigateByUrl('/calendario');
  }

  goToGaIA() {
    this.router.navigateByUrl('/chat-agent-weather');
  }
}