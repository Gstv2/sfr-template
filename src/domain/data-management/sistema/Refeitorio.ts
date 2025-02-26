import { FilaExterna } from '../sistema/FilaExterna'
import { FilaInterna } from '../sistema/FilaInterna'
import { Atendimento } from '../sistema/Atendimento'
import { MesaRepository } from '../sistema/RepositoryMesa'
import { Aluno } from './Aluno'
import { Mesa } from '../sistema/Mesa'
import { Catraca } from '../sistema/Catraca'


export class Refeitorio{
    private filaExterna: FilaExterna;
    private catraca: Catraca;
    private filaInterna: FilaInterna;
    private atendimento: Atendimento;
    private salão: MesaRepository;

    constructor(tamanhoFila:number, limiteMesas:number){
        this.filaExterna = new FilaExterna();
        this.catraca = new Catraca();
        this.filaInterna = new FilaInterna(tamanhoFila);
        this.atendimento = new Atendimento();
        this.salão = new MesaRepository(limiteMesas);
    }

    public getFilaInterna(){
        return this.filaInterna;
    }
    public getRepositorioMesas(){
        return this.salão;
    }
    public getCatraca(){
        return this.catraca;
    }

    chegarAlunoFilaExterna(aluno:Aluno):boolean{
        this.filaExterna.AddAluno(aluno);
        return true;
    }

    moverAlunoParaCatraca():number{
        if(this.filaInterna.estaLotada()){
            this.catraca.TravarCatraca();
            
        }
        const aluno:Aluno = this.filaExterna.DelAluno();
        this.catraca.AddAluno(aluno);
        return aluno.getTempoDigitarMatricula();
    }

    moverAlunoParaFilaInterna():boolean{
        if(this.filaInterna.estaLotada()){
            return false;
        }
        
        const aluno:Aluno = this.catraca.DelAluno();
        this.filaInterna.adicionarAluno(aluno);
        return true;
    }

    moverAlunoParaAtendimento():number{
        const aluno:Aluno = this.filaInterna.removerAluno();
        this.atendimento.adicionarAluno(aluno);
        return aluno.getTempoAtendimento();
    }

    moverAlunoParaMesa():number{
        const mesa: Mesa = this.salão.buscarMesaDisponivel();
        const aluno:Aluno = this.filaExterna.DelAluno();
        mesa.addAluno(aluno);
        return aluno.getTempoDigitarMatricula();
    }

    desbloquearCatraca():boolean{
        if(!this.catraca.verificarTravada()){
            throw new Error('Não pode destrava uma catraca que não esta travada');
        }

        this.catraca.LiberarCatraca();
        return true;
    }
    desbloquearAtendimento():boolean{
        if(!this.atendimento.getBloqueado()){
            throw new Error('Não pode destrava um atendimento que não esta bloqueado');
        }
        this.atendimento.desbloquerAtendimento();
        return true;

    }

    finalizarAtendimento(tempo):void{
        return this.getRepositorioMesas().liberarMesasAposTempo(tempo);
    }

    filaExternaVazia():boolean{
        return this.filaExterna.tamanhoFilaExterna() == 0;
    }
    
    filaInternaVazia():boolean{
        return this.filaInterna.tamanhoFilaInterna() == 0;
    }

    catracaEstaDisponivel():boolean{
        return this.catraca.estaDiponivel();
    }

    atendimentoEstaDisponivel():boolean{
        return this.atendimento.estaDiponivel();
    }

    public tamanhoAtualFilaExterna(){
        return this.filaExterna.tamanhoFilaExterna();
    }

    public tamanhoAtualFilaInterna(){
        return this.filaInterna.tamanhoFilaInterna();
    }
}