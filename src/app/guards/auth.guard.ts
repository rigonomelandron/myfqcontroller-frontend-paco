import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private _authService: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
   return this._authService.verificarToken().pipe(
    tap(estaAutorizado=>{
      if(!estaAutorizado){
        this._authService.logOut();
      }
    }
   )
   );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> |  boolean {

    // Otra manera de hacer un if true else false
    //  return !!this.authService.usuarioActivo.id;
    return this._authService.verificarToken().pipe(
      tap(estaAutorizado => {
        if (!estaAutorizado) {
          this._authService.logOut();
        }
      }
      )
    );
  }
}
