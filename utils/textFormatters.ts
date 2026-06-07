import type { PokemonResumo } from "../models/Pokemon";

// Funções utilitárias de parâmetros e retorno

export function formatarPokemon(pokemon: PokemonResumo): string {
  const tipos: string = pokemon.tipos.join(", ");
  return (
    `#${pokemon.id} - ${pokemon.nome} | ` +
    `Tipos: ${tipos} | ` +
    `Altura: ${pokemon.altura} | ` +
    `Peso: ${pokemon.peso} | ` +
    `HP: ${pokemon.hp} | ` +
    `Ataque: ${pokemon.ataque} | ` +
    `Defesa: ${pokemon.defesa}`
  );
}

export function formatarMensagemOk(texto: string): string {
  return `[OK] ${texto}`;
}

export function formatarMensagemErro(texto: string): string {
  return `[ERRO] ${texto}`;
}

export function formatarMensagemAviso(texto: string): string {
  return `[AVISO] ${texto}`;
}
