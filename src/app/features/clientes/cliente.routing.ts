import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { ClienteHomeComponent } from './UI/componentes/pages/cliente-home/cliente-home.component';
import { ClienteDetailComponent } from './UI/componentes/cliente-detail/cliente-detail.component';

const routes: Routes = [
  // { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  // { path: '**', redirectTo: 'clientes' },
  { path: 'cliente-detail', component: ClienteDetailComponent },
  { path: '', component: ClienteHomeComponent }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
