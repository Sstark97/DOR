// Parte de DEW
import { eventAlert, eventValidation } from "./functions.js"

const loginModal = document.querySelector("#loginModal")
const registerModal = document.querySelector("#registerModal")

loginModal.addEventListener("click", e => eventAlert(e, loginModal))
loginModal.addEventListener("blur", e => eventValidation(e),true)

registerModal.addEventListener("click", e => eventAlert(e, registerModal))
registerModal.addEventListener("blur", e => eventValidation(e),true)
