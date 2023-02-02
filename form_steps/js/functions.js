import { emailRegex, phoneRegex, errorMessages, firstStepFields, state} from "./const.js"

const $ = document

const validateForm = fields => {
    const inputsMapped = fields.map(input => input.value)
    const [name, email, phone] = inputsMapped
    const errors = [name === "", !emailRegex.test(email), !phoneRegex.test(phone)]

    return errors
}

const errorsClean = () => {
    const errorsList = [...$.querySelectorAll(".errors")]

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
                const errorContainer = $.createElement("div")
                errorContainer.className = "errors"
                errorContainer.textContent = errorMessages[index]
    
                fieldsContainer.append(errorContainer)
            }
        })
        return false
    }
}

const changeStepsColor = (step1, step2) => {
    const number1 = $.querySelector(`#${step1}`);
    number1.classList.remove("nav-item-selected")

    const number2 = $.querySelector(`#${step2}`);
    number2.classList.add("nav-item-selected")
}

const firstStep = () => {
    const form = $.querySelector("#form")
    const fields = firstStepFields.map(field => {
        const {name, label, placeholder } = field
        const fieldContainer = $.createElement("div")
        const labelContainer = $.createElement("div")
        const labelElement = $.createElement("label")
        const input = $.createElement("input")

        fieldContainer.className = "field"
        labelContainer.className = "labels-container"
        labelElement.className = "labels"
        input.className = "fields"

        labelElement.for = name
        labelElement.textContent = label

        input.type = name !== "email" ? "text" : "email"
        input.name = name
        input.placeholder = placeholder

        labelContainer.append(labelElement)
        fieldContainer.append(labelContainer, input)

        return fieldContainer
    })

    form.append(...fields)
}


const secondStep = () => {
    const h2 = $.querySelector("#form-header h2")
    h2.textContent = "Select your plan"

    const p = $.querySelector("#form-header p")
    p.textContent = "You have the option of monthly of yearly billing."

    const form = $.querySelector("form")
    form.innerHTML = "";

    changeStepsColor("first", "second")
}

export {
    createErrorMessages, 
    firstStep,
    secondStep
}