import { catchError, Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { ProyectoDto } from "../domain/proyecto-dto";
import { PROYECTO_REPOSITORY, ProyectoRepository } from "../domain/proyecto-repository";
@Injectable()
export class UpdateProyectoUseCase{
  constructor(@Inject(PROYECTO_REPOSITORY)private repository: ProyectoRepository) {}
    execute: (id: number ,proyecto: ProyectoDto) => Observable<void> = (id: number ,proyecto: ProyectoDto) =>{
        return this.repository.update(id,proyecto).pipe(catchError(error => {
                  throw error;
                }));;
    };
}