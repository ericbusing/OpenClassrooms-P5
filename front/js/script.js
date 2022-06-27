console.log("hello")
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