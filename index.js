import { API_URL } from "./config.js"
import { createHtmlElement, fetchData, firstLetterUpperCase } from "./functions.js"
import nav from "./nav.js"

document.body.prepend(nav())

home()
async function home() {
    let home = document.querySelector("#home")
    const data = await fetchData(`${API_URL}/posts?_expand=user`)
    let homeDiv = createHomeData(data.slice(-5))
    home.append(homeDiv)
}
function createHomeData(data) {
    let postsTitle = document.createElement("h1")
    let postsDiv = createHtmlElement("div", "posts-content")
    postsDiv.append(postsTitle)
    postsTitle.innerHTML = `Last 5 Posts`

    data.forEach(element => {
        let postDiv = createHtmlElement("div", "post-class")
        let postTitle = document.createElement("h2")
        let postAuthor = document.createElement("div")
        let postContent = document.createElement("p")

        let allUserPosts = document.createElement("span")

        postTitle.textContent = firstLetterUpperCase(element.title)
        postAuthor.innerHTML = `<a href="./user.html?id=${element.userId}">Author: ${element.user.name}</a>`
        postContent.textContent = firstLetterUpperCase(element.body)
        allUserPosts.innerHTML = `<a href="./posts.html?id=${element.userId}">Other posts by ${element.user.name}</a>`

        postDiv.append(postTitle, postAuthor, postContent, allUserPosts)
        postsDiv.append(postDiv)
    });

    return postsDiv
}
// 10. Sukurti pagrindinį puslapį (index.html). Jame laisva forma turi būti atvaizduoti:
//   1.1. Įrašai (post).
//   1.2. Albumai.
//   1.3. Vartotojai.