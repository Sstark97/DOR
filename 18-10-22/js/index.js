// Parte de DEW
import { eventAlert } from "./functions.js"

const loginModal = document.querySelector("#loginModal")
const registerModal = document.querySelector("#registerModal")

loginModal.addEventListener("click", e => eventAlert(e, loginModal))

registerModal.addEventListener("click", e => eventAlert(e, registerModal))
