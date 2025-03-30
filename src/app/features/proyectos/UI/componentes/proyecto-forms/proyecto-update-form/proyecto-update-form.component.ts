import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  signal,
  computed,
  DestroyRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

import { ProyectoEntity } from '../../../../domain/proyecto-entity';
import { ModuloEntity } from '../../../../../modulos/domain/modulo-entity';
import { Modulo } from '../../../../../modulos/domain/modulo';
import { TipoModulo } from '../../../../../modulos/domain/tipo-modulo';
import { ModuleTypeForm } from '../proyecto-create-form/proyecto-create-form.component';
import { GetAllTipoModuloUseCase } from '../../../../../modulos/aplication/get-all-tipo-modulo.usecase';
import { ProyectoFormConfig } from '../proyecto-create-form/proyecto-form.config';
import { ModuleFactoryUseCase } from '../../../../../modulos/aplication/map-creation-modules.usecase';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-proyecto-update-form',
  templateUrl: './proyecto-update-form.component.html',
  styleUrls: ['./proyecto-update-form.component.scss'],
  standalone: false,
})
export class ProyectoUpdateFormComponent implements OnInit, OnDestroy {
  proyectoForm!: FormGroup;
  destroy = new Subject<void>();
  statusForm = signal(true);
  disabledForm = computed(() => this.statusForm());
  tipos$!: Observable<TipoModulo[]>;
  proyecto = signal<ProyectoEntity>({} as ProyectoEntity);

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private moduleFactoryUseCase: ModuleFactoryUseCase,
    private getAllTipoModuloUseCase: GetAllTipoModuloUseCase,
    private destroyRef : DestroyRef
  ) {
    this.proyecto.set(this.config.data?.proyecto);
  }

  ngOnInit() {
    this.tipos$ = this.getAllTipoModuloUseCase.execute().pipe(takeUntilDestroyed(this.destroyRef));
    this.initFormulario();
   
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private initFormulario() {
    this.proyectoForm = this.fb.group({
      nombre: [this.proyecto().nombre, Validators.required],
      description: [this.proyecto().descripcion, Validators.required],
      modulos: this.fb.array([]),
    });

    this.proyecto().modulos.forEach((modulo) => {
      this.modulos.push(this.createModuleForm(modulo as ModuloEntity));
    });

    this.proyectoForm.statusChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.statusForm.set(this.formularioInvalido());
    });
  }

  public submit() {
    const proyecto: ProyectoEntity = {
      nombre: this.proyectoForm.value['nombre'],
      descripcion: this.proyectoForm.value['description'],
      id: this.proyecto().id,
      idCliente: this.proyecto().idCliente,
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
  
    
    private createModuleForm(modulo?: ModuloEntity): FormGroup {
      // Form principal del módulo
      const moduleForm = this.fb.group({
        tipo: [modulo ? modulo.tipo : null, Validators.required],
        datos: modulo ? ProyectoFormConfig.getConfigFormByModule(modulo.tipo.tipo, this.fb , modulo): this.fb.group({}) // vacío al inicio
      });
            // Suscribirse a los cambios de "tipo" para reemplazar el subform
      moduleForm.get('tipo')?.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((tipoSeleccionado : TipoModulo | null) => {
          // Creamos un subform según el tipo
            if (tipoSeleccionado) {
              const subForm = ProyectoFormConfig.getConfigFormByModule(tipoSeleccionado.tipo, this.fb , modulo)
              moduleForm.setControl('datos', subForm);
              moduleForm.updateValueAndValidity({ emitEvent: false });
            }
        });
    
      // Esto, si quieres, suscribe a statusChanges para tu “statusForm”
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
    return this.proyectoForm.invalid || this.modulos?.invalid || this.modulos?.length === 0
  }
}
