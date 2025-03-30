import { Component, OnInit, input, output, signal, DestroyRef } from '@angular/core';
import { ProyectoEntity } from '../../../domain/proyecto-entity';
import { ClienteEntity } from '../../../../clientes/domain/cliente-entity';
import { ModuloEntity } from '../../../../modulos/domain/modulo-entity';
import { MenuItem } from 'primeng/api';

import { GetClienteUseCase } from './../../../../clientes/aplication/get-cliente.usecase';
import { DespiezeModulosUseCase } from './../../../../modulos/aplication/despiece-modulo.usecase';
import { DespiezeProyectoUseCase } from '../../../aplication/despiece-proyecto.usecase';

import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { DespieceModulo } from '../../../../modulos/domain/despiece-modulo';

@Component({
  selector: 'app-proyecto-detail',
  templateUrl: './proyecto-detail.component.html',
  styleUrls: ['./proyecto-detail.component.scss'],
  standalone: false,
})
export class ProyectoDetailComponent implements OnInit {

  proyecto = input<ProyectoEntity>();
  idCliente = input<number>();
  action = output<{ action: 'update' | 'delete'; proyecto: ProyectoEntity | undefined }>();

  cliente = signal<ClienteEntity | undefined>(undefined);
  despieceProyecto = signal<[string, number][]>([]);
  despieceModulo= signal<DespieceModulo[]>([]);

  botones: MenuItem[] = [];

  constructor(
    private getClienteUseCase: GetClienteUseCase,
    private despiezeModuloUseCase: DespiezeModulosUseCase,
    private despiezeProyectoUseCase: DespiezeProyectoUseCase,
    private destroyRef : DestroyRef
  ) {

    toObservable(this.proyecto).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((proyecto) => {
      if (proyecto) {
        this.loadCliente();
        this.loadDespieceModulos();
        this.loadDespieceProyecto();
      }
    });
  }

  ngOnInit() {
    this.setBotones();
  }

  private setBotones() {
    this.botones = [
      {
        icon: 'pi pi-pencil',
        command: () => this.editarProyecto(),
      },
      {
        icon: 'pi pi-trash',
        command: () => this.eliminarProyecto(),
      },
    ];
  }

  private editarProyecto() {
    this.action.emit({ action: 'update', proyecto: this.proyecto() });
  }

  private eliminarProyecto() {
    this.action.emit({ action: 'delete', proyecto: this.proyecto() });
  }

  private loadCliente() {
    const id = this.proyecto()?.idCliente;
    if (id) {
      this.getClienteUseCase.execute(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((cliente) => this.cliente.set(cliente));
    }
  }

  private loadDespieceModulos() {
    const proyecto = this.proyecto();
    if (proyecto?.modulos?.length) {
      this.despieceModulo.set(this.despiezeModuloUseCase.execute(proyecto?.modulos as ModuloEntity[]));
    }
  }

  private loadDespieceProyecto() {
    const proyecto = this.proyecto();
    if (proyecto) {
      this.despieceProyecto.set(this.despiezeProyectoUseCase.execute(proyecto));
    }
  }

}
