import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { ClienteHomeComponent } from './UI/componentes/pages/cliente-home/cliente-home.component';

const routes: Routes = [
  { path: '', component: ClienteHomeComponent }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
