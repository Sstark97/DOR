import { emailRegex, phoneRegex, errorMessages, state} from "./const.js"

const validateForm = fields => {
    const inputsMapped = fields.map(input => input.value)
    const [name, email, phone] = inputsMapped
    const errors = [name === "", !emailRegex.test(email), !phoneRegex.test(phone)]

    return errors
}

const errorsClean = () => {
    const errorsList = [...document.querySelectorAll(".errors")]

    if(errorsList.length !== 0) {
        errorsList.forEach(error => error.remove())
    }
}

const createErrorMessages = fields => {
    const errors = validateForm(fields)
    const allError = errors.find(error => error)
    errorsClean()

    if (!allError) {
        fields.forEach(field => state[field.name] = field.value)
        return true
    } else {
        errors.forEach((error, index) => {
            if(error) {
                const fieldsContainer = fields[index].previousElementSibling
                const errorContainer = document.createElement("div")
                errorContainer.className = "errors"
                errorContainer.textContent = errorMessages[index]
    
                fieldsContainer.append(errorContainer)
            }
        })
        return false
    }
}

function changeStepsColor(step1, step2) {
    const number1 = document.querySelector(`#${step1}`);
    number1.classList.remove("nav-item-selected")

    const number2 = document.querySelector(`#${step2}`);
    number2.classList.add("nav-item-selected")
}

function step2 (){
    const h2 = document.querySelector("#form-header h2")
    h2.textContent = "Select your plan"

    const p = document.querySelector("#form-header p")
    p.textContent = "You have the option of monthly of yearly billing."

    const form = document.querySelector("form")
    form.innerHTML = "";

    changeStepsColor("first", "second")
}

export {
    createErrorMessages, step2
}