nav()
album()
lightGallery(document.getElementById('lightgallery'));

async function album() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    let albumData = document.querySelector("#album")
    const res = await fetch(`https://jsonplaceholder.typicode.com/albums?id=${id}&_embed=photos&_expand=user`)
    const data = await res.json()
    let albumDiv = createAlbumData(data)
    albumData.prepend(albumDiv)
    
}

function createAlbumData(album) {
    let albumDiv = document.createElement("div")
    let photosDiv = document.createElement("div")
    let albumTitle = document.createElement("h3")
    let albumUser = document.createElement("div")

    albumTitle.textContent = album[0].title
    albumUser.innerHTML = `<a href="./user.html?id=${album[0].userId}"> Author: ${album[0].user.name}</a>`
    album[0].photos.forEach(element => {
        let photoLink = document.createElement("a")
        let albumPicture = document.createElement("img")
        albumPicture.title = element.title
        photoLink.href = element.url
        albumPicture.src = element.thumbnailUrl
        photoLink.append(albumPicture)
        photosDiv.append(photoLink)
        

    });
    albumDiv.append(albumTitle, albumUser, photosDiv)
    lightGallery(photosDiv);
    return albumDiv
}

// 8. Sukurti naują puslapį album.html ir jame atvaizduoti:
//   8.1. Albumo pavadinimą.
//   8.2. Album autoriaus vardą. Paspaudus ant vardo - nukreipiama į autoriaus puslapį.
//   8.3. Skiltis, kurioje atvaizduojamos visos albumo nuotraukos. Panaudoti library (biblioteką), kuri skirta gražiam galerijos atvaizdavimui, pvz.:
//     8.3.1. https://photoswipe.com/
//     8.3.2. https://nanogallery2.nanostudio.org/
//     8.3.3. https://sachinchoolur.github.io/lightgallery.js/
//     8.3.4. Arba bet kurią kitą.