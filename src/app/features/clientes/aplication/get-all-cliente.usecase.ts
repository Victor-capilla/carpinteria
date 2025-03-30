import { catchError, Observable } from "rxjs";
import { ClienteEntity } from "../domain/cliente-entity";
import { CLIENTE_REPOSITORY, ClienteRepository } from "../domain/cliente-repository";
import { Inject, Injectable } from "@angular/core";
@Injectable()
export class GetAllClienteUseCase{
  constructor(@Inject(CLIENTE_REPOSITORY)private repository: ClienteRepository) {}
    execute: () => Observable<ClienteEntity[]> = ()=>{
        return this.repository.getAll().pipe(catchError(error => {
                  throw error;
                }));;
    };
}