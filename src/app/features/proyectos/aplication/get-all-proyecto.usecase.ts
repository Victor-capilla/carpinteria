import { catchError, Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { ProyectoFilter } from "../domain/proyecto-filter";
import { ProyectoEntity } from "../domain/proyecto-entity";
import { PROYECTO_REPOSITORY, ProyectoRepository } from "../domain/proyecto-repository";
@Injectable()
export class GetAllProyectoUseCase{
  constructor(@Inject(PROYECTO_REPOSITORY)private repository: ProyectoRepository) {}
    execute: (filter?: ProyectoFilter | undefined) => Observable<ProyectoEntity[]> = (filter?: ProyectoFilter| undefined)=>{
        return this.repository.getAll(filter).pipe(catchError(error => {
                  throw error;
                }));;
    };
}