import { API_URL } from "./config.js"
import { createHtmlElement, fetchData, firstLetterUpperCase } from "./functions.js"
import nav, { pages } from "./nav.js"

document.body.prepend(nav())

home()
async function home() {
    let home = document.querySelector("#home")

    const postsData = await fetchData(`${API_URL}/posts?_expand=user`)
    let posts = createHomeData(postsData.slice(-5), "posts")

    const albumsData = await fetchData(`${API_URL}/albums?_embed=photos&_expand=user`)
    let albums = createHomeData(albumsData.slice(-5), "albums")

    const usersData = await fetchData(`${API_URL}/users?_embed=posts&_embed=albums`)
    let users = createHomeData(usersData.slice(-5), "users")

    home.append(posts, albums, users)
}
function createHomeData(data, type) {
    let title = document.createElement("h1")
    let div = createHtmlElement("div", `${type}-wrap`)
    div.append(title)
    title.innerHTML = `Last 5 ${type}`
    let content
    data.forEach(element => {
        if (type === "posts") {
            content = firstLetterUpperCase(element.body)
        } else if (type === "albums") {
            let photoLink = document.createElement("a")
            let albumPicture = document.createElement("img")
            let photosDiv = createHtmlElement("div", "photos")
            let photosTitle = createHtmlElement("h3", "photos-title")

            photosTitle = firstLetterUpperCase(element.photos[0].title)
            photoLink.href = `./album.html?id=${element.id}`
            albumPicture.src = element.photos[0].thumbnailUrl
            photoLink.append(albumPicture)
            photosDiv.append(photosTitle, photoLink)

            content = photosDiv.innerHTML
        }
        let elementDiv = createHtmlElement("div", `${type}-content`)
        let elementTitle = document.createElement("h2")
        let elementAuthor = document.createElement("div")
        let elementContent = document.createElement("p")
        let allUserElements = document.createElement("span")

        if (type === "users") {
            elementTitle.textContent = firstLetterUpperCase(element.name)
            elementContent.innerHTML = `Nick: ${element.username} is from ${element.address.city} city. Has ${element.posts.length} posts and ${element.albums.length} albums`
            allUserElements.innerHTML = `<a href="./user.html?id=${element.id}">Other about ${element.name}</a>`

        } else {
            elementTitle.textContent = firstLetterUpperCase(element.title)
            elementAuthor.innerHTML = `<a href="./user.html?id=${element.userId}">Author: ${element.user.name}</a>`
            elementContent.innerHTML = content
            allUserElements.innerHTML = `<a href="./${type}.html?id=${element.userId}">Other ${type} by ${element.user.name}</a>`
        }

        elementDiv.append(elementTitle, elementAuthor, elementContent, allUserElements)
        div.append(elementDiv)
    });

    return div
}

