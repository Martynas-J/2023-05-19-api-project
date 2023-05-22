function nav() {
    let body = document.querySelector('body')
    let header = document.createElement("header")
    let nav = document.createElement("nav")
    let ul = document.createElement("ul")
    ul.style.listStyleType = "none"
    let NavArr = [
        {
            link: "./users.html",
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
        aNav.style.color = "Grey"
        aNav.style.textDecoration = "none"
        ul.append(liNav)
        liNav.append(aNav)
        if (aNav.href === window.location.href) {
            aNav.style.color = "black";
          }
    });
    body.prepend(header)
    header.append(nav)
    nav.append(ul)
    
}