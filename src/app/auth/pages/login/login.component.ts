import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/shared/interfaces/login-usuario';

import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe({

      next: (data: any) => {
        this.isLogged = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setAuthorities(data.authorities);
        this.tokenService.setUserName(data.nombreUsuario);
        this.isLogged = true;
        this.isLoginFail = false;
        this.roles = this.tokenService.getAuthorities();
        this.toastr.success('Bienvenido ' + this.nombreUsuario, 'Login');
        if(this.roles.includes('ROLE_PACIENTE')){
        this.router.navigate(['/contenido/home']);
        }else{
          this.router.navigate(['/contenido/home-medico']);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoginFail = true;
        this.errMsj = err.message;
        this.toastr.error("Usuario no registrado", 'Login');

      }
    });
  }

}
