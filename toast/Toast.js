import { go, pipe, tap, log, delay } from 'fxjs';
import {$qs, $el, $appendTo, $addClass, $on, $removeClass} from 'fxdom';

class Toast {
  constructor(options) {
    this.options = {};
    this._rootElement = $qs('body');
    this.#init(options);
  }

  showToast() {
    const toastContainer = go(
      $qs('#toast-container') ?? $el('<div id="toast-container"></div>'),
      $appendTo(this._rootElement),
    );

    const toastTmpl = options => `
      <div class="toast toast__${options.type}">
        <span>${options.text}</span>
      </div>
    `;

    const addToast = options => go(
      options,
      toastTmpl,
      $el,
      tap(el => setTimeout(() => $addClass('toast--show', el), 100)),
      $on('transitionend', ({ currentTarget }) => {
        log(currentTarget)
        if (currentTarget.classList.contains('toast--hidden')) {
          currentTarget.remove();
        }
      }),
      $on('click', ({ currentTarget }) => {
        currentTarget.classList.add('toast--hidden');
      }),
      $appendTo(toastContainer),
      delay(options.duration),
      $addClass('toast--hidden'),
    );

    addToast(this.options);
  }

  #init(options) {
    this.options = Object.assign(this.#defaults, options);
  }

  #defaults = {
    duration: 3000,
    text: '',
    type: 'success',
  };
}

const ToastInstance = (options) => {
  return new Toast(options);
};

export default ToastInstance;
