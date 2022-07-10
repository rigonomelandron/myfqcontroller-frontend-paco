import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../interfaces/evento.interface';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  authURL = 'http://localhost:8080/';
  constructor(private _http: HttpClient) { }

  public getAll(): Observable<Evento[]> {
    return this._http.get<Evento[]>(this.authURL +`api/v1/eventos/listado`);
  }

  public getEventoById(id: number): Observable<Evento> {
    return this._http.get<Evento>(this.authURL +`api/v1/eventos/id/${id}`);
  }

  public getEventoByDni(dni: string): Observable<Evento[]> {
    return this._http.get<Evento[]>(this.authURL +`api/v1/eventos/dni/${dni}`);
  }

  public getEventoByDniAndFecha(dni: string, fecha: string): Observable<Evento[]> {
    return this._http.get<Evento[]>(this.authURL +`api/v1/eventos/dniFecha/${dni}/${fecha}`);
  }

  public postEvento(evento: Evento): Observable<Evento> {
    console.log('entrarEventoservice');

    return this._http.post<Evento>(this.authURL +'api/v1/evento', evento);
  }

  public modificarEvento(evento: Evento): Observable<Evento> {
    return this._http.patch<Evento>(this.authURL +'api/v1/evento/' + evento.id, evento);
  }

  public deleteEvento(id: number): Observable<Evento> {
    return this._http.delete<Evento>(this.authURL +'api/v1/evento/' + id);
  }

  public getEventosByFecha(fechaInicio: Date, fechaFin: Date): Observable<Evento[]> {
    return this._http.get<Evento[]>(this.authURL +'/api/v1/eventos/fechas/' + fechaInicio + "/" + fechaFin);
  }
}
