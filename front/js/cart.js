//---------------Affichage des produits dans le panier---------------//

// RECUPERATION des articles du  localStorage
let cart = localStorage.getItem("cart") || "[]";
cart = JSON.parse(cart);
console.log(cart);
// variable pour se situer dans la section cart__items du html
const itemsContainer = document.getElementById("cart__items");
//console.log(itemsContainer2);
// variable pour se situer dans la section cart__price du html
const emplacementTotal = document.querySelector(".cart__price");
//console.log(emplacementTotal);
//variable pour se situer dans la div cart__order
const emplacementForm = document.querySelector(".cart__order");
//console.log(emplacementForm);
//FONCTION D'AFFICHAGE DU HTML DANS LE JS POUR AVOIR UN AFFICHAGE DYNAMIQUE DES ELEMENTS DU DOM
function displayItems() {
  // Déclaration d une variable pour avoir un tableau vide dans la page panier
  let cartStructure = "";
  // utilisation de la condition if else pour verifier si le panier est vide ou non
  if (cart.length === 0) {
    // declaration d'une variable pour afficher sur le HTML de maniere dynamique que la panier est vide
    //console.log("panier vide");
    const panierVide = `
    <div class ="empty-cart">
    <p> Le panier est vide.<br><br>Ajoutez des articles au panier.</p>
    </div>
    `;
    itemsContainer.innerHTML = panierVide;
  } else {
    //console.log("panier plein");
    // Création d'une boucle for pour pouvoir regarder tout le panier
    for (let i = 0; i < cart.length; i++) {
      // affichage de html de maniere dynamique
      cartStructure =
        cartStructure +
        `
    <article class="cart__item" data-id="${cart[i]._id}" data-color="${cart[i].color}">
    <div class="cart__item__img">
      <img
        src=${cart[i].image}
        alt=${cart[i].alte}
      />
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${cart[i].name} - ${cart[i].color}</h2>
        <p>${cart[i].price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
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
      itemsContainer.innerHTML = cartStructure;
    }
  }
  displayTotal();
}

//----------------- montant totale du panier---------------//

// FONCTION DU CALCULE TOTALE DES ARTICLES DANS LE PANIER AINSI QUE LES QUANTITÉS TOTALE
function displayTotal() {
  // declaration de la variable pour pouvoir y mettre les prix deja present dans le panier
  let totalCalcPrice = 0;
  // declaration de la variable pour pouvoir y mettre les quantité deja present dans le panier
  let totalQty = 0;
  for (let k = 0; k < cart.length; k++) {
    let productPrice = cart[k].price * cart[k].quantity;
    // mettre les prix dans la variable "totalcalcprice"
    totalCalcPrice += productPrice;

    //console.log(totalCalcPrice);

    // le total des quantités dans la declaration d'une variable
    let productQuantity = Number(cart[k].quantity);
    // mettre les quantités dans "productQuantity"
    totalQty += productQuantity;
  }
  // Affichage du resultat sur la page panier
  const displayResult = `
<div class="cart__price">
<p>
  Total (<span id="totalQuantity">${totalQty}</span> articles) :
  <span id="totalPrice">${totalCalcPrice}</span> €
</p>
</div>
`;
  emplacementTotal.innerHTML = displayResult;
}
// FONCTION D'AJOUT / MODIFICATION DANS LE LOCALSTORAGE
function saveLocalStorage(cart) {
  // on ajoute la variable cart au localStorage et on la traduit du format JS au chaine JSON
  localStorage.setItem("cart", JSON.stringify(cart));
}

//-----------------Supprimer ou modififier le comptenu du panier------------/

// FONCTION DE SUPPRESSION DANS LE PANIER
function setDeleteEvent() {
  // selection de tous les boutons supprimer
  let btnDelete = document.querySelectorAll(".deleteItem");
  console.log(btnDelete);

  for (let n = 0; n < btnDelete.length; n++) {
    //cibler le produit  souhaiter et supprimer grâce à son identifiant et sa couleur.
    // ecouter la variable btnDelete avec "click" pour que l'utilisateur supprime un article au click
    btnDelete[n].addEventListener("click", (e) => {
      console.log(n);
      // declation de la variable elt qui permet de trouver l element cibler dans le DOM
      const elt = btnDelete[n].closest("article");
      console.log(elt);
      // declaration de la variable indexToUpdade qui permet de trouver l'index des element a changer
      const indexToDelete = cart.findIndex((item) => {
        // dans cette fontion on si les index trouver ont les meme couleur et meme id
        return (
          item.color === elt.getAttribute("data-color") &&
          item._id === elt.getAttribute("data-id")
        );
      });
      console.log(indexToDelete);
      // ici on supprime l'article selectionner
      cart.splice(indexToDelete, 1);
      // utilisation de la fonction savelocalestorage pour  mettre a jour le localStorage
      saveLocalStorage(cart);
      // on change le dom
      itemsContainer.removeChild(elt);
      displayTotal();
    });
  }
}

//FONCTION DE CHANGEMENT DE LA QUANTITÉ
function setQuantityEvent() {
  let quantityInput = document.querySelectorAll(".itemQuantity"); // recuperer tout les quantités
  console.log(quantityInput);

  for (let n = 0; n < quantityInput.length; n++) {
    //cibler le produit  souhaiter et supprimer grâce à son identifiant et sa couleur.

    quantityInput[n].addEventListener("change", (e) => {
      // ecouter la variable quantityInput avec "change" pour que l'utilisateur change de quantité dans le panier
      // Declaration d'une nouvelle variable qui permet de mettre a jour la nouvelle valeur de la quantité
      const newQuantity = e.target.value;
      console.log(newQuantity);

      if (newQuantity > 0) {
        console.log("positif");
      } else {
        alert("Quantitée insuffisante !");
        return;
      }

      if (newQuantity > 100) {
        console.log("flop");
        alert("La quantitée maximum est de 100 pour cet article.");
        return;
      } else {
        console.log("ok");
      }

      // declation de la variable elt qui permet de trouver l element cibler dans le DOM
      const elt = quantityInput[n].closest("article");
      // declaration de la variable indexToUpdade qui permet de trouver l'index des element a changer
      const indexToUpdade = cart.findIndex((item) => {
        // dans cette fontion on si les index trouver ont les meme couleur et meme id
        return (
          item.color === elt.getAttribute("data-color") &&
          item._id === elt.getAttribute("data-id")
        );
      });
      // ici je dois mettre a jour la quantité de l'article selectionner avec la valeur de newQuantity
      cart[indexToUpdade].quantity = newQuantity;
      saveLocalStorage(cart);
      // appel de la fonction display total poyr recalculer le total des nouvelles quantités
      displayTotal();
    });
  }
}
// Appele des fonctions
displayItems();
setDeleteEvent();
setQuantityEvent();

//------------------------ formulaire utilisateur ---------------------------//

function displayForm() {
  const stuctureFormulaire = `

  <div class="cart__order">
              <form method="get" class="cart__order__form">
                <div class="cart__order__form__question">
                  <label for="firstName">Prénom: </label>
                  <input type="text" name="firstName" id="firstName" required />
                  <p id="firstNameErrorMsg">
                    <!-- ci est un message d'erreur -->
                  </p>
                </div>
                <div class="cart__order__form__question">
                  <label for="lastName">Nom: </label>
                  <input type="text" name="lastName" id="lastName" required />
                  <p id="lastNameErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="address">Adresse: </label>
                  <input type="text" name="address" id="address" required />
                  <p id="addressErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="city">Ville: </label>
                  <input type="text" name="city" id="city" required />
                  <p id="cityErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="email">Email: </label>
                  <input type="email" name="email" id="email" required />
                  <p id="emailErrorMsg"></p>
                </div>
                <div class="cart__order__form__submit">
                  <input type="submit" value="Commander !" id="order" />
                </div>
              </form>
            </div>
  `;
  emplacementForm.innerHTML = stuctureFormulaire;
}
//APPEL DE LA FONCTION DISPLAYFORM
displayForm();
// Selection du bouton Commander
const orderedBtn = document.getElementById("order");
//console.log(orderedBtn);
orderedBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //Recuperation des valeurs du formulaire et les mettres a jour
  const valuesForm = {
    prenom: document.getElementById("firstName").value,
    nom: document.getElementById("lastName").value,
    adresse: document.getElementById("address").value,
    ville: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };
  //console.log(valuesForm);
  // declaration de la variable pour message d' alerte ville nom premon
  const regeXalert = (value) => {
    return `${value}: Les caractères spéciaux ainsi que les chiffres ne sont pas autoriser`;
  };
  // declaration de la variable regEx pour la mettre dans les fonction nom prenom ville
  const regeX = (value) => {
    return /^[A-Za-z]{2,25}$/.test(value);
  };
  // declaration de la variable regEx pour la mettre dans les fonction email
  const regeXemail = (value) => {
    return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(
      value
    );
  };
  const regeXalertEmail = (value) => {
    return `${value}: Saisies incorrect.`;
  };

  //fonction contrôle de la validiter du prenom
  function controleFirstName() {
    const lePrenom = valuesForm.prenom;
    if (regeX(lePrenom)) {
      return true;
    } else {
      alert(regeXalert("Prémon"));
      return false;
    }
  }
  //fonction contrôle de la validiter du nom
  function controleName() {
    const leNom = valuesForm.nom;
    if (regeX(leNom)) {
      return true;
    } else {
      alert(regeXalert("Nom"));
      return false;
    }
  }
  //fonction contrôle de la validiter du ville
  function controleCity() {
    const laVille = valuesForm.ville;
    if (regeX(laVille)) {
      return true;
    } else {
      alert(regeXalert("Ville"));
      return false;
    }
  }
  function controleEmail() {
    const lEmail = valuesForm.email;
    if (regeXemail(lEmail)) {
      return true;
    } else {
      alert(regeXalertEmail("Email"));
      return false;
    }
  }

  // Validation du formulaire
  if (
    controleFirstName() &&
    controleName() &&
    controleCity() &&
    controleEmail()
  ) {
    // mettre l object valuesForm dans le localStorage
    localStorage.setItem("valuesForm", JSON.stringify(valuesForm));
  }
  //  else {
  //   alert("Veuillez vérifier vos données saisies.");
  // }

  // Mettre les value dans un obj contact avec les produit dans le panier et les valeurs du formulaire
  const contact = {
    cart,
    valuesForm,
  };
  console.log(contact);
});
