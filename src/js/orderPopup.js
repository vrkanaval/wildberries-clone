import { createElement } from './createElement.js';

export function showOrderUnavailablePopup() {
  const overlay = createElement('div', { class: 'order-popup-overlay' });
  const popup = createElement('div', { class: 'order-popup' }, [
    createElement('span', {
      class: 'order-popup-close',
      html: '&times;',
      onclick: () => document.body.removeChild(overlay)
    }),
    createElement('p', {
      textContent: 'Оформление заказа временно недоступно. Следите за обновлениями!'
    })
  ]);
  overlay.appendChild(popup);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });

  document.body.appendChild(overlay);
}