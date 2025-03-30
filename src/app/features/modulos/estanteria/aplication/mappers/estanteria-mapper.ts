import { Injectable } from "@angular/core";
import { Estanteria } from "../../domain/estanteria";
import { Modulo } from "../../../domain/modulo";



@Injectable()
export class EstanteriaMapper{
  constructor() {}
    estanteriaToModulo(estanteria: Estanteria): Modulo{
      const modulo = {} as Modulo;
      modulo.altura = estanteria.altura;
      modulo.anchura = estanteria.anchura;
      modulo.fondo = estanteria.fondo;
      modulo.nombre = estanteria.nombre;
      modulo.piezas = estanteria.piezas;
      modulo.tipo = estanteria.tipo
      return modulo;
    }
    moduloToEstanteria(modulo: Modulo): Estanteria{
      const estanteria = new Estanteria(modulo.anchura , modulo.piezas.filter(pieza => pieza.descripcion == 'Estante').length as 2|3|4|5);
      return estanteria;
    }
}