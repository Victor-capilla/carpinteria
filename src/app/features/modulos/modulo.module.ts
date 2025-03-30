import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { SpeedDialModule } from 'primeng/speeddial';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ModuloRoutingModule } from './modulo.routing';
import { CreateModuloUseCase } from './aplication/create-modulo.usecase';
import { DeleteModuloUseCase } from './aplication/delete-modulo.usecase';
import { GetAllModuloUseCase } from './aplication/get-all-modulo.usecase';
import { GetModuloUseCase } from './aplication/get-modulo.usecase';
import { UpdateModuloUseCase } from './aplication/update-modulo.usecase';
import { ModuloRepositoryLocal } from './infraestruture/modulo-repository-local';
import { MODULO_REPOSITORY } from './domain/modulo-repository';
import { TIPO_MODULO_REPOSITORY } from './domain/tipo-modulo-repository';
import { TipoModuloRepositoryLocal } from './infraestruture/tipo-modulo-repository-local';
import { GetAllTipoModuloUseCase } from './aplication/get-all-tipo-modulo.usecase';
import { EncimeraMapper } from './encimera/aplication/mappers/encimera-mapper';
import { EstanteriaMapper } from './estanteria/aplication/mappers/estanteria-mapper';
import { ModuloDescripcionPipe } from './UI/pipes/modulo-descripcion.pipe';
import { ModuleFactoryUseCase } from './aplication/map-creation-modules.usecase';
import { DespiezeModulosUseCase } from './aplication/despiece-modulo.usecase';

@NgModule({
  imports: [
    CommonModule,
    ModuloRoutingModule,
    DataViewModule,
    ButtonModule,
    SpeedDialModule,
    ConfirmDialogModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    ModuloDescripcionPipe
  ],
  declarations: [],
  providers: [
    {provide : MODULO_REPOSITORY , useClass : ModuloRepositoryLocal},
    {provide : TIPO_MODULO_REPOSITORY , useClass : TipoModuloRepositoryLocal},
    UpdateModuloUseCase,
    CreateModuloUseCase,
    DeleteModuloUseCase,
    GetAllModuloUseCase,
    GetModuloUseCase,
    GetAllTipoModuloUseCase,
    DespiezeModulosUseCase,
    ConfirmationService,
    ModuleFactoryUseCase,
    EncimeraMapper,
    EstanteriaMapper,
    MessageService,
    DialogService,
  ]
})
export class ClienteModule { }
