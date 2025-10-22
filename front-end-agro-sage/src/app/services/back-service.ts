import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { InterfaceCampesino, campesinoResponse } from '../models/interface-campesino';

@Injectable({
  providedIn: 'root'
})
export class BackService {
  private http = inject(HttpClient);
  private urlBack: string = environment.urlLocal; // Debe apuntar al puerto HTTP del backend (ej. 3000/8080)

  // Estado simple en memoria
  isLoggedIn: boolean = false;

  /**
   * Verifica credenciales consultando la BD por documento y comparando la clave.
   * Devuelve true si hay coincidencia, de lo contrario false.
   */
  login(documento: string, clave: string): Observable<boolean> {
    const params = new HttpParams().set('documento', documento);

    // Intentamos obtener el/los registros del campesino por documento.
    // Este servicio es flexible y soporta distintas formas de respuesta:
    // - { records: InterfaceCampesino[] }
    // - InterfaceCampesino[]
    // - InterfaceCampesino (objeto único)
    return this.http
      .get<campesinoResponse | InterfaceCampesino[] | InterfaceCampesino>(`${this.urlBack}/campesinos`, { params })
      .pipe(
        map((res) => {
          let registros: InterfaceCampesino[] = [];

          if (Array.isArray(res)) {
            registros = res as InterfaceCampesino[];
          } else if (res && typeof res === 'object' && 'records' in res) {
            registros = (res as campesinoResponse).records ?? [];
          } else if (res && typeof res === 'object') {
            registros = [res as InterfaceCampesino];
          }

          const usuario = registros.find(r => r.documento === documento);
          const ok = !!usuario && usuario.clave === clave;
          this.isLoggedIn = ok;
          return ok;
        }),
        catchError((err) => {
          console.error('Error en login:', err);
          return of(false);
        })
      );
  }

  /**
   * Verifica si el documento existe en la BD.
   * Devuelve true si se encuentra algún registro con ese documento.
   */
  checkDocumento(documento: string): Observable<boolean> {
    const params = new HttpParams().set('documento', documento);

    return this.http
      .get<campesinoResponse | InterfaceCampesino[] | InterfaceCampesino>(`${this.urlBack}/campesinos`, { params })
      .pipe(
        map((res) => {
          let registros: InterfaceCampesino[] = [];

          if (Array.isArray(res)) {
            registros = res as InterfaceCampesino[];
          } else if (res && typeof res === 'object' && 'records' in res) {
            registros = (res as campesinoResponse).records ?? [];
          } else if (res && typeof res === 'object') {
            registros = [res as InterfaceCampesino];
          }

          return registros.some(r => r.documento === documento);
        }),
        catchError((err) => {
          console.error('Error al verificar documento:', err);
          return of(false);
        })
      );
  }
}
