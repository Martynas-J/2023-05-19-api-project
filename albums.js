import { API_URL } from "./config.js"
import { fetchData, fetchTotalCount, getPagesNum, getUrlParams, pagesLine } from "./functions.js"
import nav, { pages } from "./nav.js"

document.body.prepend(nav())
albums()
async function albums() {
    let albumsList = document.querySelector("#albums-list")

    let totalCountLink = `/albums?_start=0&_end=0`
    let linkName = "albums"
    let linkEndText = "&_embed=photos&_expand=user"
    let defaultLink = API_URL + `/albums?_embed=photos&_expand=user`
    let data = await pagesLine(totalCountLink, linkName, linkEndText,  defaultLink)

    let albumsDiv = CreateAlbumsList(data)
    albumsList.prepend(albumsDiv)
}

function CreateAlbumsList(data) {
    let albumsDiv = document.createElement("div")
    data.forEach((album, index) => {
        let albumDiv = document.createElement("div")
        let albumTitle = document.createElement("h3")
        let albumUser = document.createElement("div")
        let albumPicturesNr = document.createElement("div")
        let albumPicture = document.createElement("img")
        let albumPictureLink = document.createElement("a")

        albumUser.innerHTML = `<a href="./user.html?id=${album.userId}"> Author: ${album.user.name}</a>`
        albumPicturesNr.innerHTML = `Picture number: ${album.photos.length}`
        albumTitle.innerHTML = `${index} Album name: ${album.title}`
        albumPicture.src = album.photos[0].thumbnailUrl
        albumPictureLink.href = `./album.html?id=${album.id}`

        albumPictureLink.append(albumPicture)
        albumDiv.append(albumTitle, albumUser, albumPicturesNr, albumPictureLink)
        albumsDiv.append(albumDiv)
    });
    return albumsDiv
}

// 4. Sukurti navigacijos elementą, kuris nukreips į puslapius:
//   4.1. Home / pagrindinis puslapis.
//   4.2. Users / vartotojų puslapis.
//   4.3. Albums / albumų puslapis.
//   4.4. Posts / pranešimų puslapis.
//   4.5. Pakeisti aktyvaus puslapio nuorodos stilių.

// 3. Tokiu pačiu principu, kaip ir vartotojų bei įrašų puslapiams, sukurti puslapį albumams (albums.html). Prie kiekvieno albumo turi būti:
//   3.1. Parašytas jo pavadinimas.
//   3.2. Parašytas vartotojo, sukūrusio šį albumą, vardas.
//   3.3. Albume esančių nuotraukų skaičius.
//   3.4. Viena nuotrauka.
//   3.5. Šis elementas turi būti nuoroda.