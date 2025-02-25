import { Aluno } from "../sistema/aluno";
import { MaquinaEventos } from "./maquinaEventos";
import { Refeitorio } from "../sistema/reitorio";
import { Evento } from "./evento";
import { ChamarAlunoAtendimento } from "./ChamarAlunoAtendimento";

export class ChegadaFilaInterna extends Evento {
    private aluno: Aluno;

    constructor(timestamp: number, refeitorio: Refeitorio, maquina: MaquinaEventos, aluno: Aluno) {
        super(timestamp, refeitorio, maquina);
        this.aluno = aluno;
    }

    processarEvento(): void {
        console.log(`Evento - ChegadaFilaInterna - ${this.timestamp}`);

        // Adiciona o aluno na fila interna
        this.refeitorio.getFilaInterna().adicionarAluno(this.aluno);
        console.log(`Aluno adicionado à fila interna.`);

        // Agendar o evento de chamar para atendimento
        this.maquina.agendarEvento(new ChamarAlunoAtendimento(this.timestamp, this.refeitorio, this.maquina, this.aluno));
    }
}
