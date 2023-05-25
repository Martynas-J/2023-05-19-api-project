import { API_URL } from "./config.js"
import { createHtmlElement, fetchData } from "./functions.js"
import nav from "./nav.js"

document.body.prepend(nav())
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
