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

// getProducts();
// getProduct("107fb5b75607497b96722bda5b504926");
