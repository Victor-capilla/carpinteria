import { Injectable, Inject } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ModuloDto } from "../domain/modulo-dto";
import { MODULO_REPOSITORY, ModuloRepository } from "../domain/modulo-repository";

@Injectable()
export class UpdateModuloUseCase{
  constructor(@Inject(MODULO_REPOSITORY)private repository: ModuloRepository) {}
    execute: (id: number ,modulo: ModuloDto) => Observable<void> = (id: number ,modulo: ModuloDto) =>{
        return this.repository.update(id,modulo).pipe(catchError(error => {
                  throw error;
                }));;
    };
}