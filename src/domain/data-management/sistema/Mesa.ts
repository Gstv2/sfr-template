import { Aluno } from "./Aluno"; // Assumindo que a classe Aluno está definida em outro lugar

export class Mesa {
    private id_mesa: number;
    private aluno: Aluno | undefined; // Mudança para null ao invés de undefined

    constructor(id_mesa: number) {
        this.id_mesa = id_mesa;
        this.aluno = undefined; // Inicialmente sem aluno
    }

    // Método para adicionar um aluno na mesa
    public addAluno(aluno: Aluno): void {
        if (this.aluno) {
        throw new Error(`Erro: Mesa ${this.id_mesa} já está ocupada.`);
        }
        this.aluno = aluno;
        console.log(`Aluno ${aluno} adicionado à mesa ${this.id_mesa}.`);
    }

    // Método para remover um aluno da mesa
    public delAluno(): Aluno | null {
        if (!this.aluno) {
        throw new Error(`Erro: Mesa ${this.id_mesa} não está ocupada.`);
        }
        const alunoRemovido = this.aluno;
        this.aluno = null;
        console.log(`Aluno removido da mesa ${this.id_mesa}.`);
        return alunoRemovido;
    }

    // Método para verificar se a mesa está ocupada
    public estaDiponivel():boolean{
        return !this.aluno;
    }
    // Getter para o ID da mesa
    public getIdMesa(): number {
        return this.id_mesa;
    }

    // Getter para o aluno associado à mesa
    public getAluno(): Aluno | null {
        return this.aluno;
    }
}