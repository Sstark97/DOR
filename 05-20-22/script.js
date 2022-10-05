// One line to rule them all
const cthulu_box = document.querySelectorAll("section .caja")
const btn = document.querySelector("button")

btn.addEventListener("click", () => {
    cthulu_box.forEach(val => val.classList.toggle("estado_final"))
});
