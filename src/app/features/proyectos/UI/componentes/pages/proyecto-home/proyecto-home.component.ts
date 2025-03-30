import { GetClienteUseCase } from './../../../../../clientes/aplication/get-cliente.usecase';
import { Component, OnInit, signal, DestroyRef } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { DynamicDialogRef, DialogService } from "primeng/dynamicdialog";
import { CreateProyectoUseCase } from "../../../../aplication/create-proyecto.usecase";
import { DeleteProyectoUseCase } from "../../../../aplication/delete-proyecto.usecase";
import { GetAllProyectoUseCase } from "../../../../aplication/get-all-proyecto.usecase";
import { UpdateProyectoUseCase } from "../../../../aplication/update-proyecto.usecase";
import { ProyectoDto } from "../../../../domain/proyecto-dto";
import { ProyectoEntity } from "../../../../domain/proyecto-entity";
import { ProyectoUpdateFormComponent } from "../../proyecto-forms/proyecto-update-form/proyecto-update-form.component";
import { ProyectoCreateFormComponent } from "../../proyecto-forms/proyecto-create-form/proyecto-create-form.component";
import { GestionObjeto } from "../../../../../../core/utils/gestion-objeto";
import { ActivatedRoute } from "@angular/router";
import { ProyectoFilter } from "../../../../domain/proyecto-filter";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ClienteEntity } from "../../../../../clientes/domain/cliente-entity";

@Component({
  selector: 'app-proyecto-home',
  templateUrl: './proyecto-home.component.html',
  styleUrls: ['./proyecto-home.component.scss'],
  standalone:false,
})
export class ProyectoHomeComponent implements OnInit{
  proyectos = signal<ProyectoEntity[]>([]);
  refProyectoForm!: DynamicDialogRef | null;
  proyectoFilter!: ProyectoFilter;
  idCliente!:number | undefined;
  cliente = signal<ClienteEntity | undefined>(undefined);
  constructor(
    private getAllProyectoUseCase : GetAllProyectoUseCase,
    private deleteProyectoUseCase: DeleteProyectoUseCase,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private createProyectoUseCase: CreateProyectoUseCase,
    private updateProyectoUseCase: UpdateProyectoUseCase,
    private getClienteUseCase : GetClienteUseCase,
    private route: ActivatedRoute,
    private destroyRef : DestroyRef
  ) { }

  ngOnInit() {

    this.route.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.proyectos.set(data['proyectos'])
      }
    });
    const idCliente = this.route.snapshot.paramMap.get('idCliente')
    if (idCliente) {
      this.idCliente = +idCliente;
      this.proyectoFilter = {idCliente :this.idCliente};
      this.getCliente();
    }
  }


  public delete(proyecto : ProyectoEntity) {
    this.confirmationService.confirm({
        header: 'Borrar Proyecto',
        message: `El proyecto : ${proyecto.descripcion} va a ser eliminado, con todos sus proyectos ¿Estas seguro?`,
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
        accept: () => this.deleteProyecto(proyecto),
        reject: () => {},
    });
  }

  public manageActions($event : {action : 'update' | 'delete', proyecto : ProyectoEntity | undefined}){
    if ($event.proyecto?.id) {
      if ($event.action === 'delete') {
        this.delete($event.proyecto)
      }else{
        this.update($event.proyecto);
      }
    }
  }

  private getProyectos(){
    this.getAllProyectoUseCase.execute(this.proyectoFilter).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((proyectosEntity :ProyectoEntity[])=> {
      this.proyectos.set(GestionObjeto.deepCopy(proyectosEntity));
    })
  }

  private deleteProyecto(proyecto : ProyectoEntity){
    this.deleteProyectoUseCase.execute(proyecto.id)
    .pipe(
      takeUntilDestroyed(this.destroyRef))
    .subscribe(()=>{
      this.messageService.add({
              severity: 'success',
              summary: 'Borrado',
              detail: `Has eliminado al proyecto`,
              life: 3000,
      });
      this.getProyectos();
    }
    );
  }

  public create(){
    this.refProyectoForm = this.dialogService.open(ProyectoCreateFormComponent,
      {
        header: 'Crear Proyecto',
        width: '50vw',
        focusOnShow: false,
        styleClass: 'dialog-overlay-darker',
        data : {idCliente : this.idCliente}
      },
    )
    this.refProyectoForm?.onClose.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((proyecto : ProyectoEntity)=>{
      if (proyecto) {
        this.createProyectoUseCase.execute(proyecto)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe(()=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Creacion',
          detail: `Has creado al proyecto ${proyecto.nombre}`,
          life: 3000,
        });
        this.getProyectos();
        this.refProyectoForm  = null;
      });
      }
    })
  }

  public update(proyecto : ProyectoEntity){
    const proyectoUpdate : ProyectoEntity = GestionObjeto.deepCopy(proyecto);
    this.refProyectoForm = this.dialogService.open(ProyectoUpdateFormComponent,
      {
        header: 'Editar Proyecto',
        width: '50vw',
        focusOnShow: false,
        data : {proyecto : proyectoUpdate,idCliente : this.idCliente}
      }
    )
    this.refProyectoForm?.onClose.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((proyecto : ProyectoDto)=>{
      if (proyecto) {
        this.updateProyectoUseCase.execute(proyectoUpdate.id , proyecto)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
        ).subscribe(()=>{
          this.messageService.add({
            severity: 'success',
            summary: 'Edicion',
            detail: `Has editado al proyecto ${proyecto.nombre}`,
            life: 3000,
          });
          this.getProyectos();
          this.refProyectoForm  = null;
        });
      }
    })
  }

  private getCliente(){
    if (this.idCliente) {
      this.getClienteUseCase.execute(this.idCliente).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(cliente => {
        this.cliente.set(cliente);
      })
    }
  }


}
