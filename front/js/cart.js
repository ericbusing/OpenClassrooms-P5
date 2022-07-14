

/**********FONCTIONS**********/

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