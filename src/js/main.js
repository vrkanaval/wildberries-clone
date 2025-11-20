import '../scss/style.scss';
import { initSlider } from './slider.js';


const root = document.getElementById('root');

const PRODUCTS_DATA = [
  { name: 'Штаны', price: '900 ₽', discount: '-10%', img: './src/assets/item-1.jpg' },
  { name: 'Куртка', price: '1500 ₽', discount: '-15%', img: './src/assets/item-1.jpg' },
  { name: 'Футболка', price: '500 ₽', discount: '-5%', img: './src/assets/item-1.jpg' },
  { name: 'Платье', price: '1200 ₽', discount: '-20%', img: './src/assets/item-1.jpg' },
  { name: 'Кроссовки', price: '2000 ₽', discount: '-12%', img: './src/assets/item-1.jpg' }
];

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
        createElement('button', { class: 'cart', textContent: 'Корзина' })
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
  function createProductCard(product) {
  return createElement('div', { class: 'product-card' }, [
    createElement('div', { class: 'product-image' }, [
      createElement('img', { src: product.img, alt: product.name }),
      createElement('span', { class: 'product-label', textContent: 'Быстрый просмотр' })
    ]),
    createElement('div', { class: 'product-discount', textContent: product.discount }),
    createElement('div', { class: 'product-price', textContent: product.price }),
    createElement('div', { class: 'product-name', textContent: product.name }),
    createElement('button', { class: 'add-to-cart', textContent: 'В корзину' })
  ]);
}

// RENDER PRODUCT ITEMS 
function renderProducts(products, productsContainer) {
  productsContainer.innerHTML = '';
  products.forEach(product => {
    productsContainer.appendChild(createProductCard(product));
  });
}


// ZOOM RPODUCT IMAGE MODAL 
const IMAGE_MODAL = createElement('div', { class: 'image-modal', style: 'display:none;' }, [
  createElement('div', { class: 'image-modal__overlay' }),
  createElement('div', { class: 'image-modal__content' }, [
    createElement('button', { class: 'image-modal__close', html: '&times;' }),
    createElement('img', { class: 'image-modal__img', src: '', alt: 'Увеличенное изображение' })
  ])
]);
document.body.appendChild(IMAGE_MODAL);


// HITS SECTION
const HITS_SECTION = createElement('section', { class: 'hits' }, [
  createElement('h2', { textContent: 'Хиты продаж' }),
  createElement('div', { class: 'products' })
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

// RENDER PRODUCTS WHEN LOADING
const productsContainer = document.querySelector('.products');
renderProducts(PRODUCTS_DATA, productsContainer);


// -----------

// SEARCH FUNCTION 
const searchInput = document.querySelector('.header__search');
searchInput.addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();
  const filtered = PRODUCTS_DATA.filter(product =>
    product.name.toLowerCase().includes(query)
  );
  renderProducts(filtered, productsContainer);
});

// -----------

// OPEN PRODUCT IMAGE
function openProductImageModal(imgSrc, altText = '') {
  IMAGE_MODAL.style.display = 'flex';
  const modalImg = IMAGE_MODAL.querySelector('.image-modal__img');
  modalImg.src = imgSrc;
  modalImg.alt = altText;
}

// CLOSE PRODUCT MODAL
function closeProductImageModal() {
  IMAGE_MODAL.style.display = 'none';
  IMAGE_MODAL.querySelector('.image-modal__img').src = '';
}

// LISTENER FOR CLOSING BUTTON
IMAGE_MODAL.querySelector('.image-modal__close').addEventListener('click', closeProductImageModal);
// LISTENER FOR CLOSING BY CLIKING ON THE OVERLAY
IMAGE_MODAL.querySelector('.image-modal__overlay').addEventListener('click', closeProductImageModal);


// QUICK VIEW
function addQuickViewHandlers() {
  document.querySelectorAll('.product-label').forEach(label => {
    label.addEventListener('click', function (e) {
      e.stopPropagation();
      const img = this.closest('.product-image').querySelector('img');
      openProductImageModal(img.src, img.alt);
    });
  });
}

// AFTER renderProducts:
renderProducts(PRODUCTS_DATA, productsContainer);
addQuickViewHandlers();

// AFTER SEARCH:
searchInput.addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();
  const filtered = PRODUCTS_DATA.filter(product =>
    product.name.toLowerCase().includes(query)
  );
  renderProducts(filtered, productsContainer);
  addQuickViewHandlers();
});

// -----------

// OPEN CART MODAL
const cartButton = document.querySelector('.cart'); 
const cartModal = document.getElementById('cart-modal');

cartButton.addEventListener('click', () => {
  cartModal.classList.add('open');
});

// CLOSE CART MODAL
const cartCloseBtn = cartModal.querySelector('.cart-modal__close-btn');
const cartOverlay = cartModal.querySelector('.cart-modal__overlay');

function closeCartModal() {
  cartModal.classList.remove('open');
}

cartCloseBtn.addEventListener('click', closeCartModal);
cartOverlay.addEventListener('click', closeCartModal);

// -----------

document.addEventListener('DOMContentLoaded', () => {
  initSlider();  
 
});