// Recuperation de l'ID produit.
let params = new URL(document.location).searchParams;
let id = params.get("id");
// Affichage de l'ID, correspondant au produit, dans la console.
console.log(id);

// Création des variable utiles à l'affichage du produit.
let alt = "Photographie d'un canapé";
let description = "Dis enim malesuada risus sapien gravida nulla nisl arcu.";

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
    // Affichage du produit voulu dans la console.
    // let produit = {
    //     image : `${element.imageUrl}`,
    //     texte_alt : `${element.altTxt}`,
    //     name : `${element.name}`,
    //     description : `${element.description}`,
    //     price : `${element.price}`
    // }

    // for (let prop in produit) {
    //     console.log(`${prop} --> ${produit[prop]}`);
    // }
    .then(function (element) {
        // Affichage du produit voulu dans la console.
        console.log(element)
        for (let element of element) {
            // Appel a l'element parent.
            let container = document.getElementsByClassName("item");
            // Appel a l'element parent de l'image.
            let img_product = document.getElementsByClassName("item__img");
            // Balise "img_product" rattachée a son parent "container".
            container.appendChild(img_product);
            // Completion de la balise "img" pour l'image du produit.
            let image = document.createElement("img");
            image.src = `${element.imageUrl}`;
            image.alt = `${element.altTxt}`;
            // Balise "img" rattachee a son parent "item__img".
            img_product.appendChild(image);
            // Appel de l'element parent de "h1".
            let title = document.getElementsByClassName("item__content__titlePrice");
            container.appendChild(title);
            // Completion de la balise "h1" et price.
            let nom = document.createElement("h1");
            nom = `${element.name}`;
            let price = documment.getElementById("price");
            price = `${element.price}`;
            // Balise "h1" rattachee a la classe de leur parent.
            title.appendChild(nom);
            price.appendChild(price);
            // Apelle de l'element parent de "p".
            let div_description = document.getElementsByClassName("item__content__description");
            // Balise "div" rattachee a son parent.
            container.appendChild(div_description);
            // Completion de la balise "p" pour la description du produit.
            let description = document.getlElementById("description");
            description = `${element.description}`;
            // Balise "p" rattachee a son parent.
            div_description.appendChild(description);
        }
    })