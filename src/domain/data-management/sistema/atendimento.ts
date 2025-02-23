import { Aluno } from "./aluno";

export class Atendimento{
    aluno: Aluno;
    ocupado: boolean;
    bloqueado: boolean;

    constructor(aluno: Aluno, ocupado: boolean) {
        this.aluno = aluno;
        this.ocupado = ocupado;
        this.bloqueado = false;
    }

    public temAlguem(): boolean{
        if(this.aluno != undefined){
            return true;
        }else{
            return false;
        } 
    }

    public adicionarAluno(aluno: Aluno): void{
        if(this.temAlguem()){
            throw new Error("Já tem alguém no atendimento");
        }else{
            console.log("Aluno está sendo antedido");
            this.aluno = aluno;
        }
    }

    public removerAluno(): Aluno{
        if(!this.temAlguem()){
            throw new Error("Não tem ninguém no atendimento");
        }else{
            let aluno = this.aluno;
            console.log("Aluno saiu do atendimento")
            return aluno;
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

