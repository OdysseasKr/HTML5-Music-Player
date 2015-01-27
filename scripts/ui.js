// Global player elements
var audioElement = document.getElementById("audio");
var playButtonElement = document.getElementById("playBtn");
var volumeBarElement = document.getElementById("volumeBar");
var volumeTextElement = document.getElementById("volumeText");
var titleTextElement = document.getElementById("titleText");
var canvasElement = document.getElementById("timeBar");
var timeTextElement = document.getElementById("timeText");

// Constants
const PLAY = "Play";
const PAUSE = "Pause";

//=============================== Buttons and labels ==============================

volumeText.textContent = audioElement.volume;

// On load start
audioElement.addEventListener("loadstart",function(){
  titleTextElement.textContent = playlist.getActive().name;
});

// On play
audioElement.addEventListener("play", function(){
  playButtonElement.textContent = PAUSE;
});

// On pause
audioElement.addEventListener("pause", function(){
  playButtonElement.textContent = PLAY;
});

// On Volume Bar change
volumeBarElement.addEventListener("change",function(){
  volumeTextElement.textContent = audioElement.volume;
});

//=============================== Canvas Timebar =============================
const WIDTH = 300;
const HEIGHT = 10;
var timeBarInterval;
canvasElement.style.backgroundColor = "blue";
canvasElement.width = WIDTH;
canvasElement.height = HEIGHT;

var canvasObj = {
  context: canvasElement.getContext("2d"),
  
  init: function(){
  },
  
  drawLine: function(percent){
    console.log(percent);
    this.context.clearRect(0,0,WIDTH,HEIGHT);
    this.context.beginPath();
    this.context.moveTo(0,HEIGHT/2);
    this.context.lineTo(percent * WIDTH , HEIGHT/2);
    this.context.lineWidth = HEIGHT;
    
    this.context.strokeStyle = "#000000";
    this.context.stroke();
  }
}

// On time update
audioElement.addEventListener("timeupdate", function(){
    canvasObj.drawLine(audioElement.currentTime/audioElement.duration);
    var seconds = Math.round(audioElement.currentTime);
    var minutes = seconds / 60;
    seconds = Math.round(seconds % 60); 
    timeTextElement.textContent = minutes+"."+seconds;
});

