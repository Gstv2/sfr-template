class Mesa {
    private id_mesa: number;
    private aluno: Aluno | null; // Mudança para null ao invés de undefined
    private ocupado: boolean;
  
    constructor(id_mesa: number) {
      this.id_mesa = id_mesa;
      this.aluno = null; // Inicialmente sem aluno
      this.ocupado = false; // Inicialmente, mesa não está ocupada
    }
  
    // Método para adicionar um aluno na mesa
    public addAluno(aluno: Aluno): void {
      if (this.ocupado) {
        throw new Error(`Erro: Mesa ${this.id_mesa} já está ocupada.`);
      }
      this.aluno = aluno;
      this.ocupado = true;
      console.log(`Aluno ${aluno.id} adicionado à mesa ${this.id_mesa}.`);
    }
  
    // Método para remover um aluno da mesa
    public delAluno(): Aluno | null {
      if (!this.ocupado) {
        throw new Error(`Erro: Mesa ${this.id_mesa} não está ocupada.`);
      }
      const alunoRemovido = this.aluno;
      this.aluno = null;
      this.ocupado = false;
      console.log(`Aluno removido da mesa ${this.id_mesa}.`);
      return alunoRemovido;
    }
  
    // Método para verificar se a mesa está ocupada
    public verificarOcupado(): boolean {
      return this.ocupado;
    }
  
    // Método para alterar o status da mesa
    public alterarStatus(): void {
      if (this.ocupado && this.aluno === null) {
        throw new Error(`Erro: Mesa ${this.id_mesa} não pode ser alterada para ocupada sem um aluno.`);
      }
      this.ocupado = !this.ocupado;
      console.log(`Mesa ${this.id_mesa} agora está ${this.ocupado ? 'ocupada' : 'livre'}.`);
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
  