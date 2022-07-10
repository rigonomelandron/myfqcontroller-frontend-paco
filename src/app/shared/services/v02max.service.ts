import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { V02Max } from '../interfaces/v02max.interface';

@Injectable({
  providedIn: 'root'
})
export class V02maxService {
  authURL = 'http://localhost:8080/';
  constructor(private _http: HttpClient) { }

  public getV02MaxByDniFecha(dni: string, fecha: string): Observable<V02Max[]> {
    return this._http.get<V02Max[]>(this.authURL +`api/v1/v02max/dniFecha/${dni}/${fecha}`);

  }
  public getV02MaxByDni(dni: string): Observable<V02Max[]> {
    return this._http.get<V02Max[]>(this.authURL +`api/v1/v02max/dni/${dni}`);

  }

}
