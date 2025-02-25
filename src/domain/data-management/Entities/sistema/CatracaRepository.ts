import { Catraca } from "./Catraca";

class CatracaRepository {
  private catracas: Catraca[] = [];
  private limiteCatracas: number;

  constructor(limiteCatracas: number) {
    this.limiteCatracas = limiteCatracas;
  }

  public adicionarCatraca(catraca: Catraca): void {
    if (this.catracas.length >= this.limiteCatracas) {
      throw new Error("Erro: Número máximo de catracas atingido.");
    }
    if (this.buscarCatraca(catraca.getIdCatraca())) {
      throw new Error(`Erro: Catraca com ID ${catraca.getIdCatraca()} já existe.`);
    }
    this.catracas.push(catraca);
    console.log(`Catraca ${catraca.getIdCatraca()} adicionada.`);
  }

  public removerCatraca(id: number): void {
    const index = this.catracas.findIndex(c => c.getIdCatraca() === id);
    if (index === -1) {
      throw new Error(`Erro: Catraca com ID ${id} não encontrada.`);
    }
    this.catracas.splice(index, 1);
    console.log(`Catraca ${id} removida.`);
  }

  public buscarCatraca(id: number): Catraca | null {
    return this.catracas.find(c => c.getIdCatraca() === id) || null;
  }

  public listarCatracas(): Catraca[] {
    return [...this.catracas];
  }

  // Verificação de catracas disponíveis agora delegada à classe Catraca.
  public verificarCatracasDisponiveis(): boolean {
    return this.catracas.some(catraca => !catraca.verificarOcupado() && !catraca.verificarTravada());
  }

  // Métodos para bloquear e liberar as catracas, sem duplicar lógica.
  public bloquearCatracas(): void {
    this.catracas.forEach(catraca => catraca.TravarCatraca());
  }

  public liberarCatracas(): void {
    this.catracas.forEach(catraca => catraca.LiberarCatraca());
  }
}
