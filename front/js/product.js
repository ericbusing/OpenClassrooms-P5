/**********VARIABLES**********/

// Creation des variables.
// let elementImage = document.getElementsByClassName("item__img");
let elementName = document.getElementById("title");
let elementPrice = document.getElementById("price");
let elementDescription = document.getElementById("description");
let elementColorChoice = document.getElementById("colors");
let imageContainer = document.getElementById("item__img");

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
    let imageContainer = document.getElementsByTagName("div")[0];   
    let image = document.createElement("img");
    image.src = article.imageUrl;
    image.alt = article.altTxt;
    console.log(image);
    imageContainer.appendChild(image);

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

/**********AJOUT PANIER**********/

/**
 * Fonction permettant d'ajouter une quantite et une couleur dans le panier.
 */
addToCart.onclick = function () {
    // Cration d'un objet.
    let kanap = {
        idKanap : id.value,
        quantityKanap : quantity.value,
        colorKanap : colors.value
    }
    // On declare avec les paires de cle/valeur correspondant au nombre, a la couleur + objet(kanap).
    localStorage.setItem(title.value, price.value, JSON.stringify(kanap));
    // document.location.reload();
}
// On recupere les valeurs avec les cles.
let kanapLocal = JSON.parse(localStorage.getItem("kanap"));
localStorage.getItem(quantity.value, JSON.parse(kanapLocal));

/**********EVENEMENTS**********/

// Chargement de page
let productId = getIdFromUrl();
console.log(productId);
let productElement = getElement(productId);
console.log(productElement);