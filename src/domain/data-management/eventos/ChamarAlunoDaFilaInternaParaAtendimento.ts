import { ChamarAlunoDaCatracaParaFilaInterna } from "./ChamarAlunoDaCatracaParaFilaInterna";
import { Evento } from "./Evento";

export class ChamarAlunoDaFilaInternaParaAtendimento extends Evento {

    processarEvento(): void {
        console.log(`Evento - ChamarAlunoDaFilaInternaParaAtendimento - ${this.timestamp}`);
        
        const getTempoAtendimento = this.refeitorio.moverAlunoParaAtendimento();

        const instantefinalizacao = this.timestamp + getTempoAtendimento;
        const agendamento = new ChamarAlunoDaCatracaParaFilaInterna(instantefinalizacao,this.refeitorio,this.maquinaEventos);
        this.maquinaEventos.adicionarEvento(agendamento);

        this.maquinaEventos.getObservador().observarquantidadeAlunoAtendido();


    }

}