import { pipe, delay, go, map, strMap, tap, curry } from 'fxjs';
import { $el, $toggleClass, $appendTo, $find, $closest, $remove, $qs, $on } from 'fxdom';

export const shakeElement = pipe(
  $toggleClass('shake-horizontal'),
  delay(500),
  $toggleClass('shake-horizontal')
);

export const message = curry((btns, msg) => new Promise(resolve => go(
  `<div class="message">
    <div class="message__content">
      <div class="message__text">${msg}</div>
      <div class="message__buttons">
        ${strMap(btn => `
          <button type="button" class="${btn.type}">${btn.name}</button>
        `, btns)}
      </div>
    </div>
  </div>`,
  $el,
  $appendTo($qs('body')),
  ...map(btn => tap(
    $find(`.${btn.type}`),
    $on('click', e => go(
      e.currentTarget,
      $closest('.message'),
      $remove,
      _ => resolve(btn.value)
    )),
  ), btns),
)));

export const confirm = message([
  { name: '취소', type: 'cancel', value: false },
  { name: '확인', type: 'ok', value: true }
]);

export const alert = message([
  { name: '확인', type: 'ok', value: true }
]);

export default {
  shakeElement,
  message,
  confirm,
  alert,
};
