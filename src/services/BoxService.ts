// RF07 / RF08 / RF09 / RF10 / RF11 / RF12
// Camada de Persistência Local - Classe CatalogoPokemon

import type { PokemonResumo } from "../models/Pokemon";
import { LocalBoxError } from "../models/CustomErrors";
import {
  formatarPokemon,
  formatarMensagemOk,
  formatarMensagemErro,
  formatarMensagemAviso,
} from "../utils/textFormatters";

// RF12 - Classe simples com atributos, métodos e modificador de acesso
export class CatalogoPokemon {
  // RF07 - Array local para armazenar os Pokémon (atributo privado)
  private pokemons: PokemonResumo[] = [];

  // RF08 - Adicionar Pokémon ao catálogo impedindo duplicatas (RF11: .some())
  public adicionar(pokemon: PokemonResumo): void {
    // RF11 - .some() para verificar duplicidade pelo id
    const jaExiste: boolean = this.pokemons.some(
      (item) => item.id === pokemon.id
    );

    if (jaExiste) {
      console.log(formatarMensagemAviso(`${pokemon.nome} já está no catálogo.`));
      return;
    }

    this.pokemons.push(pokemon);
    console.log(formatarMensagemOk(`${pokemon.nome} adicionado ao catálogo.`));
  }

  // RF09 - Listar Pokémon do catálogo (RF11: .forEach())
  public listar(): void {
    if (this.pokemons.length === 0) {
      console.log(formatarMensagemAviso("Catálogo vazio."));
      return;
    }

    console.log("\nCatálogo atual:");

    // RF11 - .forEach() para iterar e exibir cada Pokémon
    this.pokemons.forEach((pokemon) => {
      console.log(formatarPokemon(pokemon));
    });

    console.log("");
  }

  // RF10 - Remover Pokémon do catálogo pelo ID (RF11: .filter())
  public remover(id: number): void {
    // RF11 - .some() para verificar existência antes de remover
    const existe: boolean = this.pokemons.some((pokemon) => pokemon.id === id);

    if (!existe) {
      console.log(formatarMensagemAviso("Nenhum Pokémon encontrado com esse ID."));
      return;
    }

    // RF11 - .filter() para remover o Pokémon pelo id
    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
    console.log(formatarMensagemOk("Pokémon removido do catálogo."));
  }

  // Método extra: estatísticas do catálogo (RF11: .reduce() e .every())
  public estatisticas(): void {
    if (this.pokemons.length === 0) {
      console.log(formatarMensagemAviso("Sem dados para calcular estatísticas."));
      return;
    }

    // RF11 - .reduce() para calcular peso total
    const pesoTotal: number = this.pokemons.reduce(
      (acumulador, pokemon) => acumulador + pokemon.peso,
      0
    );

    // RF11 - .every() para validar se todos têm nome preenchido
    const todosTemNome: boolean = this.pokemons.every(
      (pokemon) => pokemon.nome.length > 0
    );

    const mediaPeso: number = pesoTotal / this.pokemons.length;

    console.log(`\nEstatísticas do catálogo:`);
    console.log(`  Total de Pokémon: ${this.pokemons.length}`);
    console.log(`  Peso total: ${pesoTotal}`);
    console.log(`  Média de peso: ${mediaPeso.toFixed(1)}`);
    console.log(`  Todos com nome válido: ${todosTemNome ? "Sim" : "Não"}\n`);
  }

  // Getter público para verificar o total de itens
  public get total(): number {
    return this.pokemons.length;
  }

  // Verifica se um Pokémon com o ID informado já está no catálogo
  public contemId(id: number): boolean {
    return this.pokemons.some((pokemon) => pokemon.id === id);
  }

  // Busca por nome no catálogo local (RF11: .find())
  public buscarPorNome(nome: string): PokemonResumo | undefined {
    // RF11 - .find() para localizar Pokémon pelo nome
    const encontrado = this.pokemons.find(
      (pokemon) => pokemon.nome.toLowerCase() === nome.toLowerCase()
    );

    if (!encontrado) {
      throw new LocalBoxError(`Pokémon "${nome}" não está no catálogo.`);
    }

    return encontrado;
  }
}
