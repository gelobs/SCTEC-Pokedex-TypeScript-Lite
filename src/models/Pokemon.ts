// RF02 - Interface para o Pokémon resumido (objeto simplificado armazenado no catálogo)
export interface PokemonResumo {
  id: number;
  nome: string;
  tipos: string[];
  altura: number;
  peso: number;
  hp: number;
  ataque: number;
  defesa: number;
}

// RF03 - Interface para o retorno da PokeAPI (tipagem da resposta externa)
export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}