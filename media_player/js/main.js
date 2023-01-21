import { changeTrackList, formatTime } from "./functions.js"
import { mediaActions, media } from "./const.js"

const navPlayer = document.querySelector("nav")
const videoContainer = document.querySelector("#videoContainer")
const audioContainer = document.querySelector("#audioContainer")

const trackList = document.querySelector("#trackList")
const video = document.querySelector("video")
const videoControls = document.querySelector("#videoControls")
const videoTimeProgress = document.querySelector("#videoTimeProgress")
const videoDuration = document.querySelector("#videoDuration")
const videoVolumeControl = document.querySelector("#videoVolumeControl")

const audio = document.querySelector("audio")
const audioControls = document.querySelector("#audioControls")
const audioVolumeControl = document.querySelector("#audioVolumeControl")
const audioTimeProgress = document.querySelector("#audioTimeProgress")
const audioDuration = document.querySelector("#audioDuration")

let mediaElement = video
let type = "video"

window.addEventListener("load", () => {
    const tracks = media.map(track => {
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

        mediaElement = video
        type = "video"
        video.load()
    } else if(element.id === "audio") {
        videoContainer.classList.add("hidden")
        audioContainer.classList.remove("hidden")

        mediaElement = audio
        type = "audio"
        audio.load()
    }
})

videoControls.addEventListener("click", e => {
    const element = e.target

    if(mediaActions[element.id]) {
        mediaActions[element.id](video, element)
    }
})

audioControls.addEventListener("click", e => {
    const element = e.target

    if(mediaActions[element.id]) {
        mediaActions[element.id](audio, element)
    }
})

trackList.addEventListener("click", e => {
    const element = e.target

    if(media[element.id]) {
        changeTrackList(mediaElement, type, element.id)
    }
})

videoVolumeControl.addEventListener("change", () => {
    const volumeIcon = volumeControl.parentElement.previousElementSibling
    volumeIcon.className = volumeControl.value > 0 ? volumeIcon.className.replace("bxs-volume-mute", "bxs-volume-full") : volumeIcon.className.replace("bxs-volume-full", "bxs-volume-mute")

    video.volume = volumeControl.value * 0.01
})

audioVolumeControl.addEventListener("change", () => {
    const volumeIcon = audioVolumeControl.parentElement.previousElementSibling
    volumeIcon.className = audioVolumeControl.value > 0 ? volumeIcon.className.replace("bxs-volume-mute", "bxs-volume-full") : volumeIcon.className.replace("bxs-volume-full", "bxs-volume-mute")

    audio.volume = audioVolumeControl.value * 0.01
})

video.addEventListener("timeupdate", e => {
    const { currentTime, duration } = e.target;
    const percent = (currentTime / duration) * 100;
    videoTimeProgress.style.width = `${percent}%`;
    videoDuration.textContent = formatTime(currentTime);
});

audio.addEventListener("timeupdate", e => {
    const { currentTime, duration } = e.target;
    const percent = (currentTime / duration) * 100;
    audioTimeProgress.style.width = `${percent}%`;
    audioDuration.textContent = formatTime(currentTime);
});
