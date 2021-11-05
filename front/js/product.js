const params = new URLSearchParams(window.location.search);
const productID = params.get("id");
// creation d'une variable cart  et On renvoie la valeur de la variable mis en parametre
// sinon elle met à jour la valeur si la clé existe déjà.
let cart = localStorage.getItem("cart") || "[]";
//  on la traduit avec JSON.parse en format JS
cart = JSON.parse(cart);
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
      }
    }
  } else {
    // si pas de produit dans le tableau on l'ajoute
    addProductCart(product, color, quantity);
  }
  console.log(cart);
  // on ajoute la variable cart au localStorage et on la traduit du format JS au chaine JSON
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Votre article a bien été ajouté au panier !");
});

function addProductCart(product, color, quantity) {
  // fonction pour pousser le ou les produit(s) dans le panier (cart)
  cart.push({
    _id: product._id,
    name: product.name,
    quantity: quantity,
    color: color,
  });
}

// let foundId = cart.find((cart) => console.log(cart.id));
// let foundColor = cart.forEach((cart) => console.log(cart.color));
// let foundQuantiter = cart.forEach((cart) => console.log(cart.quantity));
// for (let i = 0; i < cart.length; i++) {
//   if (foundId === cart.id && foundColor === cart.color) {
//     console.log("même produit");

//     result[i] = parseInt(cart.quantity) + parseInt(foundQuantiter);

//     console.log(result[i]);

//     return cart;
//   } else {
//     console.log("produit différent");
//     cart.push();
//     return cart;
//   }
// }

// for (product in cart) {

//   if (
//     foundId === cart.id &&
//     foundColor === cart.color &&
//     foundQuantité != cart.quantity
//   ) {
//     console.log(cart.splice(1));

//     // let first = cart.shift();
//     // console.log(first);
//   }
// }

// let first = cart.shift();
// console.log(first);

// }
// const iDcart = cart.find((id) => cart.id === product._id);
// console.log(id);
