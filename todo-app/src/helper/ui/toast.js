import { go, delay } from 'fxjs';
import {$addClass, $appendTo, $el, $qs, $removeClass, $setText} from 'fxdom';
export const toast = (type, duration, title, msg) => {
  go(
    `<div class="toast ${type} show">
        <span>${msg}</span>
    </div>`,
    $el,
    $appendTo($qs('body')),
    delay(duration),
    $removeClass('show'),
    $setText(''),
  );
}



// https://codepen.io/kandai/pen/qBEbgQv
