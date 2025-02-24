import { Aluno } from './Aluno.ts'; // Import da classe Aluno

export class Catraca {
    private id_catraca: number;
    private aluno: Aluno | undefined;
    private ocupada: boolean;
    private travada: boolean; 

    constructor(id: number) {
        this.id_catraca = id;
        this.aluno = undefined;
        this.ocupada = false;
        this.travada = false; 
    }

    public AddAluno(aluno: Aluno): void {
        if (this.travada) {
            throw new Error("Catraca travada! Aguarde liberação.");
        }

        if (this.ocupada) {
            throw new Error("Catraca ocupada! Aguarde a liberação antes de adicionar um novo aluno.");
        }

        this.aluno = aluno;
        this.ocupada = true;
        console.log(`Aluno com ID ${aluno.id} entrou na catraca.`);
    }

    public DelAluno(): Aluno | undefined {
        if (!this.ocupada) {
            throw new Error("Nenhum aluno presente na catraca.");
        }

        let alunoRemovido = this.aluno;
        this.aluno = undefined;
        this.ocupada = false;

        console.log(`Aluno com ID ${alunoRemovido?.id} saiu da catraca.`);
        return alunoRemovido;
    }

    public verificarOcupado(): boolean {
        return this.ocupada;
    }

    public TravarCatraca(): void {
        this.travada = true;
        console.log("Catraca travada! Fila interna cheia.");
    }

    public LiberarCatraca(): void {
        this.travada = false;
        console.log("Catraca liberada! Há espaço na fila interna.");
    }

    public verificarTravada(): boolean {
        return this.travada;
    }
}
