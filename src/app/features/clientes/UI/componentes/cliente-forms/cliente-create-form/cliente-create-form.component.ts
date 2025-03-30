import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, DestroyRef, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteDto } from '../../../../domain/cliente-dto';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cliente-create-form',
  templateUrl: './cliente-create-form.component.html',
  styleUrls: ['./cliente-create-form.component.scss'],
  standalone: false,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ClienteCreateFormComponent implements OnInit{
  clienteForm!: FormGroup;

  statusForm =  signal(true);
  disabledForm = computed(() => this.statusForm())
  constructor(
    private fb: FormBuilder,
    private changeDetector : ChangeDetectorRef,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private destroyRef : DestroyRef
  ) {}
  
  ngOnInit() {
    this.setFormulario();
  }


  private setFormulario(){
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
