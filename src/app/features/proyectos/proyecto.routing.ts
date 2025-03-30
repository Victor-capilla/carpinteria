import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { ProyectoHomeComponent } from './UI/componentes/pages/proyecto-home/proyecto-home.component';
import { ProyectosResolver } from './resolvers/proyecto.resolver';
const routes: Routes = [
  {
    path: 'clientes/:idCliente',
    component: ProyectoHomeComponent,
    resolve: {
        proyectos: ProyectosResolver
    }
  },
  { path: '',
    component: ProyectoHomeComponent ,
    resolve: {
      proyectos: ProyectosResolver
    }
  }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectoRoutingModule {}
