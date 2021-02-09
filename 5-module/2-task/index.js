function toggleText() {
  // ваш код...
  document.querySelector('.toggle-text-button').addEventListener('click', () => {
    let text = document.querySelector('#text');
    text.hasAttribute('hidden') ? text.removeAttribute('hidden') : text.setAttribute('hidden', '');
  });
}
