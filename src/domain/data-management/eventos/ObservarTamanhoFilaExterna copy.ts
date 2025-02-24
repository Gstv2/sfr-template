import { Evento } from "./Evento";

export class ObservarTamanhoFilaExterna extends Evento{

    processarEvento(): void {
        const tamanhoFilaExterna = this.refeitorio.tamanhoAtualFilaExterna();
        this.maquinaEventos.getObservador().observarTamanhoFilaExterna(tamanhoFilaExterna);
    }
}