import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensaje } from '../interfaces/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  authURL = 'http://localhost:8080/';
  constructor(private _http: HttpClient) { }

  public getMensajes(): Observable<Mensaje[]> {
    return this._http.get<Mensaje[]>(this.authURL +'api/v1/mensajes/listado');
  }
  public getMensajesByIdPaciente(idPaciente: string): Observable<Mensaje[]> {
    return this._http.get<Mensaje[]>(this.authURL +'api/v1/mensajes/idPaciente/' + idPaciente);
  }
  public getMensajesByIdMedico(idMedico: string): Observable<Mensaje[]> {
    return this._http.get<Mensaje[]>(this.authURL +'api/v1/mensajes/idMedico/' + idMedico);
  }
  public getMensajesByIdMedicoAndFecha(idMedico: string, fecha: Date): Observable<Mensaje[]> {
    return this._http.get<Mensaje[]>(this.authURL +'api/v1/mensajes/idMedicoFecha/' + idMedico + '/' + fecha);
  }
  public getMensajesByIdPacienteAndFecha(idPaciente: string, fecha: Date,): Observable<Mensaje[]> {
    return this._http.get<Mensaje[]>(this.authURL +'api/v1/mensajes/idPacienteFecha/' + idPaciente + '/' + fecha);
  }
  public addMensaje(mensaje: Mensaje): Observable<Mensaje> {
    return this._http.post<Mensaje>(this.authURL +'api/v1/mensaje/crear', mensaje);
  }
  public modificarVisto(mensaje: Mensaje): Observable<Mensaje> {
    return this._http.patch<Mensaje>(this.authURL +'api/v1/mensaje/modificar', mensaje);
  }
  public mensajeNoVisto(idPaciente:string,visto:boolean): Observable<Mensaje[]> {
    return this._http.get<Mensaje[]>(this.authURL +`api/v1/mensaje/noVisto/${idPaciente}/${visto}` );
  }
}
