
import { Evento } from "./Evento";
import { FinalizarAtendimentoDoCarro } from "./finalizarAtendimentoDoCarro";

export class ChamarAlunoDaFilaExternaParaCatraca extends Evento{

    processarEvento(): void {
        console.log(`Evento - ChamarAlunoDaFilaExternaParaCatraca - ${this.timestamp}`);
        
        const tempoAbastecimento = this.refeitorio.moverAlunoParaCatraca();

        const instantefinalizacao = this.timestamp + tempoAbastecimento;
        const agendamento = new FinalizarAtendimentoDoCarro(instantefinalizacao,this.posto,this.maquinaEventos);
        this.maquinaEventos.adicionarEvento(agendamento);
    }

}