import { Evento } from "../eventos/Evento"
import { Observador } from "../eventos/Observador";

export class MaquinaEventos{
    private eventos: Evento[] = [];
    private instanteDeSimulacao: number = 0;
    private observador: Observador = new Observador();

    public processarEventos(){
        while(this.eventos.length>0){
            
            this.eventos = this.eventos.sort((e1,e2)=> e1.getTimestamp() - e2.getTimestamp())
            const e: Evento = this.eventos.shift()!;
            e.processarEvento();

            this.atualizarInstanteDeSimulacao(e.getTimestamp());
        }
    }
    
    public adicionarEvento(novoEvento: Evento){
        this.eventos.push(novoEvento)
    }

    public getObservador():Observador{
        return this.observador;
    }

    private atualizarInstanteDeSimulacao(novoInstanteDeSimulacao:number){
        if(novoInstanteDeSimulacao<this.instanteDeSimulacao){
            throw new Error('Voçê não pode voltar no tempo');
        }

        this.instanteDeSimulacao = novoInstanteDeSimulacao;
    }
}