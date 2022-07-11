/**********VARIABLES**********/

// Creation des variables.
let elementImage = document.getElementsByClassName("item__img");
let elementName = document.getElementById("title");
let elementPrice = document.getElementById("price");
let elementDescription = document.getElementById("description");
let elementColorChoice = document.getElementById("colors")

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
            elementImage.src = article.imageUrl;
            elementName.textContent = article.name;
            elementPrice.textContent = article.price;
            elementDescription.textContent = article.description;
            console.log(article.colors);
            setColorSelect(article.colors);
            // console.log(article.article);
            // setHTML(article.article);
        })
}

/**
 * 
 * 
 */
// const setHTML = function (article) {
//     // Placement des donnees API aux bons endroits.    
//     elementImage.src = article.imageUrl;
//     elementName.textContent = article.name;
//     elementPrice.textContent = article.price;
//     elementDescription.textContent = article.description;
// }

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

/**********EVENEMENTS**********/

// Chargement de page
let productId = getIdFromUrl();
console.log(productId);
let productElement = getElement(productId);
console.log(productElement);