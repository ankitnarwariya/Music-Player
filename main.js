const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.querySelector("#play");
const artist = document.querySelector("#artist");
const title = document.querySelector("#title");
const previous = document.querySelector("#prev");
const next = document.querySelector("#next");

let progress = document.querySelector("#progress");
let totalDuration = document.querySelector("#time-end");
let timeStart = document.querySelector("#time-start");
const progressBar = document.querySelector('#preogress-bar')

const songs = [
  {
    name: "Meera Ke Prabhu Giridhar Nagar",
    title: "Meera Ke Prabhu Giridhar Nagar",
    artist: "Parampara Thakur",
  },
  {
    name: "Kalla Kalla Tara",
    title: "Kalla Kalla Tara",
    artist: "Akhil",
  },
  {
    name: "Brown Munde",
    title: "Brown Munde",
    artist: "AP Dhillon, Gurinder Gill, Shinda Kahlon  ",
  },
  {
    name: "Lut Gaye",
    title: "Lut Gaye",
    artist: "Jubin Nautiyal",
  },
];

let isPlaying = false;

// Play Music
const plaMusic = () => {
  isPlaying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("animation");
};

// Pause Music
const pauseMusic = () => {
  isPlaying = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("animation");
};

play.addEventListener("click", () => {
  if (isPlaying) {
    pauseMusic();
  } else {
    plaMusic();
  }
});

//Changing Music
const loadSong = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = "music/" + songs.name + ".mp3";
  img.src = "images/" + songs.name + ".jpg";
};

songIndex = 0;

const nextSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  plaMusic();
};

const prevSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  plaMusic();
};

// Progress Bar
music.addEventListener("timeupdate", (event) => {
  const { currentTime, duration } = event.srcElement;

  let progressTime = (currentTime / duration) * 100;
  progress.style.width = `${progressTime}%`;

  //Music Total Duration

  let totalMinute = Math.floor(duration / 60);
  let totalSecond = Math.floor(duration % 60);

  if (totalSecond < 10) {
    totalSecond = `0${totalSecond}`;
  }

  let totDuration = `${totalMinute}:${totalSecond}`;
  if (duration) {
    totalDuration.textContent = `${totDuration}`;
  }

  //Music Current Duration

  let minCurrentTime = Math.floor(currentTime / 60);
  let secCurrentTime = Math.floor(currentTime % 60);

  if (secCurrentTime < 10) {
    secCurrentTime = `0${secCurrentTime}`;
  }
  let totCurrentDuration = `${minCurrentTime}:${secCurrentTime}`;
  timeStart.textContent = `${totCurrentDuration}`;
});

//progress bar 

progressBar.addEventListener('click', (event) =>{
  const {duration} = music;
  let moveProgress = (event.offsetX / event.srcElement.clientWidth) * duration;
  music.currentTime = moveProgress;
});
//Auto Music Change on end
music.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);
previous.addEventListener("click", prevSong);