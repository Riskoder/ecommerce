/*
 LOGICA DEL CARRITO DE COMPRAS
 FUNCIONES QUE MODIFICAN EL CARRITO PRINCIPAL MUTANDOLO Y LO GUARDAN EN LOCALSTORAGE
 */

// Carga inicial del carrito desde localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error loading cart from storage:', error);
    return [];
  }
};

// Guarda el carrito en localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
};

const cart = loadCartFromStorage();

const addProduct = (newProduct) => {
  const index = findIndexOfProduct(newProduct.id);
  if (index !== null) {
    updateProductQuantity(newProduct.id, cart[index].quantity + 1);
  } else {
    cart.push({ ...newProduct, quantity: 1 });
    saveCartToStorage(cart);
  }
  // Disparar evento para actualizar la UI
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};

const removeProduct = (productId) => {
  const index = findIndexOfProduct(productId);
  if (index === null) return;

  cart.splice(index, 1);
  saveCartToStorage(cart);

  // Disparar evento para actualizar la UI
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};

const updateProductQuantity = (productId, quantity) => {
  const index = findIndexOfProduct(productId);
  if (index === null) return;

  if (quantity <= 0) {
    removeProduct(productId);
    return;
  }

  cart[index].quantity = quantity;
  saveCartToStorage(cart);

  // Disparar evento para actualizar la UI
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};

const findIndexOfProduct = (id) => {
  const productIndex = cart.findIndex((item) => item.id === id);
  if (productIndex === -1) return null;
  return productIndex;
};

const getTotalPrice = () => {
  return (
    Math.round(
      cart.reduce(
        (acc, item) =>
          acc +
          (item.price * item.quantity -
            (item.price * item.discountPercentage) / 100),
        0
      ) * 100
    ) / 100
  );
};

// Copia el carrito y manda una copia (Para que no se modifique el original por error)
const getCart = () => {
  return cart.slice();
};

const clearCart = () => {
  cart.length = 0;
  saveCartToStorage(cart);

  // Disparar evento para actualizar la UI
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};

const getTotalProducts = () => {
  return cart.reduce((acc, item) => acc + item.quantity, 0);
};

const getProductTotal = (product) => {
  const cartProduct = cart.find((item) => item.id === product.id);
  if (!cartProduct) return 0;

  const totalPrice = cartProduct.price * cartProduct.quantity;
  const discount = (totalPrice * cartProduct.discountPercentage) / 100;
  return Math.round((totalPrice - discount) * 100) / 100;
};

export {
  addProduct,
  removeProduct,
  updateProductQuantity,
  getTotalPrice,
  getCart,
  clearCart,
  getTotalProducts,
  getProductTotal,
};
