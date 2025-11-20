import '../scss/style.scss';
import { initSlider } from './slider.js';


const root = document.getElementById('root');


// Create element function
function createElement(tag, props = {}, children = []) {
  const el = document.createElement(tag);

  Object.entries(props).forEach(([key, value]) => {
    if (key === 'class') el.className = value;
    else if (key === 'textContent') el.textContent = value;
    else if (key === 'html') el.innerHTML = value;
    else el[key] = value;
  });

  if (!Array.isArray(children)) children = [children];
  children.forEach(child => {
    if (child) el.appendChild(child);
  });

  return el;
}

// HEADER
const HEADER = createElement('header', { class: 'header' }, [
  createElement('div', { class: 'container' }, [
    createElement('div', { class: 'header__wrapper' }, [
      createElement('a', { class: 'header__logo', href: '#' }, [
        createElement('img', {
          class: 'header__logo-img',
          src: '/public/favicon.svg',
          alt: 'wildberries-logo'
        })
      ]),
      createElement('input', {
        type: 'search',
        class: 'header__search',
        placeholder: 'Поиск...'
      }),
      createElement('div', { class: 'header__cart' }, [
        createElement('button', { class: 'сart', textContent: 'Корзина' })
      ])
    ])
  ])
]);

// SLIDER
const SLIDER = createElement('section', { class: 'slider' }, [
  createElement('div', { class: 'swiper-container' }, [
    createElement('div', { class: 'swiper-wrapper' }, [
      ...[1, 2, 3].map(i =>
        createElement('div', { class: 'swiper-slide' }, [
          createElement('img', {
            src: './src/assets/item-1.jpg',
            alt: `Slide ${i}`
          })
        ])
      )
    ]),
    createElement('div', { class: 'swiper-pagination' }),
    createElement('div', { class: 'swiper-button-prev' }),
    createElement('div', { class: 'swiper-button-next' })
  ])
]);

// PRODUCT CARD
function createProductCard() {
  return createElement('div', { class: 'product-card' }, [
    createElement('div', { class: 'product-image' }, [
      createElement('img', {
        src: './src/assets/item-1.jpg',
        alt: 'Товар'
      }),
      createElement('span', { class: 'product-label', textContent: 'Быстрый просмотр' })
    ]),
    createElement('div', { class: 'product-discount', textContent: '-10%' }),
    createElement('div', { class: 'product-price', textContent: '900 ₽' }),
    createElement('div', { class: 'product-name', textContent: 'Штаны' }),
    createElement('button', { class: 'add-to-cart', textContent: 'В корзину' })
  ]);
}

// HITS SECTION
const HITS_SECTION = createElement('section', { class: 'hits' }, [
  createElement('h2', { textContent: 'Хиты продаж' }),
  createElement('div', { class: 'products' }, [
    ...Array.from({ length: 5 }, createProductCard)
  ])
]);

// CART MODAL
const CART_MODAL = createElement('div', { class: 'cart-modal', id: 'cart-modal' }, [
  createElement('div', { class: 'cart-modal__overlay' }),
  createElement('div', { class: 'cart-modal__content' }, [
    createElement('div', { class: 'cart-modal__header' }, [
      createElement('h3', { class: 'cart-modal__title', textContent: 'Корзина' }),
      createElement('div', { class: 'cart-modal__close' }, [
        createElement('button', { class: 'cart-modal__close-btn', html: '&times;' })
      ])
    ]),
    createElement('div', { class: 'cart-modal__body' }, [
      createElement('ul', { class: 'cart-modal__list', id: 'cart-list' }, [
        createElement('li', { class: 'cart-modal__empty', textContent: 'Корзина пуста' })
      ])
    ]),
    createElement('div', { class: 'cart-modal__footer' }, [
      createElement('div', { class: 'cart-modal__total', html: 'Итого: <span id="cart-total">0</span> ₽' }),
      createElement('div', { class: 'cart-modal__btns' }, [
        createElement('button', { class: 'cart-modal__clear', textContent: 'Очистить корзину' }),
        createElement('button', { class: 'cart-modal__checkout', textContent: 'Оформить заказ' })
      ])
    ])
  ])
]);

// MAIN
const MAIN = createElement('main', { class: 'main' }, [
  createElement('div', { class: 'container' }, [
    SLIDER,
    HITS_SECTION,
    CART_MODAL
  ])
]);

// FOOTER
const FOOTER = createElement('footer', { class: 'footer' }, [
  createElement('div', { class: 'container' }, [
    createElement('div', { class: 'footer__text' }, [
      createElement('p', { class: 'footer__copyright', html: `
        Copyright © 2025 Wildberries. All Rights Reserved Made with 
        <span class="footer__author"> by Veranika Kanaval</span>
      ` })
    ])
  ])
]);

// DOM
root.appendChild(HEADER);
root.appendChild(MAIN);
root.appendChild(FOOTER);






document.addEventListener('DOMContentLoaded', () => {
  initSlider();  
 
});