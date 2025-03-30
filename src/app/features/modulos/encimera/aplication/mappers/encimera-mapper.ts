import { Injectable } from "@angular/core";
import { Encimera } from "../../domain/encimera";
import { Modulo } from "../../../domain/modulo";



@Injectable()
export class EncimeraMapper{
  constructor() {}
    encimeraToModulo(encimera: Encimera): Modulo{
      const modulo = {} as Modulo;
      modulo.altura = encimera.altura;
      modulo.anchura = encimera.anchura;
      modulo.fondo = encimera.fondo;
      modulo.nombre = encimera.nombre;
      modulo.piezas = encimera.piezas;
      modulo.tipo = encimera.tipo;
      return modulo;
    }
    moduloToEncimera(modulo: Modulo): Encimera{
      const encimera = new Encimera(modulo.anchura , modulo.piezas.filter(pieza => pieza.descripcion == 'Puerta').length as 1|2);
      return encimera;
    }
}