import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const TOKEN_KEY = 'AuthToken';
const usuario = 'AuthUseNamer';
const AUTHORITIES_KEY = 'AuthAuthorities';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  roles: Array<string> = [];
  constructor(private _router:Router) { }


  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    let token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      return token;
    }
    return '';
  }
  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(usuario);
    window.sessionStorage.setItem(usuario, userName);
  }
  public getUserName(): string {
    let username = window.sessionStorage.getItem(usuario);
    if (username) {
      return username;
    }
    return '';
  }
  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    let authorities = window.sessionStorage.getItem(AUTHORITIES_KEY);
    if (authorities) {
      JSON.parse(authorities).forEach((authority: { authority: string; }) => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  public logOut(): void {
    window.sessionStorage.clear();
    this._router.navigate(['/auth/login']);
  }

}

