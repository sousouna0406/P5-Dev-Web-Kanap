const params = new URLSearchParams(window.location.search);
const productID = params.get("id");

getProduct(productID).then((product) => {
  console.log(product);
  const title = document.getElementById("title");
  title.innerHTML = product.name;
  const price = document.getElementById("price");
  price.innerHTML = product.price;
  const description = document.getElementById("description");
  description.innerHTML = product.description;
});
