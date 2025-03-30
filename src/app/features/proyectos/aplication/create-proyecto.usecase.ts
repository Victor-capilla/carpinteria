import { catchError, Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { ProyectoEntity } from "../domain/proyecto-entity";
import { PROYECTO_REPOSITORY, ProyectoRepository } from "../domain/proyecto-repository";

@Injectable()
export class CreateProyectoUseCase{
  constructor(@Inject(PROYECTO_REPOSITORY)private repository: ProyectoRepository) {}
    execute: (Proyecto: ProyectoEntity) => Observable<ProyectoEntity>= (proyecto: ProyectoEntity) =>{
        return this.repository.create(proyecto).pipe(catchError(error => {
                  throw error;
                }));;
    };
}