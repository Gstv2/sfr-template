import { Refeitorio } from "../sistema/Refeitorio";
import { MaquinaEventos } from "../eventos/MaquinaEventos";
import { Aluno } from "../Sistema/Aluno";
import { Evento } from "../eventos/Evento";
import { ChamarAlunoDaFilaExternaParaCatraca } from "../eventos/ChamarAlunoDaFilaExternaParaCatraca";

export class ChegadaAluno extends Evento {
    private aluno : Aluno;
    constructor(aluno: Aluno, timestamp: number, refeitorio: Refeitorio, maquina: MaquinaEventos){
        super(timestamp, refeitorio, maquina);
        this.aluno = aluno;
    }
    
    processarEvento(): void {
        console.log(`Evento - ChegadaAluno - ${this.timestamp}`)

        const sucesso = this.refeitorio.chegarAlunoFilaExterna(this.aluno);
        this.aluno.setInstanteFilaExterna(this.timestamp);

        if (sucesso && this.refeitorio.catracaEstaDisponivel()){
            const agendamento1 = new ChamarAlunoDaFilaExternaParaCatraca(this.timestamp,this.refeitorio,this.maquinaEventos);
            this.maquinaEventos.adicionarEvento(agendamento1);
        }
    }

}