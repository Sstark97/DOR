import { media } from "./const.js";

const formatTime = time => {
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if(hours == 0) {
        return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`;
}

const changeMediaPoster = (mediaElement, type, id) => {
    const poster = media[id].poster

    if(type === "video") {
        mediaElement.poster = poster
    } else if (type === "audio") {
        const audioPoster = document.querySelector("#audioPoster")
        audioPoster.src = poster
    }
}

const changeTrackList = (mediaElement, type, id) => {
    const source = mediaElement.firstElementChild
    const playIcon = document.querySelector(`#${type}Controls #play`)
    const info = document.querySelector(`#${type}Info`)
    const timeProgress = document.querySelector(`#${type}TimeProgress`)

    playIcon.className = "bx bx-play text-4xl"
    timeProgress.style.width = "auto"

    info.firstElementChild.textContent = media[id].title
    info.lastElementChild.textContent = media[id].author
    source.src = type === "video" ? media[id].videoSrc : media[id].audioSrc

    changeMediaPoster(mediaElement, type, id)
    mediaElement.load()
}

export {
    formatTime,
    changeTrackList
}