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
const fetchProducts = function () {
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

    // Ajout de l'element article.
    let cartArticles = document.createElement("article");
    cartItems.appendChild(cartArticles);
    cartArticles.setAttribute("data-id", articleToShow.id);
    cartArticles.setAttribute("data-color", articleToShow.color)
    cartArticles.className = "cart__item";

    // Ajout de l'element div qui va contenir l'img.
    let divCartImages = document.createElement("div");
    divCartImages.className = "cart__item__img";
    cartArticles.appendChild(divCartImages);

    // Ajout de l'élement img.
    let cartImages = document.createElement("img");
    cartImages.setAttribute('src', products.imageUrl);
    cartImages.setAttribute('alt', products.altTxt);
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
    divCartItemsDescriptionName.textContent = products.name;

    // Ajout d'un p qui va contenir la couleur du produit.
    let divCartItemsDescriptionColor = document.createElement("p");
    divCartItemsDescription.appendChild(divCartItemsDescriptionColor);
    divCartItemsDescriptionColor.textContent = articleToShow.color;

    // Ajout d'un p qui va contenir le prix du produit.
    let divCartItemsDescriptionPrice = document.createElement("p");
    divCartItemsDescription.appendChild(divCartItemsDescriptionPrice);
    divCartItemsDescriptionPrice.textContent = products.price + " €"; // Ici le prix a été récupéré de l'api directement.

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
    divCartItemsSettingQty.textContent = "Qté : ";

    // Ajout de l'input qui va contenir la quantité.
    let inputQuantity = document.createElement("input");
    divCartItemsSettingQuantity.appendChild(inputQuantity);
    inputQuantity.value = articleToShow.quantity;
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
    pDeleteItem.textContent = "Supprimer";
}

/**
 * Fonction servant a comparer le LS et l'API.
 */
