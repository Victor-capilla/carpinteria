import { Pieza } from "../../piezas/domain/pieza";
import { Modulo } from './modulo';
import { TipoModulo } from "./tipo-modulo";

export class ModuloEntity implements Modulo {
    id!:number;
    nombre!: string;
    anchura!: number;
    fondo!:number;
    altura!:number;
    piezas!: Pieza[];
    tipo!: TipoModulo
}