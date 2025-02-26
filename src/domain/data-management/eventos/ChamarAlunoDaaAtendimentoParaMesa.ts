import { DesbloquearAtendimento } from "./DesbloquearAtendimento";
import { Evento } from "./Evento";

export class ChamarAlunoDoaAtendimentoParaMesa extends Evento{
    processarEvento(): void {
        console.log(`Evento - ChamarAlunoDoaAtendimentoParaMesa - ${this.timestamp}`);
                
        const tempoComer = this.refeitorio.moverAlunoParaMesa();

        this.refeitorio.finalizarAtendimento(tempoComer);

        if(this.refeitorio.getRepositorioMesas().buscarMesaDisponivel()){
            const agendamento2 = new DesbloquearAtendimento(this.timestamp,this.refeitorio,this.maquinaEventos);
            this.maquinaEventos.adicionarEvento(agendamento2);
        }

        if(!this.refeitorio.atendimentoEstaDisponivel()){
            const agendamento = new ChamarAlunoDoaAtendimentoParaMesa(this.timestamp, this.refeitorio, this.maquinaEventos);
            this.maquinaEventos.adicionarEvento(agendamento);
        }
    

    }
}