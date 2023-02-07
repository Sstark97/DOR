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

const changeStepsColor = step => {
    const allNumbers = [...$.querySelectorAll(".nav-item div:not(.nav-item-info)")]

    allNumbers.forEach(steps => steps.className = "")

    const number1 = $.querySelector(`#${step}`);
    number1.classList.add("nav-item-selected")
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
    changeStepsColor("first")
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
    sliderCheckBox.checked = state.planType === "yearly"

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

    const boxs = plans.map((plan, index) => {
        const { name } = plan
        const box = $.createElement("div")
        const planRadio = $.createElement("input")
        const planLabel = $.createElement("label")
        const planImg = $.createElement("img")
        const planInfo = $.createElement("div")
        const planText = $.createElement("p")
        const priceElement = $.createElement("p")
        
        const currentPrice = state.planType === "yearly" ? `$${plans[index].price * 10 }/yr`: `$${plans[index].price}/mo`

        box.className = "box"
        planRadio.className = "hidden"
        
        planRadio.type = "radio"
        planRadio.name = "plan"
        planRadio.id = name
        planRadio.value = name
        planRadio.autofocus = state.plan === name ? true : undefined
        planRadio.checked = state.plan === name ? true : undefined

        console.log(planRadio.checked)

        planLabel.setAttribute("for", name)

        planImg.src = `./assets/images/icon-${name}.svg`

        planInfo.className = "plan-info"

        planText.textContent = `${name.charAt(0).toUpperCase()}${name.slice(1)}`
        priceElement.textContent = currentPrice

        planInfo.append(planText, priceElement)
        planLabel.append(planImg, planInfo)
        box.append(planRadio, planLabel)

        return box
    })

    secondStepContainer.append(...boxs)

    return secondStepContainer
}

const thirdStepContent = () => {
    const thirdStepContainer = $.createElement("div")
    thirdStepContainer.id = "plan-container"

    const { planType: type } = state

    const img = $.createElement("img")
    img.src = `./assets/images/third_${type}.PNG`
    img.className = "addons_img"

    thirdStepContainer.append(img)

    return thirdStepContainer

}

const fourthStepContent = () => {

    const resume = $.createElement("div")
    const planSelected = $.createElement("p")
    const divPlan = $.createElement("div")
    const change = $.createElement("a")
    const planPrice = $.createElement("p")
    const firstAddon = $.createElement("div")
    const titleFirstAddon = $.createElement("p")
    const priceFirstAddon = $.createElement("p")
    const secondAddon = $.createElement("div")
    const titleSecondAddon = $.createElement("p")
    const priceSecondAddon = $.createElement("p")

    const { plan, planType } = state
    const planCapitalize = `${plan.charAt(0).toUpperCase()}${plan.slice(1)}`
    const planTypeCapitalize = `${planType.charAt(0).toUpperCase()}${planType.slice(1)}`
    const planData = plans.find(currentPlan => currentPlan.name === plan)
    const currentPrice = state.planType === "yearly" ? `$${planData.price * 10 }/yr`: `$${planData.price}/mo`

    resume.id = "resume"

    planSelected.id = "plan-selected"
    planSelected.textContent = `${planCapitalize} (${planTypeCapitalize})`

    change.href = "#"
    change.textContent = "Change"

    planPrice.id = "plan-selected-price"
    planPrice.textContent = currentPrice

    divPlan.append(change, planPrice)

    titleFirstAddon.textContent = "Online Service"
    priceFirstAddon.textContent = "$0"

    titleSecondAddon.textContent = "Larger Storage"
    priceSecondAddon.textContent = "$0"

    firstAddon.append(titleFirstAddon, priceFirstAddon)
    secondAddon.append(titleSecondAddon, priceSecondAddon)

    resume.append(planSelected, divPlan, firstAddon, secondAddon)

    const totalResume = $.createElement("div")
    const divResume = $.createElement("div")
    const total = $.createElement("p")
    const totalPrice = $.createElement("p")

    totalResume.id = "total-resume"
    total.textContent =  "Total (per month)"
    totalPrice.id = "total-price"
    totalPrice.textContent = `+${currentPrice}`

    divResume.append(total, totalPrice)
    totalResume.append(divResume)

    return [resume, totalResume]

}

const secondStep = () => {
    changeStepsColor("second")
    const h2 = $.querySelector("#form-header h2")
    h2.textContent = "Select your plan"

    const p = $.querySelector("#form-header p")
    p.textContent = "You have the option of monthly of yearly billing."

    const form = $.querySelector("form")
    form.innerHTML = "";

    form.append(secondStepContent(), createPlanType(), footer("third_step", "first_step", true))
}

const thirdStep = () => {
    changeStepsColor("third")
    const planActive = $.querySelector("#checkbox")
    const plan = $.querySelector("input[type='radio']:checked")

    state.planType = planActive && planActive.checked ? "yearly" : "monthly"
    state.plan = plan ? plan.value : undefined

    const h2 = $.querySelector("#form-header h2")
    h2.textContent = "Pick add-ons"

    const p = $.querySelector("#form-header p")
    p.textContent = "Add-ons help enhance your gaming experience."

    const form = $.querySelector("form")
    form.innerHTML = "";

    form.append(thirdStepContent(), footer("fourth_step", "second_step", true))
}

const fourthStep = () => {
    changeStepsColor("fourth")

    const h2 = $.querySelector("#form-header h2")
    h2.textContent = "Finishing up"

    const p = $.querySelector("#form-header p")
    p.textContent = "Double-check everything looks OK before confirming"

    const form = $.querySelector("form")
    form.innerHTML = "";

    form.append(...fourthStepContent(), footer("five_step", "third_step", true))
}

export {
    changeNumbers,
    createErrorMessages, 
    firstStep,
    secondStep,
    changePrice,
    thirdStep, 
    fourthStep
}