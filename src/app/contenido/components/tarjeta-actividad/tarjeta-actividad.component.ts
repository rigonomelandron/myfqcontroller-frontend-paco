import { Component, OnInit } from '@angular/core';
import { Deporte } from 'src/app/shared/interfaces/deporte.interface';
import { DeportesService } from 'src/app/shared/services/deportes.service';

@Component({
  selector: 'app-tarjeta-actividad',
  templateUrl: './tarjeta-actividad.component.html',
  styleUrls: ['./tarjeta-actividad.component.css']
})
export class TarjetaActividadComponent implements OnInit {

  public datos: string[];
  public datoDeporte!: Deporte;

  constructor(private _datosDeportesService : DeportesService) {
    this.datos = [

    ]
   }

   ngOnInit(): void {
    this.obtenerDeporte();
  }
public obtenerDeporte(){
  this._datosDeportesService.getDeportes().subscribe({

    next: (datos: Deporte[]) => {
      this.datoDeporte = datos[datos.length - 1];
      this.datos=[

        'Calorías: ' + this.datoDeporte.calorias +'cal',
        'Máxima: ' + this.datoDeporte.ppmMaxima + 'ppm Max',
        'Media: ' + this.datoDeporte.ppmMedia +'ppm Med',
        'Tiempo: ' + this.datoDeporte.tiempo + 'min',
        ' '

      ]
      
    },
    error: (err) => {
      console.log(err);
    }
  }

  )
}

}
