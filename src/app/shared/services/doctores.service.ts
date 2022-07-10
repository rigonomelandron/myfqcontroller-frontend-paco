import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../interfaces/doctor.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctoresService {
  authURL = 'http://localhost:8080/';
  constructor(private _http : HttpClient) { }

  public registroDoctores(doctor : Doctor):Observable<Doctor>{
      return this._http.post<Doctor>(this.authURL +'api/v1/doctores/save', doctor);
  }
  public deleteDoctor(id : string):Observable<Doctor>{
      return this._http.delete<Doctor>(this.authURL +'api/v1/doctores/delete'+id);
  }
  public getDoctores():Observable<Doctor[]>{
      return this._http.get<Doctor[]>(this.authURL +'api/v1/doctores/listado');
  }
  public modificarDoctor(doctor : Doctor):Observable<Doctor>{

      return this._http.patch<Doctor>(this.authURL +'api/v1/doctores/update', doctor);
  }
  public getDoctor(id : string):Observable<Doctor>{
      return this._http.get<Doctor>(this.authURL +'api/v1/doctores/colegiado'+id);
  }
  public getDoctorByIdUsuario(id : number):Observable<Doctor>{

      return this._http.get<Doctor>(this.authURL +'api/v1/doctores/usuario/'+id);
  }
  public getDoctorByNumColegiado(id : string):Observable<Doctor>{
      return this._http.get<Doctor>(this.authURL +'api/v1/doctores/colegiado/'+id);
  }
}
