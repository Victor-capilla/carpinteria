import { Observable } from 'rxjs';
import { InjectionToken } from "@angular/core";
import { TipoModulo } from './tipo-modulo';
export const TIPO_MODULO_REPOSITORY = new InjectionToken<TipoModuloRepository>('TipoModuloRepository');
export interface TipoModuloRepository {
    getAll : () => Observable<TipoModulo[]>;
}