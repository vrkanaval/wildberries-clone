import { createElement } from './createElement.js';

// Show notification
export function showNotification(message) {
  const oldNotification = document.querySelector('.notification');
  if (oldNotification) oldNotification.remove();

  const notification = createElement('div', { class: 'notification', textContent: message });
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add('show'), 10);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}
