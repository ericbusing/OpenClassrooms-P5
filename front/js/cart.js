/**********VARIABLES**********/

let cart = JSON.parse(localStorage.getItem("cart")); // on recupere ce qu'il y a dans le local storage
console.log(cart);


/**********FONCTIONS**********/

/**
 * 
 * @returns 
 */
const fetchProducts = () => {
    return fetch('http://localhost:3000/api/products') // on va chercher l'API avec la methode fetch 
        .then(res => res.json())
        .then(data => data) // on fait une promesse en renvoyant la réponse au format JSON. // on définit un paramètre pour products en réutilisant .then 
        .catch((error) => console.error(error));
}

/**
 * 
 * @param {*} products 
 * @param {*} articleToShow 
 */
const showProducts = async (products, articleToShow) => {

    // Affichage des produits

    let cartItems = document.getElementById("cart__items");

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
    divCartItemsDescriptionName.innerHTML = products.name;

    // ajout d'un p qui va contenir la couleur du produit
    let divCartItemsDescriptionColor = document.createElement("p");
    divCartItemsDescription.appendChild(divCartItemsDescriptionColor);
    divCartItemsDescriptionColor.innerHTML = articleToShow.color;

    // ajout d'un p qui va contenir le prix du produit
    let divCartItemsDescriptionPrice = document.createElement("p");
    divCartItemsDescription.appendChild(divCartItemsDescriptionPrice);
    divCartItemsDescriptionPrice.innerHTML = products.price + " €"; // ici le prix a été récupéré de l'api directement

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
    divCartItemsSettingQty.innerHTML = "Qté : ";

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
    pDeleteItem.innerHTML = "Supprimer";
}

/**
 * 
 * @returns 
 */
async function displayAllProducts() {
    const products = await fetchProducts();
    console.log(products);
    let cart = JSON.parse(localStorage.getItem("cart"));

    for (let articleToShow of cart) {
        const product = products.filter(p => p._id === articleToShow.id)
        showProducts(product[0], articleToShow);
    }

    return;
}

/**
 * 
 */
async function main() {
    await displayAllProducts();
}
main();

/**
 * Possibilite de retirer un produit du panier.
 * @param {string} product 
 */
function deleteItem(){
    cart = cart.filter(p => p.id != product.id);
}
// function listenDeleteItem() {

//     // cart = cart.filter(pDeleteItem => pDeleteItem.id != article.id);
//     // saveCart(cart);
//     pDeleteItem.addEventListener("click", function () {

//     });
// }

/**
 * Gerer la quantite des produits dans le panier.
 * @param {string} product 
 * @param {number} quantity 
 */
function changeQuantity(product, quantity) {

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

    let total = 0;
    for (let product of cart) {
        total += product.quantity * product.price;
    }
    return total;
}