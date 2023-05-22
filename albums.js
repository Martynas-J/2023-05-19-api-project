
nav()
albums()
async function albums() {
    let albumsList = document.querySelector("#albums-list")
    const res = await fetch("https://jsonplaceholder.typicode.com/albums?_embed=photos&_expand=user")
    const data = await res.json()
    let albumsDiv = CreateAlbumsList(data)
    albumsList.prepend(albumsDiv)
}

function CreateAlbumsList(data) {
    let albumsDiv = document.createElement("div")
    data.forEach(album => {
        let albumTitle = document.createElement("h3")
        let albumUser = document.createElement("div")
        let albumPicturesNr = document.createElement("div")
        let albumPicture = document.createElement("img")
        let albumPictureLink = document.createElement("a")

        albumUser.innerHTML = `Author: ${album.user.name} `
        albumPicturesNr.innerHTML = `Picture number: ${album.photos.length}`
        albumTitle.innerHTML = `Album name: ${album.title}`
        albumPicture.src = album.photos[0].url
        albumPictureLink.href = album.photos[0].thumbnailUrl

        albumPictureLink.append(albumPicture)
        albumsDiv.append(albumTitle, albumUser, albumPicturesNr, albumPictureLink)
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