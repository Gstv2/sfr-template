import { Aluno } from "./Aluno";

export class FilaExterna {
    alunos: Aluno[] = [];

    AddAluno(aluno: Aluno): void {
        this.alunos.push(aluno); 
    }

    DelAluno(): Aluno {
        if (this.alunos.length == 0) {
            throw new Error("não tem vacilão.");
        }
        return this.alunos.shift()!;
    }

    public tamanhoFilaExterna():number{
        return this.alunos.length;
    }
}