import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Antecedente } from '../interfaces/antecedente.interface';

@Injectable({
  providedIn: 'root'
})
export class AntecedentesService {
  authURL = 'http://localhost:8080/';
  constructor(private _http : HttpClient) { }

  public getAntecedentesByDniFecha(dni: string, fecha: string):Observable<Antecedente[]>{
    return this._http.get<Antecedente[]>(this.authURL +`api/v1/antecedentes/dniFecha/${dni}/${fecha}`);

  }
  public addAntecedente(antecedente: Antecedente): Observable<Antecedente> {
    return this._http.post<Antecedente>(this.authURL +'api/v1/antecedente', antecedente);
  }
  public getAntecedentesByDni(dni : string):Observable<Antecedente[]>{
    return this._http.get<Antecedente[]>(this.authURL +`api/v1/antecedentes/dni/${dni}`);

  }

}
