import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable, of } from 'rxjs';
import { InterfaceCampesino } from '../models/interface-campesino';

@Injectable({
  providedIn: 'root'
})
export class BackService {
  http = inject(HttpClient)
  urlBack: string = environment.urlLocal;
  isLoggedIn: boolean = false

  /**
   * Realiza la verificación de credenciales contra el backend.
   * Envía el documento y la clave y espera un booleano o un objeto { success: boolean }.
   */
  login(documento: string, clave: string): Observable<boolean> {
    return this.http.get<InterfaceCampesino>(`${this.urlBack}`).pipe(
        map((campesino) => {
          if(campesino.documento === documento && campesino.clave === clave){
            this.isLoggedIn = true;
          }
          return this.isLoggedIn;
        })
      );
  }

}
