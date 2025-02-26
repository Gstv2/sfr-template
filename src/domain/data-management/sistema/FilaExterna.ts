import { Aluno } from "./Aluno";

export class FilaExterna {
    private alunos: Aluno[] = [];

    public AddAluno(aluno: Aluno): void {
        this.alunos.push(aluno); 
    }

    public DelAluno(): Aluno {
        if (this.alunos.length == 0) {
            throw new Error("não tem vacilão.");
        }
        return this.alunos.shift()!;
    }

    public tamanhoFilaExterna():number{
        return this.alunos.length;
    }
}