const params = new URLSearchParams(window.location.search);
const orderID = params.get("orderId");
document.getElementById("orderId").innerHTML = orderID;
// recuperer la  variable orderId qui est dans les quiery params : orderIdqp
// si orderIdqp et que orderIsls existe et qu'il sont egale alors je peux afficher l'orderId dans la la page confirmation
// sinon je redirige vers la page d'acceuil
const orderIdqp = orderID;
console.log(orderIdqp);
if (orderIdqp === orderID) {
  console.log("afficher l'orderId dans la page confirmation");
} else {
  console.log("ko");
  window.location.href = "/html/index.js";
}
