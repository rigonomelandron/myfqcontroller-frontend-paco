import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CicloAntibiotico } from '../interfaces/cicloantibiotico.interface';
import { Paciente } from '../interfaces/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class CiclosAntibioticosService {
  authURL = 'http://localhost:8080/';
  constructor(private _http : HttpClient) { }

  public getCicloAntibioticosByDniFecha(dni: string, fecha: string):Observable<CicloAntibiotico[]>{
    return this._http.get<CicloAntibiotico[]>(this.authURL +`api/v1/ciclosAntibioticos/dniFecha/${dni}/${fecha}`);


  }
 public addCicloAntibioticos(cicloAntibiotico: CicloAntibiotico): Observable<CicloAntibiotico>{

  return this._http.post<CicloAntibiotico>(this.authURL +'api/v1/ciclosAntibiotico', cicloAntibiotico);
 }
 public getCicloAntibioticosByDni(dni: string): Observable<CicloAntibiotico[]>{
  return this._http.get<CicloAntibiotico[]>(this.authURL +`api/v1/ciclos-antibiotico/dni/${dni}`);
 }

}
