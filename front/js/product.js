/**********VARIABLES**********/

// Creation des variables.
let elementImage = document.querySelector(".item__img");
let elementName = document.getElementById("title");
let elementPrice = document.getElementById("price");
let elementDescription = document.getElementById("description");
let elementCart = document.getElementById("addToCart");
let id = getIdFromUrl();

/**********FONCTIONS**********/

/**
 * Recuperation de l'ID.
 * @return {id} identifiant du produit voulu.
 */
function getIdFromUrl() {
    let params = new URL(document.location).searchParams;
    let id = params.get("id");
    return id;
}

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
    // Serialisation de cart en chaine de caractere.
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
 * Recherhe si produit similaire, incrementer ce produit, sinon ajouter le produit.
 * @param {string} product 
 */
function addToCart(product) {
    let cart = getCart();
    for (let i in cart) {
        const productInCart = cart[i];
        // Comparaison de l'id et de la couleur entre le panier et le produit ajoute.
        if (product.id === productInCart.id && product.colors === productInCart.colors) {
            // Incrementation en cas de meme id et de meme couleur.
            productInCart.quantity === product.quantity + productInCart.quantity;
        } else {
            // Ajouter a cart.
            cart.push(product);
        }
    }
    saveCart(cart);
    return;
}

/**********EVENEMENTS**********/

/**********AJOUT PANIER**********/

/**
 * Evenement au clic sur le bouton "addToCart".
 */
elementCart.addEventListener("click", () => {
    // Creation de l'objet contenant les cles/valeurs necessaire.
    let product = {
        id: id,
        quantity: parseInt(quantity.value),
        color: colors.value,
    };
    console.log(product);
    // Appel de la fonction afin de rattacher l'evenement au localStorage.
    addToCart(product);
});

// Chargement de page
let productId = getIdFromUrl();
console.log(productId);
let productElement = getElement(productId);