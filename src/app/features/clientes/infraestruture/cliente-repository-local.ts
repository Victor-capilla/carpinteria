import { concatMap, Observable, of, throwError } from "rxjs";
import { ClienteEntity } from "../domain/cliente-entity";
import { ClienteRepository } from "../domain/cliente-repository";
import { ClienteDto } from "../domain/cliente-dto";

export class ClienteRepositoryLocal implements ClienteRepository{
  constructor() {
  }
    clientes : ClienteEntity[] = [
        {id:1, nombre : 'Pedro' , email:'', description : 'Pedro Jimenez' , 'proyectos' : []},
        {id:2, nombre : 'Manolo' , email:'', description : 'Manolo Jimenez' , 'proyectos' : []},
        {id:3, nombre : 'Ganolo' , email:'', description : 'Ganolo Jimenez' , 'proyectos' : []},
        {id:4, nombre : 'Danolo' , email:'', description : 'Danolo Jimenez' , 'proyectos' : []},
    ];

    getAll: () => Observable<ClienteEntity[]> = ()=>{
        return of(this.clientes);
    };
    get: (id: number) => Observable<ClienteEntity | undefined> = (id:number)=> {
        return of(this.clientes.find(cliente => cliente.id === id));
    };
    update: (id:number ,cliente: ClienteDto) => Observable<void> = (id : number, cliente: ClienteDto) =>{
        const clienteFind = this.clientes.find(clienteEntity => clienteEntity.id === id);
        if (clienteFind) {
            Object.assign(clienteFind, cliente);
        }
        return of(clienteFind).pipe(concatMap(() => {
            if (clienteFind?.id == 1) {
              return throwError(() => new Error('Error forzado en valor2'));
            }
            return of();
          }));;
    };
    create: (cliente: ClienteDto) => Observable<ClienteEntity>= (cliente: ClienteDto) =>{
        const maxId = Math.max(...this.clientes.map(c => c.id));
        const clienteEntity : ClienteEntity = {...cliente , id: maxId+1 ,proyectos : []} as ClienteEntity
        this.clientes.push(clienteEntity);
        return of(clienteEntity);
    };
    delete: (id: number) => Observable<void>= (id: number) =>{
        
        this.clientes = this.clientes.filter(cliente => cliente.id !==id);
        return of()
    };
}