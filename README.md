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
