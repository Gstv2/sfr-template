class MesaRepository  {
    private mesas: Mesa[] = [];
    private limiteMesas: number;
  
    constructor(limiteMesas: number) {
      this.limiteMesas = limiteMesas;
    }
  
    public adicionarMesa(mesa: Mesa): void {
      if (this.mesas.length >= this.limiteMesas) {
        throw new Error("Erro: Número máximo de mesas atingido.");
      }
      if (this.buscarMesa(mesa.getIdMesa())) {
        throw new Error(`Erro: Mesa com ID ${mesa.getIdMesa()} já existe.`);
      }
      this.mesas.push(mesa);
      console.log(`Mesa ${mesa.getIdMesa()} adicionada.`);
    }
  
    public removerMesa(id: number): void {
      const index = this.mesas.findIndex(m => m.getIdMesa() === id);
      if (index === -1) {
        throw new Error(`Erro: Mesa com ID ${id} não encontrada.`);
      }
      this.mesas.splice(index, 1);
      console.log(`Mesa ${id} removida.`);
    }
  
    public buscarMesa(id: number): Mesa | null {
      return this.mesas.find(m => m.getIdMesa() === id) || null;
    }
  
    public listarMesas(): Mesa[] {
      return [...this.mesas];
    }
  
    public verificarMesasDisponiveis(): boolean {
      return this.mesas.some(mesa => !mesa.verificarOcupado());
    }
  
    public liberarMesasAposTempo(tempo: number): void {
      setTimeout(() => {
        this.mesas.forEach(mesa => {
          if (mesa.verificarOcupado()) {
            mesa.delAluno();
            console.log(`Mesa ${mesa.getIdMesa()} foi liberada automaticamente.`);
          }
        });
      }, tempo);
    }
  }
  