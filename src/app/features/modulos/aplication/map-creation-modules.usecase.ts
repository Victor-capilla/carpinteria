import { Injectable } from "@angular/core";
import { TipoModuloEnum } from "../domain/tipo-modulo.enum";
import { Modulo } from "../domain/modulo";
import { ModuleTypeForm } from "../../proyectos/UI/componentes/proyecto-forms/proyecto-create-form/proyecto-create-form.component";
import { AddPiezasEncimeraUseCase } from "../encimera/aplication/add-piezas-encimera.usecase";
import { AddPiezasEstanteriaUseCase } from "../estanteria/aplication/add-piezas-estanteria.usecase";
import { Encimera } from "../encimera/domain/encimera";
import { Estanteria } from "../estanteria/domain/estanteria";

@Injectable()
export class ModuleFactoryUseCase{
  constructor(
    private addPiezasEncimeraUseCase: AddPiezasEncimeraUseCase,
    private addPiezasEstanteriaUseCase : AddPiezasEstanteriaUseCase
  ) {}
    execute: () => Map<TipoModuloEnum, (modulo : ModuleTypeForm) => Modulo>= () =>{
      const createEncimera = (modulo : ModuleTypeForm) => {
        const encimera = new Encimera(modulo.datos.anchura, modulo.datos.puertas);
          return this.addPiezasEncimeraUseCase.execute(encimera);
      }
      const createEstanteria = (modulo : ModuleTypeForm) => {
        const estanteria = new Estanteria(modulo.datos.anchura, modulo.datos.estantes);
          return this.addPiezasEstanteriaUseCase.execute(estanteria);
      }
      const mapModulos : Map<TipoModuloEnum, (modulo : ModuleTypeForm) => Modulo> = new Map<TipoModuloEnum, (modulo : ModuleTypeForm) => Modulo>([
        [TipoModuloEnum.ENCIMERA ,createEncimera],
        [TipoModuloEnum.ESTANTERIA ,createEstanteria]
      ])
      return mapModulos;
    };
}