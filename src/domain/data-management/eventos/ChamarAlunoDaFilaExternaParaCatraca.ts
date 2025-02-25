
import { ChamarAlunoDaCatracaParaFilaInterna } from "./ChegadaFilaInterna";
import { Evento } from "./Evento";

export class ChamarAlunoDaFilaExternaParaCatraca extends Evento{

    processarEvento(): void {
        console.log(`Evento - ChamarAlunoDaFilaExternaParaCatraca - ${this.timestamp}`);
        
        const tempoDigitarMatricula = this.refeitorio.moverAlunoParaCatraca();

        const instantefinalizacao = this.timestamp + tempoDigitarMatricula;
        const agendamento = new ChamarAlunoDaCatracaParaFilaInterna(instantefinalizacao,this.refeitorio,this.maquinaEventos);
        this.maquinaEventos.adicionarEvento(agendamento);
    }

}