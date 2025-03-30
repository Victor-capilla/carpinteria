import { Observable } from "rxjs";
import { ClienteEntity } from "./cliente-entity";
import { ClienteDto } from "./cliente-dto";
import { InjectionToken } from "@angular/core";
export const CLIENTE_REPOSITORY = new InjectionToken<ClienteRepository>('ClienteRepository');
export interface ClienteRepository {
    getAll : () => Observable<ClienteEntity[]>;
    get : (id:number) => Observable<ClienteEntity | undefined>
    update: (id: number ,cliente : Partial<ClienteDto>) => Observable<void>
    create : (cliente : ClienteDto) => Observable<ClienteEntity>
    delete : (id:number) => Observable<void>
}