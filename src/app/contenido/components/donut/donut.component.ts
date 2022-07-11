import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DeportesService } from 'src/app/shared/services/deportes.service';
import { PacientesService } from 'src/app/shared/services/pacientes.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import {Paciente} from "../../../shared/interfaces/paciente.interface";
import {TokenService} from "../../../shared/services/token.service";
import {Usuario} from "../../../shared/interfaces/usuario.interface";

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent implements OnInit {

  data: any;

  chartOptions: any;
  public deportes: string[];
  public datos: number[];
  public contadorCarrera: number;
  public contadorCiclismo: number;
  public contadorFuerza: number;
  public contadorCaminata: number;
  public contadorOtro: number;
  public contadorNatacion: number;
  public paciente!: Paciente;
  public usuario!:Usuario;



  constructor(
    private _deportesServices: DeportesService,
    private _pacientesServices: PacientesService,
    private _tokenService: TokenService,
    private _usuarioService: UsuariosService,

  ) {

    this.deportes = [];
    this.datos = [];
    this.contadorCarrera = 0;
    this.contadorCiclismo = 0;
    this.contadorFuerza = 0;
    this.contadorCaminata = 0;
    this.contadorOtro = 0;
    this.contadorNatacion = 0;


  }

  ngOnInit() {
    this.obtenerPaciente();
    this.cargarGrafica();
  }
  public cargarGrafica() {
    this.data = {
      labels: ['Caminata', 'Carrera', 'Ciclismo', 'Fuerza', 'Natacion', 'Otro'],
      datasets: [
        {
          data: [this.contadorCaminata, this.contadorCarrera, this.contadorCiclismo, this.contadorFuerza, this.contadorNatacion, this.contadorOtro,],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#AB47BC",
            "#66BB6A",
            "#26A69A"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#AB47BC",
            "#66BB6A",
            "#26A69A"
          ]
        }
      ]
    };
    this.chartOptions = this.getDarkTheme();
  }
  getLightTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: ' #1d736a',


          }
        }
      }
    }
  }

  getDarkTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: ' #1d736a',
            font:{
              size: '15px',
              weight: 'bold'
            }
          }
        }
      }
    }
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

        if (this.usuario) {
          this._pacientesServices.getPacienteByUserName(this.usuario.id!).subscribe({
            next: (data: Paciente) => {
              this.paciente = data;
            },
            error: (error: HttpErrorResponse) => {
              console.log(error);
            },
            complete: () => {
              this.getActividades();
            }

          });
        }
      }

    });



  }

  public getActividades() {

          this._deportesServices.getDeportesByDni(this.paciente.dni).subscribe({
            next: (actividades) => {

              for (let actividad of actividades) {
                this.contadorDeportes(actividad.tipo);
                if (this.deportes.indexOf(actividad.tipo) == -1) {
                  this.deportes.push(actividad.tipo);

                }
              }
              this.ordenarArray();

            },
            error: (err: HttpErrorResponse) => {

            },
            complete: () => {
              this.cargarGrafica();
            }

          });

  }
  public contadorDeportes(deporte: string) {
    if (deporte == "carrera") {
      this.contadorCarrera++;
    } else if (deporte == "ciclismo") {
      this.contadorCiclismo++;
    } else if (deporte == "fuerza") {
      this.contadorFuerza++;
    } else if (deporte == "caminata" || deporte == "senderismo") {
      this.contadorCaminata++;
    } else if (deporte == "natacion") {
      this.contadorNatacion++;
    }
    else {
      this.contadorOtro++;
    }
  }
  public ordenarArray() {
    this.deportes.sort();

  }
}
