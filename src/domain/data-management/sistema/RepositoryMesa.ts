import { Mesa } from "../sistema/Mesa";


export class MesaRepository  {
    private mesas: Mesa[] = [];
    private limiteMesas: number;
  
    constructor(limiteMesas: number) {
      this.limiteMesas = limiteMesas;
    }
  
    public adicionarMesa(mesa: Mesa): void {
      if (this.mesas.length >= this.limiteMesas) {
        throw new Error("Erro: Número máximo de mesas atingido.");
      }
      if (this.buscarMesaExistente(mesa.getIdMesa())) {
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
  
    public buscarMesaExistente(id_mesa:number):Mesa{
        for (let i = 0;i<this.mesas.length;i++){
            if(this.mesas[i].getIdMesa() == id_mesa){
                return this.mesas[i];
            }
        }
        return undefined;
    }

    public buscarMesaDisponivel(): Mesa | null {
        let mesaDisponivel:Mesa;
        for (let i = 0;i<this.mesas.length;i++){
            if(this.mesas[i].estaDiponivel()){
                mesaDisponivel = this.mesas[i];
                return mesaDisponivel;
            }
        }
        return null;
    }
  
    public verificarMesasDisponiveis(): boolean {
      return this.mesas.some(mesa => !mesa.estaDiponivel());
    }
    
    public liberarMesasAposTempo(tempo: number): void {
      setTimeout(() => {
        this.mesas.forEach(mesa => {
          if (mesa.estaDiponivel()) {
            mesa.delAluno();
            console.log(`Mesa ${mesa.getIdMesa()} foi liberada automaticamente.`);
          }
        });
      }, tempo);
    }
  }
  