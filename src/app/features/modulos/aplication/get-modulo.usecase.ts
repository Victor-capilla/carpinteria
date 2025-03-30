import { catchError, Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { ModuloEntity } from "../domain/modulo-entity";
import { MODULO_REPOSITORY, ModuloRepository } from "../domain/modulo-repository";

@Injectable()
export class GetModuloUseCase{
  constructor(@Inject(MODULO_REPOSITORY)private repository: ModuloRepository) {}
    execute: (id: number) => Observable<ModuloEntity | undefined> = (id:number)=> {
        return this.repository.get(id).pipe(catchError(error => {
                  throw error;
                }));;
    };
}