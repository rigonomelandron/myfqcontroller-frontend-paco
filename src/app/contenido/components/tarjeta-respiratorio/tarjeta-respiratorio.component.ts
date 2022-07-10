import { Component, OnInit } from '@angular/core';
import { DatosRespiratorios } from 'src/app/shared/interfaces/datosrespiratorios.interface';
import { DatosrespiratoriosService } from 'src/app/shared/services/datosrespiratorios.service';


@Component({
  selector: 'app-tarjeta-respiratorio',
  templateUrl: './tarjeta-respiratorio.component.html',
  styleUrls: ['./tarjeta-respiratorio.component.css']
})
export class TarjetaRespiratorioComponent implements OnInit {

  public datos: string[];
  public datoRespiratorio!: DatosRespiratorios;

  constructor(private _datosRespiratoriosService : DatosrespiratoriosService) {
    this.datos = [


    ]
   }

  ngOnInit(): void {
    this.obtenerDatosRespiratorios();
  }
public obtenerDatosRespiratorios(){
  this._datosRespiratoriosService.getDatosRespiratorios().subscribe({

    next: (datos: DatosRespiratorios[]) => {
      this.datoRespiratorio = datos[datos.length - 1];
      this.datos=[

        'FVC: ' + this.datoRespiratorio.fvc +'L',
        'FEV1: ' + this.datoRespiratorio.fev1 + 'L',
        'Saturación: ' + this.datoRespiratorio.saturacionBasal +'%',
        'Antibiótico: 22-04-21 (Septrim)'

      ]
    },
    error: (err) => {
      console.log(err);
    }
  }

  )
}

}
