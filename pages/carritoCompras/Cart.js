import { getCart, getTotalPrice, getTotalProducts } from './cartLogic.js';
import { ProductInCart } from './ProductInCart.js';

export function Cart() {
  const container = document.createElement('div');
  container.classList.add('container');

  const renderCart = () => {
    const cartItems = getCart();
    const totalPrice = getTotalPrice();
    const totalProducts = getTotalProducts();

    if (cartItems.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <h2>Tu carrito está vacío</h2>
          <p>Agrega algunos productos para comenzar a comprar</p>
          <a href="#/products" class="btn-primary">Ver Productos</a>
        </div>
      `;
    } else {
      const productsHTML = cartItems
        .map((item) => {
          const productElement = ProductInCart(item);
          return productElement.outerHTML;
        })
        .join('');

      container.innerHTML = `
        <div class="cart-container">
          <div class="cart-header">
            <h2>Carrito de Compras</h2>
            <p>Total de productos: ${totalProducts}</p>
          </div>
          
          <div class="cart-products">
            ${productsHTML}
          </div>
          
          <div class="cart-summary">
            <div class="total-section">
              <h3>Total: $${totalPrice.toFixed(2)}</h3>
              <button class="btn-checkout">Proceder al Pago</button>
            </div>
          </div>
        </div>
      `;
    }
  };

  renderCart();

  window.addEventListener('cartUpdated', renderCart);

  return container;
}
