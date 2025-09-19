/*
 LOGICA DEL CARRITO DE COMPRAS
 FUNCIONES QUE MODIFICAN EL CARRITO PRINCIPAL MUTANDOLO 
 */

/*
TODO: 
local storage para el cart 
*/

const cart = [];

const addProduct = (newProduct) => {
  const index = findIndexOfProduct(newProduct.id);
  if (index != 0) {
    updateProductQuantity(newProduct.id, 1);
  } else {
    cart.push(newProduct);
  }
};

const removeProduct = (productId) => {
  const product = findIndexOfProduct(productId);
  if (product === null) return;
  cart.splice(product, 1);
};

const updateProductQuantity = (productId, quantity) => {
  const product = findIndexOfProduct(productId);
  if (product === null) return;
  cart[product].quantity = (cart[product].quantity || 0) + quantity;
  if (cart[product].quantity <= 0) removeProduct(productId);
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
};

const getTotalProducts = () => {
  return cart.reduce((acc, item) => acc + item.quantity, 0);
};

export {
  addProduct,
  removeProduct,
  updateProductQuantity,
  getTotalPrice,
  getCart,
  clearCart,
  getTotalProducts,
};
