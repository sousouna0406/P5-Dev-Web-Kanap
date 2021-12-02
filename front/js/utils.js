const api = "http://localhost:3000/api/";
// fonction getProducts pour récuperer l'ensemble des produits de l'API
function getProducts() {
  return fetch(api + "products")
    .then((res) => res.json())
    .then((products) => {
      return products;
    });
}
// Fonction getProduct pour récuperer un produit grâce a son ID
function getProduct(id) {
  return fetch(api + "products/" + id)
    .then((res) => res.json())
    .then((product) => {
      return product;
    });
}
// Fonction orderProduct pour envoyer la commande des produits selectionnée dans le panier
function orderProducts(order) {
  return fetch(api + "products/order", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((order) => {
      return order;
    });
}
