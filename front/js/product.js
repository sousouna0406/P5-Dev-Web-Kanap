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
  const imageUrl = document.getElementById("imageUrl");
  imageUrl.src = product.imageUrl;
  imageUrl.alt = product.altTxt;
  const choose = document.getElementById("colors");
  let option = document.createElement("option");
  option.innerHTML = "SVP, choisissez une couleur";
  choose.appendChild(option);
  let colorOne = document.createElement("option");
  colorOne.innerHTML = product.colors[0];
  choose.appendChild(colorOne);
  let colorTwo = document.createElement("option");
  colorTwo.innerHTML = product.colors[1];
  choose.appendChild(colorTwo);
});
