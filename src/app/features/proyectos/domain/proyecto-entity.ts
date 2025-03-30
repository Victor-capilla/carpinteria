import { Modulo } from "../../modulos/domain/modulo";

export interface ProyectoEntity{
    id: number;
    nombre: string;
    descripcion: string;
    modulos: Modulo[];
    idCliente : number;
}