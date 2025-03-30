import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports:[
    PanelMenuModule,
  ]
})
export class SidebarComponent implements OnInit {

  items: MenuItem[] = [];
  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      {
          label: 'Proyectos',
          icon: 'pi pi-th-large',
          command: () => {
            this.router.navigate(['/proyectos']);
        }
      },
      {
          label: 'Clientes',
          icon: 'pi pi-id-card',
          command: () => {
            this.router.navigate(['/clientes']);
        }
      }
  ];
  }

}
