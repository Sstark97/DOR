const steps = ["first", "second", "third", "fourth"]
const emailRegex = /^([a-z]|\d|[_]|[-])+[@][a-zA-Z]+[.](com|es|org)$/
const phoneRegex = /^[+]\d{1,2}[ ]\d{9}$/

const firstStepFields = [
    {name: "name", label:"Name", placeholder: "e.g Stephen King"},
    {name: "email", label:"Email Address", placeholder: "e.g stephenking@lorem.com"},
    {name: "phone", label:"Phone Number", placeholder: "e.g +1 234 567 890"}
]

const state = {}

const errorMessages = [
    "The name is empty",
    "The email is not shapely e.g: stephenking@lorem.com",
    "The number is not shapely e.g: +1 234 567 890"
]

const plans = [
    {
        name: "arcade", 
        price: 9
    },
    {
        name: "advanced",
        price: 12
    },
    {
        name: "pro",
        price: 15
    }
]

export {
    steps, 
    emailRegex,
    phoneRegex,
    errorMessages,
    state,
    firstStepFields,
    plans
}