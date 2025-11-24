import { createElement } from './createElement.js';

// Loader
export function showLoader(container) {
  container.innerHTML = '';
  const loader = createElement('div', { class: 'loader', textContent: 'Загрузка...' });
  container.appendChild(loader);
}
