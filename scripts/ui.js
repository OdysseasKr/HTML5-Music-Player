// Global player elements
var audioElement = document.getElementById("audio");
var playButtonElement = document.getElementById("playBtn");
var volumeSliderElement = document.getElementById("volumeSlider");
var titleTextElement = document.getElementById("titleText");
var albumTextElement = document.getElementById("albumText");
var artistTextElement = document.getElementById("artistText");
var canvasElement = document.getElementById("timeBar");
var timeTextElement = document.getElementById("timeText");

// Constants
const PLAY = "icons/32/play-32.png";
const PAUSE = "icons/32/pause-32.png";

//=============================== Buttons and labels ==============================

// On load start
audioElement.addEventListener("loadstart",function(){
  var filename = playlist.getActive().src;
  
  titleTextElement.textContent = playlist.getActive().name;
  albumTextElement.textContent = playlist.getActive().album;
  artistTextElement.textContent = playlist.getActive().artist;
});

// On play
audioElement.addEventListener("play", function(){
  playButtonElement.firstChild.src = PAUSE;
});

// On pause
audioElement.addEventListener("pause", function(){
  playButtonElement.firstChild.src = PLAY;
});

//=============================== Canvas Timebar =============================
sliderfy(canvasElement);

timeTextElement.textContent = "0:00";

// On time update
audioElement.addEventListener("timeupdate", function(){
    canvasElement.firstChild.style.width = (audioElement.currentTime/audioElement.duration) *canvasElement.offsetWidth + "px";
    var seconds = audioElement.currentTime;
    var minutes = Math.round(seconds / 60);
    seconds = Math.round(seconds % 60);
    
    timeTextElement.textContent = minutes+":"+ (seconds<10?"0"+seconds:seconds);
});

// On change
canvasElement.addEventListener("change", function(){
  audioElement.currentTime = canvasElement.sliderValue * audioElement.duration;
});

