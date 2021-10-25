const itemsContainer = document.getElementById("items");

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
