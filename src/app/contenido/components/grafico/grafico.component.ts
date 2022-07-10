import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';
import { DatosrespiratoriosService } from 'src/app/shared/services/datosrespiratorios.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css'],
})
export class GraficoComponent implements OnInit {
  multiAxisData: any;
  basicOptions: any;

  public fvc: number[];
  public fev1: number[];
  public mes: string;
  public dia: number[];
  public rangeDates!: Date[];
  public meses?: Date[];
  public dates: string[];
  public usuario! : Usuario;

  constructor(

    private _datosRespiratoriosServices: DatosrespiratoriosService,
    private _tokenService: TokenService,
    private _usuarioService: UsuariosService
  ) {

    this.fvc = [];
    this.fev1 = [];
    this.dates = [];
    this.mes = '';
    this.dia = [];
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.obtenerGrafica();

  }

  public obtenerGrafica() {

    this.multiAxisData = {
      labels: this.dates,
      datasets: [
        {
          label: 'Fvc',
          fill: false,
          borderColor: '#42A5F5',

          tension: 0.4,
          data: this.fvc,

        },
        {
          label: 'Fev1',
          fill: false,
          borderColor: '#00bb7e',

          tension: 0.4,
          data: this.fev1,
        },

      ],

    };
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: ' #1d736a',
            font: {
              size: 20,
              weight: 'bold',
            }

          },
        },
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
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: ' #1d736a',
            font: {
              size: 15,
              weight: 'bold',
            }
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
  }
  public obtenerFechas() {
    this.fvc = [];
    this.fev1 = [];
    this.dates = [];
    this.mes = '';
    this.dia = [];

    let usuario = this._tokenService.getUserName();
    if (this.rangeDates && this.rangeDates[1] != null && usuario) {

      this._datosRespiratoriosServices
        .getDatosRespiratoriosByFecha(
          this.usuario.id!,
          this.rangeDates[0],
          this.rangeDates[1]
        )
        .subscribe({
          next: (data) => {

            data.sort((d1, d2) => new Date(d1.fecha).getTime() - new Date(d2.fecha).getTime());
            this.meses = data.map((data: { fecha: Date; }) => data.fecha);
            this.fvc = data.map((data: { fvc: number; }) => data.fvc);
            this.fev1 = data.map((data: { fev1: number; }) => data.fev1);
            this.meses.forEach((res) => {
              let jsdate = new Date(res);
              this.dates.push(jsdate.toLocaleTimeString('es', { year: 'numeric', month: 'short', day: 'numeric' }).substring(0, 11));

            })
          },

          error: (err: HttpErrorResponse) => {
            console.log(err.message);
          },
          complete: () => {

            this.obtenerGrafica();
          },
        });

    }
  }
  public obtenerHistorico(){
    this.fvc = [];
    this.fev1 = [];
    this.dates = [];
    this.mes = '';
    this.dia = [];


    if (this.usuario.id) {

      this._datosRespiratoriosServices
        .getDatosRespiratoriosIdUsuario(this.usuario.id)
        .subscribe({
          next: (data) => {

            data.sort((d1, d2) => new Date(d1.fecha).getTime() - new Date(d2.fecha).getTime());
            this.meses = data.map((data: { fecha: Date; }) => data.fecha);
            this.fvc = data.map((data: { fvc: number; }) => data.fvc);
            this.fev1 = data.map((data: { fev1: number; }) => data.fev1);
            this.meses.forEach((res) => {
              let jsdate = new Date(res);
              this.dates.push(jsdate.toLocaleTimeString('es', { year: 'numeric', month: 'short', day: 'numeric' }).substring(0, 11));

            })
          },

          error: (err: HttpErrorResponse) => {
            console.log(err.message);
          },
          complete: () => {

            this.obtenerGrafica();
          }
        });

    }
  }
  public obtenerUsuario(){
    let usuario = this._tokenService.getUserName();
    this._usuarioService.getUsuarioById(usuario).subscribe({
      next: (data: any) => {
        this.usuario = data;

      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => {
        this.obtenerHistorico();
      }


    });
  }


}
