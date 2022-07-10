import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaRespiratorioComponent } from './components/tarjeta-respiratorio/tarjeta-respiratorio.component';
import { TarjetaActividadComponent } from './components/tarjeta-actividad/tarjeta-actividad.component';
import { TarjetaResumenComponent } from './components/tarjeta-resumen/tarjeta-resumen.component';
//import { CardModule } from 'primeng/card';
//import { ListboxModule } from 'primeng/listbox';
import { DatosRespiratoriosComponent } from './components/datos-respiratorios/datos-respiratorios.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { ResumenComponent } from './components/resumen/resumen.component';
//import { ButtonModule } from 'primeng/button';
//import { RippleModule } from 'primeng/ripple';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ContenidoRoutingModule } from './contenido-routing.module';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { DonutComponent } from './components/donut/donut.component';
import { GraficoBarrasComponent } from './components/grafico-barras/grafico-barras.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { MenuMedicoComponent } from './components/menu-medico/menu-medico.component';
import { HomeMedicoComponent } from './components/home-medico/home-medico.component';
import { CalendarioMedicoComponent } from './components/calendario-medico/calendario-medico.component';
import { AjustesMedicoComponent } from './components/ajustes-medico/ajustes-medico.component';
import {ToastrModule} from "ngx-toastr";






@NgModule({
  declarations: [
    TarjetaRespiratorioComponent,
    TarjetaActividadComponent,
    TarjetaResumenComponent,
    DatosRespiratoriosComponent,
    ActividadComponent,
    ResumenComponent,
    HomeComponent,
    PacientesComponent,
    
    CalendarioComponent,
    GraficoComponent,
    ListadoUsuariosComponent,
    HomeComponent,
    DonutComponent,
    GraficoBarrasComponent,
    AjustesComponent,
    MenuMedicoComponent,
    HomeMedicoComponent,
    CalendarioMedicoComponent,
   
    AjustesMedicoComponent,



  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()

    // CardModule,
    //ListboxModule,
    //ButtonModule,
    //RippleModule
  ],
  exports: [
    TarjetaRespiratorioComponent,
    TarjetaActividadComponent,
    TarjetaResumenComponent,
    DatosRespiratoriosComponent,
    ActividadComponent,
    ResumenComponent,
    HomeComponent,
    FormsModule,
    ContenidoRoutingModule,
    CalendarioComponent,
    GraficoComponent,
    ListadoUsuariosComponent,
    DonutComponent,
    AjustesComponent,
    MenuMedicoComponent,
    HomeMedicoComponent,
   
  ],
})
export class ContenidoModule { }
