



nav()
search()

async function search() {
    const urlParams = new URLSearchParams(window.location.search);
    let searchTexts = urlParams.get('search');

    const resUsers = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const dataUsers = await resUsers.json()
    let searchUsers = createUserList(dataUsers, searchTexts, "users")

    const resPosts = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const dataPosts = await resPosts.json()
    let searchPosts = createUserList(dataPosts, searchTexts, "posts")

    const resAlbums = await fetch(`https://jsonplaceholder.typicode.com/albums`)
    const dataAlbums = await resAlbums.json()
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
            searchBy = element.title
            searchLi.innerHTML = `<b>Title:</b> <a href="./post.html?id=${element.id}">${element.title}</a>`
            text = "post title"
        } else if (searchByWho === "albums") {
            searchBy = element.title
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
