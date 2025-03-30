import { catchError, Observable } from "rxjs";
import { ProyectoEntity } from "../domain/proyecto-entity";
import { Inject, Injectable } from "@angular/core";
import { PROYECTO_REPOSITORY, ProyectoRepository } from "../domain/proyecto-repository";

@Injectable()
export class GetProyectoUseCase{
  constructor(@Inject(PROYECTO_REPOSITORY)private repository: ProyectoRepository) {}
    execute: (id: number) => Observable<ProyectoEntity | undefined> = (id:number)=> {
        return this.repository.get(id).pipe(catchError(error => {
                  throw error;
                }));;
    };
}