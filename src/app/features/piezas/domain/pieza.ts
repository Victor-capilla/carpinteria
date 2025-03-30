import { PiezaEnum } from "./pieza.enum";

export class Pieza {
    constructor(
       private readonly lado1 : number,
       private readonly lado2:number,
       public descripcion : 'Lateral' | 'Fondo' | 'Bajo' | 'Alto' | 'Estante' | 'Puerta'
    ){
        this.altura = Math.max(this.lado1 , this.lado2);
        this.anchura = Math.min(this.lado1 , this.lado2);
    }
    public altura!: number;
    public anchura!:number;
    tipo : PiezaEnum = PiezaEnum.PANEL;
    identificacion: () => `${PiezaEnum}x${number}x${number}` = () => {
        return `${this.tipo}x${this.altura}x${this.anchura}`
    };


}