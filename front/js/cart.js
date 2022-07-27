/**********VARIABLES**********/

// let cart = JSON.parse(localStorage.getItem("cart")); // On recupere ce qu'il y a dans le local storage.
// console.log(cart);
let cartItems = document.getElementById("cart__items");

/**********FONCTIONS**********/
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
    cartArticles.setAttribute("data-color", articleToShow.colors)
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
    const products = await fetchProducts();
    console.log(products);
    let cart = getCart();
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
function getNumberProduct() {
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
// Appel de la fonction de total produits.
getNumberProduct();

/**
 * Donne le prix total du panier.
 * @returns {number} "Prix total du panier".
 */
async function getTotalPrice() {
    let API = await fetchProducts();
    let cart = getCart();
    // Declaration de la variable representant le prix total.
    let totalPrice = 0;
    console.log(`le prix est de ${totalPrice}€ avec un panier vide.`);
    // Boucle pour calcul prix global.
    for (let i in cart) {

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
    document.getElementById("totalPrice").textContent = totalPrice;
    return;
}
// Appel de la fonction de total prix.
getTotalPrice();

/**
 * Gerer la quantite des produits dans le panier.
 * @param {string} product 
 * @param {number} quantity 
 */
function changeQuantity(id, color, quantity) {
    let cart = getCart();
    for (let i in cart) {
        // const addProduct = cart[i];
        if (cart[i].id === id && cart[i].color === color) {
            // Incrementation en cas de meme id et de meme couleur.
            cart[i].quantity = quantity;
        }
        saveCart(cart);
        location.reload();
    }
}

/**
 * Appel de la fonction changement de prix.
 */
function listenChangeInput() {
    let changeInput = document.getElementsByName("itemQuantity");
    for (let item of changeInput) {

        item.addEventListener("change", function (event) {
            console.log(changeInput);

            const parent = event.target.closest("article");
            const dataId = parent.dataset.id;
            const dataColor = parent.dataset.color;
            const newQty = parseInt(event.target.value);
            changeQuantity(dataId, dataColor, newQty);
        })
    }
}
// Appel de la fonction écoute bouton changement quantite.


// /**
//  * Possibilite de retirer un produit du panier.
//  * @param {string} product 
//  */
// function deleteItem() {
//     cart = cart.filter(p => p.id != product.id);
// }
// function listenDeleteItem() {

//     // cart = cart.filter(pDeleteItem => pDeleteItem.id != article.id);
//     // saveCart(cart);
//     pDeleteItem.addEventListener("click", function () {

//     });
// }

/********EVENEMENTS********/

// Creer un addEventListener pour la quantite.
// Creer un addEventListener pour la suppression.
// Creer un addEventListener pour le passage de commande.

/**
 * 
 */
async function main() {
    await displayAllProducts();
    listenChangeInput();
}
main();

/**********FORMULAIRE**********/

