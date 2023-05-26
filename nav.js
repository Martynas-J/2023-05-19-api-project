import { MAIN_MENU_NAV } from "./config.js"
import { createHtmlElement, getUrlParams } from "./functions.js"

export default function nav() {
    let header = document.createElement("header")
    let nav = document.createElement("nav")
    let ul = document.createElement("ul")
    let searchForm = document.createElement("form")
    let searchInput = document.createElement("input")
    let searchSubmit = document.createElement("input")

    searchForm.action = "search.html"
    searchInput.type = "text"
    searchInput.name = "search"
    searchInput.placeholder = "Write text"
    searchSubmit.type = "submit"
    searchSubmit.value = "Search"
    ul.style.listStyleType = "none"

    MAIN_MENU_NAV.forEach(element => {
        let aNav = document.createElement("a")
        let liNav = document.createElement("li")
        aNav.href = element.link
        aNav.textContent = element.text
        aNav.style.textDecoration = "none"
        ul.append(liNav)
        liNav.append(aNav)
        if (aNav.href === location.href) {
            aNav.style.borderColor = "green";
        }

    });
    header.append(nav)
    searchForm.append(searchInput, searchSubmit)
    nav.append(ul)
    if (!location.pathname.endsWith(`/search.html`)) {
        nav.append(searchForm)
    }
    return header
}
export function pages(pagesNr) {
    let pageNeu = getUrlParams('page')
    let pagesDiv = createHtmlElement("div", "pages-wrap")
    document.body.append(pagesDiv)
    for (let i = 1; i <= pagesNr; i++) {
        let pageSpan = createHtmlElement("span", "page")
        let pageLink = createHtmlElement("a", "page-link", `${location.pathname}?page=${i}`)
        pageLink.style.fontSize = "30px"
        pageSpan.style.padding = "20px"

        if (pageLink.href === location.href || pageNeu === null && i === 1) {
            pageSpan.textContent = "|" 
            pageLink.removeAttribute("href")
        } else {
            pageSpan.textContent = i
        }
        pageLink.append(pageSpan)
        pagesDiv.append(pageLink)
    }
}