class Toast {
  constructor(options) {
    this.options = {};
    this._rootElement = document.querySelector('body');
    this.#init(options);
  }

  showToast() {
    const defaultToastContainer = document.createElement('div');
    defaultToastContainer.id = 'toast-container';

    const toastContainer = document.querySelector('#toast-container') || defaultToastContainer;
    this._rootElement.appendChild(toastContainer);

    const toast = document.createElement('div');
    const span = document.createElement('span');
    span.innerText = this.options.text;
    toast.appendChild(span);
    toast.classList.add('toast');
    toast.classList.add(`toast__${this.options.type}`);
    setTimeout(() => toast.classList.add('toast--show'), 100);

    toast.addEventListener('transitionend', function({ target }) {
      if (target.classList.contains('toast--hidden'))
        target.remove();
    });

    toast.addEventListener('click', function({ currentTarget }) {
      toast.classList.add('toast--hidden');
    });

    setTimeout(() => {
      toast.classList.add('toast--hidden');
    }, this.options.duration);

    toastContainer.insertBefore(toast, null);
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
