import { messages, validationOptions } from "./const.js"

/**
 * Funcion que nos genera un alert de Bootstrap
 * @return Componente Alert de Boostrap
 */
 const createBootsrapAlert = message => {
    const alert = document.createElement("div")
    const pAlert = document.createElement("p")
    const btnAlert = document.createElement("button")

    alert.classList = "alert alert-primary alert-dismissible fade show"
    alert.role = "alert"
    alert.tabIndex = -1

    pAlert.textContent = message

    btnAlert.classList = "btn-close"
    btnAlert.dataset.bsDismiss = "alert"
    btnAlert.ariaLabel = "Close"

    alert.append(pAlert, btnAlert)

    return alert
}

/**
 * Función que nos crea un alert dentro del elemento parent
 * @param {*} e 
 * @param {*} parent 
 */
const eventAlert = (e, parent) => {
    const element = e.target

    if(element.nodeName === "INPUT") {
        const exist = document.querySelector(`#${parent.id} .alert`)

        if(exist) {
            parent.removeChild(exist)
        }

        const message = messages[element.id] ?? messages[element.type]

        const alert = createBootsrapAlert(`Has pulsado en el elemento ${message}`)
        parent.insertAdjacentElement("afterbegin", alert)

        // Eliminamos el Alert despues de 3s
        setTimeout(() => {
            if(alert.isConnected) {
                parent.removeChild(alert)
            }
        }, 3000)
    }
}

/**
 * Función que nos genera las clases de bootsrap según las validaciones
 * @param {*} value 
 * @param {*} type 
 * @returns 
 */
const validateForm = (value, type) => {
    const result = {
        parentClassList: "is-valid",
        validationClasslist: "valid-feedback",
        validationMessage: "Todo va bien!"
    }

    const message = validationOptions[type] ? validationOptions[type](value) : validationOptions["default"](value)

    if(message !== "") {
        result.parentClassList = "is-invalid"
        result.validationClasslist = "invalid-feedback"
        result.validationMessage = message
    }

    return result
    
}

/**
 * Evento de Validación que se ejecutará en el evento blur
 * @param {*} e 
 */
const eventValidation = e => {
    const element = e.target

    if(element.nodeName === "INPUT") {
        const { parentClassList, validationClasslist, validationMessage } = validateForm(element.value, element.type)

        const exist = document.querySelector(`${element.nodeName.toLowerCase()} + div`)
        if(exist) {
            exist.remove()
        }

        const validation = document.createElement("div")
        validation.classList = validationClasslist
        validation.textContent = validationMessage

        element.classList = `form-control ${parentClassList}`
        element.insertAdjacentElement("afterend", validation)
    }
}

export {
    createBootsrapAlert,
    eventAlert,
    eventValidation
}