import { Aluno } from "./aluno";
import { Atendimento } from "./atendimento";


export class Refeitorio{
    private QuantAtendimento:Atendimento[];

    constructor( QuantAtendimento:Atendimento[]){
        this.QuantAtendimento = QuantAtendimento;
    }


   
    
    criarMesas(): void {

    }

    criarCatraca():void{

    }

    criarAtendimento(aluno: Aluno): boolean {
       
        return true; 
    }

    criarFilaInterna():boolean{
        return true;

    }

}