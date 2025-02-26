import { ChegadaAluno } from "../data-management/eventos/ChegadaAluno";
import { MaquinaEventos } from "../data-management/eventos/MaquinaEventos";
import { ObservarTamanhoFilaExterna } from "../data-management/eventos/ObservarTamanhoFilaExterna";
import { ObservarTamanhoFilaInterna } from "../data-management/eventos/ObservarTamanhoFilaInterna";
import { Aluno } from "../data-management/sistema/Aluno";
import { Refeitorio } from "../data-management/sistema/Refeitorio";
import { Simulation } from "../data-management/Entities/simulation";
import { GaussianRandom, ExponentialRandom, UniformRandom } from "@/domain/simulation-engine/util/random-generators";
import { SimulatorI } from "@/adapter/interfaces/simulator-interface";


export class Simulator implements SimulatorI {
  private simulador: Simulator | null = null;
  private cancelSimulation: boolean = false;
  private refeitorio: Refeitorio;
  private maquina: MaquinaEventos;
  private simulacao: Simulation;

  constructor(simulacao: Simulation){
      this.simulacao = simulacao;
      this.refeitorio = new Refeitorio(this.simulacao.parameters.internalQueueLimit, this.simulacao.parameters.tableLimit);
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
          let instanteDeChegada;

          if(this.simulacao.parameters.arrivalDistribution == 'normal'){
              instanteDeChegada = new GaussianRandom().next() * this.simulacao.parameters.serviceInterval;
          }
          if(this.simulacao.parameters.arrivalDistribution == 'exp'){
              instanteDeChegada = new ExponentialRandom().next() * this.simulacao.parameters.serviceInterval;
          }
          if(this.simulacao.parameters.arrivalDistribution == 'uniform'){
              instanteDeChegada = new UniformRandom().next() * this.simulacao.parameters.serviceInterval;
          }

          const chegadaAluno = new ChegadaAluno(aluno, instanteDeChegada, this.refeitorio, this.maquina);
          

          this.maquina.adicionarEvento(chegadaAluno);
      }
  }

  startSimulation(
      simulation: Simulation,
      onProgressUpdate: (progress: number) => void,
      onError: (error: Error) => void
    ): () => void {
      this.simulador = new Simulator(simulation);
      this.cancelSimulation = false;
  
      try {
        console.log("Iniciando simulação...");
        
        setTimeout(() => {
          if (this.cancelSimulation) {
            console.log("Simulação cancelada.");
            return;
          }
          
          this.simulador!.executarSimulacao();
          onProgressUpdate(100);
          console.log("Simulação finalizada com sucesso.");
        }, 100);
        
        return () => {
          this.cancelSimulation = true;
        };
      } catch (error) {
        onError(error as Error);
        return () => {};
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
