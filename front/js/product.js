// Recuperation de l'ID produit.
let params = new URL(document.location).searchParams;
let id = params.get("id");
// Affichage de l'ID, correspondant au produit, dans la console.
console.log(id);

// Creation de constantes.
const elementImage = document.getElementsByClassName("item__img");
const elementName = document.getElementById("title");
const elementPrice = document.getElementById("price");
const elementDescription = document.getElementById("description");
const elementColorChoice = document.getElementById("colors")

const getElement = function () {
    // Recuperation des donnees sur l'API.
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
            // Placement des donnees API  aux bons endroits.
            elementImage.src = article.imageUrl;
            elementName.innerText = article.name;
            elementPrice.innerText = article.price;
            elementDescription.innerText = article.description;
        })
}

getElement();

const getColor = function () {
    // Ajout du choix de couleur.
    let colors = document.getElementById("colors");
    // // Affichage des couleurs dans la console.
    // console.log(colorChoice);
    // Placement des couleurs dans la liste "Choisir une couleur".
    // elementColorChoice.innerText = article.colors;
    for (let color of colors) {
        console.log(`La couleur du canapé est ${color}`);
    }
}

getColor();

