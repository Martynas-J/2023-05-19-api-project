import { API_URL, categoriesArr } from "./config.js";
import { fetchData, firstLetterUpperCase, getUrlParams } from "./functions.js";
import nav from "./nav.js"

document.body.prepend(nav())

search(getUrlParams('search'))
searchLocal()

function searchLocal() {
    let nav = document.querySelector("nav")
    let searchForm = document.createElement("form")
    let searchInput = document.createElement("input")
    let searchCategory = document.createElement("select")
    let searchSubmit = document.createElement("input")

    searchInput.type = "text"
    searchInput.name = "search"
    searchCategory.name = "category"
    searchInput.placeholder = "Write text"
    searchSubmit.type = "submit"
    searchSubmit.value = "Search"


    categoriesArr.forEach(element => {
        let option = document.createElement("option")
        option.textContent = firstLetterUpperCase(element)
        option.value = element
        searchCategory.append(option)
    });
    searchForm.append(searchInput, searchCategory, searchSubmit)
    nav.append(searchForm)

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault()
        let form = event.target
        let searchTexts = form.search.value
        let category = form.category.value
        search(searchTexts, category)
    })
}

async function search(searchTexts, category) {
    function empty() {
        if (searchList.textContent === "") {
            let notFound = document.createElement("h1")
            notFound.innerHTML = `${searchTexts} not found`
            searchList.append(notFound)
        }
    }
    let searchList = document.querySelector("#search")
    searchList.innerHTML = ""
    if (!category) {
        await Promise.all(categoriesArr.map(async item => {
            const data = await fetchData(`${API_URL}/${item}?q=${searchTexts}`);
            let searchData = createUserList(data, searchTexts, item);
            searchList.append(searchData);
        })).then(() => empty())
    } else {
        const data = await fetchData(`${API_URL}/${category}?q=${searchTexts}`)
        let searchData = createUserList(data, searchTexts, category)
        searchList.append(searchData)
        await Promise.all([data]).then(() => empty())
    }
}

function createUserList(dataSearch, searchTexts, searchByWho) {
    let searchTitle = document.createElement("h1")
    let searchDiv = document.createElement("div")
    let searchUl = document.createElement("ul")

    dataSearch.forEach(element => {
        let searchLi = document.createElement("li")
        let searchBy
        let text
        if (searchByWho === "users") {
            searchBy = element.name
            searchLi.innerHTML = `<a href="./user.html?id=${element.id}">${element.name}`
            text = "user name"
        } else if (searchByWho === "posts") {
            searchBy = firstLetterUpperCase(element.title)
            searchLi.innerHTML = `<b>Title:</b> <a href="./post.html?id=${element.id}">${searchBy}</a>`
            text = "post title"
        } else if (searchByWho === "albums") {
            searchBy = firstLetterUpperCase(element.title)
            searchLi.innerHTML = `<b>Album:</b><a href="./album.html?id=${element.id}"> ${searchBy}</a>`
            text = "album title"
        } else if (searchByWho === "photos") {
            searchBy = firstLetterUpperCase(element.title)
            searchLi.innerHTML = `<b>Photo:</b><a href="${element.url}"> ${searchBy}</a>`
            text = "photo title"
        }
        else if (searchByWho === "comments") {
            searchBy = firstLetterUpperCase(element.name)
            searchLi.innerHTML = `<b>Comment:</b><a href="./post.html?id=${element.postId}"> ${searchBy}</a>`
            text = "comment title"
        }
        searchTitle.innerHTML = `Search by ${text} (${searchTexts})`
        searchUl.append(searchLi)
        searchDiv.append(searchTitle, searchUl)
    });
    if (searchDiv.textContent) {
        searchDiv.style.maxWidth = "400px"
        searchDiv.style.border = "2px solid black"
        searchDiv.style.backgroundColor = "rgb(179, 179, 179)"
        searchDiv.style.padding = "20px"
    }
    return searchDiv
}

// Papildoma:
// 9.4. Search puslapyje turi būti paieškos forma, kuri veikia neperkraunant puslapio.
// 9.5. Search puslapyje sukurtoje paieškos formoje pridėti galimybė ieškoti pagal pasirinktą kategoriją: posts, users, comments, albums, photos.