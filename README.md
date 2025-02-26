# Simulador de Fluxo de Refeitório (SFR)

## Descrição do Projeto
O **Simulador de Fluxo de Refeitório (SFR)** é um sistema que modela o fluxo de alunos em um refeitório universitário, permitindo a configuração de parâmetros operacionais e a análise estatística dos resultados. O objetivo principal é identificar gargalos, otimizar a eficiência e estimar o tempo médio de atendimento.

## Funcionalidades Principais
- Criar, editar e excluir simulações.
- Configurar parâmetros como tempo de fila, tempo de atendimento e capacidade de mesas.
- Executar a simulação baseada em eventos discretos.
- Exibir resultados por meio de tabelas e gráficos.
- Persistência de dados via `localStorage` (com opção de armazenamento em nuvem).

## Tecnologias Utilizadas
- **Frontend:** React + TypeScript
- **Estilização:** Tailwind CSS
- **Gráficos:** Recharts
- **Gerenciamento de Estado:** Context API
- **Persistência:** `localStorage` e opção para armazenamento em nuvem
- **Ferramentas:** Git, GitHub, Trello/Jira para gestão de tarefas

## Arquitetura do Sistema
O sistema segue uma arquitetura em três camadas:
1. **Camada de Apresentação (View):** Interface do usuário e interações.
2. **Camada de Adaptação (Adapter):** Transformar dados entre View e Domínio.
3. **Camada de Domínio (Domain):** Regras de negócio, simulação e persistência.

## Parâmetros da Simulação

O Simulador de Fluxo de Refeitório (SFR) permite a configuração dos seguintes parâmetros operacionais:

- **LFI (Limite da Fila Interna):** Define a capacidade máxima da fila interna antes do bloqueio da entrada pela catraca.
- **LM (Limite de Mesas):** Número máximo de mesas disponíveis no refeitório.
- **TMDM (Tempo Médio para Digitar Matrícula):** Tempo médio que um aluno leva para inserir a matrícula na catraca.
- **TMPSC (Tempo Médio para Servir Comida):** Tempo médio que um funcionário leva para servir um aluno.
- **TMPNM (Tempo Médio de Permanência na Mesa):** Tempo médio que um aluno permanece sentado após receber a refeição.
- **QAL (Quantidade de Alunos para Liberar a Catraca):** Número mínimo de alunos que precisam sair da fila interna para liberar a entrada de novos alunos.
- **QACR (Quantidade de Alunos que Chegam ao Refeitório):** Quantidade de alunos que entram na fila externa do refeitório durante o período de atendimento.
- **IAR (Intervalo de Atendimento do Refeitório):** Tempo total que o refeitório fica aberto para atendimento.
- **Distribuição de Chegada:** Método estatístico utilizado para modelar a chegada dos alunos ao refeitório (normal, logarítmica ou linear).

## Resultados da Simulação

Os resultados são apresentados em tabelas e gráficos para análise de desempenho, incluindo:

- **Tamanho da fila externa ao longo do tempo:** Indica quantos alunos estavam aguardando antes de entrar na fila interna.
- **Tamanho da fila interna ao longo do tempo:** Mostra a variação do número de alunos esperando atendimento.
- **Ocupação das mesas ao longo do tempo:** Mede a utilização das mesas disponíveis.
- **Tempo médio de espera para ser atendido:** Tempo médio entre a chegada do aluno ao refeitório e o momento em que ele recebe a refeição.
- **Tamanho médio da fila externa:** Média de alunos que permaneceram na fila externa durante o período simulado.
- **Tamanho médio da fila interna:** Média de alunos que estavam na fila interna ao longo da simulação.
- **Ocupação máxima das mesas:** Quantidade máxima de mesas ocupadas simultaneamente.
- **Tempo simulado:** Tempo total representado pela simulação.
- **Tempo real gasto na simulação:** Tempo efetivo para rodar a simulação no sistema.


## Como Rodar o Projeto
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/simulador-refeitorio.git

# Acesse o diretório do projeto
cd simulador-refeitorio

# Instale as dependências
npm install

# Execute o projeto em ambiente de desenvolvimento
npm run dev

# Acesse no navegador
http://localhost:5173
