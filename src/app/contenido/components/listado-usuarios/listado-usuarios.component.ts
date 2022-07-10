import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/shared/interfaces/paciente.interface';
import { PacientesService } from 'src/app/shared/services/pacientes.service';
import {EquiposService } from 'src/app/shared/services/equipos.service';
import { DoctoresService } from 'src/app/shared/services/doctores.service';
import { Doctor } from 'src/app/shared/interfaces/doctor.interface';
@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {
  public pacientes? : Paciente[];
  public doctor?: Doctor;
  constructor(private _pacientesServices: PacientesService, private _equiposService : EquiposService, private _doctoresService : DoctoresService ) { }

  ngOnInit(): void {

   

  }
  public mostrarDialogo(){

  }
  public cerrarDialogo(){}

}
