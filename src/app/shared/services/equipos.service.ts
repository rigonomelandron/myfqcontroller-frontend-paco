import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../interfaces/equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  authURL = 'http://localhost:8080/';
  constructor(private _http : HttpClient) { }

  public registroEquipos(equipo : Equipo):Observable<Equipo>{
      return this._http.post<Equipo>(this.authURL +'api/v1/equipos', equipo);
  }
  public deleteEquipo(id : number):Observable<Equipo>{
      return this._http.delete<Equipo>(this.authURL +'api/v2/equipos/'+id);
  }
  public getEquipos():Observable<Equipo[]>{
      return this._http.get<Equipo[]>(this.authURL +'api/v2/equipos');

  }
  public modificarEquipo(equipo : Equipo):Observable<Equipo>{
      return this._http.patch<Equipo>(this.authURL +'api/v2/equipos/'+equipo.id, equipo);
  }

  public getEquipoByIdMedico(id : string):Observable<Equipo[]>{
      return this._http.get<Equipo[]>(this.authURL +'api/v1/equipos/idMedico/'+id);
  }
  public getEquipoByIdPaciente(id : string):Observable<Equipo>{

      return this._http.get<Equipo>(this.authURL +'api/v1/equipos/idPaciente/'+id);
  }
}
