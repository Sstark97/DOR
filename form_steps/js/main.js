import { steps, state, stepActions} from "./const.js"
import { changeNumbers, changePrice, createErrorMessages, firstStep, secondStep } from "./functions.js"

const formContainer = document.querySelector("#form-container")

window.addEventListener("load", () => {
    firstStep()
})

formContainer.addEventListener("click", e => {
    const element = e.target

    if(element.id === "change_step" || element.id === "go_back") {
        let nextStep = false

        if(element.className === "second_step") {
            const inputs = [...document.querySelectorAll("#form input")]
            nextStep = createErrorMessages(inputs);
        }

        if (nextStep) {
            secondStep()
        }

        if (stepActions[element.className]){
            stepActions[element.className]()
        }
    }

    if(element.id === "change_price") {
        changePrice()
    }

    if(steps.includes(element.id)) {
        const action = `${element.id}_step`

        let nextStep = false

        if(action === "second_step") {
            const inputs = [...document.querySelectorAll("#form input")]
            nextStep = createErrorMessages(inputs);
        }

        if (nextStep) {
            changeNumbers(element)
            secondStep()
        }

        if (stepActions[action]){
            changeNumbers(element)
            stepActions[action]()
        }
    }
})