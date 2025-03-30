import { ToastModule } from 'primeng/toast';
import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from "./shared/components/layout/layout.component";
import { AppRoutingModule } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent,AppRoutingModule ,ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  title = '10labs-carpinteria';
}
