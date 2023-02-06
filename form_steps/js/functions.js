import { 
    emailRegex, 
    phoneRegex, 
    errorMessages, 
    firstStepFields,
    state, 
    plans
} from "./const.js"

const $ = document

const changeNumbers = element => {
    const previousSelected = document.querySelector(".nav-item-selected")
    previousSelected.classList.remove("nav-item-selected")
    element.classList.add("nav-item-selected")
}

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

const createGoBack = prevStep => {
    const goBack = $.createElement("button")
    goBack.id = "go_back"
    goBack.className = prevStep
    goBack.textContent = "Go Back"
    goBack.type = "button"

    return goBack
}

const footer = (step, prevStep = "", goBack = false) => {
    const footer = $.createElement("footer")
    const nextStep = $.createElement("button")
    const goBackElement =  goBack ? createGoBack(prevStep) : ""

    footer.className = `${goBack ? "with_go_back" : ""}` 
    nextStep.className = step
    nextStep.id = "change_step"
    nextStep.textContent = "Next Step"
    nextStep.type = "button"

    footer.append(goBackElement, nextStep)

    return footer
}

const changePrice = () => {
    const allPrices = [...$.querySelectorAll(".plan-info p:last-child")]
    const planActive = $.querySelector("#checkbox")

    allPrices.forEach((planInfo, index) => {
        const currentPrice = !planActive.checked ? `$${plans[index].price * 10 }/yr`: `$${plans[index].price}/mo`
        
        planInfo.textContent = currentPrice
    })
}

const firstStep = () => {
    const form = $.querySelector("#form")
    form.innerHTML = ""

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

        labelElement.setAttribute("for", name)
        labelElement.textContent = label

        input.type = name !== "email" ? "text" : "email"
        input.name = name
        input.value = state[name] ?? ""
        input.placeholder = placeholder

        labelContainer.append(labelElement)
        fieldContainer.append(labelContainer, input)

        return fieldContainer
    })


    form.append(...fields, footer("second_step"))
}

const createPlanType = () => {
    const planTypeContainer = $.createElement("div")
    const monthly = $.createElement("p")
    const sliderContainer = $.createElement("div")
    const sliderLabel = $.createElement("label")
    const sliderCheckBox = $.createElement("input")
    const sliderRound = $.createElement("div")
    const yearly = $.createElement("p")

    planTypeContainer.id = "plan-type-container"

    monthly.textContent = "Monthly"

    sliderContainer.className = "container"

    sliderLabel.className = "switch"
    sliderLabel.setAttribute("for", "checkbox")

    sliderCheckBox.type = "checkbox"
    sliderCheckBox.id = "checkbox"

    sliderRound.id = "change_price"
    sliderRound.className = "slider round"

    yearly.textContent ="Yearly"

    sliderLabel.append(sliderCheckBox, sliderRound)
    sliderContainer.append(sliderLabel)
    planTypeContainer.append(monthly, sliderContainer, yearly)

    return planTypeContainer
}

const secondStepContent = () => {
    const secondStepContainer = $.createElement("div")
    secondStepContainer.id = "plan-container"

    const boxs = plans.map(plan => {
        const { name, price } = plan
        const box = $.createElement("div")
        const planRadio = $.createElement("input")
        const planLabel = $.createElement("label")
        const planImg = $.createElement("img")
        const planInfo = $.createElement("div")
        const planText = $.createElement("p")
        const priceElement = $.createElement("p")

        box.className = "box"
        planRadio.className = "hidden"
        
        planRadio.type = "radio"
        planRadio.name = "plan"
        planRadio.id = name
        planRadio.value = name

        planLabel.setAttribute("for", name)

        planImg.src = `./assets/images/icon-${name}.svg`

        planInfo.className = "plan-info"

        planText.textContent = `${name.charAt(0).toUpperCase()}${name.slice(1)}`
        priceElement.textContent = `$${price}/mo`

        planInfo.append(planText, priceElement)
        planLabel.append(planImg, planInfo)
        box.append(planRadio, planLabel)

        return box
    })

    secondStepContainer.append(...boxs)

    return secondStepContainer
}

const secondStep = () => {
    const h2 = $.querySelector("#form-header h2")
    h2.textContent = "Select your plan"

    const p = $.querySelector("#form-header p")
    p.textContent = "You have the option of monthly of yearly billing."

    const form = $.querySelector("form")
    form.innerHTML = "";

    changeStepsColor("first", "second")
    form.append(secondStepContent(), createPlanType(), footer("third_step", "first_step", true))
}

const thirdStep = () => {
    const planActive = $.querySelector("#checkbox")
    const plan = $.querySelector("input[type='radio']:checked")

    state.planType = !planActive.checked ? "yearly" : "monthly"
    state.plan = plan.value

    console.log(state)
}

export {
    changeNumbers,
    createErrorMessages, 
    firstStep,
    secondStep,
    changePrice,
    thirdStep
}