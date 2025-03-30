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
import { PROYECTO_REPOSITORY } from './domain/proyecto-repository';
import { ProyectoRepositoryLocal } from './infraestruture/proyecto-repository-local';
import { DeleteProyectoUseCase } from './aplication/delete-proyecto.usecase';
import { GetAllProyectoUseCase } from './aplication/get-all-proyecto.usecase';
import { GetProyectoUseCase } from './aplication/get-proyecto.usecase';
import { CreateProyectoUseCase } from './aplication/create-proyecto.usecase';
import { UpdateProyectoUseCase } from './aplication/update-proyecto.usecase';
import { ProyectoRoutingModule } from './proyecto.routing';
import { ProyectoHomeComponent } from './UI/componentes/pages/proyecto-home/proyecto-home.component';
import { ProyectoCreateFormComponent } from './UI/componentes/proyecto-forms/proyecto-create-form/proyecto-create-form.component';
import { ProyectoUpdateFormComponent } from './UI/componentes/proyecto-forms/proyecto-update-form/proyecto-update-form.component';
import { ProyectoDetailComponent } from './UI/componentes/proyecto-detail/proyecto-detail.component';
import { GetAllTipoModuloUseCase } from '../modulos/aplication/get-all-tipo-modulo.usecase';
import { TIPO_MODULO_REPOSITORY } from '../modulos/domain/tipo-modulo-repository';
import { TipoModuloRepositoryLocal } from '../modulos/infraestruture/tipo-modulo-repository-local';
import { AddPiezasEncimeraUseCase } from '../modulos/encimera/aplication/add-piezas-encimera.usecase';
import { AddPiezasEstanteriaUseCase } from '../modulos/estanteria/aplication/add-piezas-estanteria.usecase';
import { EncimeraMapper } from '../modulos/encimera/aplication/mappers/encimera-mapper';
import { EstanteriaMapper } from '../modulos/estanteria/aplication/mappers/estanteria-mapper';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { GetAllClienteUseCase } from '../clientes/aplication/get-all-cliente.usecase';
import { CLIENTE_REPOSITORY } from '../clientes/domain/cliente-repository';
import { ClienteRepositoryLocal } from '../clientes/infraestruture/cliente-repository-local';
import { DespiezeProyectoUseCase } from './aplication/despiece-proyecto.usecase';
import { DespiezeModulosUseCase } from '../modulos/aplication/despiece-modulo.usecase';
import { GetClienteUseCase } from '../clientes/aplication/get-cliente.usecase';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { ProyectosResolver } from './resolvers/proyecto.resolver';
import { ModuloDescripcionPipe } from '../modulos/UI/pipes/modulo-descripcion.pipe';
import { ModuleFactoryUseCase } from '../modulos/aplication/module-factory.usecase';
;
@NgModule({
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    DataViewModule,
    ButtonModule,
    SpeedDialModule,
    ConfirmDialogModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    SelectModule,
    InputNumberModule,
    AccordionModule,
    CardModule,
    ModuloDescripcionPipe
  ],
  declarations: [ProyectoHomeComponent,ProyectoDetailComponent,ProyectoCreateFormComponent,ProyectoUpdateFormComponent],
  providers: [
    {provide : PROYECTO_REPOSITORY , useClass : ProyectoRepositoryLocal},
    {provide : TIPO_MODULO_REPOSITORY , useClass : TipoModuloRepositoryLocal},
    {provide : CLIENTE_REPOSITORY , useClass : ClienteRepositoryLocal},
    UpdateProyectoUseCase,
    CreateProyectoUseCase,
    DeleteProyectoUseCase,
    GetAllProyectoUseCase,
    GetProyectoUseCase,
    GetAllTipoModuloUseCase,
    AddPiezasEncimeraUseCase,
    AddPiezasEstanteriaUseCase,
    GetAllClienteUseCase,
    DespiezeProyectoUseCase,
    DespiezeModulosUseCase,
    GetClienteUseCase,
    EncimeraMapper,
    EstanteriaMapper,
    ConfirmationService,
    MessageService,
    DialogService,
    ProyectosResolver,
    ModuleFactoryUseCase
  ]
})
export class ProyectoModule { }
