import { saveDarkMode, loadDarkMode} from "./functions.js";

const mobileNav = document.querySelector(".mobile_nav")
const checkbox = document.querySelector("#hamburger li input")
const checkboxDarkMode = document.querySelector(".apple-switch");
const checkboxDarkModeDesktop = document.querySelector("#dark_mode_desktop");
const header = document.querySelector("header")

window.addEventListener("load", () => {
    if (localStorage.getItem("theme") === "dark") {
        checkboxDarkMode.checked = true
        checkboxDarkModeDesktop.checked = true
    }
    loadDarkMode()
})

header.addEventListener("change", e => {
    const element = e.target

    if(element.type === "checkbox" && element.id !== "btn") {
        if (element.checked) {
            saveDarkMode("dark")
        } else {
            saveDarkMode("light")
        }
        
        loadDarkMode()
    }
})

mobileNav.addEventListener("click", () => {
    if(checkbox.checked) {
        mobileNav.className += !mobileNav.className.includes("dark_nav") ? " dark_nav" : ""
        mobileNav.style.position = "fixed"
    } else {
        mobileNav.className = mobileNav.className.replace("dark_nav", "")
        mobileNav.style.position = ""
    }
})