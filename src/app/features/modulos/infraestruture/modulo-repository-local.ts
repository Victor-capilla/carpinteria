import { Observable, of } from "rxjs";
import { ClienteDto } from "../../clientes/domain/cliente-dto";
import { ModuloDto } from "../domain/modulo-dto";
import { ModuloEntity } from "../domain/modulo-entity";
import { ModuloFilter } from "../domain/modulo-filter";
import { ModuloRepository } from "../domain/modulo-repository";
import { Pieza } from "../../piezas/domain/pieza";
import { TipoModuloEnum } from "../domain/tipo-modulo.enum";

export class ModuloRepositoryLocal implements ModuloRepository{
  constructor() {
  }
    piezasEncimera : Pieza[] = [
        new Pieza(70, 60 , 'Lateral'),
        new Pieza(70, 60 , 'Lateral'),
        new Pieza(70, 45 , 'Fondo'),
        new Pieza(60, 45 , 'Bajo'),
        new Pieza(60, 45 , 'Alto'),
        new Pieza(70, 45 , 'Puerta')
     ];
     piezasEstanteria : Pieza[] = [
        new Pieza(90, 45 , 'Lateral'),
        new Pieza(90, 45 , 'Lateral'),
        new Pieza(90, 70 , 'Fondo'),
        new Pieza(30, 45 , 'Bajo'),
        new Pieza(30, 45 , 'Alto'),
        new Pieza(30, 45 , 'Estante'),
     ];
    modulos : ModuloEntity[] = [
        {id: 1 , altura: 70 , anchura: 45 ,fondo : 60 , nombre: 'encimera' , tipo : { tipo : TipoModuloEnum.ENCIMERA},piezas : this.piezasEncimera},
        {id: 2 , altura: 90 , anchura: 30 ,fondo : 45 , nombre: 'estanteria' ,tipo : { tipo : TipoModuloEnum.ESTANTERIA}, piezas : this.piezasEstanteria}
    ];
    getAll: (filter : ModuloFilter | undefined) => Observable<ModuloEntity[]> = (filter : ModuloFilter | undefined)=>{
        const filteredModule = this.modulos.filter(modulo => {
            return !filter ? true : Object.entries(filter).every(([key, value]) => {
                return  value == modulo?.[key as keyof ModuloEntity]
            });
        })
        return of(filteredModule);
    };
    get: (id: number) => Observable<ModuloEntity | undefined> = (id:number)=> {
        return of(this.modulos.find(modulo => modulo.id === id));
    };
    update: (id:number ,modulo: ModuloDto) => Observable<void> = (id : number, modulo: ClienteDto) =>{
        const moduloFind = this.modulos.find(moduloEntity=> moduloEntity.id === id);
        if (moduloFind) {
            Object.assign(moduloFind, modulo);
        }
        return of();
    };
    create: (modulo: ModuloEntity) => Observable<ModuloEntity>= (modulo: ModuloEntity) =>{
        const maxId = Math.max(...this.modulos.map(p => p.id));
        const moduloEntity : ModuloEntity = {...modulo, id: maxId+1}
        this.modulos.push(moduloEntity);
        return of(moduloEntity);
    };
    delete: (id: number) => Observable<void>= (id: number) =>{
        this.modulos = this.modulos.filter(modulo => modulo.id !==id);
        return of();
    };
}