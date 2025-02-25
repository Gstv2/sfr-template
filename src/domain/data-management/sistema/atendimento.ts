import { Aluno } from "./aluno";

export class Atendimento{
    aluno: Aluno[] = [];
    private maxOcupacao: number;
    bloqueado: boolean;

    constructor(maxOcupacao: number) {
        this.maxOcupacao = maxOcupacao;
        this.bloqueado = false;
    }

    public temAlguem(): boolean{
        if(this.aluno != undefined){
            return true;
        }else{
            return false;
        } 
    }

    public adicionarAluno(aluno: Aluno): void {
        if (this.aluno.length < this.maxOcupacao) {
            this.aluno.push(aluno);
        } else {
            throw new Error("Não pode adicionar aluno, pois a Fila de Atendimento está cheia.");
        }
    }

    public removerAluno(): Aluno {
        if (this.aluno.length > 0) {
            return this.aluno.shift()!;
        } else {
            throw new Error("Não pode remover, pois não tem nenhum aluno na Fila de Atendimento.");
        }
    }

    public travarAtendimento(): boolean{
        if (this.bloqueado == true){
            this.bloqueado = false;
            return true;
        }else{
            this.bloqueado = true;
            return false;
        }
    }

   

}

