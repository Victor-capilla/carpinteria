import { catchError, Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { ModuloEntity } from "../domain/modulo-entity";
import { ModuloFilter } from "../domain/modulo-filter";
import { MODULO_REPOSITORY, ModuloRepository } from "../domain/modulo-repository";
@Injectable()
export class GetAllModuloUseCase{
  constructor(@Inject(MODULO_REPOSITORY)private repository: ModuloRepository) {}
    execute: (filter : ModuloFilter) => Observable<ModuloEntity[]> = (filter : ModuloFilter)=>{
        return this.repository.getAll(filter).pipe(catchError(error => {
          throw error;
        }));;
    };
}