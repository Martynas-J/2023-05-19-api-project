
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
export function createHtmlElement(type, className,  href) {
    let element = document.createElement(type)
    if (className) {
        element.classList.add(className)
    }
    if (type === "a") {
        element.scr = href
    } 
    return element
}
export function getUrlParams(params) {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get(params);
    return id
}