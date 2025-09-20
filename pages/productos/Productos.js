import { Card } from '../../components/card/Card.js';
import { loadProducts } from '../../globalState.js';

export async function Productos() {
  const products = await loadProducts();

  const cardSection = document.createElement('section');
  const cartFlexContainer = document.createElement('div');
  cartFlexContainer.classList.add('card-container');
  cardSection.appendChild(cartFlexContainer);
  cardSection.classList.add('container');

  products.forEach((product) => {
    cartFlexContainer.appendChild(Card({ product }));
  });

  return cardSection;
}
