const videoActions = {
    play: (video, element) => {
        if(video.paused) {
            element.className = element.className.replace("bx-play", "bx-pause")
            video.play()
        } else {
            element.className = element.className.replace("bx-pause", "bx-play")
            video.pause()
        }
    },
    prev: video => {
        video.currentTime = video.currentTime - 10
    },
    next: video => {
        video.currentTime = video.currentTime + 10
    },
    fullscreen: video => {
        video.requestFullscreen()
    }
}

export {
    videoActions
}