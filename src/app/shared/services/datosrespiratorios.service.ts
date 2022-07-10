import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { DatosRespiratorios } from '../interfaces/datosrespiratorios.interface';

@Injectable({
  providedIn: 'root'
})
export class DatosrespiratoriosService {
  authURL = 'http://localhost:8080/';
  constructor(private _http : HttpClient) { }

  public getDatosRespiratorios():Observable<DatosRespiratorios[]>{
    return this._http.get<DatosRespiratorios[]>(this.authURL +'api/v1/datos-respiratorios');
  }
  public getDatosRespiratoriosByFecha(idUsuario:number, fechaInicio:Date, fechaFin:Date):Observable<DatosRespiratorios[]>{
    console.log("usuario");

    return this._http.get<DatosRespiratorios[]>(this.authURL +`api/v1/datos-respiratorios/fechas/${idUsuario}/${fechaInicio}/${fechaFin}`);
  }
  public getDatosRespiratoriosByDate(fecha:Date):Observable<DatosRespiratorios[]>{
    return this._http.get<DatosRespiratorios[]>(this.authURL +'api/v1/datos-respiratorios/fecha/'+fecha);
  }
  public getDatosRespiratoriosByPacienteAndFecha(idPaciente:number, fecha:Date):Observable<DatosRespiratorios[]>{

    return this._http.get<DatosRespiratorios[]>(this.authURL +'api/v1/datos-respiratorios/userFecha/'+idPaciente+'/'+fecha);
  }

  public getDatosRespiratoriosByDniFecha(idUsuario:string , fecha:string):Observable<DatosRespiratorios[]>{

    return this._http.get<DatosRespiratorios[]>(this.authURL +`api/v1/datos-respiratorios/dniFecha/${idUsuario}/${fecha}`);
  }

  public addDatosRespiratorios(datosRespiratorios:DatosRespiratorios):Observable<DatosRespiratorios>{
    return this._http.post<DatosRespiratorios>(this.authURL +'api/v1/datos-respiratorios', datosRespiratorios);

  }
  public getDatosRespiratoriosIdUsuario(id:number):Observable<DatosRespiratorios[]>{
    return this._http.get<DatosRespiratorios[]>(this.authURL +'api/v1/datos-respiratorios/usuarioId/'+id);
  }
  public getDatosRespiratoriosByDni(id:string):Observable<DatosRespiratorios[]>{
     console.log("datosRespiratorios");
     console.log("id",id);

    return this._http.get<DatosRespiratorios[]>(this.authURL +'api/v1/datos-respiratorios/dni/'+id);
  }
}
