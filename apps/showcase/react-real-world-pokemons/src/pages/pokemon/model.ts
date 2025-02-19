import { connectQuery, createJsonQuery, declareParams } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createGate } from 'effector-react';
import { combine, sample } from 'effector';

import {
  Pokemon,
  pokemonUrl,
  Species,
  speciesUrl,
} from '../../entities/pokemon';
import { TId, urlToId } from '../../shared/id';

export const PokemonPageGate = createGate<{ id: number }>();

const pokemonQuery = createJsonQuery({
  params: declareParams<{ id: TId }>(),
  request: {
    method: 'GET',
    url: ({ id }) => pokemonUrl({ id }),
  },
  response: {
    contract: runtypeContract(Pokemon),
    mapData: ({ sprites, ...data }) => ({
      ...data,
      avatarUrl: sprites.front_default,
    }),
  },
});

const speciesQuery = createJsonQuery({
  params: declareParams<{ id: TId }>(),
  request: {
    method: 'GET',
    url: ({ id }) => speciesUrl({ id }),
  },
  response: {
    contract: runtypeContract(Species),
  },
});

export const $pending = pokemonQuery.$pending;
export const $pokemon = combine(
  { pokemon: pokemonQuery.$data, species: speciesQuery.$data },
  ({ pokemon, species }) => ({ ...pokemon, color: species?.color.name ?? null })
);

sample({
  clock: PokemonPageGate.state,
  filter: (params) => Boolean(params.id),
  fn: ({ id }) => ({ id } as { id: TId }),
  target: pokemonQuery.start,
});

connectQuery({
  source: pokemonQuery,
  fn: ({ species }) => ({ params: { id: urlToId(species.url) } }),
  target: speciesQuery,
});
