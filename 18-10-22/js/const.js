const messages = {
    "email": "email",
    "password": "password",
    "name": "nombre",
    "surname": "apellidos",
    "confirm": "confirmar password",
    "date": "fecha de nacimiento",
    "radio": "sexo",
    "url": "enlace de perfil"
}

const validationOptions = {
    "email": value => !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? "El email es inválido" : "",
    "password": value => value === "" ? "La contraseña no puede estar vacía" : "",
    "default": value => value === "" ? "El campo no puede estar vacío" : ""
}

export {
    messages,
    validationOptions
}