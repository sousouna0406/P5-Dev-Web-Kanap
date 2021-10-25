const api = "http://localhost:3000/api/";

function getProducts() {
  return fetch(api + "products")
    .then((res) => res.json())
    .then((products) => {
      return products;
    });
}

function getProduct(id) {
  return fetch(api + "products/" + id)
    .then((res) => res.json())
    .then((product) => {
      return product;
    });
}

async function orderProducts(order) {
  // ici réaliser une requete POST pour passer une commande
}
// getProducts();
// getProduct("107fb5b75607497b96722bda5b504926");
