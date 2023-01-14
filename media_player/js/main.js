import { formatTime } from "./functions.js"
import { videoActions } from "./const.js"

const main = document.querySelector("main")
const video = document.querySelector("video")
const controls = document.querySelector("#controls")
const timeProgress = document.querySelector("#timeProgress")
const videoDuration = document.querySelector("#duration")
const volumeControl = document.querySelector("#volumeControl")

controls.addEventListener("click", e => {
    const element = e.target

    videoActions[element.id](video, element)
})

volumeControl.addEventListener("change", () => {
    const volumeIcon = volumeControl.parentElement.previousElementSibling
    volumeIcon.className = volumeControl.value > 0 ? volumeIcon.className.replace("bxs-volume-mute", "bxs-volume-full") : volumeIcon.className.replace("bxs-volume-full", "bxs-volume-mute")

    video.volume = volumeControl.value * 0.01
})

video.addEventListener("timeupdate", e => {
    const { currentTime, duration } = e.target;
    const percent = (currentTime / duration) * 100;
    timeProgress.style.width = `${percent}%`;
    videoDuration.textContent = formatTime(currentTime);
});

// window.addEventListener("load", ()=> {
//     const videoPlayer = document.createElement("video")
//     videoPlayer.controls = true

//     main.append(videoPlayer)
// })