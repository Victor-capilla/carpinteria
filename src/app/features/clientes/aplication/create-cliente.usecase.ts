import { catchError, Observable } from "rxjs";
import { ClienteEntity } from "../domain/cliente-entity";
import { CLIENTE_REPOSITORY, ClienteRepository } from "../domain/cliente-repository";
import { ClienteDto } from "../domain/cliente-dto";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class CreateClienteUseCase{
  constructor(@Inject(CLIENTE_REPOSITORY)private repository: ClienteRepository) {}
    execute: (cliente: ClienteDto) => Observable<ClienteEntity>= (cliente: ClienteDto) =>{
        return this.repository.create(cliente).pipe(catchError(error => {
                  throw error;
                }));;
    };
}