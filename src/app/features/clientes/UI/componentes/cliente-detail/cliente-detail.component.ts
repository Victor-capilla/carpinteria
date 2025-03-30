import { Component, input, OnInit, output } from '@angular/core';
import { ClienteEntity } from '../../../domain/cliente-entity';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.scss'],
  standalone: false,
})
export class ClienteDetailComponent implements OnInit {
  cliente = input<ClienteEntity>();
  action = output<{action : 'update' | 'delete', cliente : ClienteEntity | undefined}>();


  botones: MenuItem[] = [];
  constructor(
    private router : Router
  ) { }

  ngOnInit() {
    this.setBotones();
  }

  private setBotones(){
    this.botones.push({
      icon: 'pi pi-pencil',
      command: () => {
        this.editarCliente();
      }
    },
    {
        icon: 'pi pi-trash',
        command: () => {
          this.eliminarCliente();
        }
    },
    {
      icon: 'pi pi-th-large',
      command: () => {
        this.router.navigate(['/proyectos','clientes' ,this.cliente()?.id],);
      }
    })
    
  }

  private eliminarCliente() {
    this.action.emit({action: 'delete' , cliente : this.cliente()});
  }

  private editarCliente() {
    this.action.emit({action: 'update' , cliente : this.cliente()});
  }

}
