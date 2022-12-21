const mobileNav = document.querySelector(".mobile_nav")
const checkbox = document.querySelector("#hamburger li input")

mobileNav.addEventListener("click", () => {
    if(checkbox.checked) {
        mobileNav.className += !mobileNav.className.includes("dark_nav") ? " dark_nav" : ""
        mobileNav.style.position = "fixed"
    } else {
        mobileNav.className = mobileNav.className.replace("dark_nav", "")
        mobileNav.style.position = ""
    }
})