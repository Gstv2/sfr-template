import { Evento } from "./Evento";

export class ObservarTamanhoFilaInterna extends Evento{

    processarEvento(): void {
        const tamanhoFilaInterna = this.refeitorio.tamanhoAtualFilaInterna();
        this.maquinaEventos.getObservador().observarTamanhoFilaInterna(tamanhoFilaInterna);
    }
}