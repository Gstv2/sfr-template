import { Aluno } from "./Aluno";

export class FilaInterna{
    private QuantAluno:Aluno[] = [];
    private maxOcupação:number;

    constructor(maxOcupação:number){
        this.maxOcupação = maxOcupação;
    }

    public adicionarAluno(aluno:Aluno):void{
        if(this.QuantAluno.length == this.maxOcupação){
            throw new Error("não pode adicionar aluno, pois a Fila esta Cheia");
        }

        this.QuantAluno.push(aluno);
    }

    public removerAluno():Aluno{
        if(this.QuantAluno.length == 0){
            throw new Error("A fila esta Vazia!");
        }

        return this.QuantAluno.shift();
    }

    public estaLotada():boolean{
        return this.QuantAluno.length == this.maxOcupação;
    }

    public tamanhoFilaInterna():number{
        return this.QuantAluno.length;
    }
}