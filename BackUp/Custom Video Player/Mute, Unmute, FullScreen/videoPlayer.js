const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreenbtn = document.getElementById("jsFullScreen");

const handlePlayClick = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
};

const handleVolumeClick = () => {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
};

const exitFullScreen = () => {
  fullScreenbtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenbtn.addEventListener("click", goFullScreen);
  // document.exitFullscreen();
  document.webkitExitFullscreen();
};

const goFullScreen = () => {
  // videoPlayer.requestFullscreen();
  videoContainer.webkitRequestFullscreen();
  fullScreenbtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenbtn.removeEventListener("click", goFullScreen);
  fullScreenbtn.addEventListener("click", exitFullScreen);
};

const init = () => {
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenbtn.addEventListener("click", goFullScreen);
};

if (videoContainer) {
  init();
}
