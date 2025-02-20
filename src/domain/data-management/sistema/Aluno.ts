export class Aluno {
    private InstanteFilaExterna: number;
    private InstanteCatraca: number;
    private tempoDigitarMatricula: number;
    private InstanteFilainterna: number;
    private InstanteAtendimento: number;
    private tempoAtendimento: number;
    private InstanteNaMesa: number;
    private tempoComer: number;

    constructor(tempoDigitarMatricula:number, tempoAtendimento:number, tempoComer:number){
        this.tempoDigitarMatricula = tempoDigitarMatricula;
        this.tempoAtendimento = tempoAtendimento;
        this.tempoComer = tempoComer;

    }


    // Métodos setters para definir os valores das propriedades
    public setInstanteFilaExterna(instante: number): void {
        this.InstanteFilaExterna = instante;
    }

    public setInstanteCatraca(instante: number): void {
        this.InstanteCatraca = instante;
    }

    public setInstanteFilainterna(instante: number): void {
        this.InstanteFilainterna = instante;
    }

    public setInstanteAtendimento(instante: number): void {
        this.InstanteAtendimento = instante;
    }

    public setInstanteNaMesa(instante: number): void {
        this.InstanteNaMesa = instante;
    }

    // Métodos getters para obter os valores das propriedades
    public getTempoDigitarMatricula(): number {
        return this.tempoDigitarMatricula;
    }

    public getTempoAtendimento(): number {
        return this.tempoAtendimento;
    }

    public getTempoComer(): number {
        return this.tempoComer;
    }

    // Método para calcular o tempo médio considerando os tempos definidos
    public calcularTempoMedio():number {
        if(!this.InstanteFilaExterna || !this.InstanteCatraca || !this.InstanteFilainterna || !this.InstanteAtendimento || !this.InstanteNaMesa){
            throw new Error("Não é possivel calcular o tempo de espera de um aluno que não chegou ou não foi atendido ou .... ")
        }

        return this.InstanteFilaExterna - this.InstanteAtendimento;
    }
}
