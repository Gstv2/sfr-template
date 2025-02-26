import { Evento } from "../Eventos/Evento";
import { ChamarAlunoDaFilaInternaParaAtendimento } from "./ChamarAlunoDaFilaInternaParaAtendimento";

export class DesbloquearAtendimento extends Evento {
    
    processarEvento(): void {
        // log
        console.log(`Evento - desbloquearAtendimento - ${this.timestamp}`)

        // alter
        const sucesso = this.refeitorio.desbloquearAtendimento();

        // Agendamento
        if(sucesso){
            const agendamento = new ChamarAlunoDaFilaInternaParaAtendimento(this.timestamp,this.refeitorio,this.maquinaEventos)
            this.maquinaEventos.adicionarEvento(agendamento);
        }
    }

}