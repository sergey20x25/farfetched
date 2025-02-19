import type { Query } from '@farfetched/core';
import { expectAssignable, expectNotAssignable, expectType } from 'tsd';

import { createQueryResource } from '../create_query_resource';

function ComponentVoidStart() {
  const [data, { refetch: start }] = createQueryResource(
    {} as Query<void, number, string>
  );

  expectAssignable<() => void>(start);
  expectType<number | undefined>(data());

  return null;
}

function ComponentStart() {
  const [data, { refetch: start }] = createQueryResource(
    {} as Query<{ limit: string }, number, string>
  );

  expectType<(params: { limit: string }) => void>(start);
  expectNotAssignable<() => void>(start);
  expectType<number | undefined>(data());

  return null;
}
