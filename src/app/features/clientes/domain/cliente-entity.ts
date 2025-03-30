import { ProyectoEntity } from "../../proyectos/domain/proyecto-entity";

export interface ClienteEntity {
    id:number;
    nombre:string;
    description:string;
    email:string;
    proyectos : ProyectoEntity[];
}