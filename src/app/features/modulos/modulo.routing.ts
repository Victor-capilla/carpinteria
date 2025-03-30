import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
const routes: Routes = [
  // { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  // { path: '**', redirectTo: 'clientes' },
  // { path: 'cliente-detail', component: ClienteDetailComponent },
  // { path: '', component: ClienteHomeComponent }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuloRoutingModule {}
