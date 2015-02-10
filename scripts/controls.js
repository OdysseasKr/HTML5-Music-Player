// Global player elements
var audio = document.getElementById("audio");
var sourceMP3 = document.getElementById("sourceMP3");
var timeSlider = document.getElementById("timeBar");
var playBtn = document.getElementById("playBtn");
var volumeSlider = document.getElementById("volumeSlider");
var nextBtn = document.getElementById("nextBtn");
var previousBtn = document.getElementById("previousBtn");
var titleTextElement = document.getElementById("titleText");
var albumTextElement = document.getElementById("albumText");
var artistTextElement = document.getElementById("artistText");
var timeTextElement = document.getElementById("timeText");
var PLAY = "icons/32/play-32.png";
var PAUSE = "icons/32/pause-32.png";

// On load set the default values to the audio element 
sourceMP3.src = playlist.getActive().src;
audio.load();

// On load start
audio.addEventListener("loadstart",function(){
  var filename = playlist.getActive().src;
  
  titleTextElement.textContent = playlist.getActive().name;
  albumTextElement.textContent = playlist.getActive().album;
  artistTextElement.textContent = playlist.getActive().artist;
});

// Play Button
playBtn.addEventListener("click",function(){
  if (audio.paused) {
    audio.play();
  }
  else {
    audio.pause();
  }
});

audio.addEventListener("play",function(){playBtn.firstChild.src = PAUSE;},false);
audio.addEventListener("pause",function(){playBtn.firstChild.src = PLAY;},false);

// Setup volume slider using sliderfy.js
sliderfy(volumeSlider);
audio.volume = 1;
volumeSlider.addEventListener("change",function(){
  audio.volume = volumeSlider.sliderValue;
});

sliderfy(timeSlider);
timeTextElement.textContent = "0:00";
// On time update
timeUpdateCallback = function(){
    timeSlider.firstChild.style.width = (audio.currentTime/audio.duration) *timeSlider.offsetWidth + "px";
    var seconds = audio.currentTime;
    var minutes = Math.round(seconds / 60);
    seconds = Math.round(seconds % 60);
    
    timeTextElement.textContent = minutes+":"+ (seconds<10?"0"+seconds:seconds);
}
audio.addEventListener("timeupdate",timeUpdateCallback,false);

// On change
timeSlider.addEventListener("change", function(){
  audio.removeEventListener("timeupdate",timeUpdateCallback,false);
  audio.currentTime = timeSlider.sliderValue * audio.duration;
  audio.addEventListener("timeupdate",timeUpdateCallback,false);
});

//Next Button
nextBtn.addEventListener("click",function(){
  playlist.next();
  loadNewTrack(playlist.getActive().src);
});

// On ended
audio.addEventListener("ended",function(){
  playlist.next();
  loadNewTrack(playlist.getActive().src);
});

//Previous button
previousBtn.addEventListener("click",function(){
  playlist.previous();
  loadNewTrack(playlist.getActive().src);
});

/**
 * Loads a new track on the audio elementFromPoint
 * @sourceString The source of the new track
 */
function loadNewTrack(sourceString){
  sourceMP3.src = sourceString;
  audio.load();
  audio.play();
}