import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonItem,
  IonIcon,
  IonCardContent,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { BackService } from '../../services/back-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonItem,
    RouterLink,
    IonIcon,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonInput,
    IonButton,
  ],
})
export class LoginPage implements OnInit {
  documento!: string;
  clave!: string;

  constructor(private backService: BackService, private router: Router) {}

  ngOnInit() {}

  onLogin(documento: string, clave: string) {
    if (!this.documento || !this.clave) {
      console.warn('Documento y contraseña son requeridos');
      return;
    }
    this.backService.login(documento, clave).subscribe({});
  }
}
