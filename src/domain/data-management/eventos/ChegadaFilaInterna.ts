import { Evento } from "./Evento";

export class ChegadaFilaInterna extends Evento{
    
    processarEvento(): void {
        console.log(`Evento - ChegadaAlunoFilaInterna - ${this.timestamp}`);
        
        const filaEstavaVazia = this.refeitorio.catracaEstaDisponivel();
        const sucesso = this.posto.chegadaCarro(this.carro);
        this.carro.setinstanteDeChegada(this.timestamp);

        if (sucesso && filaEstavaVazia && this.posto.estacaoEstaDisponivel()){
            const agendamento1 = new ChamarCarroDaFilaParaAbastecimento(this.timestamp,this.posto,this.maquinaEventos);
            this.maquinaEventos.adicionarEvento(agendamento1);
        }

        if(sucesso){
            this.maquinaEventos.getObservador().observarCarroAtendido();
        }
    }
}