// Récupération des données sur l'API.
fetch("http://localhost:3000/api/products")
  .then(function (response) {
    console.log(response);
    // Utilisation d'une condition pour l'affichage des produits dans la console.
    if (response.ok) {
      return response.json();
    }
  })

  // Exploitation des données.
  .then(function (elements) {
    console.log(elements);
    // Boucle pour afficher chaque produits présent dans l'API.
    let htmlTxt = "";
    for (let element of elements) {
      //Utilisation de la structure HTML utile pour l'affichage des produits. 
      console.log(element);
      // Appel à l'élément parent.
      const items = document.getElementById("items");
      // Création de la balise "a".
      let newElt = document.createElement("a");
      newElt.href = `./product.html?id=${element._id}`;
      // Balise "a" rattachée à l'ID du parent "section".
      items.appendChild(newElt);
      // Création de la balise "article" contenant l'image, le nom et la description du produit.
      let article = document.createElement("article");
      // Balise "article" rattachée à son parent "a".
      newElt.appendChild(article);
      // Création de la balise "img" pour l'image du produit.
      let image = document.createElement("img");
      image.src = `${element.imageUrl}`;
      image.alt = `${element.altTxt}`;
      // Balise "img" rattachée à son parent "article".
      article.appendChild(image);
      // Création de la balise "h3" pour le nom du produit.
      let h3 = document.createElement("h3");
      h3.className = "productName";
      h3.textContent = `${element.name}`;
      // Balise "h3" rattachée à son parent "article".
      article.appendChild(h3);
      // Création de la balise "p" pour la description du produit.
      let p = document.createElement("p");
      p.className = "productDescription";
      p.textContent = `${element.description}`;
      // Balise "p" rattachée à son parent "article".
      article.appendChild(p);
      //   htmlTxt += `<a href="./product.html?id=${element._id}">
      //   <article>
      //     <img src="${element.imageUrl}" alt="${element.altTxt}">
      //     <h3 class="productName">${element.name}</h3>
      //     <p class="productDescription">${element.description}</p>
      //   </article>
      // </a>`
    }
  })
  .catch(function (err) {
    /**** GESTION DES ERREURS ****/
    console.log("ERREUR", err);
    alert("ERREUR API");
  });
