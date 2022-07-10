import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tension } from '../interfaces/tension.interface';

@Injectable({
  providedIn: 'root'
})
export class TensionService {
  authURL = 'http://localhost:8080/';
  constructor(private _http: HttpClient) { }

  public getTensiones(): Observable<Tension[]> {
    return this._http.get<Tension[]>(this.authURL +'api/v1/tension/listado');
  }
  public getTension(id: number): Observable<Tension> {
    return this._http.get<Tension>(this.authURL +'api/v1/tensiones/' + id);
  }
  public postTension(tension: Tension): Observable<Tension> {
    return this._http.post<Tension>(this.authURL +'api/v1/tensiones', tension);
  }
  public modificarTension(tension: Tension): Observable<Tension> {
    return this._http.patch<Tension>(this.authURL +'api/v1/tensiones/' + tension.id, tension);
  }
  public deleteTension(id: number): Observable<Tension> {
    return this._http.delete<Tension>(this.authURL +'api/v1/tensiones/' + id);
  }
  public getTensionesByFecha(fechaInicio: Date, fechaFin: Date): Observable<Tension[]> {
    return this._http.get<Tension[]>(this.authURL +'api/v1/tension/fechas/' + fechaInicio +"/"+fechaFin);
  }
  public getTensionByDniFecha(dni: string, fecha: string): Observable<Tension[]> {
    return this._http.get<Tension[]>(this.authURL +`api/v1/tension/dniFecha/${dni}/${fecha}`);
  }
  public getTensionesByDni(idUsuario: string): Observable<Tension[]> {
    return this._http.get<Tension[]>(this.authURL +`api/v1/tension/dni/${idUsuario}`);
  }

}
