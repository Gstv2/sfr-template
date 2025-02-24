import { FilaExterna } from './FilaExterna'
import { Catraca } from './catraca'
import { FilaInterna } from './FilaInterna'
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

    chegarAlunoFilaExterna(aluno:Aluno):boolean{
        this.filaExterna.AddAluno(aluno);
        return true;
    }

    moverAlunoParaCatraca():number{
        const aluno:Aluno = this.filaExterna.DelAluno();
        this.catraca.adicionarAluno(aluno);
        return aluno.getTempoDigitarMatricula();
    }

    moverAlunoParaFilaInterna():boolean{
        if(this.filaInterna.estaLotada()){
            return false;
        }
        
        const aluno:Aluno = this.catraca.removerAluno();
        this.filaInterna.adicionarAluno(aluno);
        return true;
    }

    moverAlunoParaAtendimento():number{
        const aluno:Aluno = this.filaInterna.removerAluno();
        this.atendimento.adicionarAluno(aluno);
        return aluno.getTempoAtendimento();
    }

    moverAlunoParaMesa():number{
        const aluno:Aluno = this.filaExterna.DelAluno();
        this.catraca.adicionarAluno(aluno);
        return aluno.getTempoDigitarMatricula();
    }

    finalizarAtendimento():Aluno{
        return this.salão.removerAluno();
    }

    filaExternaVazia():boolean{
        return this.filaExterna.tamanhoFilaExterna() == 0;
    }
    
    filaInternaVazia():boolean{
        return this.filaInterna.tamanhoFilaInterna() == 0;
    }

    catracaEstaDisponivel():boolean{
        return this.catraca.disponivel() == 0;
    }

    atendimentoEstaDisponivel():boolean{
        return this.atendimento.disponivel() == 0;
    }

    public tamanhoAtualFilaExterna(){
        return this.filaExterna.tamanhoFilaExterna();
    }

    public tamanhoAtualFilaInterna(){
        return this.filaInterna.tamanhoFilaInterna();
    }
}