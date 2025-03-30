import { Observable } from 'rxjs';
import { InjectionToken } from "@angular/core";
import { ProyectoEntity } from './proyecto-entity';
import { ProyectoFilter } from './proyecto-filter';
import { ProyectoDto } from './proyecto-dto';
export const PROYECTO_REPOSITORY = new InjectionToken<ProyectoRepository>('ProyectoRepository');
export interface ProyectoRepository {
    getAll : (proyectoFilter?: ProyectoFilter | undefined) => Observable<ProyectoEntity[]>;
    get : (id:number) => Observable<ProyectoEntity | undefined>
    update: (id: number ,cliente : Partial<ProyectoDto>) => Observable<void>
    create : (cliente : ProyectoEntity) => Observable<ProyectoEntity>
    delete : (id:number) => Observable<void>
}