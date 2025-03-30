import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CLIENTE_REPOSITORY } from './domain/cliente-repository';
import { ClienteRepositoryLocal } from './infraestruture/cliente-repository-local';
import { UpdateClienteUseCase } from './aplication/update-cliente.usecase';
import { CreateClienteUseCase } from './aplication/create-cliente.usecase';
import { DeleteClienteUseCase } from './aplication/delete-cliente.usecase';
import { GetAllClienteUseCase } from './aplication/get-all-cliente.usecase';
import { GetClienteUseCase } from './aplication/get-cliente.usecase';
import { ClienteHomeComponent } from './UI/componentes/pages/cliente-home/cliente-home.component';
import { ClientesRoutingModule } from './cliente.routing';
import { DataViewModule } from 'primeng/dataview';
import { ClienteDetailComponent } from './UI/componentes/cliente-detail/cliente-detail.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ClienteCreateFormComponent } from './UI/componentes/cliente-forms/cliente-create-form/cliente-create-form.component';
import { ClienteUpdateFormComponent } from './UI/componentes/cliente-forms/cliente-update-form/cliente-update-form.component';
import { FloatLabelModule } from 'primeng/floatlabel';
@NgModule({
  imports: [
    CommonModule,
    ClientesRoutingModule,
    DataViewModule,
    ButtonModule,
    SpeedDialModule,
    ConfirmDialogModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
  ],
  declarations: [ClienteDetailComponent, ClienteHomeComponent,ClienteCreateFormComponent, ClienteUpdateFormComponent],
  providers: [
    {provide : CLIENTE_REPOSITORY , useClass : ClienteRepositoryLocal},
    UpdateClienteUseCase,
    CreateClienteUseCase,
    DeleteClienteUseCase,
    GetAllClienteUseCase,
    GetClienteUseCase,
    ConfirmationService,
    MessageService,
    DialogService,
  ]
})
export class ClienteModule { }
