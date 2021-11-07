//---------------Affichage des produits dans le panier---------------//

// RECUPERATION des articles du  localStorage
let cart = localStorage.getItem("cart") || "[]";
cart = JSON.parse(cart);
console.log(cart);
// variable pour se situer dans la section cart__items du html
const itemsContainer2 = document.getElementById("cart__items");
console.log(itemsContainer2);
// variable pour se situer dans la section cart__price du html
const emplacementTotal = document.querySelector(".cart__price");
console.log(emplacementTotal);
// Déclaration d une variable pour avoir un tableau vide dans la page panier
let cartStructure = [];
// utilisation de la condition if else pour verifier si le panier est vide ou non
if (cart.length === 0) {
  // declaration d'une variable pour afficher sur le HTML de maniere dynamique que la panier est vide
  console.log("panier vide");
  const panierVide = `
    <div class ="empty-cart">
    <p> Le panier est vide.<br><br>Ajoutez des articles au panier.</p>
    </div>
    `;
  itemsContainer2.innerHTML = panierVide;
} else {
  console.log("panier plein");
  // Création d'une boucle for pour pouvoir regarder tout le panier
  for (let i = 0; i < cart.length; i++) {
    // affichage de html de maniere dynamique
    cartStructure =
      cartStructure +
      `
    <article class="cart__item" data-id="{product-ID}">
    <div class="cart__item__img">
      <img
        src=${cart[i].image}
        alt=${cart[i].altTxt}
      />
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${cart[i].name}</h2>
        <p>${cart[i].price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${cart[i].quantity}</p>
          <input
            type="number"
            class="itemQuantity"
            name="itemQuantity"
            min="1"
            max="100"
            value="${cart[i].quantity}"
          />
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
  
    `;
    itemsContainer2.innerHTML = cartStructure;
  }
}
//----------------- montant totale du panier---------------//

// declaration de la variable pour pouvoir y mettre les prix deja present dans le panier
let totalCalcPrice = [];
// declaration de la variable pour pouvoir y mettre les quantité deja present dans le panier
let totalQty = [];
for (let k = 0; k < cart.length; k++) {
  let productPrice = cart[k].price;
  // mettre les prix dans la variable "totalcalcprice"
  totalCalcPrice.push(productPrice);

  console.log(totalCalcPrice);

  // additioner les prix se trouvent dans totalcalcprice
  const addition = (accumulator, currentValue) => accumulator + currentValue;
  const result = totalCalcPrice.reduce(addition, 0);
  console.log(result);

  // le total des quantités dans la declaration d'une variable
  let productQuantity = cart[k].quantity;
  // mettre les quantités dans "productQuantity"
  totalQty.push(productQuantity);
  //additioner les quantités qui se trouvent dans totalQty
  const additionQty = (accumulator, currentValue) => accumulator + currentValue;
  const resultQty = totalQty.reduce(additionQty, 0);
  console.log(resultQty);

  // Affichage du resultat sur la page panier
  const displayResult = `
<div class="cart__price">
<p>
  Total (<span id="totalQuantity">${resultQty}</span> articles) :
  <span id="totalPrice">${result}</span> €
</p>
</div>
`;
  emplacementTotal.innerHTML = displayResult;
}
