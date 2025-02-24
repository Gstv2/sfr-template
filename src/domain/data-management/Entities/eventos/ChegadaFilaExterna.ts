import { Evento } from "./Evento";
import { Aluno } from "../sistema/alunos";
import { FilaExterna } from "../sistema/FilaExterna";
import { MaquinaEventos } from "./MaquinaDeEventos";

export class ChegadaFilaExterna extends Evento {
    private aluno : Aluno;
    constructor(aluno: Aluno, timestamp: number, refeitorio: Refeitorio, maquina: MaquinaEventos){
        super(timestamp, refeitorio, maquina);
        this.aluno = aluno;
    }

    processarEvento(): void {
        this.refeitorio.ChegadaFilaExterna(this.aluno);
    }

}
