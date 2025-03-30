import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GetAllProyectoUseCase } from '../aplication/get-all-proyecto.usecase';
import { ProyectoEntity } from '../domain/proyecto-entity';
import { ProyectoFilter } from '../domain/proyecto-filter';
;

@Injectable({
  providedIn: 'root',
  deps: [GetAllProyectoUseCase]
})
export class ProyectosResolver implements Resolve<ProyectoEntity[]> {

  constructor(private getAllProyectoUseCase: GetAllProyectoUseCase) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProyectoEntity[]> {
    let proyectoFilter!:ProyectoFilter;
    const idCliente = route.paramMap.get('idCliente');
    if (idCliente) {
        proyectoFilter = {idCliente : +idCliente}
    }
    return this.getAllProyectoUseCase.execute(proyectoFilter);
  }
}