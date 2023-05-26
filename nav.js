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
    let nextPage = createHtmlElement("span", "page-next")
    let backPage = createHtmlElement("span", "page-back")
    let firstPageLink = createHtmlElement("a", "page-link", `${location.pathname}?page=1`)
    let lastPageLink = createHtmlElement("a", "page-link", `${location.pathname}?page=${pagesNr}`)
    let nextPageLink = createHtmlElement("a", "page-link", `${location.pathname}?page=${parseInt(pageNow) + 1}`)
    let backPageLink = createHtmlElement("a", "page-link", `${location.pathname}?page=${parseInt(pageNow) - 1}`)
    let howMuchPages = createHtmlElement("input", "pages-quantity")

    firstPage.textContent = "First"
    lastPage.textContent = "Last"
    nextPage.textContent = ">>"
    backPage.textContent = "<<"
    howMuchPages.type = "number"
    howMuchPages.step = "10"
    howMuchPages.value = "10"
    howMuchPages.min = "10"
    howMuchPages.max = "100"

    firstPageLink.append(firstPage)
    lastPageLink.append(lastPage)
    nextPageLink.append(nextPage)
    backPageLink.append(backPage)

    pagesDiv.prepend(firstPageLink, backPageLink)

    for (let i = 1; i <= pagesNr; i++) {
        let pageSpan = createHtmlElement("span", "page")
        let pageLink = createHtmlElement("a", "page-link", `${location.pathname}?page=${i}`)

        if (pageLink.href === location.href || pageNow === null && i === 1) {
            pageSpan.textContent = "."
            pageLink.removeAttribute("href")
            pageLink.classList.add("on-this-page")
        } else {
            pageSpan.textContent = i
        }
        pageLink.append(pageSpan)
        pagesDiv.append(pageLink)
    }
    if (pageNow === null || pageNow === '1') {
        firstPageLink.classList.add("on-this-page")
        backPageLink.classList.add("on-this-page")
        firstPageLink.removeAttribute("href")
        backPageLink.removeAttribute("href")

    }else if (parseInt(pageNow) === pagesNr) {
        lastPageLink.classList.add("on-this-page")
        nextPageLink.classList.add("on-this-page")
        lastPageLink.removeAttribute("href")
        nextPageLink.removeAttribute("href")
    }
    pagesDiv.append(nextPageLink, lastPageLink, howMuchPages)
    return pagesDiv
}