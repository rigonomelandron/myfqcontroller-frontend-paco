import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Doctor } from 'src/app/shared/interfaces/doctor.interface';
import { Equipo } from 'src/app/shared/interfaces/equipo.interface';
import { Mensaje } from 'src/app/shared/interfaces/mensaje.interface';
import { Paciente } from 'src/app/shared/interfaces/paciente.interface';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';
import { DoctoresService } from 'src/app/shared/services/doctores.service';
import { EquiposService } from 'src/app/shared/services/equipos.service';
import { MensajesService } from 'src/app/shared/services/mensajes.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class HomeMedicoComponent implements OnInit {
  public pacientes: Paciente[];
  public doctor!: Doctor;
  public dniPacientes: string[];
  public equipos: Equipo[];
  public paciente: string;
  public mensaje: string;
  public pacienteEnvioMensaje!: Paciente;
  public formMensaje: FormGroup;
  public mensajes : Mensaje[];
  public mostrarMensaje: boolean = false;
  msgs: Message[] = [];
  public abrirMensaje: boolean = false;
  public mensajeModificado!: Mensaje;
  public usuario!:Usuario;
  constructor(
    private _doctorServices: DoctoresService,
    private _pacienteServices: PacientesService,
    private _equiposServices: EquiposService,
    private _confirmationService: ConfirmationService,
    private _mensajeService: MensajesService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _tokenService: TokenService,
    private _usuarioService: UsuariosService,
  ) {
    this.pacientes = [];
    this.dniPacientes = [];
    this.equipos = [];
    this.paciente = '';
    this.mensaje = '';
    this.formMensaje = this._formBuilder.group({

      mensaje: ['', Validators.required]

    });
    this.mensajes = [] as Mensaje[];

  }

  ngOnInit(): void {
    this.obtenerDoctor();
  }

  public obtenerDoctor() {

    let usuario = this._tokenService.getUserName();
    this._usuarioService.getUsuarioById(usuario).subscribe({
      next: (data: any) => {
        this.usuario = data;

      },

      error: (err) => {
        console.log(err);
      },
      complete: () => {
        
      this._doctorServices.getDoctorByIdUsuario(this.usuario.id!).subscribe({
        next: (doctor) => {
          
          this.doctor = doctor;
          this.obtenerEquipos();
          this.obtenerMensajes();
        },
        error: (err) => {
          console.log(err);
        }
      });
      
    }
    });
  }
  public obtenerEquipos() {
    this.pacientes = [];
    this.dniPacientes = [];
    if (this.doctor) {
      this._equiposServices.getEquipoByIdMedico(this.doctor.numColegiado).subscribe({
        next: (equipos) => {

          for (let equipo of equipos) {
            this.dniPacientes.push(equipo.idPaciente);
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {

          this.obtenerPacientes();
        }
      });
    }
  }
  public obtenerPacientes() {

    for (let dni of this.dniPacientes) {
      this._pacienteServices.getPaciente(dni).subscribe({
        next: (paciente: Paciente) => {
          this.pacientes.push(paciente);
        }
      });
    }
  }

  public calendario(paciente: Paciente) {

    this.paciente = paciente.dni;
    let usuarioPaciente = localStorage.getItem('paciente');
    if (usuarioPaciente) {
      localStorage.removeItem('paciente');
    }
    localStorage.setItem('paciente', this.paciente);
    ;
  }
  confirmarEliminar(paciente: Paciente) {
    this._confirmationService.confirm({
      message: '¿Quieres eliminar este paciente?',
      header: 'Confirmación de borrado',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmar', detail: 'Usuario Borrado' }];
        this.eliminarPaciente(paciente);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rehusar', detail: 'Volver' }];
      }
    });
  }
  public eliminarPaciente(paciente: Paciente) {
    this.paciente = paciente.dni;
    this._equiposServices.getEquipoByIdPaciente(this.paciente).subscribe({
      next: (equipo: Equipo) => {
        let id = equipo.id;
        if (id) {
          this._equiposServices.deleteEquipo(id).subscribe({
            next: (equipo: Equipo) => {
              this.obtenerEquipos();
            },
            error: (err) => {
              console.log(err);
            }
          });
        }

      }
    });
  }

  public crearMensaje() {

    let mensaje = {

      idPaciente: this.pacienteEnvioMensaje.dni,
      idMedico: this.doctor.numColegiado,
      fecha: new Date(),
      mensaje: this.formMensaje.value.mensaje,
      isVisto: false,
      rol: 'medico'
    }

    this._mensajeService.addMensaje(mensaje).subscribe({

      next: (mensaje: Mensaje) => {
        this.abrirMensaje = false;
        this.formMensaje.reset();

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  public abrirDialogMensaje(paciente: Paciente) {
    this.abrirMensaje = true;
    this.pacienteEnvioMensaje = paciente;
  }
  public cerrarDialogMensaje() {
    this.abrirMensaje = false;
  }
  public obtenerMensajes(){
    this._mensajeService.getMensajesByIdMedico(this.doctor.numColegiado).subscribe({
      next: (mensajes: Mensaje[]) => {

        for(let mensaje of mensajes){
          if(mensaje.visto == false && mensaje.rol == 'paciente'){
            this.mensajes.push(mensaje);
          }
        }


      }
    });
  }
  public mostrarMensajes(){
    this.mostrarMensaje = true;
  }
  public cerrarMensajes(){
    this.mostrarMensaje = false;
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['/contenido/home-medico']);
  }
  public modificarVisto(mensaje: Mensaje) {

    this.mensajeModificado = {
      id: mensaje.id,
      idPaciente: mensaje.idPaciente,
      idMedico: mensaje.idMedico,
      mensaje: mensaje.mensaje,
      fecha: mensaje.fecha,
      visto: true,
    }

    this._mensajeService.modificarVisto(this.mensajeModificado).subscribe({
      next: (data: Mensaje) => {
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }

    });

  }


}
