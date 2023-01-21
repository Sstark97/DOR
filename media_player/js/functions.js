import { media } from "./const.js";

const formatTime = (time) => {
  let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours < 10 ? `0${hours}` : hours;

  if (hours == 0) {
    return `${minutes}:${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
};

const createTrackList = () => {
  const tracks = media.map((track) => {
    const trackWrapper = document.createElement("div");
    const trackInfo = document.createElement("div");
    const poster = document.createElement("img");
    const title = document.createElement("h3");
    const author = document.createElement("p");

    poster.src = track.poster;
    title.textContent = track.title;
    author.textContent = track.author;

    poster.id = track.id;

    trackWrapper.className = "flex justify-center hover:cursor-pointer";
    trackInfo.className = "ml-5";
    poster.className = "w-[35%] rounded";
    title.className = "max-w-[20ch] font-bold";
    author.className = "text-sm font-lighter text-slate-600";

    trackInfo.append(title, author);
    trackWrapper.append(poster, trackInfo);

    return trackWrapper;
  });

  return tracks;
};

const changeMediaPoster = (mediaElement, type, id) => {
  const poster = media[id].poster;

  if (type === "video") {
    mediaElement.poster = poster;
  } else if (type === "audio") {
    const audioPoster = document.querySelector("#audioPoster");
    audioPoster.src = poster;
  }
};

const changeTrackList = (mediaElement, type, id) => {
  const firstSource = mediaElement.firstElementChild;
  const secondSource = firstSource.nextElementSibling;
  const playIcon = document.querySelector(`#${type}Controls #play`);
  const info = document.querySelector(`#${type}Info`);
  const timeProgress = document.querySelector(`#${type}TimeProgress`);

  playIcon.className = "bx bx-play text-4xl";
  timeProgress.style.width = "auto";

  info.firstElementChild.textContent = media[id].title;
  info.lastElementChild.textContent = media[id].author;
  firstSource.src = type === "video" ? media[id].videoSrc[0] : media[id].audioSrc[0];
  secondSource.src = type === "video" ? media[id].videoSrc[1] : media[id].audioSrc[1];

  changeMediaPoster(mediaElement, type, id);
  mediaElement.load();
};

const resetMedia = (mediaElement, type) => {
  const playIcon = document.querySelector(`#${type}Controls #play`);
  const timeProgress = document.querySelector(`#${type}TimeProgress`);

  playIcon.className = "bx bx-play text-4xl";
  timeProgress.style.width = "auto";

  mediaElement.pause();
};

export { formatTime, createTrackList, changeTrackList, resetMedia };
