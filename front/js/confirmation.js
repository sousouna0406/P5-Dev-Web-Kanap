document.getElementById("orderId").innerHTML = localStorage.getItem("orderId");
// recuperer la  variable orderId qui est dans les quiery params : orderIdqp
// si orderIdqp et que orderIsls existe et qu'il sont egale alors je peux afficher l'orderId dans la la page confirmation
// sinon je redirige vers la page d'acceuil
const orderIdqp = orderId;
console.log(orderIdqp);
if (orderIdqp === orderId) {
  console.log("afficher l'orderId dans la la page confirmation");
} else {
  console.log("ko");
  window.location.href = "/html/index.js";
}
