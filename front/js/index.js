const itemsContainer = document.getElementById("items");
// Appel de la fonction getProduct qui permet l'affichage de tout les produits dans la page d'acceuil
getProducts().then((products) => {
  for (const product of products) {
    let lien = document.createElement("a");
    lien.href = `html/product.html?id=${product._id}`;
    lien.innerHTML = `
    <article>
        <img
            src="${product.imageUrl}"
            alt="${product.altTxt}"
        /> 
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">
          ${product.description}
        </p>
   </article>
    `;
    itemsContainer.appendChild(lien);
  }
});
