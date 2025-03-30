import { Observable, of } from "rxjs";
import { ProyectoEntity } from "../domain/proyecto-entity";
import { ProyectoFilter } from "../domain/proyecto-filter";
import { ProyectoDto } from "../domain/proyecto-dto";
import { ProyectoRepository } from "../domain/proyecto-repository";
import { Modulo } from "../../modulos/domain/modulo";
import { ModuloEntity } from "../../modulos/domain/modulo-entity";
import { Pieza } from "../../piezas/domain/pieza";
import { TipoModuloEnum } from "../../modulos/domain/tipo-modulo.enum";
import { GestionObjeto } from "../../../core/utils/gestion-objeto";

export class ProyectoRepositoryLocal implements ProyectoRepository{
  constructor() {
  } 
   // Encimera 45 cm
    piezasEncimera : Pieza[] = [
        new Pieza(70, 60 , 'Lateral'),
        new Pieza(70, 60 , 'Lateral'),
        new Pieza(70, 45 , 'Fondo'),
        new Pieza(60, 45 , 'Bajo'),
        new Pieza(60, 45 , 'Alto'),
        new Pieza(70, 45 , 'Puerta')
    ];
    // Estanteria 30 cm
    piezasEstanteria : Pieza[] = [
        new Pieza(90, 60 , 'Lateral'),
        new Pieza(90, 60 , 'Lateral'),
        new Pieza(90, 30 , 'Fondo'),
        new Pieza(60, 30 , 'Bajo'),
        new Pieza(60, 30 , 'Alto'),
        new Pieza(60, 30 , 'Estante'),
    ];
    modulos : ModuloEntity[] = [
        {id: 1 , altura: 70 , anchura: 45 ,fondo : 60 , nombre: 'encimera' ,tipo : { tipo : TipoModuloEnum.ENCIMERA}, piezas : this.piezasEncimera},
        {id: 1 , altura: 90 , anchura: 30 ,fondo : 45 , nombre: 'estanteria' ,tipo : { tipo : TipoModuloEnum.ESTANTERIA}, piezas : this.piezasEstanteria}
    ];
    proyectos : ProyectoEntity[] = [
        {id:1, nombre : 'Cocina Casa Paco' , modulos: [this.modulos[0]], idCliente:1, descripcion: ''},
        {id:2, nombre : 'Salon Monolo' , modulos: [this.modulos[1]], idCliente:2 , descripcion: ''},
    ];
    setModules: (id: number, modulo: Modulo[]) => Observable<void> = (id: number, modulo: Modulo[]) => {
        const proyectFind = this.proyectos.find(proyecto => proyecto.id === id);
        if (proyectFind) {
            proyectFind.modulos = [...new Set([...proyectFind.modulos, ...modulo])]
        }
        return of();
    };
    getAll: (filter : ProyectoFilter | undefined) => Observable<ProyectoEntity[]> = (filter : ProyectoFilter | undefined)=>{
        const filteredProyect = this.proyectos.filter(proyecto => {
            return !filter ? true :
             Object.entries(filter).some(([key, value]) => {
                return  value == proyecto?.[key as keyof ProyectoEntity]
            });
        })
        return of(filteredProyect);
    };
    get: (id: number) => Observable<ProyectoEntity | undefined> = (id:number)=> {
        return of(this.proyectos.find(proyecto => proyecto.id === id));
    };
    update: (id:number ,proyecto: ProyectoDto) => Observable<void> = (id : number, proyecto: ProyectoDto) =>{
        const proyectoFind = this.proyectos.find(proyectoEntity=> proyectoEntity.id === id);
        if (proyectoFind) {
            GestionObjeto.deepAssign(proyectoFind ,proyecto)
        }
        return of(void 0);
    };
    create: (proyecto: ProyectoEntity) => Observable<ProyectoEntity>= (proyecto: ProyectoEntity) =>{
        const maxId = Math.max(...this.proyectos.map(p => p.id));
        const proyectoEntity : ProyectoEntity = {...proyecto, id: maxId+1}
        this.proyectos.push(proyectoEntity);
        return of(proyectoEntity);
    };
    delete: (id: number) => Observable<void>= (id: number) =>{
        this.proyectos = this.proyectos.filter(proyecto => proyecto.id !==id);
        return of(void 0);
    };
}