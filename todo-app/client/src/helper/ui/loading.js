import { go, tap } from 'fxjs';
import { $el, $appendTo, $find, $remove, $qs } from 'fxdom';

const _loading = Object.freeze({
  on() {
    return tap(go(
      `<div class="loading__content">
        <div class="loading__bar"></div>
        <div class="loading__bar"></div>
        <div class="loading__bar"></div>
        <div class="loading__bar"></div>
        <div class="loading__bar"></div>
      </div>`,
      $el,
      $appendTo($qs('body'))
    ));
  },
  off() {
    return go(
      $qs('body'),
      $find('.loading__content'),
      el => el && $remove(el),
    )
  }
});

export const loading = async (f) => {
  _loading.on();
  await go(f);
  _loading.off();
};
