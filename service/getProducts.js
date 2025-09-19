import listOfCategories from '../utils/listOfCategories.js';

export async function getProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=0');

    if (!response.ok)
      throw new Error(
        'Error al obtener los datos de la API. Por favor, intente nuevamente.'
      );

    const data = await response.json();

    const filteredCategories = data.products.filter((product) =>
      listOfCategories.includes(product.category)
    );

    // console.log(filteredCategories);
    return filteredCategories;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
