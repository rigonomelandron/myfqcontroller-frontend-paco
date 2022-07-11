import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { Doctor } from 'src/app/shared/interfaces/doctor.interface';
import { Equipo } from 'src/app/shared/interfaces/equipo.interface';
import { Paciente } from 'src/app/shared/interfaces/paciente.interface';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DoctoresService } from 'src/app/shared/services/doctores.service';
import { EquiposService } from 'src/app/shared/services/equipos.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-ajustes-medico',
  templateUrl: './ajustes-medico.component.html',
  styleUrls: ['./ajustes-medico.component.css'],
  providers: [ConfirmationService]
})
export class AjustesMedicoComponent implements OnInit {
  public mostrarFormulario: boolean = false;
  public formDoctor: FormGroup;
  public medico!: Doctor;
  public msgs: Message[] = [];
  public usuario!:Usuario;

  constructor(
    private _formBuilder: FormBuilder,
    private _pacientesServices: PacientesService,
    private _usuariosServices: UsuariosService,
    private _confirmationService: ConfirmationService,
    private _router: Router,
    private _authService: AuthService,
    private _equipoService: EquiposService,
    private _doctoresService: DoctoresService,
    private _tokenService: TokenService

  ) {
    this.formDoctor = this._formBuilder.group({
      numColegiado: [''],
      nombre: ['', []],
      email: ['', []],
      idUsuario: ['', []]
    });



  }

  ngOnInit(): void {

    this.obtenerMedico();
  }

  public addMedico (){
    let medico = {
      numColegiado: this.medico.numColegiado,
      nombre: this.formDoctor.value.nombre,
      email: this.formDoctor.value.email,
      idUsuario: this.medico.idUsuario
    }

    this._doctoresService.modificarDoctor(medico).subscribe({
      next: (data) => {

      }
    });

    this.cerrarDialogo();
  }

  public cerrarDialogo() {
    this.mostrarFormulario = false;
  }
  public abrirDialogo() {
    this.mostrarFormulario = true;
  }
  public confirmarEliminar() {
    this._confirmationService.confirm({
      message: '¿Quieres eliminar este usuario?',
      header: 'Confirmación de borrado',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmar', detail: 'Usuario Borrado' }];
        this.eliminarUsuario();
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rehusar', detail: 'Volver' }];
      }
    });
  }

  public eliminarUsuario() {
    this._usuariosServices.deleteUsuario(this.medico.idUsuario).subscribe({
      next: (data) => {
      this._tokenService.logOut();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public obtenerMedico() {
    let usuario = this._tokenService.getUserName();
    this._usuariosServices.getUsuarioById(usuario).subscribe({
      next: (data: any) => {
        this.usuario = data;

      },

      error: (err:HttpErrorResponse) => {
        console.log(err);
      },
      complete: () => {

        this._doctoresService.getDoctorByIdUsuario(this.usuario.id!).subscribe({
          next: (doctor) => {
            this.medico = doctor;

          },
          error: (err:HttpErrorResponse) => {
            console.log(err);
          }
        });

      }
    });
  }



}
