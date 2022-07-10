import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DeportesService } from 'src/app/shared/services/deportes.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';
import {Paciente} from "../../../shared/interfaces/paciente.interface";
import {TokenService} from "../../../shared/services/token.service";
import {UsuariosService} from "../../../shared/services/usuarios.service";
import {Usuario} from "../../../shared/interfaces/usuario.interface";

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.css']
})
export class GraficoBarrasComponent implements OnInit {

  multiAxisData: any;



  public multiAxisOptions: any;


  public deportes: string[];
  public datos: number[];
  public meses: Date[];
  public chart?: Chart[];
  public dates: string[];
  public calorias?: number[];
  public ppmMedia?: number[];
  public usuario!: Usuario;
  public paciente!: Paciente;



  constructor(
    private _deportesServices: DeportesService,
    private _pacientesServices: PacientesService,
    private _tokenService: TokenService,
    private _usuarioService: UsuariosService,
    private _pacienteServices: PacientesService

  ) {
    this.deportes = [];
    this.datos = [];
    this.meses = [];
    this.dates = [];



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
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => {

          if(this.usuario){
            this._pacienteServices.getPacienteByUserName(this.usuario.id!).subscribe({
              next: (data: Paciente) => {
                this.paciente = data;
              },
              error: (error: HttpErrorResponse) => {
                console.log(error);
              },
              complete: () => {
                this.obtenerDeportes();
              }
            });
          }}

    });


  }
  public obtenerDeportes() {
    this._deportesServices.getDeportesByDni(this.paciente.dni).subscribe({
      next: (actividades) => {
        actividades.sort((d1, d2) => new Date(d1.fecha).getTime() - new Date(d2.fecha).getTime());
        this.meses = actividades.map((actividades: { fecha: Date; }) => actividades.fecha);
        this.calorias = actividades.map((actividades: { calorias: number; }) => actividades.calorias);
        this.ppmMedia = actividades.map((actividades: { ppmMedia: number; }) => actividades.ppmMedia);

        this.meses.forEach((res) => {
          let jsdate = new Date(res);
          this.dates.push(jsdate.toLocaleTimeString('es', { year: 'numeric', month: 'short', day:'numeric' }).substring(0, 11));

        })
      },
      error: (err: HttpErrorResponse) => {

        console.log(err);

      },
      complete: () => {
        this.cargarGrafica();
      }

    });
  }

  public cargarGrafica() {
    this.multiAxisData = {

      labels: this.dates,
      datasets: [{
        label: 'Media Pulsaciones',
        backgroundColor: [
          '#2FEDA2',

        ],
        yAxisID: 'y',

        data: this.ppmMedia
      },

       {
          label: 'Calorías',
          backgroundColor: '#F0330E',
          yAxisID: 'y1',
          data: this.calorias,

        }
      ],

    };

    this.multiAxisOptions = {
      plugins: {
        legend: {
          labels: {
            color: ' #1d736a',
            font: {
              size: 20,
              weight: 'bold',
            }
          }
        },
        tooltips: {
          mode: 'index',
          intersect: true
        }
      },
      scales: {
        x: {
          ticks: {
            color: ' #1d736a',
            font: {
              size: 15,
              weight: 'bold',
            }

          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            min: 0,
            max: 100,
            color: ' #1d736a',
            font: {
              size: 15,
              weight: 'bold',
            }

          },
          grid: {
            color: '#ebedef'
          }
        },
        y1: {
          type: 'linear',
          display:true,
          position: 'right',
          grid: {
            drawOnChartArea: false,
            color: ' #1d736a'
          },
          ticks: {
            min: 0,
            max: 100,
            color: ' #1d736a',
             font: {
              size: 15,
              weight: 'bold',
            }

          }
        }
      }
    };

  }



}
