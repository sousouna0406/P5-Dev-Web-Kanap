const params = new URLSearchParams(window.location.search);
const productID = params.get("id");

// creation d'une variable cart
// puis on vas dans le localStorage et avec la methode getItem on lis la clef produit
//si il y en a pas on cree un array
let cart = localStorage.getItem("cart") || "[]";
//  on converti les donnée en format JSON dans le localStorage avec JSON.parse en objet JS
cart = JSON.parse(cart);
let product;
//Si il nya pas de productid on renvoie en page d'acceuil
if (!productID) {
  window.location.href = "./index.html";
  //console.log("ko");
} else {
  //console.log("afficher product dans la page product");
}
//Appel de la fonction getProduct qui prend en parametre l Id du produit et en suite qui nous rapporte les details du produit
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
    numberColor.value = color;
    numberColor.innerHTML = color;
    choose.appendChild(numberColor);
  }
});
const btnCart = document.getElementById("addToCart");
btnCart.addEventListener("click", () => {
  // si la quantité est a 0 ne rien faire . si la quantité est supérieur a 100 ne rien faire et ajouté un message d'erreur.
  // verifier si le produit est deja dans le panier . si c'est le cas ne pas poussé le produit mais juste au
  // augmenter la quantité. sinon poussé le produit .
  const quantity = Number(document.getElementById("quantity").value);
  const color = document.getElementById("colors").value;

  if (quantity == 0) {
    alert("Merci de spécifier une quantitée.");
    return;
  }
  if (quantity > 100) {
    alert("Vous ne pouvez pas depasser 100 articles !");
    return;
  }
  if (!color) {
    alert("Merci de spécifier une couleur.");
    return;
  }
  // Si il ya deja des element dans le tableau
  if (cart.length) {
    // on parcour le panier pour voir si le produit existe deja avec son ID
    for (let index = 0; index < cart.length; index++) {
      if (product._id === cart[index]._id) {
        //Si le produit est trouver et que la couleur est identique, on incremente la quantité
        if (cart[index].color === color) {
          cart[index].quantity += quantity;
        } else {
          // APPEL DE LA FONCTION addProductCart si l id est le même mais que la couleur est differente
          // sinon si la couleur est differente on ajoute le produit au panier
          addProductCart(product, color, quantity);
        }
        break;
      } else if (index === cart.length - 1) {
        // APPEL DE LA FONCTION addProductCart si on a pas trouver id
        // Si on a pas trouver l' Id et qu'on arrive au bout du tableau on ajoute le produit
        addProductCart(product, color, quantity);
        break;
      }
    }
  } else {
    // si pas de produit dans le tableau on l'ajoute
    addProductCart(product, color, quantity);
  }
  // on ajoute la variable cart au localStorage et on la traduit du format JS au chaine JSON
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Votre(Vos) article(s) a(ont) bien été ajouté(s) au panier !");
});
// fonction pour pousser le ou les produit(s) dans le panier (cart)
function addProductCart(product, color, quantity) {
  cart.push({
    _id: product._id,
    name: product.name,
    quantity: quantity,
    color: color,
    image: product.imageUrl,
    price: product.price,
    alte: product.altTxt,
  });
}
