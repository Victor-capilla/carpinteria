
import { Injectable } from "@angular/core";
import { ProyectoEntity } from "../domain/proyecto-entity";
@Injectable()
export class DespiezeProyectoUseCase{
  constructor() {}
    execute: (proyecto : ProyectoEntity) => [string, number][] = (proyecto : ProyectoEntity)=>{
      const mapPiezas = new Map<string, number>();
      // Aplana todas las piezas en un solo array
      proyecto.modulos
        .flatMap(modulo => modulo.piezas)
        .forEach(pieza => {
          const clave = pieza.identificacion();
          mapPiezas.set(clave, (mapPiezas.get(clave) ?? 0) + 1);
        });

      return [...mapPiezas];
    };
}