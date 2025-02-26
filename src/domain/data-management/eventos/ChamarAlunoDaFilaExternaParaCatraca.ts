
import { ChamarAlunoDaCatracaParaFilaInterna } from "../eventos/ChamarAlunoDaCatracaParaFilaInterna";
import { Evento } from "../eventos/Evento";

export class ChamarAlunoDaFilaExternaParaCatraca extends Evento{

    processarEvento(): void {
        console.log(`Evento - ChamarAlunoDaFilaExternaParaCatraca - ${this.timestamp}`);
        
        const tempoDigitarMatricula = this.refeitorio.moverAlunoParaCatraca();

        const instantefinalizacao = this.timestamp + tempoDigitarMatricula;
        const agendamento = new ChamarAlunoDaCatracaParaFilaInterna(instantefinalizacao,this.refeitorio,this.maquinaEventos);
        this.maquinaEventos.adicionarEvento(agendamento);

        if(this.timestamp >= this.simulador.getSimulacao().parameters.serviceInterval){
            this.refeitorio.getCatraca().TravarCatraca();
        }
    }

}