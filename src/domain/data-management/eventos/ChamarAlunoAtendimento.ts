import { Aluno } from "../sistema/aluno";
import { Atendimento } from "../sistema/atendimento";
import { MaquinaEventos } from "./maquinaEventos";
import { Refeitorio } from "../sistema/reitorio";
import { Evento } from "../eventos/evento";


class ChamarAlunoAtendimento extends Evento {
    private aluno: Aluno;

    constructor(timestamp: number, refeitorio: Refeitorio, maquina: MaquinaEventos, aluno: Aluno) {
        super(timestamp, refeitorio, maquina);
        this.aluno = aluno;
    }

    processarEvento(): void {
        console.log(`Evento - ChegadaAlunoAtendimento - ${this.timestamp}`);

        const filaEstavaVazia = this.refeitorio.criarFilaInterna();
        const sucesso = this.refeitorio.criarAtendimento(this.aluno);

        if (sucesso && filaEstavaVazia) {
            const agendamento1 = new Atendimento(this.timestamp, this.refeitorio, this.maquina); 
            this.maquina
        }
    }
}

