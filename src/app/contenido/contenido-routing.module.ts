import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadComponent } from './components/actividad/actividad.component';
import { AjustesMedicoComponent } from './components/ajustes-medico/ajustes-medico.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { CalendarioMedicoComponent } from './components/calendario-medico/calendario-medico.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { DatosRespiratoriosComponent } from './components/datos-respiratorios/datos-respiratorios.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import { HomeMedicoComponent } from './components/home-medico/home-medico.component';
import { HomeComponent } from './components/home/home.component';
import { ResumenComponent } from './components/resumen/resumen.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path:'home',component: HomeComponent},
      { path:'home-medico',component: HomeMedicoComponent},
      { path: 'calendario', component: CalendarioComponent },
      { path: 'calendario-medico', component: CalendarioMedicoComponent },
      { path: 'grafico', component: GraficoComponent },
      { path:'datos-respiratorios',component: DatosRespiratoriosComponent},
      { path:'actividad',component: ActividadComponent},
      { path:'resumen',component: ResumenComponent},
      { path:'ajustes',component: AjustesComponent},
      { path:'ajustes-medico',component: AjustesMedicoComponent}
    ]

  }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContenidoRoutingModule { }
