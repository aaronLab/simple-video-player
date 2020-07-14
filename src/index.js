// elements
const videoPlayer = document.getElementById("videoPlayer");
const video = document.querySelector("#videoPlayer video");
const playBtn = document.getElementById("playBtn");
const volumnBtn = document.getElementById("volumnBtn");
const totalTime = document.getElementById("totalTime");
const currentTime = document.getElementById("currentTime");
const controls = document.getElementById("controls");
const inProgressBar = document.getElementById("inProgressBar");
const progressBar = document.getElementById("progressBar");

// to hide element
const DISPLAYNONE = "displayNone";

// for timeout
let mouseTimeOut;

// format time
function formatTime(seconds) {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
}

// when click the play & pause btn
function handlePlayClick() {
  if (video.paused) {
    video.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    video.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

// when click the sound btn
function handleMuteClick() {
  if (video.muted) {
    video.muted = false;
    volumnBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    video.muted = true;
    volumnBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

// current time update
function setCurrentTime() {
  const currentTimeStr = formatTime(Math.round(video.currentTime));
  currentTime.innerHTML = currentTimeStr;
}

// get and set total time
function setTotalTime() {
  const totalTimeStr = formatTime(video.duration);
  totalTime.innerHTML = totalTimeStr;
  setInterval(setCurrentTime, 1000);
}

// space bar key up to play & pause
function handleKeyUp(e) {
  e.keyCode === 32 && e.which === 32 && handlePlayClick();
}

// replay when the video ended
// remove below function, if you don't want to replay when it's ended
function handleEnded() {
  video.currentTime = 0;
  video.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// hide mouse cursor & control bar
function handleMouseStop() {
  controls.classList.add(DISPLAYNONE);
  videoPlayer.style.cursor = "none";
}

// when mouse starts moving, clear timeout & show control bar & cursor
function handleMouseMove() {
  if (mouseTimeOut) {
    clearTimeout(mouseTimeOut);
  }
  controls.classList.remove(DISPLAYNONE);
  videoPlayer.style.cursor = "auto";
  // when mouse move stops for 1.5sec, hide control bar & cursor
  mouseTimeOut = setTimeout(handleMouseStop, 1500);
}

// progress bar expand
function handleProgressBar() {
  let videoProgress = (video.currentTime / video.duration) * 100;
  inProgressBar.style.width = `${videoProgress}%`;
}

// when the progress bar clicked, play from the clicked point
function handleInprogressClick(e) {
  let progressBarWidth = progressBar.getBoundingClientRect().width;
  let clickedPosition = e.offsetX;
  let clickedRatio = clickedPosition / progressBarWidth;
  video.currentTime = video.duration * clickedRatio;
}

// init
function init() {
  setTotalTime();
  playBtn.addEventListener("click", handlePlayClick);
  video.addEventListener("click", handlePlayClick);
  volumnBtn.addEventListener("click", handleMuteClick);
  video.addEventListener("loadedmetadata", setTotalTime);
  window.addEventListener("keyup", handleKeyUp);
  // remove below one, if you don't want to replay when it's ended
  video.addEventListener("ended", handleEnded);
  window.addEventListener("mousemove", handleMouseMove);
  video.addEventListener("timeupdate", handleProgressBar);
  progressBar.addEventListener("click", handleInprogressClick);
}

// if there's a video player, run init
if (videoPlayer) {
  init();
}
