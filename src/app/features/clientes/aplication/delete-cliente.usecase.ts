import { catchError, Observable } from "rxjs";
import { CLIENTE_REPOSITORY, ClienteRepository } from "../domain/cliente-repository";
import { Inject, Injectable } from "@angular/core";
@Injectable()
export class DeleteClienteUseCase{
  constructor(@Inject(CLIENTE_REPOSITORY)private repository: ClienteRepository) {}
    execute: (id: number) => Observable<void>= (id: number) =>{
        return this.repository.delete(id).pipe(catchError(error => {
                  throw error;
                }));;
    };
}