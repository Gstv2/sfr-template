import { Aluno } from "./Aluno";

export class Atendimento{
    private aluno: Aluno | undefined;
    private bloqueado: boolean;

    constructor(){
        this.bloqueado = false;
    }

    public estaDiponivel():boolean{
        return !this.aluno;
    }

    public adicionarAluno(aluno: Aluno): void {
        if (this.aluno) {
            throw new Error("Não pode adicionar aluno, pois a Fila de Atendimento está cheia.");
            
        }

        this.aluno = aluno;
    }

    public removerAluno(): Aluno {
        if (!this.aluno) {
            throw new Error("Não pode remover, pois não tem nenhum aluno na Fila de Atendimento.");
        } 
        const a = this.aluno;
        this.aluno = undefined;
        return a!;
    }

    public desbloquerAtendimento():void{
        if(!this.bloqueado){
            throw new Error('Não pode desbloquer atendimento, pois ele não esta bloqueado')
        }

        this.bloqueado = false;
    }

    public travarAtendimento(): void{
        if(this.bloqueado){
            throw new Error('Não pode travar atendimento, pois ele esta travadi')
        }
        this.bloqueado = true;
    }

    public getBloqueado(): boolean {
        return this.bloqueado;
    }

}
