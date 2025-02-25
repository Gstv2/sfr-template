import { SimulationRepositoryI } from "@/adapter/interfaces/simulation-repository-interface";
import { Simulation } from "./Entities/simulation";
//import { SimulationParameters } from "./Entities/simulation-parameters";

export class SimulationRepository implements SimulationRepositoryI {
  private storageKey = "simulations";

  private getStoredSimulations(): Simulation[] {
    const storedData = localStorage.getItem(this.storageKey);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return [];
  }

  private saveToStorage(simulations: Simulation[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(simulations));
  }

  async save(simulation: Simulation): Promise<void> {
    const simulations = this.getStoredSimulations();
    
    // Se não tiver id, criamos um id simples
    if (!simulation.id) {
      simulation.id = Math.random().toString(36).substring(7);  // Gera id simples
    }
    
    // Verifica se já existe uma simulação com o mesmo id
    for (let i = 0; i < simulations.length; i++) {
      if (simulations[i].id === simulation.id) {
        simulations[i] = simulation;  // Substitui a simulação existente
        this.saveToStorage(simulations);
        return;
      }
    }
    
    // Se não encontrar, adiciona a simulação no final
    simulations.push(simulation);
    this.saveToStorage(simulations);
  }

  async getById(id: string): Promise<Simulation | null> {
    const simulations = this.getStoredSimulations();
    for (let i = 0; i < simulations.length; i++) {
      if (simulations[i].id === id) {
        return simulations[i];
      }
    }
    return null;  // Não encontrou
  }

  async getAll(): Promise<Simulation[]> {
    return this.getStoredSimulations();
  }

  async delete(id: string): Promise<void> {
    const simulations = this.getStoredSimulations();
    for (let i = 0; i < simulations.length; i++) {
      if (simulations[i].id === id) {
        simulations.splice(i, 1);  // Remove a simulação
        this.saveToStorage(simulations);
        return;
      }
    }
  }
}