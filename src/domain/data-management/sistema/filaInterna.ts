import { Aluno } from "./aluno";

export class FilaInterna{
    private QuantAluno:Aluno[] = [];
    private maxOcupação:number;

    constructor(maxOcupação:number){
        this.maxOcupação = maxOcupação;
    }

    public adicionarAluno(aluno:Aluno):void{
        if(!this.verificarOcupação()){
            this.QuantAluno.push(aluno);
        }else{
            throw new Error("não pode adicionar aluno, pois a Fila esta Cheia");
        }
    }

    public removerAluno():Aluno{
        if(!this.verificarSeTemAlguem()){
            let aluno = this.QuantAluno.shift()
            return aluno!;
        }else{
            throw new Error("não pode remover, pois não tem nenhum aluno");
        }
    }

    public verificarOcupação():boolean{
        if (this.QuantAluno.length == this.maxOcupação){
            return true;
        }else{
            return false;
        }
    }

    public verificarSeTemAlguem():boolean{
        if (this.QuantAluno.length == 0){
            return true;
        }else{
            return false;
        }
    }

    public tamanhoFila():Aluno[]{
        return this.QuantAluno;
    }
}