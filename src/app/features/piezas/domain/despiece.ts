
export class DespieceIdentificacion{
    constructor(public identificacion: `${string}x${number}x${number}` , public numero:  number){}
    dato(){
        return `${this.numero} ${this.identificacion}`
    }
}