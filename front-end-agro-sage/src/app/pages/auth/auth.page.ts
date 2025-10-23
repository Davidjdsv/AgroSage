import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  IonContent, IonSpinner, IonIcon, IonButton, IonInput, IonItem, IonLabel,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonToast,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  lockClosedOutline, eyeOutline, eyeOffOutline, logOutOutline, 
  personOutline, documentTextOutline, callOutline, locationOutline, 
  leafSharp, mailOutline, mapOutline 
} from 'ionicons/icons';

addIcons({
  lockClosedOutline, eyeOutline, eyeOffOutline, logOutOutline,
  personOutline, documentTextOutline, callOutline, locationOutline, 
  leafSharp, mailOutline, mapOutline
});

interface AgricultorData {
  nombre_completo: string;
  cedula: string;
  telefono_movil: string;
  direccion: string;
  barrio_vereda: string;
  departamento: string;
  municipio: string;
  contrasena: string;
}

type AuthView = 'login' | 'register' | 'chat';

@Component({
  selector: 'app-auth',
  template: `
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      :root {
        --ion-color-primary: #2da87bff; /* 💚 Mismo verde que el menú */
        --ion-color-primary-rgb: 52, 211, 153;
      }

      .ion-page {
        --ion-background-color: #f7f9fb;
      }

      ion-card {
        max-width: 450px;
        width: 100%;
        margin: 2rem auto;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
                    0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }

      ion-icon[color="primary"] {
        color: var(--ion-color-primary);
      }

      ion-button[color="primary"] {
        --background: var(--ion-color-primary);
        --background-hover: #10b981; /* tono un poco más oscuro */
        --border-radius: 0.75rem;
        font-weight: 600;
      }

      .switch-link {
        color: var(--ion-color-primary);
        cursor: pointer;
        font-weight: 600;
        transition: color 0.15s ease-in-out;
      }

      .switch-link:hover {
        color: #10b981; /* Emerald 500 hover */
      }
    </style>

    <ion-content class="ion-padding flex flex-col justify-center items-center">
      <ion-card class="rounded-xl p-4">
        <ion-card-header class="text-center">
          <ion-icon name="leaf-sharp" color="primary" class="text-6xl"></ion-icon>
          <ion-card-title class="mt-2 text-2xl font-bold text-gray-800">
            AgroSage
          </ion-card-title>
          <p class="text-sm text-gray-500 mt-1">
            {{ view() === 'login' ? 'Bienvenido de vuelta, Agricultor' : 'Únete a la comunidad AgroSage' }}
          </p>
        </ion-card-header>

        <ion-card-content>
          <!-- INICIO DE SESIÓN -->
          <form *ngIf="view() === 'login'" #loginForm="ngForm" (ngSubmit)="login(loginForm)">
            <ion-item lines="full" class="rounded-lg mb-4 shadow-sm">
              <ion-icon slot="start" name="document-text-outline" color="medium"></ion-icon>
              <ion-input
                label="Cédula"
                type="text"
                name="cedula"
                [(ngModel)]="loginModel.cedula"
                required
              ></ion-input>
            </ion-item>

            <ion-item lines="full" class="rounded-lg mb-6 shadow-sm">
              <ion-icon slot="start" name="lock-closed-outline" color="medium"></ion-icon>
              <ion-input
                label="Contraseña"
                [type]="showPassword() ? 'text' : 'password'"
                name="contrasena"
                [(ngModel)]="loginModel.contrasena"
                required
              ></ion-input>
              <ion-icon
                slot="end"
                [name]="showPassword() ? 'eye-off-outline' : 'eye-outline'"
                class="cursor-pointer"
                (click)="showPassword.set(!showPassword())"
                color="medium"
              ></ion-icon>
            </ion-item>

            <ion-button
              expand="block"
              type="submit"
              color="primary"
              class="h-12 text-base font-semibold shadow-md"
              [disabled]="isLoading() || loginForm.invalid"
            >
              <ion-spinner *ngIf="isLoading()" name="crescent"></ion-spinner>
              <span *ngIf="!isLoading()">Iniciar Sesión</span>
            </ion-button>
          </form>

          <!-- REGISTRO -->
          <form *ngIf="view() === 'register'" #registerForm="ngForm" (ngSubmit)="register(registerForm)">
            <ion-item lines="full" class="rounded-lg mb-3 shadow-sm">
              <ion-icon slot="start" name="person-outline" color="medium"></ion-icon>
              <ion-input label="Nombre Completo" type="text" name="nombre_completo" [(ngModel)]="registerModel.nombre_completo" required></ion-input>
            </ion-item>
            <ion-item lines="full" class="rounded-lg mb-3 shadow-sm">
              <ion-icon slot="start" name="document-text-outline" color="medium"></ion-icon>
              <ion-input label="Cédula" type="text" name="cedula" [(ngModel)]="registerModel.cedula" required></ion-input>
            </ion-item>
            <ion-item lines="full" class="rounded-lg mb-3 shadow-sm">
              <ion-icon slot="start" name="call-outline" color="medium"></ion-icon>
              <ion-input label="Teléfono" type="tel" name="telefono_movil" [(ngModel)]="registerModel.telefono_movil" required></ion-input>
            </ion-item>
            <ion-item lines="full" class="rounded-lg mb-3 shadow-sm">
              <ion-icon slot="start" name="location-outline" color="medium"></ion-icon>
              <ion-input label="Dirección" type="text" name="direccion" [(ngModel)]="registerModel.direccion" required></ion-input>
            </ion-item>
            <ion-item lines="full" class="rounded-lg mb-3 shadow-sm">
              <ion-icon slot="start" name="map-outline" color="medium"></ion-icon>
              <ion-input label="Barrio/Vereda" type="text" name="barrio_vereda" [(ngModel)]="registerModel.barrio_vereda" required></ion-input>
            </ion-item>
            <ion-item lines="full" class="rounded-lg mb-3 shadow-sm">
              <ion-icon slot="start" name="location-outline" color="medium"></ion-icon>
              <ion-input label="Departamento" type="text" name="departamento" [(ngModel)]="registerModel.departamento" required></ion-input>
            </ion-item>
            <ion-item lines="full" class="rounded-lg mb-3 shadow-sm">
              <ion-icon slot="start" name="location-outline" color="medium"></ion-icon>
              <ion-input label="Municipio" type="text" name="municipio" [(ngModel)]="registerModel.municipio" required></ion-input>
            </ion-item>
            <ion-item lines="full" class="rounded-lg mb-6 shadow-sm">
              <ion-icon slot="start" name="lock-closed-outline" color="medium"></ion-icon>
              <ion-input
                label="Contraseña"
                [type]="showPassword() ? 'text' : 'password'"
                name="contrasena"
                [(ngModel)]="registerModel.contrasena"
                required minlength="6"
              ></ion-input>
              <ion-icon
                slot="end"
                [name]="showPassword() ? 'eye-off-outline' : 'eye-outline'"
                class="cursor-pointer"
                (click)="showPassword.set(!showPassword())"
                color="medium"
              ></ion-icon>
            </ion-item>

            <ion-button
              expand="block"
              type="submit"
              color="primary"
              class="h-12 text-base font-semibold shadow-md"
              [disabled]="isLoading() || !isRegisterFormValid()"
            >
              <ion-spinner *ngIf="isLoading()" name="crescent"></ion-spinner>
              <span *ngIf="!isLoading()">Registrarse</span>
            </ion-button>
          </form>

          <!-- CHAT SIMULADO -->
          <div *ngIf="view() === 'chat'" class="text-center p-8">
            <h2 class="text-xl font-semibold text-gray-700">¡Acceso concedido!</h2>
            <p class="text-gray-500 mt-2">Aquí iría el contenido principal de la aplicación o el chat.</p>
            <ion-button (click)="logout()" color="danger" class="mt-6 w-full">
              <ion-icon slot="start" name="log-out-outline"></ion-icon>
              Cerrar Sesión
            </ion-button>
          </div>

          <!-- Cambiar de vista -->
          <div class="mt-6 text-center text-sm text-gray-600">
            <ng-container *ngIf="view() === 'login'">
              ¿No tienes cuenta?
              <span class="switch-link" (click)="view.set('register')">Regístrate aquí</span>
            </ng-container>
            <ng-container *ngIf="view() === 'register'">
              ¿Ya tienes cuenta?
              <span class="switch-link" (click)="view.set('login')">Inicia sesión</span>
            </ng-container>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-toast
        [isOpen]="toast.show()"
        [message]="toast.message()"
        [color]="toast.color()"
        [duration]="3000"
        (didDismiss)="toast.show.set(false)"
        position="bottom"
      ></ion-toast>
    </ion-content>
  `,
  standalone: true,
  imports: [
    CommonModule, FormsModule, 
    IonContent, IonSpinner, IonIcon, IonButton, IonInput, IonItem, 
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonToast
  ],
})
export class AuthPage implements OnInit {
  view: WritableSignal<AuthView> = signal('login');
  isLoading: WritableSignal<boolean> = signal(false);
  showPassword: WritableSignal<boolean> = signal(false);
  toast = { show: signal(false), message: signal(''), color: signal('success') };

