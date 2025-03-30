import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TipoModuloEnum } from "../../../../../modulos/domain/tipo-modulo.enum";
import { ANCHURA_MIN_ENCIMERA, MAX_PUERTAS, MIN_PUERTAS } from "../../../../../modulos/encimera/domain/encimera";
import { ANCHURA_MIN_ESTANTERIA, MAX_ESTANTE, MIN_ESTANTE } from "../../../../../modulos/estanteria/domain/estanteria";
import { ModuloEntity } from "../../../../../modulos/domain/modulo-entity";

export class ProyectoFormConfig {
  
  
  static getConfigFormByModule(tipo: TipoModuloEnum  | null, fb : FormBuilder , modulo?: ModuloEntity): FormGroup {
    function getPuertas(modulo?: ModuloEntity): 1 | 2 {
      return (modulo?.piezas.filter((p) => p.descripcion === 'Puerta').length as 1 | 2) || 1;
    }

    function  getEstantes(modulo?: ModuloEntity): 2 | 3 | 4 | 5 {
      return (modulo?.piezas.filter((p) => p.descripcion === 'Estante').length as 2 | 3 | 4 | 5) || 2;
    }

    switch (tipo) {
      case TipoModuloEnum.ENCIMERA:
        return fb.group({
          anchura: [modulo?.anchura, [Validators.required, Validators.min(ANCHURA_MIN_ENCIMERA)]],
          puertas: [getPuertas(modulo), [Validators.required, Validators.min(MIN_PUERTAS), Validators.max(MAX_PUERTAS)]]
        });
      case TipoModuloEnum.ESTANTERIA:
        return fb.group({
          anchura: [modulo?.anchura, [Validators.required, Validators.min(ANCHURA_MIN_ESTANTERIA)]],
          estantes: [getEstantes(modulo), [Validators.required, Validators.min(MIN_ESTANTE), Validators.max(MAX_ESTANTE)]]
        })
      default:
      return fb.group({})
    }
  }
}