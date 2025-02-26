import { Aluno } from './Aluno.ts'; // Import da classe Aluno

export class Catraca {
    private aluno: Aluno | undefined;
    private travada: boolean = false; 

    public AddAluno(aluno: Aluno): void {
        if (this.travada) {
            throw new Error("Catraca travada! Aguarde liberação.");
        }

        if (this.aluno) {
            throw new Error("Catraca ocupada! Aguarde a liberação antes de adicionar um novo aluno.");
        }

        this.aluno = aluno;
        console.log(`Aluno com ID ${aluno} entrou na catraca.`);
    }

    public DelAluno(): Aluno | undefined {
        if (!this.aluno){
            throw new Error("Nenhum aluno presente na catraca.");
        }

        const alunoRemovido = this.aluno;
        this.aluno = undefined;
        console.log(`Aluno com ID ${alunoRemovido} saiu da catraca.`);
        return alunoRemovido;
    }

    public estaDiponivel():boolean{
        return !this.aluno;
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