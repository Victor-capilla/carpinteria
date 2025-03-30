import { catchError, Observable } from "rxjs";
import { CLIENTE_REPOSITORY, ClienteRepository } from "../domain/cliente-repository";
import { ClienteDto } from "../domain/cliente-dto";
import { Inject, Injectable } from "@angular/core";
@Injectable()
export class UpdateClienteUseCase{
  constructor(@Inject(CLIENTE_REPOSITORY)private repository: ClienteRepository) {}
    execute: (id: number ,cliente: ClienteDto) => Observable<void> = (id: number ,cliente: ClienteDto) =>{
        return this.repository.update(id,cliente).pipe(catchError(error => {
                  throw error;
                }));;
    };
}