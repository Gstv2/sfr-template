import { ChegadaCarro } from "../eventos/ChegadaAluno";
import { MaquinaEventos } from "../eventos/MaquinaEventos";
import { ObservarTamanhoFila } from "../eventos/ObservarTamanhoFila";
import { Aluno } from "../sistema/Aluno";
import { Refeitorio } from "../sistema/Refeitorio";
import { Simulation } from "./simulation";

export class Simulador{
    private refeitorio: Refeitorio;
    private maquina: MaquinaEventos;
    private simulacao: Simulation;

    constructor(simulacao: Simulation){
        this.simulacao = simulacao
        this.refeitorio = new Refeitorio(this.simulacao.parameters.internalQueueLimit);
        this.maquina = new MaquinaEventos();
        this.confirgurarChegadasAluno();
        this.confirgurarObservacoesFila();
    }

    private confirgurarObservacoesFila():void{
        const intervaloEntreObservacoes = 10;
        const quantidadeObservacoes = this.simulacao.parameters.serviceInterval / intervaloEntreObservacoes;

        for(let i = 0;i<quantidadeObservacoes;i++){
            const instanteObservacao = i*intervaloEntreObservacoes;
            const eventoObservacao = new ObservarTamanhoFila(instanteObservacao, this.refeitorio, this.maquina);
            this.maquina.adicionarEvento(eventoObservacao);
        }
    }

    private confirgurarChegadasAluno():void{ 
        for(let i = 0;i<this.simulacao.parameters.studentCount;i++){

            const tempoDeAtendimento = Math.random()*2* this.simulacao.parameters.servingTime;
            const tempoDeDigitarMatricula = Math.random()*2* this.simulacao.parameters.registrationTime;
            const tempoDeComer = Math.random()*2* this.simulacao.parameters.tableTime;
            const aluno = new Aluno(tempoDeDigitarMatricula,tempoDeAtendimento,tempoDeComer);

            const instanteDeChegada = Math.random() * this.simulacao.parameters.serviceInterval;
            const chegada = new ChegadaCarro(aluno, instanteDeChegada, this.refeitorio, this.maquina);

            this.maquina.adicionarEvento(chegada);
        }
    }

    public executarSimulacao():void{
        console.log('simulação iniciada!')
        this.maquina.processarEventos();
        const resultados = this.maquina.getObservador().computarResultados();
        this.simulacao.results = resultados;
        console.log('simulação finalizada!')
    }

    public getSimulacao(): Simulation{
        return this.simulacao;
    }



}