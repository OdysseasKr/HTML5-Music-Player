// Global player elements
var audio = document.getElementById("audio");
var sourceMP3 = document.getElementById("sourceMP3");
var timeSlider = document.getElementById("timeBar");
var playBtn = document.getElementById("playBtn");
var volumeSlider = document.getElementById("volumeSlider");
var nextBtn = document.getElementById("nextBtn");
var previousBtn = document.getElementById("previousBtn");
var titleText = document.getElementById("titleText");
var albumText = document.getElementById("albumText");
var artistText = document.getElementById("artistText");
var timeText = document.getElementById("timeText");
var log = document.getElementById("log");

var PLAY_ICON = "icons/32/play-32.png";
var PAUSE_ICON = "icons/32/pause-32.png";

// On load set the default values to the audio element 
sourceMP3.src = playlist.getActive().src;
audio.load();

// On load start
audio.addEventListener("loadeddata",function(){
  var filename = playlist.getActive().src;
  
  titleText.textContent = playlist.getActive().name;
  albumText.textContent = playlist.getActive().album;
  artistText.textContent = playlist.getActive().artist;
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

audio.addEventListener("play",function(){playBtn.firstChild.src = PAUSE_ICON;},false);
audio.addEventListener("pause",function(){playBtn.firstChild.src = PLAY_ICON;},false);

// Setup volume slider using sliderfy.js
sliderfy(volumeSlider);
audio.volume = 1;
volumeSlider.addEventListener("change",function(){
  audio.volume = volumeSlider.sliderValue;
});

sliderfy(timeSlider);
timeText.textContent = "0:00";
// On time update
timeUpdateCallback = function(){
    timeSlider.firstChild.style.width = (audio.currentTime/audio.duration) *timeSlider.offsetWidth + "px";
    var seconds = audio.currentTime;
    var minutes = Math.round(seconds / 60);
    seconds = Math.round(seconds % 60);
    
    timeText.textContent = minutes+":"+ (seconds<10?"0"+seconds:seconds);
    
    log.textContent = "Duration: " + audio.duration + "Current: "+ audio.currentTime;
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