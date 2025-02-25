export class SimulationParameters {
  internalQueueLimit: number; // LFI (Limite da Fila Interna).
  tableLimit: number; // LM (Limite de Mesas).
  registrationTime: number; // TMDM (Tempo Médio para Digitar Matrícula).
  servingTime: number; // TMPSC (Tempo Médio para Servir Comida).
  tableTime: number; // TMPNM (Tempo Médio de Permanência na Mesa).
  turnstileLimit: number; // QAL (Quantidade de Alunos para Liberar a Catraca).
  studentCount: number; // QACR (Quantidade de Alunos que Chegam ao Refeitório).
  serviceInterval: number; // IAR (Intervalo de Atendimento do Refeitório).
  arrivalDistribution: "normal" | "exp" | "uniform"; //(normal, logarítmica, linear).


  constructor(
      internalQueueLimit: number,
      tableLimit: number,
      registrationTime: number,
      servingTime: number,
      tableTime: number,
      turnstileLimit: number,
      studentCount: number,
      serviceInterval: number,
      arrivalDistribution: "normal" | "exp" | "uniform"
  ) {
      // Validação dos parâmetros numéricos
      const validatePositive = (value: number, name: string) => {
          if (typeof value !== 'number' || value <= 0) {
              throw new Error(`${name} deve ser um número maior que 0`);
          }
      };

      // Validação dos parâmetros
      validatePositive(internalQueueLimit, 'internalQueueLimit (LFI)');
      validatePositive(tableLimit, 'tableLimit (LM)');
      validatePositive(registrationTime, 'registrationTime (TMDM)');
      validatePositive(servingTime, 'servingTime (TMPSC)');
      validatePositive(tableTime, 'tableTime (TMPNM)');
      validatePositive(turnstileLimit, 'turnstileLimit (QAL)');
      validatePositive(studentCount, 'studentCount (QACR)');
      validatePositive(serviceInterval, 'serviceInterval (IAR)');

      // Validação da distribuição
      if (!["normal", "log", "linear"].includes(arrivalDistribution)) {
          throw new Error('Distribuição de chegada inválida');
      }

      // Atribuições
      this.internalQueueLimit = internalQueueLimit;
      this.tableLimit = tableLimit;
      this.registrationTime = registrationTime;
      this.servingTime = servingTime;
      this.tableTime = tableTime;
      this.turnstileLimit = turnstileLimit;
      this.studentCount = studentCount;
      this.serviceInterval = serviceInterval;
      this.arrivalDistribution = arrivalDistribution;
  }
}