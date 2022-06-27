fetch("http://localhost:3000/api/products")
    .then(function (response) {
        console.log(response)
        if (response.ok) {
            let data = response.json()
            console.log(data)
        } else {
            alert("erreur api")
        }
    })

class kanap {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

let kanap1 = new kanap("Kanap Sinopé", 1849);
let kanap2 = new kanap("Kanap Cyllène", 4499);
let kanap3 = new kanap("Kanap Calycé", 3199);
let kanap4 = new kanap("Kanap Autonoé", 1499);
let kanap5 = new kanap("Kanap Eurydomé", 2249);
let kanap6 = new kanap("Kanap Hélicé", 999);
let kanap7 = new kanap("Kanap Thyoné", 1999);
let kanap8 = new kanap("Kanap orthosie", 3999);

console.log(kanap1);
console.log(kanap2);
console.log(kanap3);
console.log(kanap4);
console.log(kanap5);
console.log(kanap6);
console.log(kanap7);
console.log(kanap8);

// function addElement () {
//     const kanap1 = document.createElement("a");
//     kanap1.classList.add("items");
//     kanap1.textContent = "KanapSinopé";
    
//     document.body.appendChild(kanap1);
// }

