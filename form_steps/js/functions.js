import { emailRegex, phoneRegex, errorMessages } from "./const.js"

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
    errorsClean()

    errors.forEach((error, index) => {
        if(error) {
            const fieldsContainer = fields[index].previousElementSibling
            const errorContainer = document.createElement("div")
            errorContainer.className = "errors"
            errorContainer.textContent = errorMessages[index]

            fieldsContainer.append(errorContainer)
        }
    })
}

export {
    createErrorMessages
}