import { Evento } from "./Evento";
import { Aluno } from "../sistema/alunos";
import { Catraca } from "../sistema/Catraca";
import { MaquinaEventos } from "./MaquinaDeEventos";

export class ChegadaCatraca extends Evento {
    constructor(
        private aluno: Aluno,
        timestamp: number,
        private catraca: Catraca,
        maquina: MaquinaEventos
    ) {
        super(timestamp, catraca, maquina);
    }

    processarEvento(): void {
        this.catraca.AddAluno(this.aluno);
    }
}