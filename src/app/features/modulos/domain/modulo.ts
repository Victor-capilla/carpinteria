import { Pieza } from "../../piezas/domain/pieza";
import { TipoModulo } from "./tipo-modulo";

export interface Modulo {
    nombre : string;
    anchura: number;
    fondo:number;
    altura:number;
    piezas: Pieza[];
    tipo : TipoModulo;
}