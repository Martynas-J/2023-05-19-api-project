export default  function nav() {
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
    let NavArr = [
        {
            link: "./index.html",
            text: "Home"
        },
        {
            link: "./users.html",
            text: "Users"
        },
        {
            link: "./albums.html",
            text: "Albums"
        },
        {
            link: "./posts.html",
            text: "Posts"
        },
    ]
    NavArr.forEach(element => {
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
    if (location.pathname !== `/2023-05-19-api-project/search.html`) {
        nav.append(searchForm)
    }
    return header
}


// export {nav};

// 9. Sukurti paieškos funkcionalumą navigacijos elemente:
// 9.1. Navigacijos elemente sukurti formą, kuri turi text tipo input elementą (nepamiršti pridėti name atributą).
// 9.2. Formos submit metu, naudojant action atributą, nukreipti į naują puslapį (search.html).
// 9.3. Šiame puslapyje atvaizduoti paieškos rezultatą.
// 9.3.1. Jeigu nėra tinkamų rezultatų, tai parašyti jog rezultatų pagal užklausą nerasta.