import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Analitica } from '../interfaces/analitica.interface';

@Injectable({
  providedIn: 'root'
})
export class AnaliticaService {
  authURL = 'http://localhost:8080/';
  constructor(private _http: HttpClient) { }

  public getAll(): Observable<Analitica[]> {
    return this._http.get<Analitica[]>(this.authURL +`api/v1/analiticas/listado`);
  }

  public getAnaliticaById(id: number): Observable<Analitica> {
    return this._http.get<Analitica>(this.authURL +`api/v1/analiticas/id/${id}`);
  }

  public getAnaliticaByDni(dni: string): Observable<Analitica[]> {
    return this._http.get<Analitica[]>(this.authURL +`api/v1/analiticas/dni/${dni}`);
  }

  public getAnaliticaByDniAndFecha(dni: string, fecha: string): Observable<Analitica[]> {
    const url = this.authURL +`api/v1/analiticas/dniFecha/${dni}/${fecha}`;
    return this._http.get<Analitica[]>(url);
  }

  public postAnalitica(analitica: Analitica): Observable<Analitica> {
    return this._http.post<Analitica>(this.authURL +'api/v1/analiticas', analitica);
  }

  public modificarAnalitica(analitica: Analitica): Observable<Analitica> {
    return this._http.patch<Analitica>(this.authURL +'api/v1/analiticas/' + analitica.id, analitica);
  }

  public deleteAnalitica(id: number): Observable<Analitica> {
    return this._http.delete<Analitica>(this.authURL +'api/v1/analiticas/' + id);
  }

  public getAnaliticasByFecha(fechaInicio: Date, fechaFin: Date): Observable<Analitica[]> {
    return this._http.get<Analitica[]>(this.authURL +'api/v1/analitica/fechas/' + fechaInicio + "/" + fechaFin);
  }
  public subirArchivos(file: File, id:any): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('archivo', file);
    formData.append('id', id);
    const req = new HttpRequest('POST', this.authURL +`api/v1/analitica/upload`, formData, {
      reportProgress: true
    });

    return this._http.request(req);

  }
}
