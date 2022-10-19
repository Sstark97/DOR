// Parte de DEW
{/* <div class="alert alert-warning alert-dismissible fade" role="alert">
<strong>Holy guacamole!</strong> You should check in on some of those fields below.
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div> */}

/**
 * Funcion que nos genera un alert de Bootstrap
 * @return Componente Alert de Boostrap
 */
const createBootsrapAlert = () => {
    const alert = document.createElement("div")
    const pAlert = document.createElement("p")
    const btnAlert = document.createElement("button")

    alert.classList = "alert alert-warning alert-dismissible fade show"
    alert.role = "alert"

    btnAlert.classList = "btn-close"
    btnAlert.dataset.bsDismiss = "alert"
    btnAlert.ariaLabel = "Close"

    alert.append(pAlert, btnAlert)

    return alert
}

const loginModal = document.querySelector("#login_modal")
const inputsLogin = document.querySelectorAll("#login_modal input")

