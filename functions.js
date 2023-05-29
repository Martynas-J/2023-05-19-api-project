import { API_URL } from "./config.js";
import { pages } from "./nav.js";

export async function fetchTotalCount(url) {
    const res = await fetch(url)
    const totalCount = res.headers.get('X-Total-Count');
    return totalCount
}
export async function fetchData(url) {
    const res = await fetch(url)
    const data = await res.json()
    return data
}
export function firstLetterUpperCase(str) {
    let firstLetter = str.at(0).toUpperCase()
    let restOfStr = str.slice(1)
    let output = firstLetter + restOfStr

    return output;
}
export function createHtmlElementLink(element, href, content) {
    let item = document.createElement(element)
    let link = document.createElement("a")
    link.href = href
    link.innerHTML = content
    item.append(link)
    return item
}
export function createHtmlElement(type, className, href) {
    let element = document.createElement(type)
    if (className) {
        element.classList.add(className)
    }
    if (type === "a") {
        element.href = href
    }
    return element
}
export function getUrlParams(params) {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get(params);
    return id
}
export function getPagesNum(pageNou, step) {
    let contentFrom = Math.max((pageNou - 1) * step, 0)
    return contentFrom
}
export async function pagesLine(totalCountLink, linkName, linkEndText, defaultLink) {
    const totalCount = await fetchTotalCount(API_URL + totalCountLink)
    let contentTo = getUrlParams("units")
    let data
    if (totalCount > 10) {
        if (!contentTo) {
            contentTo = 10
        }
        let contentFrom = getPagesNum(getUrlParams("page"), contentTo)
        let totalPages = totalCount / contentTo
        if (parseInt(totalPages.toFixed(0)) !== totalPages) {
            totalPages++
        }
        let pagesNav = pages(parseInt(totalPages), getUrlParams("units"))

        document.body.append(pagesNav)
        data = await fetchData(API_URL + `/${linkName}?_start=${contentFrom}&_limit=${contentTo}${linkEndText}`)
        let pagesSelect = document.querySelector(".pages-quantity")
        pagesSelect.addEventListener("input", () => {
            window.location.href = `./${linkName}.html?page=1&units=${pagesSelect.value}`
        })
    } else {
        data = await fetchData(defaultLink)
    }

    return data
}