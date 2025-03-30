import { catchError, Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { MODULO_REPOSITORY, ModuloRepository } from "../domain/modulo-repository";
@Injectable()
export class DeleteModuloUseCase{
  constructor(@Inject(MODULO_REPOSITORY)private repository: ModuloRepository) {}
    execute: (id: number) => Observable<void>= (id: number) =>{
        return this.repository.delete(id).pipe(catchError(error => {
                  throw error;
        }));;
    };
}