const params = new URLSearchParams(window.location.search);
const productID = params.get("id");
const cart = [];
let product;

getProduct(productID).then((productData) => {
  product = productData;
  const title = document.getElementById("title");
  title.innerHTML = product.name;
  const price = document.getElementById("price");
  price.innerHTML = product.price;
  const description = document.getElementById("description");
  description.innerHTML = product.description;
  const imageUrl = document.getElementById("imageUrl");
  imageUrl.src = product.imageUrl;
  imageUrl.alt = product.altTxt;

  const choose = document.getElementById("colors");

  for (const color of product.colors) {
    let numberColor = document.createElement("option");
    numberColor.value = `html/product.html?id=${color}
  `;
    numberColor.innerHTML = color;
    choose.appendChild(numberColor);
  }
});
const btnCart = document.getElementById("addToCart");
btnCart.addEventListener("click", () => {
  // si la quantité est a 0 ne rien faire . si la quantité est supérieur a 100 ne rien faire et ajouté un message d'erreur.
  // verifier si le produit est deja dans le panier . si c'est le cas ne pas poussé le produit mais juste au
  // augmenter la quantité. sinon poussé le produit .
  const quantity = document.getElementById("quantity").value;

  cart.push({
    id: product._id,
    name: product.name,
    quantity: quantity,
  });
  console.log(cart);

  alert("Votre article a bien été ajouté au panier !");
});
