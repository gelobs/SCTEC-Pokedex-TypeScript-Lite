
# Pokédex TypeScript Lite
#### Mini-projeto de desenvolvimento em back-end, de execução em terminal, para consulta de Pokémon em API Pública. Atividade elaborada por: [SCTEC] - SENAI/SC.

# Sobre
O **Pokédex TypeScript Lite** é uma aplicação back-end executada via terminal, desenvolvida em Node.js com TypeScript. Ela consulta dados de Pokémon na [PokeAPI](https://pokeapi.co), exibe uma ficha completa de cada Pokémon e permite gerenciar um catálogo local em memória através de um menu interativo.

## Objetivos:
#### Aplicação back-end simples, sem interface gráfica, capaz de: 
- Consultar a pokeapi.co/api/v2/pokemon/ .
- Tratar resposta JSON.
- Mapear dados externos para um objeto TypeScript.
- Armazenar os Pokémons em um arquivo local.
- Listar os Pokémon salvos.
- Impedir registros duplicados.
- Remover Pokémon do catálogo.
- Exibir mensagens claras no terminal.

## Tecnologias utilizadas

- [Node.js](https://nodejs.org) (v18+)
- [TypeScript](https://www.typescriptlang.org) (v5)
- [tsx](https://github.com/privatenumber/tsx) — execução direta de TypeScript sem compilação prévia
- [PokeAPI](https://pokeapi.co) — API pública e gratuita de Pokémon
- Git / GitHub

---

## Pré-requisitos

Antes de executar o projeto, tenha instalado:

- Node.js (v18 ou superior)
- npm
- Git

---

## Como instalar

```bash
# Clone o repositório
git clone https://github.com/gelobs/SCTEC-Pokedex-TypeScript-Lite.git

# Acesse a pasta do projeto
cd SCTEC-Pokedex-TypeScript-Lite

# Instale as dependências de desenvolvimento
npm install
```

---

## Como executar

```bash
npm run dev
```

O terminal exibirá o menu interativo automaticamente.

---

## Funcionalidades

- **Menu interativo** com 5 opções navegáveis via terminal
- **Localizar Pokémon** por nome ou ID consultando a PokeAPI
- **Adicionar ao catálogo** o Pokémon localizado, com aproveitamento do último buscado
- **Remover do catálogo** pelo ID, com listagem prévia para facilitar a escolha
- **Relatório do catálogo** com ficha completa e estatísticas (total, peso total e média)
- **Bloqueio de duplicatas** — impede adicionar o mesmo Pokémon duas vezes
- **Tratamento de erros** — Pokémon inexistente (404) e falhas de rede não interrompem a execução
- **Mensagens padronizadas** — `[OK]`, `[ERRO]` e `[AVISO]` em todas as operações

---

## Exemplos de execução

### Tela inicial — Menu principal

```
╔══════════════════════════════════════════════╗
║         Pokédex  TypeScript  Lite            ║
╚══════════════════════════════════════════════╝

┌──────────────── MENU PRINCIPAL ──────────────────┐
│                                                  │
│   1 › Localizar Pokémon  (nome ou ID)            │
│   2 › Adicionar ao catálogo                      │
│   3 › Remover do catálogo                        │
│   4 › Relatório do catálogo                      │
│   5 › Sair                                       │
│                                                  │
└──────────────────────────────────────────────────┘

   Escolha uma opção [1-5]:
```

---

### Opção 1 — Busca válida

```
Entrada: pikachu

[OK] Pokémon encontrado: pikachu

────────────────────────────────────────────────
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60 | HP: 35 | Ataque: 55 | Defesa: 40
────────────────────────────────────────────────
   Use a opção 2 para adicionar este Pokémon ao catálogo.
```

---

### Opção 1 — Busca inválida

```
Entrada: pokemon-inexistente

[ERRO] Pokémon não encontrado: pokemon-inexistente
```

---

### Opção 2 — Adicionar ao catálogo

```
   Último localizado: pikachu  (#25)
   Adicionar este? (s/n): s

[OK] pikachu adicionado ao catálogo.
```

### Opção 2 — Tentativa de duplicata

```
   Último localizado: pikachu  (#25)
   Adicionar este? (s/n): s

[AVISO] pikachu já está no catálogo.
```

---

### Opção 3 — Remover do catálogo

```
Catálogo atual:
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60 | HP: 35 | Ataque: 55 | Defesa: 40
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85 | HP: 39 | Ataque: 52 | Defesa: 43

   ID do Pokémon a remover: 25

[OK] Pokémon removido do catálogo.
```

### Opção 3 — ID inexistente

```
   ID do Pokémon a remover: 999

[AVISO] Nenhum Pokémon encontrado com esse ID.
```

---

### Opção 4 — Relatório do catálogo

```
────────────────────────────────────────────────
  RELATÓRIO DO CATÁLOGO
────────────────────────────────────────────────

Catálogo atual:
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85 | HP: 39 | Ataque: 52 | Defesa: 43
#1 - bulbasaur | Tipos: grass, poison | Altura: 7 | Peso: 69 | HP: 45 | Ataque: 49 | Defesa: 49

Estatísticas do catálogo:
  Total de Pokémon: 2
  Peso total: 154
  Média de peso: 77.0
  Todos com nome válido: Sim
```

---

### Opção 5 — Sair

```
   Fim - Até mais! 
```

---