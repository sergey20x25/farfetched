# Query

Representation of a piece of remote data.

## API reference

```ts
const query: Query<Params, Data, Error>;

// Stores
query.$data; // Store<Data | null>
query.$error; // Store<Error | null>
query.$status; // Store<'initial' | 'pending' | 'done' | 'fail'>
query.$pending; // Store<boolean>
query.$failed; // Store<boolean>, since v0.2.0
query.$succeeded; // Store<boolean>, since v0.2.0
query.$enabled; // Store<boolean>
query.$stale; // Store<boolean>

// Commands
query.start; // Event<Params>
query.reset; // Event<void>, since v0.2.0

// Events
query.finished.success; // Event<Data>
query.finished.failure; // Event<Error>
query.finished.skip; // Event<void>
query.finished.finally; // Event<void>

// Note: Store and Event are imported from 'effector' package
```

More information about API can be found in [the source code](https://github.com/igorkamyshev/farfetched/blob/master/packages/core/src/query/type.ts).
