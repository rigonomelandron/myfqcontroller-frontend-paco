import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, pipe, tap } from 'rxjs';
import { JwtDTO } from '../interfaces/jwt-DTO';
import { LoginUsuario } from '../interfaces/login-usuario';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: Usuario): Observable<Usuario> {
    console.log("nuevoUsuario", nuevoUsuario);

    return this.httpClient.post<Usuario>(this.authURL + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {

    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario);
  }
}




