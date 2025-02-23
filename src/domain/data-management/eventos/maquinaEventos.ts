import { Evento } from "./evento";

export class MaquinaEventos{
    eventos: Evento[] = [];
    instanteSimulacao: number = 0;


    public processarEventos(): void{
        while(this.eventos.length > 0){
            this.eventos = this.eventos.sort((e1, e2) => e1.getTimestamp() - e2.getTimestamp());
            const evento : Evento = this.eventos.shift();
            evento.processarEvento();
        }
    }

    public adicionarEvento(evento: Evento): void{
        this.eventos.push(evento);
    }

    private atualizarInstanteSimulacao(novoInstante: number): void{
        if(novoInstante < this.instanteSimulacao){
            throw new Error("Você não pode voltar no tempo");
        }
        this.instanteSimulacao = novoInstante;
    }



}