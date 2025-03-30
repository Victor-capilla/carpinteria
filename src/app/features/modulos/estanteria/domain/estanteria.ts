import { Pieza } from "../../../piezas/domain/pieza";
import { Modulo } from "../../domain/modulo";
import { TipoModulo } from "../../domain/tipo-modulo";
import { TipoModuloEnum } from "../../domain/tipo-modulo.enum";
export const ANCHURA_MIN_ESTANTERIA = 30;
export const MIN_ESTANTE = 2;
export const MAX_ESTANTE = 5;
export class Estanteria implements Modulo{
    constructor(public anchura : number ,public estantes : 2 | 3 | 4 | 5){
        if (anchura < ANCHURA_MIN_ESTANTERIA) {
            throw Error(`La altura minima son ${ANCHURA_MIN_ESTANTERIA} cm`);
        }
        this.anchura = anchura;
    }
    tipo: TipoModulo = {tipo : TipoModuloEnum.ESTANTERIA};;
    fondo:number = 60;
    altura:number = 90;
    nombre: string = TipoModuloEnum.ESTANTERIA;
    piezas: Pieza[] = [];
}