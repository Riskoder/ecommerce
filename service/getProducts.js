import listOfCategories from "../utils/listOfCategories.js";

export async function getProducts() {
  try {
    // Verificar si ya hay datos en localStorage
    const cachedData = localStorage.getItem("products");
    if (cachedData) {
      console.log("Usando datos del cache");
      return JSON.parse(cachedData);
    }

    // Si no hay datos en cache, obtener de la API
    console.log("Obteniendo datos de la API...");
    const response = await fetch("https://dummyjson.com/products?limit=0");

    if (!response.ok)
      throw new Error(
        "Error al obtener los datos de la API. Por favor, intente nuevamente."
      );

    const data = await response.json();

    const filteredCategories = data.products.filter((product) =>
      listOfCategories.includes(product.category)
    );

    // Guardar en localStorage
    localStorage.setItem("products", JSON.stringify(filteredCategories));
    console.log("Datos guardados en localStorage");

    return filteredCategories;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
