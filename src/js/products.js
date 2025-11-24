import { createElement } from './createElement.js';

// PRODUCT CARD
export function createProductCard(product) {
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
export function renderProducts(products, productsContainer) {
  productsContainer.innerHTML = '';
  products.forEach(product => {
    productsContainer.appendChild(createProductCard(product));
  });
}
