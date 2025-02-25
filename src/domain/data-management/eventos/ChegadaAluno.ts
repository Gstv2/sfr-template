import { Refeitorio } from "../Sistema/Refeitorio";
import { MaquinaEventos } from "./MaquinaEventos";
import { Aluno } from "../Sistema/Aluno";
import { Evento } from "./Evento";
import { ChamarAlunoDaFilaExternaParaCatraca } from "./ChamarAlunoDaFilaExternaParaCatraca";

export class ChegadaFilaExterna extends Evento {
    private aluno : Aluno;
    constructor(aluno: Aluno, timestamp: number, refeitorio: Refeitorio, maquina: MaquinaEventos){
        super(timestamp, refeitorio, maquina);
        this.aluno = aluno;
    }
    
    processarEvento(): void {
        const sucesso = this.refeitorio.chegarAlunoFilaExterna(this.aluno);
        this.aluno.setInstanteFilaExterna(this.timestamp);

        if (sucesso && this.refeitorio.catracaEstaDisponivel()){
            const agendamento1 = new ChamarAlunoDaFilaExternaParaCatraca(this.timestamp,this.refeitorio,this.maquinaEventos);
            this.maquinaEventos.adicionarEvento(agendamento1);
        }
    }

}