async function displayAllProducts() {
    // Declaration d'une constante qui contiendra l'API.
    const products = await fetchProducts();
    // Declaration d'une constante qui contiendra le LS.
    const cart = getCart();
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
    // Boucle pour calcul de la quantite globale.
    for (let number of cart) {
        let productsInCart = number.quantity;
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
    // Boucles pour calcul prix global.
    // Boucle cherchant dans le LS.
    for (let i in cart) {
        // Boucle cherchant dans l'API.
        for (let j in API) {
            const priceOfProduct = API[j].price;
            const idOfProduct = API[j]._id;
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
 * @param {string} id 
 * @param {string} color
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
            if (cart[i].quantity > 0 && cart[i].quantity <= 100) {
                // Sinon ne pas valider et afficher un message d'erreur.
            } else {
                return false;
            }
        }
    }
    // Appel des fonctions pour les totaux afin que ceux-ci se mettent ajour lors du changement de quantite.
    getTotalPrice();
    getTotalQuantity();
}

/**
 * Possibilite de retirer un produit du panier.
 * @param {string} id 
 * @param {string} color
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
            // Constante ciblant l'element parent.
            const parent = event.target.closest("article");
            // Constante recuperant la data-id present dans article.
            const dataId = parent.dataset.id;
            // Constante recuperant la data-color present dans article.
            const dataColor = parent.dataset.color;
            const newQty = parseInt(event.target.value);
            // Appel de la fonction de changement de quantite, avec les constantes instentiees au-dessus, en parametre.
            if (newQty > 0 && newQty <= 100) {
                changeQuantity(dataId, dataColor, newQty);
            } else {
                alert("Veuillez saisir une quantité entre 1 et 100.");
            }
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
            // Constante ciblant l'element parent.
            const parent = event.target.closest("article");
            // Constante recuperant la data-id present dans article.
            const dataId = parent.dataset.id;
            // Constante recuperant la data-color present dans article.
            const dataColor = parent.dataset.color;
            // Condition avec une fenetre demandant confirmation de suppression.
            if (window.confirm(`Êtes-vous sûr de vouloir supprimer cet article ? Si oui cliquez sur "OK" sinon "ANNULER".`)) {
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
// const inputFirst = document.querySelector('#firstName');
// inputFirst.setAttribute('minlenght', 2);

// Declaration des variables servant a recuperer les messages d'erreur.
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
let addressErrorMsg = document.getElementById("addressErrorMsg");
let cityErrorMsg = document.getElementById("cityErrorMsg");
let emailErrorMsg = document.getElementById("emailErrorMsg");

// Declaration des variables contenant les RegExp.
/*Dans la RegEx on demande que le texte contienne des minuscules, des majuscules, des accents et/ou un "-". 
On ajoute le "+" pour peciser qu'ils peuvent etre ecrit plusieurs fois. 
Le "^" désigne le début de la RegExp, les crochet le contenu de celle-ci et le "$" la fin.
Le "g" est un flag qui signifie que l'on veut chercher dans le global du formulaire.*/
let textRegex = new RegExp("^([a-zA-Z,éêèàëÉÈÊË.'-]+[ ]?){3,}$");
let addressRegex = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

/*--------------------------------------------------------------------------FONCTIONS FORMULAIRE--------------------------------------------------------------------------*/

/**
 * Fonction pour l'input prenom.
 * @param {*} inputFirstName 
 */
let testFirstName
function validFirstName() {
    let inputFirstName = document.getElementById("firstName").value;
    // Declaration d'une variable contenant le test Regex.
    testFirstName = textRegex.test(inputFirstName);
    // Si le testRegex n'est pas bon.
    if (!testFirstName) {
        // Alors afficher un message d'erreur.
        firstNameErrorMsg.textContent = 'Veuillez renseigner le champ "Prénom" correctement.';
        return false;
    } else {
        firstNameErrorMsg.textContent = "";
    }
}

/**
 * Fonction pour l'input nom.
 * @param {*} inputLastName 
 */
let testLastName;
function validLastName() {
    let inputLastName = document.getElementById("lastName").value;
    testLastName = textRegex.test(inputLastName);
    if (!testLastName) {
        lastNameErrorMsg.textContent = 'Veuillez renseigner le champ "Nom" correctement.';
    } else {
        lastNameErrorMsg.textContent = "";
    }
}

/**
 * Fonction pour l'input adresse.
 * @param {*} inputAddress 
 */
let testAddress;
function validAddress() {
    let inputAddress = document.getElementById("address").value;
    testAddress = addressRegex.test(inputAddress);
    if (!testAddress) {
        addressErrorMsg.textContent = 'Veuillez renseigner le champ "Adresse" correctement.';
    } else {
        addressErrorMsg.textContent = "";
    }
}

/**
 * Fonction pour l'input ville.
 * @param {*} inputCity 
 */
let testCity;
function validCity() {
    let inputCity = document.getElementById("city").value;
    testCity = textRegex.test(inputCity);
    if (!testCity) {
        cityErrorMsg.textContent = 'Veuillez renseigner le champ "Ville" correctement.';
    } else {
        cityErrorMsg.textContent = "";
    }
}

/**
 * Fonction pour l'input email.
 * @param {*} inputEmail 
 */
let testEmail;
function validEmail() {
    let inputEmail = document.getElementById("email").value;
    testEmail = emailRegex.test(inputEmail);
    if (!testEmail) {
        emailErrorMsg.textContent = 'Veuillez renseigner le champ "Email" correctement. N\'oubliez pas l\'@.';
    } else {
        emailErrorMsg.textContent = "";
    }
}

/*--------------------------------------------------------------------------EVENEMENTS FORMULAIRE--------------------------------------------------------------------------*/

/**
 * Fonction d'ecoute regroupant tout les eventListener des inputs du formulaire.
 */
function allInput() {
    formCart.firstName.addEventListener("change", function () {
        validFirstName();
    });

    formCart.lastName.addEventListener("change", function () {
        validLastName();
    });

    formCart.address.addEventListener("change", function () {
        validAddress();
    });

    formCart.city.addEventListener("change", function () {
        validCity();
    });

    formCart.email.addEventListener("change", function () {
        validEmail();
    });
}

/*--------------------------------------------------------------------------COMMANDE--------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------VARIABLES COMMANDE--------------------------------------------------------------------------*/

// Declaration des variables utiles pour la partie commande de la page.
const orderButton = document.getElementById("order");
let cart = getCart();
let allProducts = [];

/*--------------------------------------------------------------------------FONCTIONS COMMANDE--------------------------------------------------------------------------*/

/**
 * Fonction pour checker le formulaire.
 */

function checkForm() {
    validFirstName
    validLastName
    validAddress
    validCity
    validEmail 
}



/**
 * Fonction pour verifier le contenu du panier.
 */
function checkCart() {
    // Si le panier est vide.
    if (cart.length <= 0) {
        // Afficher un message d'alerte redirigeant vers la page d'accueil.
        alert("Vous n'avez aucun article dans votre panier.");
        document.location.href = "./index.html";
    } else {
        // Sinon, push les produits du panier dans allProducts.
        for (let i = 0; i < cart.length; i++) {
            allProducts.push(cart[i].id);
        }
    }
}

/**
 * Fonction qui permet d'envoyer un requete POST avec les coordonnees client et les produits commandes.
 * @param {array} contact 
 */
function validateOrder(contact) {
    // Declaration d'un objet contenant les coordonnees client + les produits choisis par celui-ci.
    const order = {
        contact: contact,
        products: allProducts
    }
    fetch('http://localhost:3000/api/products/order', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order),
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            // Redirection vers la page confirmation avec un orderId.
            document.location.href = `./confirmation.html?orderId=${data.orderId}`;
        })
        .catch(function (error) {
            alert("Il y a une erreur" + error);
        })
}

/*--------------------------------------------------------------------------EVENEMENT COMMANDE--------------------------------------------------------------------------*/

/**
 * On écoute le bouton Commander au panier avec l'evenement click.
 */
function listenOrderButton() {
    orderButton.addEventListener("click", function (event) {
        event.preventDefault();
        // Déclaration des constantes afin de recuperer les values des inputs.
        const testFirstName2 = document.getElementById("firstName").value;
        const testLastName2 = document.getElementById("lastName").value;
        const testAddress2 = document.getElementById("address").value;
        const testCity2 = document.getElementById("city").value;
        const testEmail2 = document.getElementById("email").value;
        // Déclaration d'un objet contenant le resultat des inputs.
        const contact = {
            firstName: testFirstName,
            lastName: testLastName,
            address: testAddress,
            city: testCity,
            email: testEmail
        }
        // Si les inputs sont correctements remplis.
        if (testFirstName2 && testLastName2 && testAddress2 && testCity2 && testEmail2) {

            if (testFirstName === true && testLastName === true && testAddress === true && testCity === true && testEmail === true) {
                // Alors valider la commande.
                validateOrder(contact);
            }
        } else {
            !checkForm()
            alert("Veuillez remplir tout les champs du formulaire avant de passer commande.");
        }
    })
}

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
    allInput();
    checkCart();
    listenOrderButton();
}
main();