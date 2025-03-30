import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerMessage } from './services/error-handler-message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    ToastModule
  ],
  declarations: [],
  providers : [
    ErrorHandlerMessage,
    {provide : ErrorHandler , useClass : ErrorHandlerMessage},
    MessageService
  ]
})
export class CoreModule { }
