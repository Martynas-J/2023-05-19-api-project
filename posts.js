import { API_URL } from "./config.js";
import { createHtmlElement, createHtmlElementLink, firstLetterUpperCase, getUrlParams } from "./functions.js";
import nav, { pages } from "./nav.js"

document.body.prepend(nav())
posts()

async function posts() {
    let pageNou = getUrlParams("page")
    console.log(parseInt(pageNou))
    let contentFrom = Math.max((pageNou - 1) * 25, 0)
    console.log(contentFrom)
    let contentTo = 25

    let text = ""
    const id = getUrlParams('id')
    let postsList = document.querySelector("#posts-list")
    if (id) {
        text = `?userId=${id}&`

    } else {
        pages(4)
    }
    const res = await fetch(`${API_URL}/posts${text}?_start=${contentFrom}&_limit=${contentTo}&_embed=comments&_expand=user`)


    const data = await res.json()
    let postsDiv = createPostsList(data)
    postsList.append(postsDiv)
}

function createPostsList(data) {

    let postsDiv = createHtmlElement("div", "posts")
    data.forEach((element, index) => {

        let postTitle = createHtmlElementLink("h4", `./post.html?id=${element.id}`, `${index + 1} Title: ${firstLetterUpperCase(element.title)}</a>`)

        let postUser = createHtmlElementLink("span", `./user.html?id=${element.userId}`, `Author: ${element.user.name}</a>`)
        let postComments = document.createElement("span")

        postComments.innerHTML = ` (${element.comments.length} Comments)`
        postsDiv.append(postTitle, postUser)
        postTitle.append(postComments)
    });
    return postsDiv
}

// PAGINATION:
// 15.1. Puslapiuose, kuriuose atvaizuojami post'ai, atvaizduoti pirmus 25 post'us. Tai bus pirmas post'ų puslapis.
// 15.2.1. Post'ų sąrašo apačioje pridėti nuorodas, kurios leidžia perjungti kitą post'ų puslapį. Pvz. antras puslapis rodys post'us nuo 26 iki 50, trečias puslapis rodys nuo 51 iki 75 ir t.t.
// 15.2.2. Puslapių nuorodų turi būti tiek, kad būtų galimybė atvaizduoti visus post'us.
// 15.2.3. Galima paspausti ant visų nuorodų, išskyrus tą, kurios puslapyje šiuo metu esama.