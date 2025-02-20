import { FilaExterna } from './filaExterna'
import { Catraca } from './catraca'
import { FilaInterna } from './filaInterna'
import { Atendimento } from './atendimento'
import { RepositorioMesas } from './salão'
import { Aluno } from './Aluno'


export class Refeitorio{
    private filaExterna: FilaExterna;
    private catraca: Catraca;
    private filaInterna: FilaInterna;
    private atendimento: Atendimento;
    private salão: RepositorioMesas;

    constructor(tamanhoFila:number){
        this.filaExterna = new FilaExterna();
        this.catraca = new Catraca();
        this.filaInterna = new FilaInterna(tamanhoFila);
        this.atendimento = new Atendimento();
        this.salão = new RepositorioMesas();
    }

    chegarAlunoFilaExterna(aluno:Aluno):Boolean{
        this.filaExterna.adicionarAluno(aluno);
        return true;
    }

    moverAlunoParaCatraca():number{
        const aluno:Aluno = this.filaExterna.removerAluno();
        this.catraca.adicionarAluno(aluno);
        return aluno.getTempoDigitarMatricula();
    }

    chegarAlunoFilaInterna(aluno:Aluno):Boolean{
        if(this.filaInterna.lotado()){
            return false;
        }

        this.filaInterna.adicionarAluno(aluno);
        return true;
    }

    moverAlunoParaAtendimento():number{
        const aluno:Aluno = this.filaInterna.removerAluno();
        this.atendimento.adicionarAluno(aluno);
        return aluno.getTempoAtendimento();
    }

    moverAlunoParaMesa():number{
        const aluno:Aluno = this.filaExterna.removerAluno();
        this.catraca.adicionarAluno(aluno);
        return aluno.getTempoDigitarMatricula();
    }

    finalizarAtendimento():Aluno{
        return this.salão.removerAluno();
    }

    filaExternaVazia():Boolean{
        return this.filaExterna.verificarSeTemAlguem() == 0;
    }
    
    filaInternaVazia():Boolean{
        return this.filaInterna.verificarSeTemAlguem() == 0;
    }

    catracaEstaDisponivel():Boolean{
        return this.catraca.disponivel() == 0;
    }

    atendimentoEstaDisponivel():Boolean{
        return this.atendimento.disponivel() == 0;
    }
}