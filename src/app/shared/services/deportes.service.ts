import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deporte } from '../interfaces/deporte.interface';

@Injectable({
  providedIn: 'root'
})
export class DeportesService {
  authURL = 'http://localhost:8080/';
  constructor(private _http: HttpClient) { }

  public getDeportes():Observable<Deporte[]>{
    return this._http.get<Deporte[]>(this.authURL +'api/v1/deportes/listado');
  }

  public getDeportesByDniFecha(dni: string, fecha: string): Observable<Deporte[]> {
    return this._http.get<Deporte[]>(this.authURL +`api/v1/deportes/dniFecha/${dni}/${fecha}`);
  }
  public getDeportesByDni(dni: string): Observable<Deporte[]> {
    return this._http.get<Deporte[]>(this.authURL +`api/v1/deportes/dni/${dni}`);
  }
  public addActividad( actividad: Deporte): Observable<Deporte> {
    return this._http.post<Deporte>(this.authURL +'api/v1/deportes', actividad);
  }
}
