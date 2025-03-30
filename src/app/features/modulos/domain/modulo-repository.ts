import { Observable } from 'rxjs';
import { InjectionToken } from "@angular/core";
import { ModuloFilter } from './modulo-filter';
import { ModuloEntity } from './modulo-entity';
import { ModuloDto } from './modulo-dto';
export const MODULO_REPOSITORY = new InjectionToken<ModuloRepository>('ModuloRepository');
export interface ModuloRepository {
    getAll : (proyectoFilter: ModuloFilter | undefined) => Observable<ModuloEntity[]>;
    get : (id:number) => Observable<ModuloEntity | undefined>
    update: (id: number ,cliente : Partial<ModuloDto>) => Observable<void>
    create : (cliente : ModuloEntity) => Observable<ModuloEntity>
    delete : (id:number) => Observable<void>
}