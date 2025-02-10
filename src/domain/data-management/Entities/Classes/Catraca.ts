import { Aluno } from './Aluno.ts'; // Import da classe Aluno

export class Catraca {
    private id_catraca: number;
    private aluno: Aluno | undefined;

    constructor(id: number) {
        this.id_catraca = id;
        this.aluno = undefined;
    }

    public AddAluno(aluno: Aluno): void {
        if (!aluno) {
            throw new Error("Aluno inválido.");
        }

        if (this.aluno === undefined) {
            this.aluno = aluno;
            console.log(`Aluno com ID ${aluno.id} entrou na catraca.`);
        } else {
            console.log("Catraca ocupada! Aguarde a liberação.");
        }
    }

    public DelAluno(): Aluno | undefined {
        if (!this.aluno) {
            throw new Error("Nenhum aluno presente na catraca.");
        }

        const alunoRemovido = this.aluno;
        this.aluno = undefined;
        console.log(`Aluno com ID ${alunoRemovido.id} saiu da catraca.`);
        return alunoRemovido;
    }

    public verificarOcupado(): boolean {
        return this.aluno !== undefined;
    }
}