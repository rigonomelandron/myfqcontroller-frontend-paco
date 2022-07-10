import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Glicada } from '../interfaces/glicada.interface';

@Injectable({
  providedIn: 'root'
})
export class GlicadasService {
  authURL = 'http://localhost:8080/';
  constructor(private _http:HttpClient) { }

  public getGlicadas():Observable<Glicada[]>{
    return this._http.get<Glicada[]>(this.authURL +'api/v1/glicadas/listado');
  }
  public getGlicada(id:number):Observable<Glicada>{
    return this._http.get<Glicada>(this.authURL +'api/v1/glicada/'+id);
  }
  public postGlicada(glicada:Glicada):Observable<Glicada>{
    return this._http.post<Glicada>(this.authURL +'api/v1/glicada',glicada);
  }
  public modificarGlicada(glicada:Glicada):Observable<Glicada>{
    return this._http.patch<Glicada>(this.authURL +'api/v1/glicada/'+glicada.id,glicada);
  }
  public deleteGlicada(id:number):Observable<Glicada>{
    return this._http.delete<Glicada>(this.authURL +'api/v1/glicada/'+id);
  }
  public getGlicadaByFechas(fechaInicio:Date,fechaFin:Date):Observable<Glicada[]>{

    return this._http.get<Glicada[]>(this.authURL +'api/v1/glicadas/fechas/'+fechaInicio+'/'+fechaFin);
  }
  public getGlicadasByDniFecha(dni:string,fecha:string):Observable<Glicada[]>{

    return this._http.get<Glicada[]>(this.authURL +`api/v1/glicadas/dniFecha/${dni}/${fecha}`);
  }
  public getGlicadasByDni(idUsuario:string):Observable<Glicada[]>{
    return this._http.get<Glicada[]>(this.authURL +`api/v1/glicadas/dni/${idUsuario}`);
  }
}
