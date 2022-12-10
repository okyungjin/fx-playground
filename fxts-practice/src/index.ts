import { filter, pipe, range } from "@fxts/core";

pipe(
  range(Infinity),
  filter(a => a % 5 === 0),
  console.log,
);
