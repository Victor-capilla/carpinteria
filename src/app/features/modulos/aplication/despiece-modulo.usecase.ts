import { Injectable } from "@angular/core";
import { ModuloEntity } from "../domain/modulo-entity";
import { Pieza } from "../../piezas/domain/pieza";
import { DespieceModulo } from "../domain/despiece-modulo";
@Injectable()
export class DespiezeModulosUseCase{
  constructor() {}
    execute: (modulos : ModuloEntity[]) =>DespieceModulo[] = (modulos : ModuloEntity[])=>{
        return modulos.map((modulo) => {
          const agrupacion = modulo.piezas.reduce((acc, pieza) => {
            if (!acc.has(pieza.descripcion)) {
              acc.set(pieza.descripcion, []);
            }
            acc.get(pieza.descripcion)!.push(pieza);
            return acc;
          }, new Map<string, Pieza[]>());
        
          const piezas = Array.from(agrupacion, ([tipo, piezas]) => ({ tipo, piezas }));
          return { modulo, piezas };
        });
    };
}