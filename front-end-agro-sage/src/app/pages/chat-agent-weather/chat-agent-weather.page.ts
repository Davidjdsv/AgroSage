import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-chat-agent-weather',
  templateUrl: './chat-agent-weather.page.html',
  styleUrls: ['./chat-agent-weather.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, CommonModule, FormsModule]
})
export class ChatAgentWeatherPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
