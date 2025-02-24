import { SimulationResults } from "../Entities/simulation-results"

export class Observador{    
    quantidadeDeCarrosAtendidos: number;
    somatoriaTemposEspera: number;
    tamanhosFilaExterna:number[];
    tamanhosFilaInterna:number[];

    constructor(){
        this.quantidadeDeCarrosAtendidos = 0;
        this.somatoriaTemposEspera = 0;
        this.tamanhosFilaExterna = [];
        this.tamanhosFilaInterna = [];
    }

    public observarAlunoAtendido(){
        this.quantidadeDeCarrosAtendidos++;
    }

    public observarTemposEspera(tempoEspera:number){
        this.somatoriaTemposEspera = this.somatoriaTemposEspera + tempoEspera;
    }

    public observarTamanhoFilaExterna(tamanhoFilaExterna:number){
        this.tamanhosFilaExterna.push(tamanhoFilaExterna);
    }

    public observarTamanhoFilaInterna(tamanhoFilaInterna:number){
        this.tamanhosFilaInterna.push(tamanhoFilaInterna);
    }

    public computarResultados(): SimulationResults{

        const tempoMedioEspera = this.somatoriaTemposEspera / this.quantidadeDeCarrosAtendidos;
        const tamanhoMedioFilaExterna = this.tamanhosFilaExterna.reduce((a,b)=>a+b) / this.tamanhosFilaExterna.length;
        const tamanhoMedioFilaInterna = this.tamanhosFilaInterna.reduce((a,b)=>a+b) / this.tamanhosFilaInterna.length;

        return new SimulationResults(this.quantidadeDeCarrosAtendidos, tempoMedioEspera, tamanhoMedioFilaInterna, tamanhoMedioFilaExterna);
    }

}