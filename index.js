import { getProducts } from './service/getProducts.js';
import { Card } from './components/card/Card.js';

getProducts().then((data) => {
  console.log('Productos filtrados:', data);

  const content = document.getElementById('content');
  const cardSection = document.createElement('section');
  const cartFlexContainer = document.createElement('div');
  cartFlexContainer.classList.add('card-container');
  cardSection.appendChild(cartFlexContainer);
  content.appendChild(cardSection);
  cardSection.classList.add('container');

  data.forEach((product) => {
    console.log('Test');
    cartFlexContainer.appendChild(Card({ product }));
  });
});
