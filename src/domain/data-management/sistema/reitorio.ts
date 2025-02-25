import { Aluno } from "./aluno";
import { Atendimento } from "./atendimento";
import { FilaInterna } from "./filaInterna";


export class Refeitorio{
    private filaInterna: FilaInterna;
    private filaAtendimento: Atendimento;

    constructor(maxOcupacaoInterna: number, maxOcupacaoAtendimento: number) {
        this.filaInterna = new FilaInterna(maxOcupacaoInterna);
        this.filaAtendimento = new Atendimento(maxOcupacaoAtendimento);
    }

    getFilaInterna(): FilaInterna {
        return this.filaInterna;
    }

    getFilaAtendimento(): Atendimento {
        return this.filaAtendimento;
    }

}