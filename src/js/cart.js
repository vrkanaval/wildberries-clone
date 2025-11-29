import { createElement } from './createElement.js';

// Save cart to local storage
export function saveCartToLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from the local storage
export function loadCartFromLocalStorage() {
  const data = localStorage.getItem('cart');
  if (!data || data === "undefined") return [];
  try {
    return JSON.parse(data);
  } catch {
    localStorage.removeItem('cart');
    return [];
  }
}

// Render cart
export function renderCart(cart, removeFromCart) {
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.querySelector('.cart-modal__checkout');
  cartList.innerHTML = '';

  if (cart.length === 0) {
    cartList.appendChild(createElement('li', { class: 'cart-modal__empty', textContent: 'Корзина пуста' }));
    cartTotal.textContent = '0';
     if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.classList.add('disabled');
    }
    return;
  }

  let total = 0;
  cart.forEach(item => {
    const priceNumber = parseInt(item.price.replace(/\D/g, ''), 10);
    total += priceNumber * item.count;

    const li = createElement('li', { class: 'cart-modal__item' }, [
      createElement('span', { class: 'cart-modal__item-name', textContent: item.name }),
      createElement('span', { class: 'cart-modal__item-price', textContent: item.price + (item.count > 1 ? ` x${item.count}` : '') }),
      createElement('button', {
        class: 'cart-modal__item-remove',
        html: '&times;',
        onclick: () => {
          removeFromCart(item.name);
        }
      })
    ]);
    cartList.appendChild(li);
  });

  cartTotal.textContent = total;

   if (checkoutBtn) {
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove('disabled');
  }
}

// Add item to the cart
export function addToCart(cart, product, renderCart, saveCartToLocalStorage, showNotification, removeFromCart) {
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.count += 1;
  } else {
    cart.push({ ...product, count: 1 });
  }
  renderCart(cart, removeFromCart);
  saveCartToLocalStorage(cart);
  showNotification(`Товар "${product.name}" добавлен в корзину!`);
}

// Remove item from the cart
export function removeFromCart(cart, name, renderCart, saveCartToLocalStorage, removeFromCartFn) {
  const newCart = cart.filter(item => item.name !== name);
  renderCart(newCart, removeFromCartFn);
  saveCartToLocalStorage(newCart);
  return newCart;
}