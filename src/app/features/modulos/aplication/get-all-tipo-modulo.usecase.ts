import { catchError, Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { TIPO_MODULO_REPOSITORY, TipoModuloRepository } from "../domain/tipo-modulo-repository";
import { TipoModulo } from "../domain/tipo-modulo";
@Injectable()
export class GetAllTipoModuloUseCase{
  constructor(@Inject(TIPO_MODULO_REPOSITORY)private repository: TipoModuloRepository) {}
    execute: () => Observable<TipoModulo[]> = ()=>{
        return this.repository.getAll().pipe(catchError(error => {
                  throw error;
                }));;
    };
}