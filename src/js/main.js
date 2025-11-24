import '../scss/style.scss';
import { initSlider } from './slider.js';
import { fetchProducts } from './api.js';
import { createElement } from './createElement.js';
import { saveCartToLocalStorage, loadCartFromLocalStorage, renderCart, addToCart,removeFromCart} from './cart.js';
import { showLoader } from './loader.js';
import { showNotification } from './notification.js';
import { createProductCard, renderProducts } from './products.js';
import { initSearch } from './search.js';

const root = document.getElementById('root');

// -------
let loadedProducts = [];

function getLoadedProducts() {
  return loadedProducts;
}

async function initProducts() {
  showLoader(productsContainer);

  loadedProducts = await fetchProducts();
  if (!loadedProducts.length) return;

  renderProducts(loadedProducts, productsContainer);
  addQuickViewHandlers();
  addCartHandlers();
}
// --------
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
const SLIDER_IMAGES = [
  './src/assets/slider/slide1.webp',
  './src/assets/slider/slide2.webp',
  './src/assets/slider/slide3.webp'
];

const SLIDER = createElement('section', { class: 'slider' }, [
  createElement('div', { class: 'swiper-container' }, [
    createElement('div', { class: 'swiper-wrapper' }, [
      ...SLIDER_IMAGES.map((src, i) =>
        createElement('div', { class: 'swiper-slide' }, [
          createElement('img', {
            src,
            alt: `Slide ${i + 1}`
          })
        ])
      )
    ]),
    createElement('div', { class: 'swiper-pagination' }),
    createElement('div', { class: 'swiper-button-prev' }),
    createElement('div', { class: 'swiper-button-next' })
  ])
]);

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
      createElement('div', { class: 'cart-modal__total', html: 'Итого: <span id="cart-total">0</span> р.' }),
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
      createElement('p', {
        class: 'footer__copyright', html: `
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


const productsContainer = document.querySelector('.products');
const searchInput = document.querySelector('.header__search');

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

// 

let cart = loadCartFromLocalStorage();
renderCart(cart, handleRemoveFromCart);

function handleAddToCart(product) {
  addToCart(cart, product, renderCart, saveCartToLocalStorage, showNotification, handleRemoveFromCart);
}

function handleRemoveFromCart(name) {
  cart = removeFromCart(cart, name, renderCart, saveCartToLocalStorage, handleRemoveFromCart);
}

function addCartHandlers() {
  document.querySelectorAll('.add-to-cart').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      const name = btn.closest('.product-card').querySelector('.product-name').textContent;
      const product = loadedProducts.find(p => p.name === name);
      if (product) handleAddToCart(product);
    });
  });
}

const cartClearBtn = cartModal.querySelector('.cart-modal__clear');
cartClearBtn.addEventListener('click', () => {
  cart = [];
  renderCart(cart, handleRemoveFromCart);
  saveCartToLocalStorage();
});

// AFTER renderProducts:
renderProducts(loadedProducts, productsContainer);
addQuickViewHandlers();
addCartHandlers();

// init Search
initSearch(
  searchInput,
  getLoadedProducts,
  productsContainer,
  renderProducts,
  addQuickViewHandlers,
  addCartHandlers
);
// ----------

document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initProducts();
});
