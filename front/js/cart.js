/**********FONCTIONS**********/

// Recuperation du LS.
let cart;
function getLS() {
    cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
}

getLS();

/** 
 * Recuperation des donnees sur l'API.
 * @param {string} "identifiant du produit"
 * @return {json}
*/
let article;
async function getElement() {

    // Ajout de l'ID sur l'URL.
    await fetch(`http://localhost:3000/api/products`)
        .then(res => res.json())
        .then(json => article = json)

        .catch(function (err) {
            // Gestion des erreurs.
            console.log("ERREUR", err);
            alert("ERREUR API");
        })
    console.log("ici", article);
}

// point de comparaison LS/fetch

// Avec un filter.

/********CREATION DES ELEMENTS DANS LA PAGE PANIER**********/

/**
 * Creation affichage panier.
 */
 function displayCart() {
    article = getElement();

    // for (let articleInCart in cart) {
    for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < article.length; j++) {
            console.log(cart.length);
            // Appel de l'element parent.
            const section = document.getElementById("cart__items");
            // Creation d'article.
            let article = document.createElement("article");
            // Article rattache à son element parent.
            section.appendChild(article);
            console.log(section);
            // Creation de la div contenant l'img.
            let div = document.createElement("div");
            article.appendChild(div);
            console.log(div);

            let image = document.createElement("img");
            image.setAttribute("src", article[j].imageUrl);
            image.setAttribute("alt", article[j].altTxt);
            div.appendChild(image);
            console.log(image);

            let divContent = document.createElement("div");
            article.appendChild(divContent);

            let descriptionContent = document.createElement("div");
            divContent.appendChild(descriptionContent);

            let title = document.createElement("h2");
            title.textContent = cart[i].name;
            descriptionContent.appendChild(title);

            let color = document.createElement("p");
            // color = cart[i].color;
            // descriptionContent.appendChild(color);
            color.innerHTML = cart[i].colors;

            let price = document.createElement("p");
            price.innerHTML = cart[i].price;
            // descriptionContent.appendChild(price);
        }
    }
}
// }
// getElement();
displayCart();

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