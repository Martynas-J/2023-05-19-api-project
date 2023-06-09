

import { API_URL } from "./config.js";
import { fetchData, firstLetterUpperCase, getUrlParams } from "./functions.js";
import nav from "./nav.js"

document.body.prepend(nav())
post()
async function post() {
    const id = getUrlParams('id')
    let postData = document.querySelector("#post")

    const data = await fetchData(`${API_URL}/posts/${id}/?_embed=comments&_expand=user`)
    let postDiv = createPostData(data)
    postData.append(postDiv)
}

function createPostData(data) {
    let postDiv = document.createElement("div")
    let postTitle = document.createElement("h2")
    let postAuthor = document.createElement("div")
    let postContent = document.createElement("p")
    let commentsTitle = document.createElement("h3")
    let allUserPosts = document.createElement("span")

    postTitle.textContent = data.title
    postAuthor.innerHTML = `<a href="./user.html?id=${data.userId}">Author: ${data.user.name}</a>`
    postContent.textContent = firstLetterUpperCase(data.body)
    commentsTitle.textContent = "Comments:"
    allUserPosts.innerHTML = `<a href="./posts.html?id=${data.userId}">Other posts by ${data.user.name}</a>`

    postDiv.append(postTitle, postAuthor, postContent, allUserPosts, commentsTitle)
    data.comments.forEach(element => {

        let commentTitle = document.createElement("h4")
        let commentContent = document.createElement("p")
        let commentEmail = document.createElement("span")


        commentTitle.textContent = firstLetterUpperCase(element.name)
        commentContent.textContent = firstLetterUpperCase(element.body)
        commentEmail.innerHTML = `Email: ${element.email}`
        postDiv.append(commentTitle, commentContent, commentEmail)
    });
    return postDiv
}

// 7. Sukurti naują puslapį post.html ir jame atvaizduoti:
//   7.1. Įrašo (post) pavadinimą.
//   7.2. Autoriaus vardą. Paspaudus ant autoriaus vardo, turėtų atidaryti autoriaus puslapį.
//   7.3. Įrašo turinį.
//   7.4. Įrašo komentarus. Kiekvienas komentaras turi:
//     7.4.1. Komentaro pavadinimą.
//     7.4.2. Komentaro turinį - pastraipą.
//     7.4.3. Komentarą parašiusio asmens el. pašto adresą.
//   7.5. Nuoroda „Kiti autoriaus įrašai", kurią paspaudus bus nukreipiama į puslapį posts.html. Jame vėliau bus atvaizduojami visi šio vartotojo įrašai.