import { steps } from "./const.js"
import { createErrorMessages} from "./functions.js"

const formContainer = document.querySelector("#form-container")

formContainer.addEventListener("click", e => {
    const element = e.target

    if(element.id === "change_step") {
        const inputs = [...document.querySelectorAll("#form input")]
        createErrorMessages(inputs)
    }

    if(steps.includes(element.id)) {
        const previousSelected = document.querySelector(".nav-item-selected")
        previousSelected.classList.remove("nav-item-selected")
        element.classList.add("nav-item-selected")
    }
})