import { UpdateClienteUseCase } from './../../../../aplication/update-cliente.usecase';
import { DeleteClienteUseCase } from './../../../../aplication/delete-cliente.usecase';
import { GetAllClienteUseCase } from '../../../../aplication/get-all-cliente.usecase';
import { ClienteEntity } from '../../../../domain/cliente-entity';
import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ClienteDto } from '../../../../domain/cliente-dto';
import { CreateClienteUseCase } from '../../../../aplication/create-cliente.usecase';
import { ClienteCreateFormComponent } from '../../cliente-forms/cliente-create-form/cliente-create-form.component';
import { ClienteUpdateFormComponent } from '../../cliente-forms/cliente-update-form/cliente-update-form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.scss'],
  standalone:false,
})
export class ClienteHomeComponent implements OnInit{
  clientes = signal<ClienteEntity[]>([]);
  refClienteForm!: DynamicDialogRef | null;
  // formUpdate : Formgrou
  constructor(
    private getAllClienteUseCase : GetAllClienteUseCase,
    private deleteClienteUseCase: DeleteClienteUseCase,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private createClienteUseCase: CreateClienteUseCase,
    private updateClienteUseCase: UpdateClienteUseCase,
    private destroyRef : DestroyRef
  ) { }

  ngOnInit() {
    this.getClientes();
  }

  public delete(cliente : ClienteEntity) {
    this.confirmationService.confirm({
        header: 'Borrar Cliente',
        message: `El cliente : ${cliente.description} va a ser eliminado, con todos sus proyectos ¿Estas seguro?`,
        icon: 'pi pi-exclamation-circle',
        rejectButtonProps: {
            icon: 'pi pi-times',
            label: 'Cancelar',
            outlined: true,

        },
        acceptButtonProps: {
            icon: 'pi pi-check',
            label: 'Eliminar',
        },
        accept: () => this.deleteCliente(cliente),
        reject: () => {},
    });
  }

  public manageActions($event : {action : 'update' | 'delete', cliente : ClienteEntity | undefined}){
    if ($event.cliente?.id) {
      if ($event.action === 'delete') {
        this.delete($event.cliente)
      }else{
        this.update($event.cliente);
      }
    }
  }

  private getClientes(){
    this.getAllClienteUseCase.execute().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((clientesEntity :ClienteEntity[])=> {
      this.clientes.set(clientesEntity);
    })
  }

  private deleteCliente(cliente : ClienteEntity){
    this.deleteClienteUseCase.execute(cliente.id)
    .pipe(
      takeUntilDestroyed(this.destroyRef))
    .subscribe(()=>{
      this.messageService.add({
              severity: 'success',
              summary: 'Borrado',
              detail: `Has eliminado al cliente`,
              life: 3000,
      });
      this.getClientes();
    });
  }

  public create(){
    this.refClienteForm = this.dialogService.open(ClienteCreateFormComponent,
      {
        header: 'Crear Cliente',
        width: '50vw',
        focusOnShow: false
      }
    )
    this.refClienteForm?.onClose.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((cliente : ClienteDto)=>{
      if (cliente) {
        this.createClienteUseCase.execute(cliente)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe(()=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Creacion',
          detail: `Has creado al cliente ${cliente.nombre}`,
          life: 3000,
        });
        this.getClientes();
        this.refClienteForm  = null;
      });
      }
    })
  }

  public update(cliente : ClienteEntity){
    const clienteUpdate : ClienteEntity = structuredClone(cliente);
    this.refClienteForm = this.dialogService.open(ClienteUpdateFormComponent,
      {
        header: 'Editar Cliente',
        width: '50vw',
        focusOnShow: false,
        data : {cliente : clienteUpdate}
      }
    )
    this.refClienteForm?.onClose.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((cliente : ClienteDto)=>{
      if (cliente) {
        this.updateClienteUseCase.execute(clienteUpdate.id , cliente)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
        ).subscribe(()=>{
          this.messageService.add({
            severity: 'success',
            summary: 'Edicion',
            detail: `Has editado al cliente ${cliente.nombre}`,
            life: 3000,
          });
          this.getClientes();
          this.refClienteForm  = null;
        },
      );
      }
    })
  }




}
