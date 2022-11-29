import { pipe, delay } from 'fxjs';
import { $toggleClass } from 'fxdom';

export const shakeElement = pipe(
  $toggleClass('shake-horizontal'),
  delay(500),
  $toggleClass('shake-horizontal')
);

export default {
  shakeElement,
};