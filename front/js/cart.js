let article;
const fetchProducts = async function() {
    await fetch('http://localhost:3000/api/products') // on va chercher l'API avec la methode fetch.
    .then(res => res.json())
    .then(json => article = json) // Creation d'une promesse en renvoyant la réponse au format JSON. Puis definition d'un parametre pour products en reutilisant .then.
    .catch((error) => console.error(error));
}

let cart = JSON.parse(localStorage.getItem("cart")); // Recuperation du LS.
console.log(cart);



/**********FONCTIONS**********/

/**
 * Fonction pour s'assurer de bien recuperer addToCart.
 */
const cartDisplay = () => {
    if (cart) { // addToCart est bien recupere.
        cart;
    }
};
cartDisplay();

/**
 * Fonction pour afficher les elements presents dans le panier.
 */
const showProducts = async function() {
    await fetchProducts()
    // Affichage des produits.
    for (let i = 0; i < cart.length; i++) {

        let cartItems = document.getElementById("cart__items");

        // Ajout de l'element article.
        let cartArticles = document.createElement("article");
        cartItems.appendChild(cartArticles);
        cartArticles.setAttribute("data-id", cart[i].id);
        cartArticles.setAttribute("data-color", cart[i].colors)
        cartArticles.className = "cart__item";

        // Ajout de l'element div qui va contenir l'img.
        let divCartImages = document.createElement("div");
        divCartImages.className = "cart__item__img";
        cartArticles.appendChild(divCartImages);

        // Ajout de l'élement img.
        let cartImages = document.createElement("img");
        cartImages.setAttribute('src', article[i].imageUrl);
        cartImages.setAttribute('alt', article[i].altTxt);
        divCartImages.appendChild(cartImages);

        // Ajout d'une div.
        let divCartItems = document.createElement("div");
        divCartItems.className = "cart__item__content";
        cartArticles.appendChild(divCartItems);

        // Ajout d'une div.
        let divCartItemsDescription = document.createElement("div");
        divCartItemsDescription.className = "cart__item__content__description";
        divCartItems.appendChild(divCartItemsDescription);

        // Ajout du h2 qui va contenir le nom du produit.
        let divCartItemsDescriptionName = document.createElement("h2");
        divCartItemsDescription.appendChild(divCartItemsDescriptionName);
        divCartItemsDescriptionName.innerHTML = article[i].name;

        // Ajout d'un p qui va contenir la couleur du produit.
        let divCartItemsDescriptionColor = document.createElement("p");
        divCartItemsDescription.appendChild(divCartItemsDescriptionColor);
        divCartItemsDescriptionColor.innerHTML = cart[i].color;

        // Ajout d'un p qui va contenir le prix du produit.
        let divCartItemsDescriptionPrice = document.createElement("p");
        divCartItemsDescription.appendChild(divCartItemsDescriptionPrice);
        divCartItemsDescriptionPrice.innerHTML = article[i].price + " €"; // Ici le prix a été récupéré de l'api directement.

        // Ajout d'une div.    
        let divCartItemsSetting = document.createElement("div");
        divCartItemsSetting.className = "cart__item__content__settings";
        divCartItems.appendChild(divCartItemsSetting);

        // Ajout d'une div.
        let divCartItemsSettingQuantity = document.createElement("div");
        divCartItemsSettingQuantity.className = "cart__item__content__settings__quantity";
        divCartItemsSetting.appendChild(divCartItemsSettingQuantity);

        // Ajout d'un p qui va contenir le mot "Qté :".
        let divCartItemsSettingQty = document.createElement("p");
        divCartItemsSettingQuantity.appendChild(divCartItemsSettingQty);
        divCartItemsSettingQty.innerHTML = "Qté : ";

        // Ajout de l'input qui va contenir la quantité.
        let inputQuantity = document.createElement("input");
        divCartItemsSettingQuantity.appendChild(inputQuantity);
        inputQuantity.value = cart[i].quantity;
        inputQuantity.className = "itemQuantity";
        inputQuantity.setAttribute("type", "number");
        inputQuantity.setAttribute("min", "1");
        inputQuantity.setAttribute("max", "100");
        inputQuantity.setAttribute("name", "itemQuantity");

        // Ajout d'une div.
        let divCartItemsDelete = document.createElement("div");
        divCartItemsDelete.className = "cart__item__content__settings__delete";
        divCartItems.appendChild(divCartItemsDelete);

        // Ajout d'un p qui va contenir le bouton "Supprimer".   
        let pDeleteItem = document.createElement("p");
        pDeleteItem.className = "deleteItem";
        divCartItemsDelete.appendChild(pDeleteItem);
        pDeleteItem.innerHTML = "Supprimer";
    }
}

showProducts();

/**
 * Possibilite de retirer un produit du panier.
 * @param {string} product 
 */
function removeFromCart(product) {
    // Variable localStorage.
    let cart = getCart();
    cart = cart.filter(p => p.id != product.id);
    saveCart(cart);
}

/**
 * Gerer la quantite des produits dans le panier.
 * @param {string} product 
 * @param {number} quantity 
 */
function changeQuantity(product, quantity) {
    // Variable localStorage.
    let cart = getCart();
    let foundProduct = cart.find(p => p.id == product.id);
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0) {
            removeFromCart(product);
        } else {
            saveCart(cart);
        }
    }
}

/**
 * Donne le nombre total des produits dans le panier.
 * @returns {number} "total des produits"
 */
function getNumberProduct() {
    // Variable localStorage.
    let cart = getCart();
    let number = 0;
    for (let product of cart) {
        number += product.quantity;
    }
    return number;
}

/**
 * Donne le prix total du panier.
 * @returns {number} "prix total du panier"
 */
function getTotalPrice() {
    // Variable localStorage.
    let cart = getCart();
    let total = 0;
    for (let product of cart) {
        total += product.quantity * product.price;
    }
    return total;
}