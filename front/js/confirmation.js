/*--------------------------------------------------------------------------VARIABLES--------------------------------------------------------------------------*/

// Declaration des variables afin de recuperer l'orderId.
let currentURL = window.location.href;
let url = new URL(currentURL);

/*--------------------------------------------------------------------------FONCTIONS--------------------------------------------------------------------------*/

//Fonction qui recupere une url et en tire le numéro de commande.
function displayOrderNum(url){
  document.getElementById("orderId").textContent = url.searchParams.get("orderId");
  // Vider le LS une fois la commande passee.
  localStorage.clear();
}

/*--------------------------------------------------------------------------CHARGEMENT DE LA PAGE--------------------------------------------------------------------------*/

displayOrderNum(url);