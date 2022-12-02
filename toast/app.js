import Toast from './Toast.js';

const successBtn = document.querySelector('.demo__success');
const warningBtn = document.querySelector('.demo__warning');
const errorBtn = document.querySelector('.demo__error');
successBtn.addEventListener('click', () => {
  const toast = Toast({
    duration: 3000,
    text: 'Success Toast',
    type: 'success', // default
  });
  toast.showToast();
})

warningBtn.addEventListener('click', () => {
  const toast = Toast({
    duration: 3000,
    text: 'Warning Toast',
    type: 'warning',
  });
  toast.showToast();
})

errorBtn.addEventListener('click', () => {
  const toast = Toast({
    duration: 3000,
    text: 'Error Toast',
    type: 'error',
  });
  toast.showToast();
})
