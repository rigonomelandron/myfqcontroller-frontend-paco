import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../interfaces/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  authURL = 'http://localhost:8080/';
  constructor(private _http : HttpClient) { }



 public registroPacientes(paciente : Paciente):Observable<Paciente>{
   return this._http.post<Paciente>(this.authURL + 'api/v1/pacientes/crear', paciente);
  }
  public deletePaciente(dni : string):Observable<Paciente>{
    return this._http.delete<Paciente>(this.authURL + 'api/v2/pacientes/'+dni);
  }
  public getPacientes():Observable<Paciente[]>{
    return this._http.get<Paciente[]>(this.authURL + 'api/v2/pacientes');
  }
  public modificarPaciente(paciente : Paciente):Observable<Paciente>{
    return this._http.patch<Paciente>(this.authURL + `api/v1/pacientes/modificar`, paciente);
  }
  public getPaciente(dni : string):Observable<Paciente>{
    return this._http.get<Paciente>(this.authURL + 'api/v1/pacientes/dni/'+dni);
  }
  public getPacienteByUserName(username : number):Observable<Paciente>{


    return this._http.get<Paciente>(this.authURL + 'api/v1/pacientes/userName/'+username);
  }
}
