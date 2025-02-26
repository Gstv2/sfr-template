import { ChamarAlunoDaFilaExternaParaCatraca } from "./ChamarAlunoDaFilaExternaParaCatraca";
import { DesbloquearCatraca } from "../Eventos/DesbloquearCatraca";
import { Evento } from "./Evento";

export class ChamarAlunoDaCatracaParaFilaInterna extends Evento{
    
    processarEvento(): void {
        console.log(`Evento - ChegadaAlunoFilaInterna - ${this.timestamp}`);
        
        const CatracaEstavaVazia = this.refeitorio.catracaEstaDisponivel();
        const sucesso = this.refeitorio.moverAlunoParaFilaInterna();

        
        if (sucesso && CatracaEstavaVazia && this.refeitorio.catracaEstaDisponivel()){
            const agendamento1 = new ChamarAlunoDaFilaExternaParaCatraca(this.timestamp,this.refeitorio,this.maquinaEventos);
            this.maquinaEventos.adicionarEvento(agendamento1);
        }

        const quatidadeAlunoDestravaCatraca = this.simulador.getSimulacao().parameters.turnstileLimit;
        const quantidadeAlunoAtualFilainterna = this.refeitorio.tamanhoAtualFilaInterna();
        
        if(quantidadeAlunoAtualFilainterna == quantidadeAlunoAtualFilainterna - quatidadeAlunoDestravaCatraca){
            const agendamento2 = new DesbloquearCatraca(this.timestamp,this.refeitorio,this.maquinaEventos);
            this.maquinaEventos.adicionarEvento(agendamento2);
        }

        if(sucesso){
            this.maquinaEventos.getObservador().observarquantidadeAlunoAtendido();
        }
    }
}