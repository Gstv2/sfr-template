import { Aluno } from "./Aluno";

export class FilaInterna{
    private QuantAluno:Aluno[] = [];
    private maxOcupacao:number;

    constructor(maxOcupação:number){
        this.maxOcupacao = maxOcupação;
    }

    public getMaxocupacao(){
        return this.maxOcupacao;
    }

    public adicionarAluno(aluno:Aluno):void{
        if(this.QuantAluno.length == this.maxOcupacao){
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
        return this.QuantAluno.length == this.maxOcupacao;
    }

    public tamanhoFilaInterna():number{
        return this.QuantAluno.length;
    }
}