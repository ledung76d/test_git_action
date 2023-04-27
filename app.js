const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicThumbnail = document.querySelector(".music-thumb");
const musicImage = document.querySelector(".music-thumb img");
const playRepeat = document.querySelector(".play-repeat");
const playInfinite = document.querySelector(".play-infinite");

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
let isInfinite = false;
// const musics = ["holo.mp3", "summer.mp3", "spark.mp3", "home.mp3"];
const musics = [
    {
        id: 1,
        title: "Holo",
        file: "holo.mp3",
        image: "./image/holo.jpg",
    },
    {
        id: 2,
        title: "Home",
        file: "home.mp3",
        image: "./image/home.jpg",
    },
    {
        id: 3,
        title: "Summer",
        file: "summer.mp3",
        image: "./image/summer.jpg",
    },
    {
        id: 4,
        title: "Spark",
        file: "spark.mp3",
        image: "./image/spark.jpg",
    }
]
let timer;
let repeatCount = 0;
playRepeat.addEventListener("click", function () {
    if (isRepeat) {
        isRepeat = false;
        playRepeat.removeAttribute("style");
    } else {
        isRepeat = true;
        playRepeat.style.color = "#ffb86c";
    }
});
playInfinite.addEventListener("click", function () {
    if (isInfinite) {
        isInfinite = false;
        playInfinite.removeAttribute("style");
    } else {
        isInfinite = true;
        playInfinite.style.color = "#ffb86c";

    }
});



nextBtn.addEventListener("click", function () {
    changeSong(1);
});
prevBtn.addEventListener("click", function () {
    changeSong(-1);
});
song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
    repeatCount++;
    if (isRepeat && repeatCount === 1 || isInfinite) {
        // handle repeat song
        isPlaying = true;
        playPause();
    } else {
        changeSong(1);
    }
}
function changeSong(dir) {
    if (dir === 1) {
        // next song
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying = true;
    } else if (dir === -1) {
        // prev song
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }
    init(indexSong);
    // song.setAttribute("src", `./music/${musics[indexSong].file}`);
    playPause();
}
playBtn.addEventListener("click", playPause);
function playPause() {
    if (isPlaying) {
        musicThumbnail.classList.add("is-playing");
        song.play();
        playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
        isPlaying = false;
        timer = setInterval(displayTimer, 800);
    } else {
        musicThumbnail.classList.remove("is-playing");
        song.pause();
        playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
        isPlaying = true;
        clearInterval(timer);
    }
}
function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.textContent = formatTimer(currentTime);
    if (!duration) {
        durationTime.textContent = "00:00";
    } else {
        durationTime.textContent = formatTimer(duration);
    }
}
function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds
        }`;
}
rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {

    song.currentTime = rangeBar.value;
    rangeBar.value = song.currentTime;
}
function init(indexSong) {
    song.setAttribute("src", `./music/${musics[indexSong].file}`);
    musicImage.setAttribute("src", musics[indexSong].image);
    musicName.textContent = musics[indexSong].title;
}
displayTimer();

init(indexSong);