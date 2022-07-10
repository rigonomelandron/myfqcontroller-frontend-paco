import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'src/app/shared/interfaces/paciente.interface';
import { DeportesService } from 'src/app/shared/services/deportes.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';
import { ConfirmationService, MessageService, PrimeIcons } from "primeng/api";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Deporte } from 'src/app/shared/interfaces/deporte.interface';
import {TokenService} from "../../../shared/services/token.service";
import {UsuariosService} from "../../../shared/services/usuarios.service";
import {Usuario} from "../../../shared/interfaces/usuario.interface";

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ActividadComponent implements OnInit {
  public mostrarFormActividad: boolean = false;
  public formActividad: FormGroup
  public tipoOptions: any[];
  public caloria: number;
  public paciente!:Paciente;
  public datos: string[];
  public datoDeporte!: Deporte;
  public usuario!:Usuario;

  constructor(
    private _formBuilder: FormBuilder,
    private _deportesService: DeportesService,
    private _pacienteServices: PacientesService,
    private _mensajeService: MessageService,
    private _router: Router,
    public _location: Location,
    private _datosDeportesService : DeportesService,
    private _tokenService: TokenService,
    private _usuarioService: UsuariosService

  ) {
    this.formActividad = this._formBuilder.group({
      fecha: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', [Validators.required, Validators.minLength(3)]],
      calorias: ['', [Validators.required, Validators.minLength(1), Validators.pattern('[0-9]*')]],
      ppmMedia: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[0-9]*')]],
      ppmMaxima: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[0-9]*')]],
      tiempo: ['', [Validators.required, Validators.minLength(1), Validators.pattern('[0-9]*')]]
    });
    this.tipoOptions = [
      {value: 'carrera', label: 'Carrera'},
      {value: 'ciclismo', label: 'Ciclismo'},
      {value: 'natacion', label: 'Natación'},
      {value: 'fuerza', label: 'Entrenamiento fuerza'},
      {value: 'caminata', label: 'Caminata/Senderismo'},
      {value: 'otro', label: 'otro'},
    ];



    this.datos = [

    ]

    this.caloria=0;
  }

  public addRegistroActividades() {

    let actividad = {
      fecha: this.formActividad.value.fecha,
      paciente: this.paciente,
      tipo: this.formActividad.value.tipo,
      calorias: this.formActividad.value.calorias,
      ppmMedia: this.formActividad.value.ppmMedia,
      ppmMaxima: this.formActividad.value.ppmMaxima,
      tiempo: this.formActividad.value.tiempo

    }

    this._deportesService.addActividad(actividad).subscribe({
      next: (data) => {
        this._mensajeService.add({
          severity: 'success', summary: 'Añadido', detail: `Actividad añadida correctamente `, life: 2000
        });

      },
      error: (err: HttpErrorResponse) => {

        this._mensajeService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 2000 });

      },
      complete: () => {
        this.cerrarDialogo();
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/contenido/actividad']);

      }


    });


  }
  public abrirDialogo() {
    this.mostrarFormActividad = true;
  }
  public cerrarDialogo() {
    this.mostrarFormActividad = false;
  }

  ngOnInit(): void {
    this.obtenerPaciente();
  }
  public obtenerPaciente() {
    let usuario = this._tokenService.getUserName();
    this._usuarioService.getUsuarioById(usuario).subscribe({
      next: (data: any) => {
        this.usuario = data;

      },
      error: (err: HttpErrorResponse) => {
        console.log("error",err);
      } ,
      complete: () => {
        this._pacienteServices.getPacienteByUserName(this.usuario.id!).subscribe({
          next: (data: Paciente) => {
            this.paciente = data;
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          },

        });
      }
    });

    this.obtenerDeporte();

  }

  public obtenerDeporte(){
    this._datosDeportesService.getDeportes().subscribe({

      next: (datos: Deporte[]) => {
        this.datoDeporte = datos[datos.length - 1];
        this.datos=[

            this.datoDeporte.calorias +'cal',
            this.datoDeporte.ppmMaxima + 'ppm Max',
            this.datoDeporte.ppmMedia +'ppm Med',
            this.datoDeporte.tiempo + 'min',
            this.datoDeporte.tipo

        ]

      },
      error: (err) => {
        console.log(err);
      }
    }

    )
  }

}


