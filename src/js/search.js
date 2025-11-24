import { showLoader } from './loader.js';

export function initSearch(searchInput, getLoadedProducts, productsContainer, renderProducts, addQuickViewHandlers, addCartHandlers) {
    searchInput.addEventListener('input', function () {
        showLoader(productsContainer);

        setTimeout(() => {
            const query = this.value.trim().toLowerCase();
            const filtered = getLoadedProducts().filter(product =>
                product.name.toLowerCase().includes(query)
            );

            if (filtered.length === 0) {
                productsContainer.innerHTML = '<div class="no-products">К сожалению, товары не найдены...</div>';
                return;
            }

            renderProducts(filtered, productsContainer);
            addQuickViewHandlers();
            addCartHandlers();
        }, 300)
    });
}