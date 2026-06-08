// RF04 / RF05 / RF06 - Camada de Integração Externa (fetch nativo)
// Busca Pokémon na PokeAPI, trata erros e mapeia para objeto simplificado

import type { PokemonResumo, PokemonApiResponse } from "../models/Pokemon";
import { APIError } from "../models/CustomErrors";
import {
  formatarMensagemOk,
  formatarMensagemErro,
} from "../utils/textFormatters";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

// RF04 - Função assíncrona para buscar Pokémon por nome ou ID
export async function buscarPokemon(
  nomeOuId: string
): Promise<PokemonResumo | null> {
  const url = `${BASE_URL}/${nomeOuId.toLowerCase()}`;

  try {
    const resposta = await fetch(url);

    // RF05 - Tratar erro de Pokémon inexistente (404)
    if (!resposta.ok) {
      if (resposta.status === 404) {
        console.log(formatarMensagemErro(`Pokémon não encontrado: ${nomeOuId}`));
      } else {
        throw new APIError(
          `Erro na requisição: status ${resposta.status}`,
          resposta.status
        );
      }
      return null;
    }

    // RF06 - Mapear retorno da API para objeto simplificado
    const dados = (await resposta.json()) as PokemonApiResponse;

    const tipos: string[] = dados.types.map((item) => item.type.name);

    const statHP = dados.stats.find((s) => s.stat.name === "hp");
    const statAtaque = dados.stats.find((s) => s.stat.name === "attack");
    const statDefesa = dados.stats.find((s) => s.stat.name === "defense");

    const pokemon: PokemonResumo = {
      id: dados.id,
      nome: dados.name,
      tipos,
      altura: dados.height,
      peso: dados.weight,
      hp: statHP?.base_stat ?? 0,
      ataque: statAtaque?.base_stat ?? 0,
      defesa: statDefesa?.base_stat ?? 0,
    };

    console.log(formatarMensagemOk(`Pokémon encontrado: ${pokemon.nome}`));
    return pokemon;
  } catch (erro) {
    if (erro instanceof APIError) {
      console.log(formatarMensagemErro(erro.message));
    } else {
      console.log(
        formatarMensagemErro("Não foi possível buscar o Pokémon. Verifique sua conexão.")
      );
    }
    return null;
  }
}
