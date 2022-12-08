import { filter, map, pipe, range, reduce, take } from '@fxts/core';

const sum = pipe(
  range(Infinity),
  filter((a) => a % 5 === 0),
  map((a) => a * 10),
  take(10),
  reduce((a, b) => a + b),
); // typeof 'sum' inferred as the number

console.log(sum)
