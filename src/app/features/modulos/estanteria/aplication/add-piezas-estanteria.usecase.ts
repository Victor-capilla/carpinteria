import { Injectable } from "@angular/core";
import { Pieza } from "../../../piezas/domain/pieza";
import { Estanteria } from "../domain/estanteria";
import { EstanteriaMapper } from "./mappers/estanteria-mapper";
import { Modulo } from "../../domain/modulo";

@Injectable()
export class AddPiezasEstanteriaUseCase{
  constructor(private estanteriaMapper : EstanteriaMapper) {}
    execute: (modulo: Estanteria) => Modulo= (modulo: Estanteria) =>{
      modulo.piezas.push(new Pieza(modulo.altura, modulo.fondo , 'Lateral'));  // Laterales (2)
      modulo.piezas.push(new Pieza(modulo.altura, modulo.fondo , 'Lateral'));

      // 1 Fondo
      modulo.piezas.push(new Pieza(modulo.altura, modulo.anchura , 'Fondo'));  // Fondo (1)

      // 2 Bajo y Alto
      modulo.piezas.push(new Pieza(modulo.fondo, modulo.anchura , 'Bajo'));  // Fondo (1) // Bajo (1)
      modulo.piezas.push(new Pieza(modulo.fondo, modulo.anchura , 'Alto'));

      Array.from({ length: modulo.estantes }, (_, index) => index + 1).forEach(()=>{
        modulo.piezas.push(new Pieza(modulo.altura, modulo.anchura , 'Estante'));  // Fondo (1) // Bajo (1)
      });
    return this.estanteriaMapper.estanteriaToModulo(modulo);
    };
}