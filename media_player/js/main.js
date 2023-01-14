const main = document.querySelector("main")
const video = document.querySelector("video")
const controls = document.querySelector("#controls")
const playBtn = document.querySelector("#play")

console.log(video)

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

// window.addEventListener("load", ()=> {
//     const videoPlayer = document.createElement("video")
//     videoPlayer.controls = true

//     main.append(videoPlayer)
// })