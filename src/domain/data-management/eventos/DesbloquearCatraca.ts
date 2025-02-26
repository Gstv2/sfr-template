import { Evento } from "../eventos/Evento";
import { ChamarAlunoDaFilaExternaParaCatraca } from "./ChamarAlunoDaFilaExternaParaCatraca";

export class DesbloquearCatraca extends Evento {
    
    processarEvento(): void {
        // log
        console.log(`Evento - DesbloqueandoCatraca - ${this.timestamp}`)

        // alter
        const sucesso = this.refeitorio.desbloquearCatraca();

        // Agendamento
        if(sucesso){
            const agendamento = new ChamarAlunoDaFilaExternaParaCatraca(this.timestamp,this.refeitorio,this.maquinaEventos)
            this.maquinaEventos.adicionarEvento(agendamento);
        }
        
        if(this.timestamp >= this.simulador.getSimulacao().parameters.serviceInterval){
            this.refeitorio.getCatraca().TravarCatraca();
        }
    }

}