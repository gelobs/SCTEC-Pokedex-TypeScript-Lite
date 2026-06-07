// Serviço de menu interativo — gerencia o loop principal via readline/promises

import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { buscarPokemon } from "./PokeApiService";
import { CatalogoPokemon } from "./BoxService";
import type { PokemonResumo } from "../models/Pokemon";
import {
  formatarMensagemAviso,
  formatarMensagemErro,
  formatarPokemon,
} from "../utils/textFormatters";

// ─── helpers visuais ──────────────────────────────────────────────────────────

function limparTela(): void {
  process.stdout.write("\x1Bc");
}

function cabecalho(): void {
  limparTela();
  console.log("╔══════════════════════════════════════════════╗");
  console.log("║         Pokédex  TypeScript  Lite            ║");
  console.log("╚══════════════════════════════════════════════╝");
}

function separador(): void {
  console.log("─".repeat(48));
}

function exibirMenu(): void {
  console.log("\n┌──────────────── MENU PRINCIPAL ──────────────────┐");
  console.log("│                                                    │");
  console.log("│   1 › Localizar Pokémon  (nome ou ID)              │");
  console.log("│   2 › Adicionar ao catálogo                        │");
  console.log("│   3 › Remover do catálogo                          │");
  console.log("│   4 › Relatório do catálogo                        │");
  console.log("│   5 › Sair                                         │");
  console.log("│                                                    │");
  console.log("└────────────────────────────────────────────────────┘");
}

// ─── opção 1: localizar ───────────────────────────────────────────────────────

async function opcaoLocalizar(
  rl: readline.Interface,
  catalogo: CatalogoPokemon
): Promise<PokemonResumo | null> {
  separador();
  console.log("   LOCALIZAR POKÉMON");
  separador();

  const entrada = await rl.question("   Nome ou ID: ");
  const termo = entrada.trim();

  if (!termo) {
    console.log(formatarMensagemAviso("Nenhum valor digitado."));
    return null;
  }

  console.log("");
  const pokemon = await buscarPokemon(termo);

  if (pokemon !== null) {
    console.log("");
    separador();
    console.log(formatarPokemon(pokemon));
    separador();

    if (catalogo.contemId(pokemon.id)) {
      console.log(
        formatarMensagemAviso(`${pokemon.nome} já está no catálogo.`)
      );
    } else {
      console.log("      Use a opção 2 para adicionar este Pokémon ao catálogo.");
    }
  }

  return pokemon;
}

// ─── opção 2: adicionar ───────────────────────────────────────────────────────

async function opcaoAdicionar(
  rl: readline.Interface,
  catalogo: CatalogoPokemon,
  ultimoBuscado: PokemonResumo | null
): Promise<PokemonResumo | null> {
  separador();
  console.log("    ADICIONAR AO CATÁLOGO");
  separador();

  let pokemon: PokemonResumo | null = ultimoBuscado;

  if (pokemon !== null) {
    console.log(`   Último localizado: ${pokemon.nome}  (#${pokemon.id})`);
    const confirmar = await rl.question("   Adicionar este? (s/n): ");

    if (confirmar.trim().toLowerCase() !== "s") {
      pokemon = null; // vai pedir nova busca abaixo
    }
  }

  // Se não há último buscado ou o usuário não quis usar ele, busca um novo
  if (pokemon === null) {
    const entrada = await rl.question(
      "   Digite o nome ou ID do Pokémon: "
    );
    const termo = entrada.trim();

    if (!termo) {
      console.log(formatarMensagemAviso("Nenhum valor digitado."));
      return ultimoBuscado; // mantém o último buscado inalterado
    }

    console.log("");
    pokemon = await buscarPokemon(termo);
  }

  if (pokemon !== null) {
    console.log("");
    catalogo.adicionar(pokemon);
  }

  // Retorna o pokemon que tentamos adicionar para atualizar o ultimoBuscado
  return pokemon;
}

// ─── opção 3: remover ─────────────────────────────────────────────────────────

async function opcaoRemover(
  rl: readline.Interface,
  catalogo: CatalogoPokemon
): Promise<void> {
  separador();
  console.log("     REMOVER DO CATÁLOGO");
  separador();

  if (catalogo.total === 0) {
    console.log(formatarMensagemAviso("O catálogo está vazio. Nada a remover."));
    return;
  }

  // Mostra o catálogo para o usuário escolher
  catalogo.listar();

  const entrada = await rl.question("   ID do Pokémon a remover: ");
  const id = Number(entrada.trim());

  if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
    console.log(
      formatarMensagemErro("ID inválido. Digite um número inteiro positivo.")
    );
    return;
  }

  console.log("");
  catalogo.remover(id);
}

// ─── opção 4: relatório ───────────────────────────────────────────────────────

function opcaoRelatorio(catalogo: CatalogoPokemon): void {
  separador();
  console.log("     RELATÓRIO DO CATÁLOGO");
  separador();
  catalogo.listar();
  catalogo.estatisticas();
}

// ─── loop principal exportado ─────────────────────────────────────────────────

export async function iniciarMenu(): Promise<void> {
  const rl = readline.createInterface({ input, output });
  const catalogo = new CatalogoPokemon();
  let ultimoBuscado: PokemonResumo | null = null;
  let rodando = true;

  cabecalho();

  while (rodando) {
    exibirMenu();

    const opcao = await rl.question("\n   Escolha uma opção [1-5]: ");

    console.log("");

    switch (opcao.trim()) {
      case "1":
        ultimoBuscado = await opcaoLocalizar(rl, catalogo);
        break;

      case "2":
        ultimoBuscado = await opcaoAdicionar(rl, catalogo, ultimoBuscado);
        break;

      case "3":
        await opcaoRemover(rl, catalogo);
        break;

      case "4":
        opcaoRelatorio(catalogo);
        break;

      case "5":
        rodando = false;
        console.log("   Fim - Até mais! \n");
        break;

      default:
        console.log(
          formatarMensagemAviso("Opção inválida. Digite um número entre 1 e 5.")
        );
    }

    if (rodando) {
      await rl.question("\n   [ Pressione Enter para continuar... ]");
      cabecalho();
    }
  }

  rl.close();
}
