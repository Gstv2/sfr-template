import { Evento } from "./Evento";
import { Aluno } from "../sistema/alunos";
import { Catraca } from "../sistema/Catraca";
import { MaquinaEventos } from "./MaquinaDeEventos";

export class ChegadaCatraca extends Evento {
    aluno: Aluno; 
    catraca: Catraca;

    constructor(aluno: Aluno, timestamp: number, catraca: Catraca, maquina: MaquinaEventos) {
        super(timestamp, catraca, maquina);
        this.aluno = aluno; 
        this.catraca = catraca;
    }

    processarEvento(): void {
        this.catraca.AddAluno(this.aluno);
    }
}