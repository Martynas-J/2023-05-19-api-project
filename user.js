




nav()
user()

async function user() {
    let userData = document.querySelector("#user-data")
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    try {
        const resUser = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/?_embed=posts&_embed=albums`)
        const dataUser = await resUser.json()
        let userUl = createUsersData(dataUser)
        let postsDiv = createList(dataUser.posts, "Posts:", "./post.html")
        let albumsDiv = createList(dataUser.albums, "Albums:", "./album.html")
        userData.append(userUl, postsDiv, albumsDiv)
    } catch (error) {
        let errorMsg = document.createElement("span")
        errorMsg.textContent = "User not found"
        userData.append(errorMsg)

    }

}
function createUsersData(dataUser) {
    let userUl = document.createElement("ul")
    let name = document.createElement("li")
    let nick = document.createElement("li")
    let email = document.createElement("li")
    let address = document.createElement("li")
    let addressLink = document.createElement("a")
    let phone = document.createElement("li")
    let website = document.createElement("li")
    let company = document.createElement("li")
    addressLink.href = `https://www.google.com/maps/place/37%C2%B018'57.2%22S+81%C2%B008'58.6%22E/@${dataUser.address.geo.lat},${dataUser.address.geo.lng},17z/data=!4m4!3m3!8m2!3d-37.3159!4d81.1496`

    name.innerHTML = `<b>Name:</b> ${dataUser.name}`
    nick.innerHTML = `<b>Nick:</b> ${dataUser.username}`
    email.innerHTML = `<b>Email:</b> ${dataUser.email}`
    address.innerHTML = `<b>Address:</b> `
    addressLink.innerHTML = `${dataUser.address.street} St., ${dataUser.address.suite}, ${dataUser.address.city}, ${dataUser.address.zipcode}`;

    phone.innerHTML = `<b>Phone:</b> ${dataUser.phone}`
    website.innerHTML = `<b>Website:</b> ${dataUser.website}`
    company.innerHTML = `<b>Company:</b> ${dataUser.company.name}`


    address.append(addressLink)
    userUl.append(name, nick, email, address, phone, website, company)
    return userUl
}

function createList(data, text, link) {
    let div = document.createElement("div")
    let title = document.createElement("h2")
    title.textContent = text
    div.append(title)
    if (data.length > 0) {
        data.forEach(element => {
            let title = document.createElement("h4")
            title.innerHTML = `<a href=${link}?id=${element.id}>Title: ${element.title}</a>`
            div.append(title)
        });
    } else {
        let empty = document.createElement("span")
        empty.textContent = "Empty"
        div.append(empty)
    }

    return div
}


// 6. Šiame puslapyje (user.html) turi būti atvaizduojama:
//   6.1. Visi vartotojo parašyti įrašai (posts). Kiekvienas post'as turi turėti nuorodą.
//   6.2. Visi vartotojo sukurti foto albumai. Kiekvienas albumas turės pavadinimą, kuris turi būti nuoroda.

// 5. Sukurti naują puslapį user.html, kuriame bus atvaizduojama vartotojo informacija:
//   5.1. Pilnas vardas.
//   5.2. Vartotojo vardas / nick'as.
//   5.3. El. paštas.
//   5.4. Adresas, kuris turės gatvę, namo numerį, miestą, pašto kodą. Paspaudus ant adreso, pagal koordinates, turėtų atidaryti šios vietos Google Maps.
//   5.5. Telefono numeris.
//   5.6. Internetinio puslapio adresas.
//   5.7. Įmonės, kurioje dirba, pavadinimas.