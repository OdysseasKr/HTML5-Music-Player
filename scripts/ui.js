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

/**
 * Handles the initiation and control of the canvas timebar
 */
var timebarObj = {
  
  // 2D context of the canvas element
  context: canvasElement.getContext("2d"),
  
  // Width of the canvas element
  WIDTH: 240,
  
  // Height of the canvas element
  HEIGHT: 10,
  
  // Background color of the timebar
  BACKGROUND_COLOR: "#DBDBDB",
  
  // Foreground color of the timebar
  FOREGROUND_COLOR: "#BAB9B8",
  
  // Initiate the canvas element
  init: function(){
    canvasElement.style.backgroundColor = this.BACKGROUND_COLOR;
    canvasElement.width = this.WIDTH;
    canvasElement.height = this.HEIGHT;
  },
  
  // Draw a line covering the given percentage of it's width
  drawLine: function(percent){
    this.context.clearRect(0,0,this.WIDTH,this.HEIGHT);
    this.context.beginPath();
    this.context.moveTo(0,this.HEIGHT/2);
    this.context.lineTo(percent * this.WIDTH , this.HEIGHT/2);
    this.context.lineWidth = this.HEIGHT;
    
    this.context.strokeStyle = this.FOREGROUND_COLOR;
    this.context.stroke();
  }
}

// Start the canvas timebar
timebarObj.init();

timeTextElement.textContent = "0:00";

// On time update
audioElement.addEventListener("timeupdate", function(){
    timebarObj.drawLine(audioElement.currentTime/audioElement.duration);
    var seconds = audioElement.currentTime;
    var minutes = Math.round(seconds / 60);
    seconds = Math.round(seconds % 60);
    
    timeTextElement.textContent = minutes+":"+ (seconds<10?"0"+seconds:seconds);
});

