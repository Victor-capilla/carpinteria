import { catchError, Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { PROYECTO_REPOSITORY, ProyectoRepository } from "../domain/proyecto-repository";
@Injectable()
export class DeleteProyectoUseCase{
  constructor(@Inject(PROYECTO_REPOSITORY)private repository: ProyectoRepository) {}
    execute: (id: number) => Observable<void>= (id: number) =>{
        return this.repository.delete(id).pipe(catchError(error => {
                  throw error;
                }));;
    };
}