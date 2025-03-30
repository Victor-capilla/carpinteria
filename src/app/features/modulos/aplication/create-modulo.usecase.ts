import { Injectable, Inject } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ModuloEntity } from "../domain/modulo-entity";
import { MODULO_REPOSITORY, ModuloRepository } from "../domain/modulo-repository";

@Injectable()
export class CreateModuloUseCase{
  constructor(@Inject(MODULO_REPOSITORY)private repository: ModuloRepository) {}
    execute: (modulo: ModuloEntity) => Observable<ModuloEntity>= (proyecto: ModuloEntity) =>{
        return this.repository.create(proyecto).pipe(catchError(error => {
          throw error;
        }));
    };
}