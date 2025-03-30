import { Pieza } from "../../piezas/domain/pieza";
import { ModuloEntity } from "./modulo-entity";

export interface DespieceModulo {
    modulo: ModuloEntity;
    piezas: {
        tipo: string;
        piezas: Pieza[];
    }[]
}