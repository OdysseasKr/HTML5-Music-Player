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

// Set the volume label to the volume of the audio element
// * 10 to be in the range 0-10
// Add a leading "0" in case volume is 0-9 
volumeTextElement.textContent = audioElement.volume<1?"0" + audioElement.volume * 10:audioElement.volume * 10;

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
  // Set the volume label to the volume of the audio element
  // * 10 to be in the range 0-10
  // Add a leading "0" in case volume is 0-9
  volumeTextElement.textContent = audioElement.volume<1?"0" + audioElement.volume * 10:audioElement.volume * 10;
});

//=============================== Canvas Timebar =============================

/**
 * Handles the initiation and control of the canvas timebar
 */
var timebarObj = {
  
  // 2D context of the canvas element
  context: canvasElement.getContext("2d"),
  
  // Width of the canvas element
  WIDTH: 300,
  
  // Height of the canvas element
  HEIGHT: 10,
  
  // Background color of the timebar
  BACKGROUND_COLOR: "magenta",
  
  // Foreground color of the timebar
  FOREGROUND_COLOR: "#000000",
  
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
    
    timeTextElement.textContent = minutes+":"+ (seconds<10?seconds+"0":seconds);
});

