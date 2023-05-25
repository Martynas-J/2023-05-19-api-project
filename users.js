import { API_URL } from "./config.js"
import { createHtmlElement, fetchData } from "./functions.js"

nav()
users()
async function users() {
    const dataUsers = await fetchData(API_URL + "/users?_embed=posts")
    let usersUl = CreateUsersList(dataUsers)
    let usersList = document.querySelector("#users-list")
    usersList.append(usersUl)
}
function CreateUsersList(dataUsers) {  
    let usersUl = createHtmlElement("ul", "class-li") 
    dataUsers.forEach(element => {
        let userLi = document.createElement("li")
        userLi.innerHTML = `<a href="./user.html?id=${element.id}">${element.name} (${element.posts.length} posts)</a>`
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