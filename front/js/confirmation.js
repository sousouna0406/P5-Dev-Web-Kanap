// déclaration d'une const params qui crée un prototype de L url
const params = new URLSearchParams(window.location.search);
// declaration d'une const orderID qui cible juste L'id de l'url  de la commande
const orderID = params.get("orderId");
document.getElementById("orderId").innerHTML = orderID;
// recuperer la  variable orderId qui est dans les quiery params : orderIdqp
// si orderIdqp et que orderIsls existe et qu'il sont egale alors je peux afficher l'orderId dans la la page confirmation
// sinon je redirige vers la page d'acceuil
const orderIdqp = orderID;
if (!orderIdqp) {
  //  ko
  window.location.href = "/index.html";
} else {
  //console.log("afficher l'orderId dans la page confirmation");
}
