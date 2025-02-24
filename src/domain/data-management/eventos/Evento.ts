import { MaquinaEventos } from "../eventos/MaquinaEventos"
import { Refeitorio } from "../sistema/Refeitorio"

export abstract class Evento{
    protected timestamp: number
    protected refeitorio: Refeitorio
    protected maquinaEventos: MaquinaEventos

    constructor(timestamp:number, refeitorio:Refeitorio, maquinaEventos: MaquinaEventos){
        this.timestamp = timestamp;
        this.refeitorio = refeitorio;
        this.maquinaEventos = maquinaEventos;
    }

    public getTimestamp():number{
        return this.timestamp;
    }

    abstract processarEvento():void;
}