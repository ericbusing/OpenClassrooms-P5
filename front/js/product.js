/**********VARIABLES**********/

// Creation des variables.
let elementImage = document.querySelector(".item__img");
let elementName = document.getElementById("title");
let elementPrice = document.getElementById("price");
let elementDescription = document.getElementById("description");
let elementColorChoice = document.getElementById("colors");

/**********FONCTIONS**********/

/**
 * Recuperation de l'ID.
 * @return {id} identifiant du produit voulu.
 */
const getIdFromUrl = function () {
    let params = new URL(document.location).searchParams;
    let id = params.get("id");
    return id;
}

let id = getIdFromUrl();

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

        .then(function (article) {
            // Affichage du produit voulu dans la console.
            console.log(article);
            console.log(article.colors);
            setColorSelect(article.colors);
            setHTML(article);
        })
}

/**
 * Ajout des details HTML du produit voulu.
 * @param {string} 
 */
const setHTML = function (article) {

    // Placement des donnees API aux bons endroits. 
    let imageContainer = document.createElement("img");
    imageContainer.setAttribute("src", article.imageUrl);
    imageContainer.setAttribute("alt", article.altTxt);
    elementImage.appendChild(imageContainer);
    console.log(imageContainer);
    elementName.textContent = article.name;
    elementPrice.textContent = article.price;
    elementDescription.textContent = article.description;
}

/** 
 * Ajout des couleurs dans la liste.
 * @param {array}
*/
const setColorSelect = function (colors) {
    let domColors = document.getElementById("colors");
    // Affichage des couleurs dans la console.
    console.log(domColors);
    for (let color of colors) {
        let option = document.createElement("option");
        option.textContent = color;
        domColors.appendChild(option);
    }
}

/**********FONCTIONS PANIER **********/

/**
 * Affichage du panier sous forme de string dans la console.
 * @param {array} cart
 */
 function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Creation du panier et de sa condition si panier vide.
 * @param {array} cart 
 * @returns {json}
 */
function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

/**
 * Recherhe si produit similaire, incrementer ce produit, sinon ajouter le produit.
 * @param {string} product 
 */
function addToCart(product) {
    let cart = getCart();
    let foundProduct = cart.find(p => p.id == product.id);
    if (foundProduct != undefined) {
        foundProduct.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    saveCart(cart);
}

/**
 * Possibilite de retirer un produit du panier.
 * @param {string} product 
 */
function removeFromCart(product) {
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
function getTotalPrice(){
    let cart = getCart();
    let total = 0;
    for (let product of cart) {
        total += product.quantity * product.price;
    }
    return total;
}

/**********AJOUT PANIER**********/

addToCart.addEventListener("click", () => {
    let productSelect = {
        id: id,
        quantity: quantity.value,
        color: colors.value,
        name: article.name
    };
});

/**********EVENEMENTS**********/

// Chargement de page
let productId = getIdFromUrl();
console.log(productId);
let productElement = getElement(productId);