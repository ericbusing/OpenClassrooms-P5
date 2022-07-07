// Recuperation des donnees sur l'API.
fetch("http://localhost:3000/api/products")
  .then(function (response) {
    console.log(response);
    // Utilisation d'une condition pour l'affichage des produits dans la console.
    if (response.ok) {
      return response.json();
    }
  })

  // Exploitation des donnees.
  .then(function (elements) {
    console.log(elements);
    // Boucle pour afficher chaque produits present dans l'API.
    for (let element of elements) {
      //Utilisation de la structure HTML utile pour l'affichage des produits. 
      console.log(element);
      // Appel a l'element parent.
      const items = document.getElementById("items");
      // Creation de la balise "a".
      let newElt = document.createElement("a");
      newElt.href = `./product.html?id=${element._id}`;
      // Balise "a" rattachee a l'ID du parent "section".
      items.appendChild(newElt);
      // Creation de la balise "article" contenant l'image, le nom et la description du produit.
      let article = document.createElement("article");
      // Balise "article" rattachee a son parent "a".
      newElt.appendChild(article);
      // Creation de la balise "img" pour l'image du produit.
      let image = document.createElement("img");
      image.src = element.imageUrl;
      image.alt = element.altTxt;
      // Balise "img" rattachee a son parent "article".
      article.appendChild(image);
      // Creation de la balise "h3" pour le nom du produit.
      let h3 = document.createElement("h3");
      h3.className = "productName";
      h3.textContent = element.name;
      // Balise "h3" rattachee a son parent "article".
      article.appendChild(h3);
      // Creation de la balise "p" pour la description du produit.
      let p = document.createElement("p");
      p.className = "productDescription";
      p.textContent = element.description;
      // Balise "p" rattachee a son parent "article".
      article.appendChild(p);
    }
  })
  .catch(function (err) {
    // Gestion des erreurs.
    console.log("ERREUR", err);
    alert("ERREUR API");
  })