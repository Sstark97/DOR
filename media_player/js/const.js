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

const videos = [
    {
        id: 0,
        title: "Quevedo: Bzrp Music Sessions, Vol. 52",
        author: "Bizarrap, Quevedo",
        src: [
            "./media/video/bzr_quevedo.mp4"
        ],
        poster: "./media/video/poster/poster_quevedo.png"
    },
    {
        id: 1,
        title: "Shakira: Bzrp Music Sessions, Vol. 53",
        author: "Bizarrap, Shakira",
        src: [
            "./media/video/bzr_shakira.mp4"
        ],
        poster: "./media/video/poster/poster_shakira.png"
    },
    {
        id: 2,
        title: "Duki: Bzrp Music Sessions, Vol. 50",
        author: "Bizarrap, Duki",
        src: [
            "./media/video/bzr_duki.mp4"
        ],
        poster: "./media/video/poster/poster_duki.png"
    },
    {
        id: 3,
        title: "Heladio: Bzrp Music Sessions, Vol. 52",
        author: "Bizarrap, Heladio",
        src: [
            "./media/video/bzr_heladio.mp4"
        ],
        poster: "./media/video/poster/poster_heladio.png"
    },
]

export {
    videoActions,
    videos
}