import { Pieza } from "../../../piezas/domain/pieza";
import { Modulo } from "../../domain/modulo";
import { TipoModulo } from "../../domain/tipo-modulo";
import { TipoModuloEnum } from "../../domain/tipo-modulo.enum";

export const ANCHURA_MIN_ENCIMERA = 45;
export const MIN_PUERTAS = 1;
export const MAX_PUERTAS = 2;
export class Encimera implements Modulo{
    constructor(public anchura : number , public puertas : 1 | 2){
        if (anchura < ANCHURA_MIN_ENCIMERA) {
            throw Error(`La altura minima son ${ANCHURA_MIN_ENCIMERA} cm`);
        }
        this.anchura = anchura;
    }
    tipo: TipoModulo = {tipo : TipoModuloEnum.ENCIMERA};
    fondo:number = 60;
    altura:number = 70;
    nombre: string = TipoModuloEnum.ENCIMERA;
    piezas: Pieza[] = [];
}