// import { showNotification } from './notification.js';

const API_URL = 'https://692335b009df4a492324af4f.mockapi.io/api/v1/products';

export async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error();
    return await response.json();
  } catch {
    showNotification('Ошибка загрузки товаров!');
    return [];
  }
}