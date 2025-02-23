import { Refeitorio } from "../sistema/reitorio";
import { MaquinaEventos } from "./maquinaEventos";

export abstract  class Evento{
    protected timestamp: number;
    protected refeitorio: Refeitorio;
    protected maquina: MaquinaEventos;

    constructor(timestamp: number, refeitorio: Refeitorio, maquina: MaquinaEventos){
        this.timestamp = timestamp;
        this.refeitorio = refeitorio;
        this.maquina = maquina;
    }

    public getTimestamp(): number{
        return this.timestamp;
    }

    abstract processarEvento(): void;
}