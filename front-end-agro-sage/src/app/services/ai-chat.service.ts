import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface BackendResponse {
reply: string;
data?: any;
}

@Injectable({
providedIn: 'root'
})
export class AiChatService {
// 🚨 CAMBIO DE RUTA: Apuntar a la nueva ruta de chat
private apiUrl = 'http://localhost:5000/api/chat/ask'; 

constructor(private http: HttpClient) {}

// El método sendPrompt ya es correcto para enviar solo la pregunta
sendPrompt(prompt: string): Observable<BackendResponse> {
const token = localStorage.getItem('token'); 
if (!token) {
console.error('⚠️ No se encontró token JWT en localStorage');
return throwError(() => new Error('Usuario no autenticado.'));
}

const headers = new HttpHeaders({
'Content-Type': 'application/json',
'Authorization': `Bearer ${token}` 
});

// ✅ Se envía la clave 'prompt', que es lo que el nuevo backend espera
const body = { prompt }; 

return this.http.post<BackendResponse>(this.apiUrl, body, { headers }).pipe(
map((res: any) => ({
// El backend debe devolver 'reply' con el texto de Gemini
reply: res.reply || res.message || 'Sin respuesta del modelo',
data: res.data || null
})),
catchError((error: HttpErrorResponse) => {
console.error('❌ Error en la petición:', error);
let msg = 'Error de conexión con el servidor.';
if (error.status === 401) msg = 'No autorizado. Token inválido o expirado.';
return throwError(() => new Error(msg));
})
);
}
}