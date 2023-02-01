const steps = ["first", "second", "third", "fourth"]
const emailRegex = /^([a-z]|\d|[_]|[-])+[@][a-zA-Z]+[.](com|es|org)$/
const phoneRegex = /^[+]\d{1,2}[ ]\d{9}$/

const state = {}

const errorMessages = [
    "The name is empty",
    "The email is not shapely e.g: stephenking@lorem.com",
    "The number is not shapely e.g: +1 234 567 890"
]

export {
    steps, 
    emailRegex,
    phoneRegex,
    errorMessages,
    state
}