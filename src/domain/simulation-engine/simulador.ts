import { ChegadaAluno } from "../data-management/Eventos/ChegadaAluno";
import { MaquinaEventos } from "../data-management/Eventos/MaquinaEventos";
import { ObservarTamanhoFilaExterna } from "../data-management/Eventos/ObservarTamanhoFilaExterna";
import { ObservarTamanhoFilaInterna } from "../data-management/Eventos/ObservarTamanhoFilaInterna";
import { Aluno } from "../data-management/Sistema/Aluno";
import { Refeitorio } from "../data-management/Sistema/Refeitorio";
import { Simulation } from "../data-management/Entities/simulation";
import { GaussianRandom, ExponentialRandom, UniformRandom } from "@/domain/simulation-engine/util/random-generators";
import { SimulatorI } from "@/adapter/interfaces/simulator-interface";
import { MetricOverTime, SimulationResults } from "../data-management/Entities/simulation-results";


export class Simulator implements SimulatorI {
  private intervalId?: number;
  private currentProgress = 0;
  private simulador: Simulator | null = null;
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
    this.currentProgress = 0;
    
    // Simulação de progresso com intervalo de 1 segundo
    this.intervalId = window.setInterval(() => {
      try {
        this.currentProgress += 10;
        
        

        // Completa a simulação quando chegar a 100%
        if (this.currentProgress >= 100) {
          simulation.status = "completed";
          simulation.completedAt = new Date().toISOString();
          this.completeSimulation(simulation);
          this.clearInterval();
        }
        // Atualiza progresso
        onProgressUpdate(Math.min(this.currentProgress, 100));
      } catch (error) {
        this.clearInterval();
        onError(error instanceof Error ? error : new Error("Simulation failed"));
      }
    }, 1000);

    return this.cancelSimulation.bind(this);
  }



  /**
 * Completa a simulação e gera resultados fictícios.
 * @param simulation - A simulação a ser completada.
 */
  private completeSimulation(simulation: Simulation): void {
    simulation.status = "completed";
    simulation.completedAt = new Date().toISOString();
    simulation.results = this.generateResults();
    console.log("Simulation completed", simulation);
  }
  /**
   * Gera resultados fictícios para a simulação.
   * @returns Resultados fictícios da simulação.
   */
  private generateResults(): SimulationResults {
    const duration = this.simulacao.parameters.serviceInterval; // 1 minuto em ms
    return new SimulationResults(
      this.generateMetricData(duration, 0, this.simulacao.parameters.internalQueueLimit),  // Fila interna
      this.generateMetricData(duration, 0, 15),  // Fila externa
      this.generateMetricData(duration, 0, this.simulacao.parameters.tableLimit), // Ocupação das mesas
      this.randomBetween(0, 20),                 // Tempo médio de espera
      this.randomBetween(5, 15),                 // Média fila externa
      this.randomBetween(5, 15),                // Média fila interna
      100,                                       // Ocupação máxima
      duration,                                  // Duração da simulação,
      duration
    );
  }
  /**
     * Gera dados métricos fictícios ao longo do tempo.
     * @param duration - Duração da simulação em milissegundos.
     * @param min - Valor mínimo da métrica.
     * @param max - Valor máximo da métrica.
     * @returns Uma lista de métricas ao longo do tempo.
     */
    private generateMetricData(
      duration: number,
      min: number,
      max: number
    ): MetricOverTime[] {
      const data: MetricOverTime[] = [];
      const steps = 10;
      
      for (let i = 0; i <= steps; i++) {
        data.push(new MetricOverTime((duration / steps) * i, this.randomBetween(min, max)));
      }
      return data;
    }
  
    /**
     * Gera um número aleatório entre min e max.
     * @param min - Valor mínimo.
     * @param max - Valor máximo.
     * @returns Um número aleatório entre min e max.
     */
    private randomBetween(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    /**
     * Cancela a simulação em andamento.
     */
    private cancelSimulation(): void {
      this.clearInterval();
      this.currentProgress = 0;
    }
  
    /**
     * Limpa o intervalo da simulação.
     */
    private clearInterval(): void {
      if (this.intervalId) {
        window.clearInterval(this.intervalId);
        this.intervalId = undefined;
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
