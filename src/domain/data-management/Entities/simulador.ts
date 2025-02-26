import { SimulatorI } from "@/adapter/interfaces/simulator-interface";
import { ChegadaAluno } from "../eventos/ChegadaAluno";
import { MaquinaEventos } from "../eventos/MaquinaEventos";
import { ObservarTamanhoFilaExterna } from "../Eventos/ObservarTamanhoFilaExterna";
import { ObservarTamanhoFilaInterna } from "../Eventos/ObservarTamanhoFilaInterna";
import { Aluno } from "../Sistema/Aluno";
import { Refeitorio } from "../Sistema/Refeitorio";
import { Simulation } from "./simulation";

export class Simulador implements SimulatorI{
    private refeitorio: Refeitorio;
    private maquina: MaquinaEventos;
    private simulacao: Simulation;

    constructor(simulacao: Simulation){
        this.simulacao = simulacao;
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
            const eventoObservacaoFilaExterna = new ObservarTamanhoFilaExterna(instanteObservacao, this.refeitorio, this.maquina);
            const eventoObservacaoFilaInterna = new ObservarTamanhoFilaInterna(instanteObservacao, this.refeitorio, this.maquina);
            this.maquina.adicionarEvento(eventoObservacaoFilaExterna);
            this.maquina.adicionarEvento(eventoObservacaoFilaInterna);
        }
    }

    private confirgurarChegadasAluno():void{ 
        for(let i = 0;i<this.simulacao.parameters.studentCount;i++){

            const tempoDeAtendimento = Math.random()*2* this.simulacao.parameters.servingTime;
            const tempoDeDigitarMatricula = Math.random()*2* this.simulacao.parameters.registrationTime;
            const tempoDeComer = Math.random()*2* this.simulacao.parameters.tableTime;
            const aluno = new Aluno(tempoDeDigitarMatricula,tempoDeAtendimento,tempoDeComer);

            const instanteDeChegada = Math.random() * this.simulacao.parameters.serviceInterval;
            const chegadaAluno = new ChegadaAluno(aluno, instanteDeChegada, this.refeitorio, this.maquina);

            this.maquina.adicionarEvento(chegada);
        }
    }

    startSimulation(simulation: Simulation, onProgressUpdate: (progress: number) => void, onError: (error: Error) => void): () => void {
        console.log('simulação iniciada!')
        this.maquina.processarEventos();
        const resultados = this.maquina.getObservador().computarResultados();
        this.simulacao.results = resultados;
        console.log('simulação finalizada!')
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