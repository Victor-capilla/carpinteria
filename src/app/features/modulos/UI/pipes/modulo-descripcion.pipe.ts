import { Pipe, PipeTransform } from '@angular/core';
import { ModuloEntity } from '../../domain/modulo-entity';
import { TipoModuloEnum } from '../../domain/tipo-modulo.enum';

@Pipe({
  name: 'moduloDescripcion'
})
export class ModuloDescripcionPipe implements PipeTransform {
  transform(modulo: ModuloEntity): any {
    let descripcion = ''
    if (modulo.tipo.tipo === TipoModuloEnum.ENCIMERA) {
      const puertas = modulo.piezas.filter(pieza => pieza.descripcion ==='Puerta').length;
      descripcion = `${TipoModuloEnum.ENCIMERA} de ${modulo.anchura} cm con ${puertas} puerta${puertas == 1 ? '' : 's'}`
    }else{
      const estantes = modulo.piezas.filter(pieza => pieza.descripcion ==='Estante').length;
      descripcion = `${TipoModuloEnum.ESTANTERIA} de ${modulo.anchura} cm con ${estantes} estantes`
    }
    return descripcion;
  }

}
