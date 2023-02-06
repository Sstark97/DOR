import { steps, state, stepActions} from "./const.js"
import { changeNumbers, changePrice, createErrorMessages, firstStep, secondStep } from "./functions.js"

const formContainer = document.querySelector("#form-container")

window.addEventListener("load", () => {
    firstStep()
})

formContainer.addEventListener("click", e => {
    const element = e.target
    const elementsInState = Object.entries(state).length
    console.log(state)

    if(element.id === "change_step" || element.id === "go_back") {
        let nextStep = false

        if(element.className === "second_step") {
            const inputs = [...document.querySelectorAll("#form input")]
            nextStep = inputs.length !== 0 ? createErrorMessages(inputs) : true;
        }

        if (nextStep) {
            secondStep()
        }

        if (stepActions[element.className] && elementsInState >= 3){
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
            nextStep = inputs.length !== 0 ? createErrorMessages(inputs) : true;
        }

        if (nextStep) {
            changeNumbers(element)
            secondStep()
        }

        if (stepActions[action] && elementsInState >= 3){
            changeNumbers(element)
            stepActions[action]()
        }
    }
})