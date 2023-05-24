import { API_URL } from "./config.js";
import { firstLetterUpperCase } from "./functions.js";
nav()
posts()
async function posts() {
    let text
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    let postsList = document.querySelector("#posts-list")
        text = id ? `userId=${id}` : ""
        const res = await fetch(`${API_URL}/posts?${text}&_embed=comments&_expand=user`)
        const data = await res.json()
        let postsDiv = createPostsList(data)
        postsList.append(postsDiv)
}

function createPostsList(data) {
    let postsDiv = document.createElement("div")
    data.forEach(element => {
        let postTitle = document.createElement("h4")
        let postUser = document.createElement("span")
        let postComments = document.createElement("span")
        postTitle.innerHTML = `<a href="./post.html?id=${element.id}">Title: ${firstLetterUpperCase(element.title)}</a>`
        postUser.innerHTML = `<a href="./user.html?id=${element.userId}">Author: ${element.user.name}</a>`
        postComments.innerHTML = ` (${element.comments.length} Comments)`
        postsDiv.append(postTitle, postUser)
        postTitle.append(postComments)
    });
    return postsDiv
}

// 3. Tokiu pačiu principu, kaip ir vartotojų bei įrašų puslapiams, sukurti puslapį albumams (albums.html). Prie kiekvieno albumo turi būti:
//   3.1. Parašytas jo pavadinimas.
//   3.2. Parašytas vartotojo, sukūrusio šį albumą, vardas.
//   3.3. Albume esančių nuotraukų skaičius.
//   3.4. Viena nuotrauka.
//   3.5. Šis elementas turi būti nuoroda.