  loginModel = { cedula: '', contrasena: '' };
  registerModel: AgricultorData = {
    nombre_completo: '', cedula: '', telefono_movil: '', direccion: '',
    barrio_vereda: '', departamento: '', municipio: '', contrasena: ''
  };

  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (localStorage.getItem('token')) this.view.set('chat');
  }

  private setToast(message: string, color: string) {
    this.toast.message.set(message);
    this.toast.color.set(color);
    this.toast.show.set(true);
  }

  isRegisterFormValid(): boolean {
    const m = this.registerModel;
    return !!(
      m.nombre_completo && m.cedula && m.telefono_movil &&
      m.direccion && m.barrio_vereda && m.departamento &&
      m.municipio && m.contrasena.length >= 6
    );
  }

  async login(form: NgForm) {
    if (!form.valid) {
      this.setToast('Completa todos los campos', 'warning');
      return;
    }
    this.isLoading.set(true);
    try {
      const res: any = await this.http.post(`${this.apiUrl}/login`, this.loginModel).toPromise();
      localStorage.setItem('token', res.token);
      this.setToast('Inicio de sesión exitoso', 'success');
      this.view.set('chat');
    } catch (err: any) {
      this.setToast(err.error?.msg || 'Credenciales incorrectas o servidor no disponible.', 'danger');
    } finally {
      this.isLoading.set(false);
    }
  }

  async register(form: NgForm) {
    if (!this.isRegisterFormValid()) {
      this.setToast('Completa todos los campos correctamente.', 'warning');
      return;
    }
    this.isLoading.set(true);
    try {
      await this.http.post(`${this.apiUrl}/register`, this.registerModel).toPromise();
      this.setToast('Registro exitoso. Inicia sesión.', 'success');
      this.view.set('login');
    } catch (err: any) {
      this.setToast(err.error?.message || 'Error en el registro.', 'danger');
    } finally {
      this.isLoading.set(false);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.setToast('Sesión cerrada correctamente', 'success');
    this.view.set('login');
  }
}
