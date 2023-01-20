import { formatTime } from "./functions.js"
import { videoActions, videos } from "./const.js"

const navPlayer = document.querySelector("nav")
const videoContainer = document.querySelector("#videoContainer")
const audioContainer = document.querySelector("#audioContainer")

const trackList = document.querySelector("#trackList")
const video = document.querySelector("video")
const controls = document.querySelector("#controls")
const timeProgress = document.querySelector("#timeProgress")
const videoDuration = document.querySelector("#duration")
const volumeControl = document.querySelector("#volumeControl")

window.addEventListener("load", () => {
    const tracks = videos.map(track => {
        const trackWrapper = document.createElement("div")
        const trackInfo = document.createElement("div")
        const poster = document.createElement("img")
        const title = document.createElement("h3")
        const author = document.createElement("p")

        poster.src = track.poster
        title.textContent = track.title
        author.textContent = track.author

        poster.id = track.id

        trackWrapper.className = "flex hover:cursor-pointer"
        trackInfo.className = "ml-5"
        poster.className = "w-[35%] rounded"
        title.className = "max-w-[20ch] font-bold"
        author.className = "text-sm font-lighter text-slate-600"

        trackInfo.append(title, author)
        trackWrapper.append(poster, trackInfo)

        return trackWrapper
    })

    trackList.append(...tracks)
})

navPlayer.addEventListener("click", e => {
    const element = e.target

    if(element.id === "video") {
        videoContainer.classList.remove("hidden")
        audioContainer.classList.add("hidden")
    } else if(element.id === "audio") {
        videoContainer.classList.add("hidden")
        audioContainer.classList.remove("hidden")
    }
})

controls.addEventListener("click", e => {
    const element = e.target

    if(videoActions[element.id]) {
        videoActions[element.id](video, element)
    }
})

trackList.addEventListener("click", e => {
    const element = e.target

    if(videos[element.id]) {
        const source = video.firstElementChild
        const playIcon = document.querySelector("#play")
        const videoInfo = document.querySelector("#videoInfo")

        playIcon.className = "bx bx-play text-4xl"
        timeProgress.style.width = "auto"

        videoInfo.firstElementChild.textContent = videos[element.id].title
        videoInfo.lastElementChild.textContent = videos[element.id].author
        video.poster = videos[element.id].poster
        source.src = videos[element.id].src

        video.load()
    }
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
