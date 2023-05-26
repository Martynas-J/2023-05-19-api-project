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
    let pageNow = getUrlParams('page')
    let pagesDiv = createHtmlElement("div", "pages-wrap")
    let firstPage = createHtmlElement("span", "page-first")
    let lastPage = createHtmlElement("span", "page-last")
    let firstPageLink = createHtmlElement("a", "first-page-link", `${location.pathname}?page=1`)
    let lastPageLink = createHtmlElement("a", "last-page-link", `${location.pathname}?page=${pagesNr}`)

    firstPage.textContent = "First"
    lastPage.textContent = "Last"

    firstPageLink.append(firstPage)
    lastPageLink.append(lastPage)
    pagesDiv.prepend(firstPageLink)

    document.body.append(pagesDiv)
    for (let i = 1; i <= pagesNr; i++) {
        let pageSpan = createHtmlElement("span", "page")
        let pageLink = createHtmlElement("a", "page-link", `${location.pathname}?page=${i}`)

        if (pageLink.href === location.href || pageNow === null && i === 1) {
            pageSpan.textContent = "."
            pageLink.removeAttribute("href")
            pageLink.style.fontWeight = "500"
            pageLink.style.color = "black"
            pageLink.style.backgroundColor = "unset"
            pageLink.style.boxShadow = "unset"

        } else {
            pageSpan.textContent = i
        }
        pageLink.append(pageSpan)
        pagesDiv.append(pageLink)
    }
    if (pageNow === null || pageNow === '1') {
        firstPage.style.color = "grey"
        firstPageLink.removeAttribute("href")
        firstPageLink.style.backgroundColor = "unset"
        firstPageLink.style.boxShadow = "unset"
    }else if (parseInt(pageNow) === pagesNr) {
        lastPage.style.color = "grey"
        lastPageLink.removeAttribute("href")
        lastPageLink.style.backgroundColor = "unset"
        lastPageLink.style.boxShadow = "unset"
    }

    pagesDiv.append(lastPageLink)
}