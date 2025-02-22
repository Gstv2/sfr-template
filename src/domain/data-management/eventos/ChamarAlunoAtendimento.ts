import { Aluno } from "../sistema/aluno";
import { Atendimento } from "../sistema/atendimento";

class ChamarAlunoAtendimento{
    public chamarAluno(atendimento: Atendimento, aluno: Aluno): void{
        if(atendimento.temAlguem()){
            throw new Error("Já tem alguém no atendimento");
        }else{
            atendimento.adicionarAluno(aluno);
        }
    }
}