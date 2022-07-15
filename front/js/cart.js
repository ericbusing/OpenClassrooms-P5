/**********FONCTIONS**********/

// Recuperation du LS.
let cart = JSON.parse(localStorage.getItem("cart"));

// Triage du LS.
cart.sort

/** 
 * Recuperation des donnees sur l'API.
 * @param {string} "identifiant du produit"
 * @return {json}
*/
const getElement = function (id) {

    // Ajout de l'ID sur l'URL.
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(function (response) {
            console.log(response);
            // Utilisation d'une condition pour l'affichage de la reponse dans la console.
            if (response.ok) {
                return response.json();
            }
        })
}

/********CREATION DES ELEMENTS DANS LA PAGE PANIER**********/

/**
 * Creation affichage panier.
 */
function displayCart(){
    for(let articleInCart of cart) {
        console.log(articleInCart);
        // Appel de l'element parent.
        const section = document.getElementById("cart__items");
        // Creation d'article.
        let article = document.createElement("article");
        // article = 
        section.appendChild(article);
    }
}


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