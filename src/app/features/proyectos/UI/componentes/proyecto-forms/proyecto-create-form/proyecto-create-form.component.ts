import { ChangeDetectorRef, Component, DestroyRef, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';

import { ProyectoEntity } from '../../../../domain/proyecto-entity';
import { Modulo } from '../../../../../modulos/domain/modulo';
import { ClienteEntity } from '../../../../../clientes/domain/cliente-entity';
import { TipoModulo } from '../../../../../modulos/domain/tipo-modulo';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetAllClienteUseCase } from '../../../../../clientes/aplication/get-all-cliente.usecase';
import { GetAllTipoModuloUseCase } from '../../../../../modulos/aplication/get-all-tipo-modulo.usecase';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModuleTypeForm } from '../../../../../modulos/domain/modulo-type-form';
import { ProyectoFormConfig } from '../proyecto-form.config';
import { ModuleFactoryUseCase } from '../../../../../modulos/aplication/module-factory.usecase';


@Component({
  selector: 'app-proyecto-create-form',
  templateUrl: './proyecto-create-form.component.html',
  styleUrls: ['./proyecto-create-form.component.scss'],
  standalone: false,
})
export class ProyectoCreateFormComponent implements OnInit, OnDestroy {
  proyectoForm!: FormGroup;
  destroy: Subject<void> = new Subject();
  statusForm = signal(true);
  disabledForm = computed(() => this.statusForm());

  clientes$!: Observable<ClienteEntity[]>;
  tipos$!: Observable<TipoModulo[]>;
  idCliente! :number;
 
  

  constructor(
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private getAllClienteUseCase: GetAllClienteUseCase,
    private getAllTipoModuloUseCase: GetAllTipoModuloUseCase,
    private moduleFactoryUseCase: ModuleFactoryUseCase,
    private destroyRef : DestroyRef
  ) {
    this.idCliente = this.config.data?.idCliente;
  }

  ngOnInit() {
    this.initFormulario();
    this.clientes$ = this.getAllClienteUseCase.execute().pipe(takeUntilDestroyed(this.destroyRef));
    this.tipos$ = this.getAllTipoModuloUseCase.execute().pipe(takeUntilDestroyed(this.destroyRef));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private initFormulario() {
    this.proyectoForm = this.fb.group({
      nombre: ['', Validators.required],
      description: ['', Validators.required],
      modulos: this.fb.array([]),
    });
    if (!this.idCliente) {
      this.proyectoForm.addControl('cliente' ,this.fb.control(null, Validators.required))
    }

    this.proyectoForm.statusChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.statusForm.set(this.formularioInvalido());
    });

    this.changeDetector.detectChanges();
  }

  public submit() {
    const proyecto: ProyectoEntity = {
      nombre: this.proyectoForm.value['nombre'],
      descripcion: this.proyectoForm.value['description'],
      id: 1,
      idCliente: this.idCliente ?? this.proyectoForm.value['cliente'].id,
      modulos: this.buildModules(),
    };
    this.ref?.close(proyecto);
  }

  public close() {
    this.ref.close();
  }

  private buildModules(): Modulo[]  {
    const modulos = this.proyectoForm.value['modulos'] as ModuleTypeForm[];
    return modulos.map((modulo) => this.moduleFactoryUseCase.execute().get(modulo.tipo.tipo)?.(modulo)) as Modulo[];
  }

  
  private createModuleForm(): FormGroup {

    const moduleForm = this.fb.group({
      tipo: [null, Validators.required],
      datos: this.fb.group({})
    });
    moduleForm.get('tipo')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tipoSeleccionado : TipoModulo | null) => {

          if (tipoSeleccionado) {
            const subForm = ProyectoFormConfig.getConfigFormByModule(tipoSeleccionado.tipo, this.fb)
            moduleForm.setControl('datos', subForm);
            moduleForm.updateValueAndValidity({ emitEvent: false });
          }

      });
  
    moduleForm.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.statusForm.set(this.formularioInvalido());
      });
  
    return moduleForm;
  }


  get modulos(): FormArray {
    return this.proyectoForm.get('modulos') as FormArray;
  }

  public addModulo() {
    this.modulos.push(this.createModuleForm());
  }

  public deleteModulo(index: number) {
    this.modulos.removeAt(index);
  }

  private formularioInvalido(){
    return this.proyectoForm.invalid || this.modulos.invalid || this.modulos.length === 0
  }
}