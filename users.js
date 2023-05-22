
nav()
users()
async function users() {
    const resUsers = await fetch("https://jsonplaceholder.typicode.com/users?_embed=posts")
    const dataUsers = await resUsers.json()
    let usersUl = CreateUsersList(dataUsers)
    let usersList = document.querySelector("#users-list")
    usersList.append(usersUl)
}
function CreateUsersList(dataUsers) {  
    let usersUl = document.createElement("ul") 
    dataUsers.forEach(element => {
        let userLi = document.createElement("li")
        userLi.innerHTML = `<a href="./user.html">${element.name} ${element.posts.length}</a>`
        usersUl.append(userLi)
    });
    return usersUl
}



// 2. Sukurti puslapį, kuriame bus atvaizduojami įrašai (posts). Kiekvienas įrašas turi:
//   2.1. Pavadinimą. Tai turi būti nuoroda. Ji turi vesti į post.html puslapį.
//   2.2. Autorių. Tai turi būti nuoroda. Ji turi vesti į user.html puslapį.
//   2.3. Prie pavadinimo pridėti įrašo komentarų skaičių.


// 1. Sukurti vartotojų puslapį (users.html), kuriame būtų atvaizduotas vartotojų sąrašas.
//   1.1. Prie vartotojo turėtu būti jo vardas.
//   1.2. Paspaudus ant vartotojo - nukreipiama į jo user.html puslapį.
//   1.3. Prie vartotojo vardo turėtų būti parašytų post'ų skaičius.