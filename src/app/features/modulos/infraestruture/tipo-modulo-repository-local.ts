import { Observable, of } from "rxjs";
import { TipoModulo } from "../domain/tipo-modulo";
import { TipoModuloRepository } from "../domain/tipo-modulo-repository";
import { TipoModuloEnum } from "../domain/tipo-modulo.enum";

export class TipoModuloRepositoryLocal implements TipoModuloRepository{
    constructor() {
    }
    tiposModulo : TipoModulo[] = [
       {tipo : TipoModuloEnum.ENCIMERA},
       {tipo : TipoModuloEnum.ESTANTERIA},
    ];
    getAll: () => Observable<TipoModulo[]> = ()=>{
        return of(this.tiposModulo);
    };
}