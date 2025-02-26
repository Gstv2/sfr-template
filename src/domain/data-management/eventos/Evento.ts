import { Simulador } from "../../simulation-engine/simulador";
import { MaquinaEventos } from "../Eventos/MaquinaEventos"
import { Refeitorio } from "../Sistema/Refeitorio"

export abstract class Evento{
    protected timestamp: number;
    protected refeitorio: Refeitorio;
    protected simulador: Simulador;
    protected maquinaEventos: MaquinaEventos;

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