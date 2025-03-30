import { Injectable } from "@angular/core";
import { Encimera } from "../domain/encimera";
import { Pieza } from "../../../piezas/domain/pieza";
import { EncimeraMapper } from "./mappers/encimera-mapper";
import { Modulo } from "../../domain/modulo";

@Injectable()
export class AddPiezasEncimeraUseCase{
  constructor(private encimeraMapper : EncimeraMapper) {}
    execute: (modulo: Encimera) => Modulo= (modulo: Encimera) =>{
      modulo.piezas.push(new Pieza(modulo.altura, modulo.fondo , 'Lateral'));  // Laterales (2)
      modulo.piezas.push(new Pieza(modulo.altura, modulo.fondo , 'Lateral')); 

      // 1 Fondo
      modulo.piezas.push(new Pieza(modulo.altura, modulo.anchura , 'Fondo'));  // Fondo (1)

      // 2 Bajo y Alto
      modulo.piezas.push(new Pieza(modulo.fondo, modulo.anchura , 'Bajo'));  // Fondo (1) // Bajo (1)
      modulo.piezas.push(new Pieza(modulo.fondo, modulo.anchura , 'Alto'));

      const anchoPuerta = modulo.fondo / modulo.puertas;
      Array.from({ length: modulo.puertas }, (_, index) => index + 1).forEach(()=>{
        modulo.piezas.push(new Pieza(modulo.altura, anchoPuerta , 'Puerta'));  // Fondo (1) // Bajo (1)
      });
    return this.encimeraMapper.encimeraToModulo(modulo);
    };
}