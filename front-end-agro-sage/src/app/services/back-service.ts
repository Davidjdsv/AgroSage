import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// Respuesta esperada del backend en /AgroSage/Agricultores/login
export interface LoginApiResponse {
  success: boolean;
  msg?: string;
  agricultor?: {
    id_agricultor: number;
    nombre_completo: string;
    cedula: string;
    ciudad?: string;
  };
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class BackService {
  private http = inject(HttpClient);
  private apiAgricultores = ((environment as any).apiAgricultores || `${(((environment as any).apiBase) ?? environment.urlLocal)}/AgroSage/Agricultores`);

  isLoggedIn = false;
  token: string | null = null;
  currentUser: LoginApiResponse['agricultor'] | null = null;

  // Login contra el backend (POST /AgroSage/Agricultores/login)
  login(cedula: string, contrasena: string): Observable<LoginApiResponse> {
    const body = { cedula, contrasena };
    return this.http.post<LoginApiResponse>(`${this.apiAgricultores}/login`, body).pipe(
      tap((resp) => {
        if (resp?.success) {
          this.isLoggedIn = true;
          this.token = resp.token || null;
          this.currentUser = resp.agricultor || null;
        } else {
          this.isLoggedIn = false;
          this.token = null;
          this.currentUser = null;
        }
      }),
      catchError((err) => {
        this.isLoggedIn = false;
        this.token = null;
        this.currentUser = null;
        return throwError(() => err);
      })
    );
  }

  // Ejemplo de consulta a ruta protegida /perfil
  getPerfil(): Observable<any> {
    const headers = new HttpHeaders({ 'x-token': this.token ?? '' });
    return this.http.get(`${this.apiAgricultores}/perfil`, { headers }).pipe(
      catchError((err) => throwError(() => err))
    );
  }
}
