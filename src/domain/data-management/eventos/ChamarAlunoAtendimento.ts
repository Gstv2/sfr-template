import { Aluno } from "../sistema/aluno";
import { MaquinaEventos } from "./maquinaEventos";
import { Refeitorio } from "../sistema/reitorio";
import { Evento } from "./evento";

export class ChamarAlunoAtendimento extends Evento {
    private aluno: Aluno;

    constructor(timestamp: number, refeitorio: Refeitorio, maquina: MaquinaEventos, aluno: Aluno) {
        super(timestamp, refeitorio, maquina);
        this.aluno = aluno;
    }

    processarEvento(): void {
        console.log(`Evento - ChamarAlunoAtendimento - ${this.timestamp}`);

        // Lógica para processar o evento
        try {
            const atendimento = this.refeitorio.getFilaAtendimento();
            const alunoAtendido = atendimento.removerAluno();
            console.log(`Aluno está sendo atendido.`);
        } catch (error) {
            console.log(`Erro ao remover aluno da fila de atendimento: ${error.message}`);
        }
    }

}