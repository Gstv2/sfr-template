import { Aluno } from "./aluno";

export class Atendimento{
    aluno: Aluno;
    ocupado: boolean;

    constructor(aluno: Aluno, ocupado: boolean){
        this.aluno = aluno;
        this.ocupado = ocupado;

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

    public verificarAtendimento(){
        
    }

    private travarAtendimento(): boolean{
        while(this.ocupado == true){
            console.log("Atendimento está ocupado");
            return true;
        }
    }

}

