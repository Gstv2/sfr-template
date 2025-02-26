import { SimulationParameters } from "./Entities/simulation-parameters";
import { Simulator } from "../simulation-engine/simulador";
import { Simulation } from "./Entities/simulation";



const parametros = new SimulationParameters(30, 50, 30, 180, 600,10, 100,7.200, 'normal');
const simulacao = new Simulation("1","teste",parametros);
const simulador = new Simulator(simulacao);


simulador.executarSimulacao();
