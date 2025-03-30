import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, DestroyRef, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteDto } from '../../../../domain/cliente-dto';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { ClienteEntity } from '../../../../domain/cliente-entity';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cliente-update-form',
  templateUrl: './cliente-update-form.component.html',
  styleUrls: ['./cliente-update-form.component.scss'],
  standalone: false,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ClienteUpdateFormComponent implements OnInit , OnDestroy {
  clienteForm!: FormGroup;
  closeFormStatus : Subject<void> = new Subject()
  statusForm =  signal(true);
  disabledForm = computed(() => this.statusForm())
  cliente = signal<ClienteEntity>({} as ClienteEntity)
  constructor(
    private fb: FormBuilder,
    private changeDetector : ChangeDetectorRef,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private destroyRef : DestroyRef
  ) {
    this.cliente.set(this.config.data?.cliente);
  }
  
  ngOnInit() {

    this.setFormulario();
  }

  ngOnDestroy(): void {
    this.closeFormStatus.next();
    this.closeFormStatus.complete();
  }

  private setFormulario(){
    this.clienteForm = this.fb.group({
      nombre: [this.cliente().nombre, Validators.required],
      description: [this.cliente().description, Validators.required],
      email: [this.cliente().email, [Validators.required, Validators.email]],
    });
   this.clienteForm.statusChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(()=> {
    this.statusForm.set(this.clienteForm.invalid);
   })
   this.changeDetector.detectChanges();
  }
  
  public submit(){
    const clientDto : ClienteDto = {
      email: this.clienteForm.value['email'],
      nombre: this.clienteForm.value['nombre'],
      description: this.clienteForm.value['description'],
    }
    this.ref?.close(clientDto);
  }

  public close(){
    this.ref.close();
  }


}
