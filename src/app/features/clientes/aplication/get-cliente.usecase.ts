import { catchError, Observable } from "rxjs";
import { ClienteEntity } from "../domain/cliente-entity";
import { CLIENTE_REPOSITORY, ClienteRepository } from "../domain/cliente-repository";
import { Inject, Injectable } from "@angular/core";
@Injectable()
export class GetClienteUseCase{
  constructor(@Inject(CLIENTE_REPOSITORY)private repository: ClienteRepository) {}
    execute: (id: number) => Observable<ClienteEntity | undefined> = (id:number)=> {
        return this.repository.get(id).pipe(catchError(error => {
                  throw error;
                }));;
    };
}