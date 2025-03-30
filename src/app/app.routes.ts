import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProyectosResolver } from './features/proyectos/resolvers/proyecto.resolver';

export const routes: Routes = [
    {
        path: 'clientes',
        loadChildren: () => import('./features/clientes/cliente.module').then(m => m.ClienteModule)
    },
    
    {
        path: 'proyectos',
        loadChildren: () => import('./features/proyectos/proyecto.module').then(m => m.ProyectoModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers : [ProyectosResolver]
  })
  export class AppRoutingModule {}