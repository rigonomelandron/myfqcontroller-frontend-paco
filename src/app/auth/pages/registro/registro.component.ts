import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Doctor } from 'src/app/shared/interfaces/doctor.interface';
import { Paciente } from 'src/app/shared/interfaces/paciente.interface';

import { AuthService } from 'src/app/shared/services/auth.service';
import { DoctoresService } from 'src/app/shared/services/doctores.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { LoginUsuario } from 'src/app/shared/interfaces/login-usuario';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public medico: boolean;
  public paciente: boolean;
  public roles: any[];
  public pacienteNuevo?: Paciente;
  public usuarioNuevo?: Usuario;
  public medicoNuevo?: Doctor;
  isLogged = false;
  isLoginFail = false;
  miFormulario: FormGroup;
  loginUsuario!: LoginUsuario;
  errMsj!: string;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _pacientesService: PacientesService,
    private _usuariosService: UsuariosService,
    private _doctoresService: DoctoresService,
    private _authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService

  ) {
    this.medico = false;
    this.paciente = false;
    this.roles = [
      { value: 0, rol: 'Escoge tu rol' },
      { value: "ROLE_PACIENTE", rol: 'paciente' },
      { value: "ROLE_MEDICO", rol: 'medico' },
    ];
    this.miFormulario = this._fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
      id: ['', [Validators.required, Validators.minLength(3)]],
      roles: ['', [Validators.required]],
    });

  }

  ngOnInit(): void { }
  registro() {

    this.usuarioNuevo = {
      nombre: this.miFormulario.value.usuario,
      nombreUsuario: this.miFormulario.value.nombre,
      password: this.miFormulario.value.password,
      email: this.miFormulario.value.email,
      roles: [this.miFormulario.value.roles.value],
    };


    this._authService.nuevo(this.usuarioNuevo).subscribe({
      next: (data) => {
        this.usuarioNuevo = data;

      },
      error: (err: HttpErrorResponse) => {

        console.log(err);
      },
      complete: () => {
        this.onLogin();
      }
    });


    this._router.navigateByUrl('/auth/login');
  }
  onLogin(): void {
   
    this.loginUsuario = new LoginUsuario(this.miFormulario.value.nombre, this.miFormulario.value.password);
    this._authService.login(this.loginUsuario).subscribe({

      next: (data: any) => {
        this.isLogged = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setAuthorities(data.authorities);
        this.tokenService.setUserName(data.nombreUsuario);
        this.isLogged = true;
        this.isLoginFail = false;
        this.roles = this.tokenService.getAuthorities();

      },
      error: (err: HttpErrorResponse) => {
        this.isLoginFail = true;
        this.errMsj = err.error.message;
        this.toastr.error(this.errMsj, 'Login');
      },
      complete: () => {
        this.registroPaciente();
      }
    });
  }
  public registroPaciente(): void {
    
    if (this.miFormulario.value.roles.value === 'ROLE_PACIENTE') {
    
      if (this.usuarioNuevo && this.usuarioNuevo.id) {
        this.pacienteNuevo = {
          dni: this.miFormulario.value.id,
          nombre: this.miFormulario.value.nombre,
          email: this.miFormulario.value.email,
          idUsuario: this.usuarioNuevo.id,
        }
      }
    
      if (this.pacienteNuevo) {
        this._pacientesService
          .registroPacientes(this.pacienteNuevo)
          .subscribe({
            next: (data) => {
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
            },
            complete: () => {
              this.router.navigate(['/contenido/home']);
            }
          });
      }
    }
    
    if (this.miFormulario.value.roles.value === 'ROLE_MEDICO') {
      if (this.usuarioNuevo && this.usuarioNuevo.id) {
        this.medicoNuevo = {
          numColegiado: this.miFormulario.value.id,
          nombre: this.miFormulario.value.nombre,
          email: this.miFormulario.value.email,
          idUsuario: this.usuarioNuevo.id
        }

        this._doctoresService.registroDoctores(this.medicoNuevo).subscribe({
          next: (data) => {
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
          complete: () => {
            this.router.navigate(['/contenido/home-medico']);
          }
        });
      }
    }
    this.toastr.success('Usuario registrado correctamente');
  }


}
