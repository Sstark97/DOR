const mediaActions = {
    play: (media, element) => {
        if(media.paused) {
            element.className = element.className.replace("bx-play", "bx-pause")
            media.play()
        } else {
            element.className = element.className.replace("bx-pause", "bx-play")
            media.pause()
        }
    },
    prev: media => {
        media.currentTime = media.currentTime - 10
    },
    next: media => {
        media.currentTime = media.currentTime + 10
    },
    fullscreen: video => {
        video.requestFullscreen()
    }
}

const media = [
    {
        id: 0,
        title: "Quevedo: Bzrp Music Sessions, Vol. 52",
        author: "Bizarrap, Quevedo",
        videoSrc: [
            "./media/video/bzr_quevedo.mp4"
        ],
        audioSrc: [
            "./media/music/bzr_quevedo.mp3"
        ],
        poster: "./media/poster/poster_quevedo.png"
    },
    {
        id: 1,
        title: "Shakira: Bzrp Music Sessions, Vol. 53",
        author: "Bizarrap, Shakira",
        videoSrc: [
            "./media/video/bzr_shakira.mp4"
        ],
        audioSrc: [
            "./media/music/bzr_shakira.mp3"
        ],
        poster: "./media/poster/poster_shakira.png"
    },
    {
        id: 2,
        title: "Duki: Bzrp Music Sessions, Vol. 50",
        author: "Bizarrap, Duki",
        videoSrc: [
            "./media/video/bzr_duki.mp4"
        ],
        audioSrc: [
            "./media/music/bzr_duki.mp3"
        ],
        poster: "./media/poster/poster_duki.png"
    },
    {
        id: 3,
        title: "Heladio: Bzrp Music Sessions, Vol. 52",
        author: "Bizarrap, Heladio",
        videoSrc: [
            "./media/video/bzr_heladio.mp4"
        ],
        audioSrc: [
            "./media/music/bzr_heladio.mp3"
        ],
        poster: "./media/poster/poster_heladio.png"
    },
]

export {
    mediaActions,
    media
}