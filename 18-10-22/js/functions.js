import { messages } from "./const.js"

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

export {
    createBootsrapAlert,
    eventAlert
}