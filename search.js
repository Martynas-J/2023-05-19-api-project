import { API_URL } from "./config.js";
import { fetchData, firstLetterUpperCase } from "./functions.js";

nav()
search()

async function search() {
    const urlParams = new URLSearchParams(window.location.search);
    let searchTexts = urlParams.get('search');

    const dataUsers = await fetchData(`${API_URL}/users`)
    let searchUsers = createUserList(dataUsers, searchTexts, "users")

    const dataPosts = await fetchData(`${API_URL}/posts`)
    let searchPosts = createUserList(dataPosts, searchTexts, "posts")

    const dataAlbums = await fetchData(`${API_URL}/albums`)
    let searchAlbums = createUserList(dataAlbums, searchTexts, "albums")

    let searchList = document.querySelector("#search")
    if (!searchUsers.textContent && !searchPosts.textContent && !searchAlbums.textContent) {
        let notFound = document.createElement("h1")
        notFound.innerHTML = `${searchTexts} not found`
        searchList.append(notFound)
    }
    searchList.append(searchUsers, searchPosts, searchAlbums)
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
        }
        let search = searchBy.toLowerCase()
        if (search.includes(searchTexts)) {
            searchTitle.innerHTML = `Search by ${text} (${searchTexts})`
            searchUl.append(searchLi)
            searchDiv.append(searchTitle, searchUl)
        }
    });
    if (searchDiv.textContent) {
        searchDiv.style.maxWidth = "400px"
        searchDiv.style.border = "2px solid black"
        searchDiv.style.backgroundColor = "rgb(179, 179, 179)"
        searchDiv.style.padding = "20px"
    }
    return searchDiv
}






// function createUserList(dataSearch, searchTexts) {
//     let userTitle = document.createElement("h1")
//     userTitle.innerHTML = `(${searchTexts}) Search By Users`
//     let userDiv = document.createElement("div")
//     userDiv.append(userTitle)
//     dataSearch.forEach(element => {
//         let searchUl = document.createElement("ul")
//         let keysArr = Object.keys(element);
//         keysArr.forEach(key => {
//             let userLi = document.createElement("li")
//             let value = element[key];
//             if (typeof value === "object") {
//                 let searchUlLvl2 = document.createElement("ul")
//                 let keysArrLvl2 = Object.keys(value);
//                 console.log(keysArrLvl2)
//                 console.log(userLi)
//                 keysArrLvl2.forEach(keyLvl2 => {
//                     let valueLvl2 = value[keyLvl2];
//                     if (typeof valueLvl2 === "object") {
//                     } else {
//                         let userLiLvl2 = document.createElement("li")
//                         userLiLvl2.innerHTML = `<b>${keyLvl2}</b> : ${valueLvl2}`
//                         searchUlLvl2.append(userLiLvl2)
//                     }
//                 })
//                 userLi.append(searchUlLvl2)
//             } else {
//                 userLi.innerHTML = `<b>${key}</b> : ${value}`
//             }
//             searchUl.append(userLi)
//         })
//         userDiv.append(searchUl)
//     });
//     return userDiv
// }
