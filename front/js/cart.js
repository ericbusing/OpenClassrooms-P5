/*--------------------------------------------------------------------------PANIER--------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------VARIABLES PANIER--------------------------------------------------------------------------*/

let cartItems = document.getElementById("cart__items");

/*--------------------------------------------------------------------------FONCTIONS PANIER--------------------------------------------------------------------------*/
/**
 * Affichage du panier sous forme de string dans la console.
 * @param {array} cart
 */
function saveCart(cart) {
    // LocalStorage definit et serialisation de cart en chaine de caractere.
    localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Creation du panier et de sa condition si panier vide.
 * @param {array} cart 
 * @returns {json}
 */
function getCart() {
    // Recuperation de l'item cart.
    let cart = localStorage.getItem("cart");
    // Creation d'un tableau si le panier est vide.
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

/**
 * Fonction pour recuperer l'API.
 * @returns {array}
 */
const fetchProducts = () => {
    return fetch('http://localhost:3000/api/products') // On va chercher l'API avec la methode fetch.
        .then(res => res.json())
        .then(data => data) // On fait une promesse en renvoyant la réponse au format JSON. // On définit un paramètre pour products en réutilisant .then.
        .catch((error) => console.error(error));
}

/**
 * Fonction pour creer les elements du DOM manquants.
 * @param {*} products 
 * @param {*} articleToShow 
 */

const showProducts = async (products, articleToShow) => {

    // on ajoute l'element article
    let cartArticles = document.createElement("article");
    cartItems.appendChild(cartArticles);
    cartArticles.setAttribute("data-id", articleToShow.id);
    cartArticles.setAttribute("data-color", articleToShow.color)
    cartArticles.className = "cart__item";

    // on ajoute l'element div qui va contenir l'img 
    let divCartImages = document.createElement("div");
    divCartImages.className = "cart__item__img";
    cartArticles.appendChild(divCartImages);

    // on ajoute l'élement img 
    let cartImages = document.createElement("img");
    cartImages.setAttribute('src', products.imageUrl);
    cartImages.setAttribute('alt', products.altTxt);
    divCartImages.appendChild(cartImages);

    // on ajoute une div
    let divCartItems = document.createElement("div");
    divCartItems.className = "cart__item__content";
    cartArticles.appendChild(divCartItems);

    // on ajoute une div
    let divCartItemsDescription = document.createElement("div");
    divCartItemsDescription.className = "cart__item__content__description";
    divCartItems.appendChild(divCartItemsDescription);

    // ajout du h2 qui va contenir le nom du produit
    let divCartItemsDescriptionName = document.createElement("h2");
    divCartItemsDescription.appendChild(divCartItemsDescriptionName);
    divCartItemsDescriptionName.textContent = products.name;

    // ajout d'un p qui va contenir la couleur du produit
    let divCartItemsDescriptionColor = document.createElement("p");
    divCartItemsDescription.appendChild(divCartItemsDescriptionColor);
    divCartItemsDescriptionColor.textContent = articleToShow.color;

    // ajout d'un p qui va contenir le prix du produit
    let divCartItemsDescriptionPrice = document.createElement("p");
    divCartItemsDescription.appendChild(divCartItemsDescriptionPrice);
    divCartItemsDescriptionPrice.textContent = products.price + " €"; // ici le prix a été récupéré de l'api directement

    // ajout d'une div    
    let divCartItemsSetting = document.createElement("div");
    divCartItemsSetting.className = "cart__item__content__settings";
    divCartItems.appendChild(divCartItemsSetting);

    // ajout d'une div
    let divCartItemsSettingQuantity = document.createElement("div");
    divCartItemsSettingQuantity.className = "cart__item__content__settings__quantity";
    divCartItemsSetting.appendChild(divCartItemsSettingQuantity);

    // ajout d'un p qui va contenir le mot "Qté :" 
    let divCartItemsSettingQty = document.createElement("p");
    divCartItemsSettingQuantity.appendChild(divCartItemsSettingQty);
    divCartItemsSettingQty.textContent = "Qté : ";

    // ajout de l'input qui va contenir la quantité 
    let inputQuantity = document.createElement("input");
    divCartItemsSettingQuantity.appendChild(inputQuantity);
    inputQuantity.value = articleToShow.quantity;
    inputQuantity.className = "itemQuantity";
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("min", "1");
    inputQuantity.setAttribute("max", "100");
    inputQuantity.setAttribute("name", "itemQuantity");

    // ajout d'une div   
    let divCartItemsDelete = document.createElement("div");
    divCartItemsDelete.className = "cart__item__content__settings__delete";
    divCartItems.appendChild(divCartItemsDelete);

    // ajout d'un p qui va contenir le bouton "Supprimer"   
    let pDeleteItem = document.createElement("p");
    pDeleteItem.className = "deleteItem";
    divCartItemsDelete.appendChild(pDeleteItem);
    pDeleteItem.textContent = "Supprimer";
}

/**
 * Fonction servant a comparer le LS et l'API.
 * @returns 
 */
async function displayAllProducts() {
    // Declaration d'une constante qui contiendra l'API.
    const products = await fetchProducts();
    console.log(products);
    // Declaration d'une constante qui contiendra le LS.
    const cart = getCart();
    // Remplacer cart par globalArray et supprimer la ligne const product.
    for (let articleToShow of cart) {
        const product = products.filter(p => p._id === articleToShow.id)
        showProducts(product[0], articleToShow);
    }
    return;
}

/**
 * Donne le nombre total des produits dans le panier.
 * @returns {number} "total des produits"
 */
function getTotalQuantity() {
    // Declaration de la variable representant le total quantite.
    let totalQuantity = 0;
    let cart = getCart();
    console.log(`la quantité est de ${totalQuantity} avec un panier vide.`);
    // Boucle pour calcul de la quantite globale.
    for (let number of cart) {
        let productsInCart = number.quantity;
        console.log(`la quantité du canapé est de ${productsInCart}.`);
        // Calcul total produits dans le panier.
        totalQuantity += productsInCart;
    }
    // Modification du DOM.
    document.getElementById("totalQuantity").textContent = totalQuantity;
}

/**
 * Donne le prix total du panier.
 * @returns {number} "Prix total du panier".
 */
async function getTotalPrice() {
    // Declaration des variables pour appeler l'API et le LS.
    let API = await fetchProducts();
    let cart = getCart();
    // Declaration de la variable representant le prix total.
    let totalPrice = 0;
    console.log(`le prix est de ${totalPrice}€ avec un panier vide.`);
    // Boucles pour calcul prix global.
    // Boucle cherchant dans le LS.
    for (let i in cart) {
        // Boucle cherchant dans l'API.
        for (let j in API) {
            const priceOfProduct = API[j].price;
            const idOfProduct = API[j]._id;
            console.log(priceOfProduct);
            if (cart[i].id === idOfProduct) {
                // Calcul total prix.
                totalPrice += cart[i].quantity * priceOfProduct;
            }
        }
    }
    // Recuperation du DOM afin d'afficher le prix total au bon endroit.
    document.getElementById("totalPrice").textContent = totalPrice;
    return;
}

/**
 * Gerer la quantite des produits dans le panier.
 * @param {string} product 
 * @param {number} quantity 
 */
function changeQuantity(id, color, quantity) {
    // Declaration d'une constante qui contiendra le LS.
    let cart = getCart();
    for (let i in cart) {
        // (Critere de comparaison). Si l'article pour lequel on veut mofifier sa quantite a un id et une couleur similaire a celui dans le panier.
        if (cart[i].id === id && cart[i].color === color) {
            // Alors on incremente.
            cart[i].quantity = quantity;
            // Mise a jour du panier.
            saveCart(cart);
            console.log("Quantité modifié !");
        }
    }
    // Appel des fonctions pour les totaux afin que ceux-ci se mettent ajour lors du changement de quantite.
    getTotalPrice();
    getTotalQuantity();
}

/**
 * Possibilite de retirer un produit du panier.
 * @param {string} product 
 */
function deleteItem(id, color) {
    // Declaration d'une constante qui contiendra le LS.
    let cart = getCart();
    for (let i in cart) {
        // (Critere de comparaison). Si l'article que l'on veut supprimer a un id et une couleur similaire a celui dans le panier.
        if (cart[i].id === id && cart[i].color === color) {
            // Alors on le supprime.
            cart.splice(i, 1);
            // Mise a jour du panier.
            saveCart(cart);
            // Rechargement de la page pour la mettre a jour.
            location.reload();
            console.log("Quantité supprimée !");
        }
    }
}

/*--------------------------------------------------------------------------EVENEMENTS PANIER--------------------------------------------------------------------------*/

/**
 * Ecoute de la fonction changement de prix.
 */
function listenChangeInput() {
    // Recuperation du bouton "Qté" dans le DOM.
    let changeInput = document.getElementsByName("itemQuantity");
    for (let item of changeInput) {
        // Methode d'ecoute pour le bouton "Qté".
        item.addEventListener("change", function (event) {
            console.log(changeInput);
            // Constante ciblant l'element parent.
            const parent = event.target.closest("article");
            // Constante recuperant la data-id present dans article.
            const dataId = parent.dataset.id;
            // Constante recuperant la data-color present dans article.
            const dataColor = parent.dataset.color;
            const newQty = parseInt(event.target.value);
            console.log(dataId, dataColor, newQty);
            // Appel de la fonction de changement de quantite, avec les constantes instentiees au-dessus, en parametre.
            changeQuantity(dataId, dataColor, newQty);
        })
    }
}

/**
 * Ecoute de la fonction de suppression.
 */
function listenDeleteItem() {
    // Recuperation du bouton "Suprrimer" dans le DOM.
    let deleteProduct = document.querySelectorAll(".deleteItem");
    for (let item of deleteProduct) {
        // Methode d'ecoute pour le bouton "Supprimer".
        item.addEventListener("click", function (event) {
            console.log(deleteProduct);
            // Constante ciblant l'element parent.
            const parent = event.target.closest("article");
            // Constante recuperant la data-id present dans article.
            const dataId = parent.dataset.id;
            // Constante recuperant la data-color present dans article.
            const dataColor = parent.dataset.color;
            console.log(dataId, dataColor);
            // Condition avec une fenetre demandant confirmation de suppression.
            if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ? Si oui cliquez sur OK sinon ANNULER.")) {
                // Appel de la fonction de suppression, avec les constantes instentiees au-dessus, en parametre.
                deleteItem(dataId, dataColor);
            }
        })
    }
}

/*--------------------------------------------------------------------------FORMULAIRE--------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------VARIABLES FORMULAIRE--------------------------------------------------------------------------*/

// Declaration de la variable servant a recuperer le formulaire dans le DOM.
let formCart = document.querySelector(".cart__order__form");

// Declaration des variables servant a recuperer les messages d'erreur.
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
let addressErrorMsg = document.getElementById("addressErrorMsg");
let cityErrorMsg = document.getElementById("cityErrorMsg");
let emailErrorMsg = document.getElementById("emailErrorMsg");

/*--------------------------------------------------------------------------FONCTIONS FORMULAIRE--------------------------------------------------------------------------*/

/**
 * Fonction pour l'input prenom.
 * @param {*} inputFirstName 
 */
function validFirstName(inputFirstName) {
    /*Creation de la RegExp.
    Dans la RegEx on demande que le texte contienne des minuscules, des majuscules, des accents et/ou un "-". 
    On ajoute le "+" pour peciser qu'ils peuvent etre ecrit plusieurs fois. 
    Le "^" désigne le début de la RegExp, les crochet le contenu de celle-ci et le "$" la fin.
    Le "g" est un flag qui signifie que l'on veut chercher dans le global du formulaire.*/
    let textRegex = new RegExp("^[a-zA-ZÀ-ÿ-]+$", "g");
    let testFirstName = textRegex.test(inputFirstName.value);
    console.log(testFirstName);
    if (testFirstName === false) {
        firstNameErrorMsg.textContent = 'Veuillez renseigner le champ "Prénom" correctement.';
    }else{
        firstNameErrorMsg.textContent = "";
    }
}

/**
 * Fonction pour l'input nom.
 * @param {*} inputLastName 
 */
function validLastName(inputLastName) {
    // Creation de la RegExp.
    let textRegex = new RegExp("^[a-zA-ZÀ-ÿ-]+$", "g");
    let testLastName = textRegex.test(inputLastName.value);
    console.log(testLastName);
    if (testLastName === false) {
        lastNameErrorMsg.textContent = 'Veuillez renseigner le champ "Nom" correctement.';
    }else{
        lastNameErrorMsg.textContent = "";
    }
}

/**
 * Fonction pour l'input adresse.
 * @param {*} inputAddress 
 */
function validAddress(inputAddress) {
    // Creation de la RegExp.
    let addressRegex = new RegExp("^[a-zA-ZÀ-ÿ0-9-]+$", "g");
    let testAddress = addressRegex.test(inputAddress.value);
    console.log(testAddress);
    if (testAddress === false) {
        addressErrorMsg.textContent = 'Veuillez renseigner le champ "Adresse" correctement.';
    }else{
        addressErrorMsg.textContent = "";
    }
}

/**
 * Fonction pour l'input ville.
 * @param {*} inputCity 
 */
function validCity(inputCity) {
    // Creation de la RegExp.
    let textRegex = new RegExp("^[a-zA-ZÀ-ÿ-]+$", "g");
    let testCity = textRegex.test(inputCity.value);
    console.log(testCity);
    if (testCity === false) {
        cityErrorMsg.textContent = 'Veuillez renseigner le champ "Ville" correctement.';
    }else{
        cityErrorMsg.textContent = "";
    }
}

/**
 * Fonction pour l'input email.
 * @param {*} inputEmail 
 */
function validEmail(inputEmail) {
    // Creation de la RegExp.
    let emailRegex = new RegExp("^[a-zA-ZÀ-ÿ0-9._-]+ [@]{1} + [a-zA-ZÀ-ÿ.-]+ [.]{1}[a-z]{2,10}$", "g");
    let testEmail = emailRegex.test(inputEmail.value);
    console.log(testEmail);
    if (testEmail === false) {
        emailErrorMsg.textContent = 'Veuillez renseigner le champ "Email" correctement.';
    }else{
        emailErrorMsg.textContent = "";
    }
}

/*--------------------------------------------------------------------------EVENEMENTS FORMULAIRE--------------------------------------------------------------------------*/

/**
 * Fonction regroupant tout les eventListener des inputs du formulaire.
 */
function allInput() {
    formCart.firstName.addEventListener("change", function () {
        validFirstName(this);
    });
    console.log(formCart.firstName);

    formCart.lastName.addEventListener("change", function () {
        validLastName(this);
    });
    console.log(formCart.lastName);

    formCart.address.addEventListener("change", function () {
        validAddress(this);
    });
    console.log(formCart.address);

    formCart.city.addEventListener("change", function () {
        validCity(this);
    });
    console.log(formCart.city);

    formCart.email.addEventListener("change", function () {
        validEmail(this);
    });
    console.log(formCart.email);
}

/*--------------------------------------------------------------------------COMMANDE--------------------------------------------------------------------------*/

// Requete POST pour passer commande.
/* 1 - Evénement d'écoute au bouton (penser au event.preventDefault()).
2 - Récupérer dans des constantes les firstName... (leurs valeurs)
3 - Créer un objet contact qui contiendra les infos (exemple: const contact={firstName: firstName....}
4 - Faire une condition de vérification "est-ce que mes inputs sont bien remplis"
5 - Sont-ils valides ?
6 - Basculer sur une autre fonction dans laquelle on va instaurer un tableau vide qui va accueillir tous les id des produits de ton cart
7 - Créer un objet avec ce tableau et le contact que tu avais créé avant
8 - fetch post dans lequel on en profitera pour aller faire notre document.location avec le orderId (clé qui est déterminée dans tes spects techniques 
"if (firstName && lastName && address && city && email)"
"const firstName = document.getElementById("firstName").value;"*/

/*--------------------------------------------------------------------------FONCTION FORMULAIRE--------------------------------------------------------------------------*/

/**
 * Fonction permettant de passer la commander.
 */
// function placeOrder() {
//     if (cart > 0 && formCart) {

//     }
// }
/* On écoute le bouton Commander au panier avec l'Evenement click*/
const orderBtn = document.getElementById("order");
orderBtn.addEventListener("click", function(e) {
    if(allInput()){
        const contact = {
            firstName : firstName,
            lastName : lastName,
            address : address,
            city : city,
            email : email
        }
    }
})

// document.querySelector("#order").addEventListener("click", function(event) {
//     console.log("Désolé ! preventDefault() ne vous laissera pas cocher ceci.");
//     event.preventDefault();
//   }, false);

/*--------------------------------------------------------------------------EVENEMENT COMMANDE--------------------------------------------------------------------------*/

/**
 * Ecoute de la fonction de commande.
 */
// function listenPlaceOrder() {
//     // Recuperation du bouton commander dans le DOM.
//     let placeOrderButton = document.getElementById("order");

// }

/*--------------------------------------------------------------------------CHARGEMENT DE LA PAGE--------------------------------------------------------------------------*/

/**
 * Fonction principale appelant les autres fonctions de la page.
 */
async function main() {
    await displayAllProducts();
    getTotalQuantity();
    getTotalPrice();
    listenChangeInput();
    listenDeleteItem();
    // listenPlaceOrder();
    allInput();
}
main();