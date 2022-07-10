import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta-resumen',
  templateUrl: './tarjeta-resumen.component.html',
  styleUrls: ['./tarjeta-resumen.component.css']
})
export class TarjetaResumenComponent implements OnInit {
  
  public datos: string[];

  constructor() {
    this.datos = [
      'GPT: 32 U/I | GOT: 28 U/I',
      'Hemoglobina: 11.4 g/dl',
      'Proteínas Totales: 7.7 g/dl',
      'Hb Glicada: 6.4 g/dl',
      ''
    ]
   }
  ngOnInit(): void {
  }

}
