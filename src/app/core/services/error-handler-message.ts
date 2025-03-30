import { MessageService } from 'primeng/api';
import { ErrorHandler, Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerMessage implements ErrorHandler{
  constructor(private messageService : MessageService) {
  }
    handleError(error: {message : string}): void {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
            life: 3000,
    })
};
}