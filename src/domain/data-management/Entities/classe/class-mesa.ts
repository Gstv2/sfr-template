import { Aluno } from "./Aluno";

class Mesa {
  private id_mesa: number;
  private aluno: Aluno | undefined;
  private ocupado: boolean;

  constructor(id_mesa: number) {
    this.id_mesa = id_mesa;
    this.aluno = undefined;
    this.ocupado = false;
  }

  public addAluno(aluno: Aluno): void {
    if (!this.ocupado) {
      this.aluno = aluno;
      this.ocupado = true;
    }
  }

  public delAluno(): Aluno | undefined {
    if (this.ocupado) {
      const alunoRemovido = this.aluno;
      this.aluno = undefined;
      this.ocupado = false;
      return alunoRemovido;
    }
    return undefined;
  }

  public verificarOcupado(): boolean {
    return this.ocupado;
  }

  public alterarStatus(): void {
    this.ocupado = !this.ocupado;
  }
}
