const main = document.querySelector("main")
const video = document.querySelector("video")
const controls = document.querySelector("#controls")
const playBtn = document.querySelector("#play")
const timeProgress = document.querySelector("#timeProgress")
const videoDuration = document.querySelector("#duration")
const fullScrennBtn = document.querySelector("#fullscreen")

console.log(video)

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

video.addEventListener("timeupdate", e => {
    let {currentTime, duration} = e.target;
    let percent = (currentTime / duration) * 100;
    timeProgress.style.width = `${percent}%`;
    videoDuration.textContent = formatTime(currentTime);
});

playBtn.addEventListener("click", () => {
    const playIcon = playBtn.firstChild.nextSibling

    if(video.paused) {
        playIcon.className = playIcon.className.replace("bx-play", "bx-pause")
        video.play()
    } else {
        playIcon.className = playIcon.className.replace("bx-pause", "bx-play")
        video.pause()
    }
})

fullScrennBtn.addEventListener("click", () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
})

// window.addEventListener("load", ()=> {
//     const videoPlayer = document.createElement("video")
//     videoPlayer.controls = true

//     main.append(videoPlayer)
// })