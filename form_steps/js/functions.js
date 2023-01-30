import { emailRegex, phoneRegex } from "./const.js"

const validateForm = fields => {
    const inputsMapped = fields.map(input => input.value)
    const [name, email, phone] = inputsMapped
    const errors = [name === "", !emailRegex.test(email), !phoneRegex.test(phone)]

    console.log(errors)
}

export {
    validateForm
}