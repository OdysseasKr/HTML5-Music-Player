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

// ================ Add properties and methods to the playlist object
var playlist = {};
// Add tracks in the playlist
playlist.list = trackList;
// The index of the track currently being played
playlist.activeTrack = 0;
// Moves to the next track, loops if reaches end
playlist.next = function() {
    if (this.activeTrack == this.list.length - 1)
      this.activeTrack = 0;
    else
      this.activeTrack +=1;
  };
// Moves to the previous track
playlist.previous = function() {
    if (this.activeTrack == 0)
      this.activeTrack = this.list.length - 1;
    else
      this.activeTrack -= 1;
  };
// Returns the track currently being played
playlist.getActive = function() {
    return this.list[this.activeTrack];
  }

  
// ===================== On load set the default values to the audio element 
sourceMP3.src = playlist.getActive().src;
audio.load();

// On load start show the tracks title,artist etc
audio.addEventListener("loadeddata",function(){
  var filename = playlist.getActive().src;
  
  titleText.textContent = playlist.getActive().name || "Unknown Title";
  albumText.textContent = playlist.getActive().album || "Unknown Album";
  artistText.textContent = playlist.getActive().artist || "Unknown Artist";
});

// ===================== Buttons
// Play Button
playBtn.addEventListener("click",function(){
  if (audio.paused) {
    audio.play();
  }
  else {
    audio.pause();
  }
});

//Next Button
nextBtn.addEventListener("click",function(){
  playlist.next();
  loadNewTrack(playlist.getActive().src);
});

//Previous button
previousBtn.addEventListener("click",function(){
  playlist.previous();
  loadNewTrack(playlist.getActive().src);
});

audio.addEventListener("play",function(){playBtn.firstChild.src = PAUSE_ICON;},false);
audio.addEventListener("pause",function(){playBtn.firstChild.src = PLAY_ICON;},false);

// ======================= Volume Control

// Setup volume slider using sliderfy.js
sliderfy(volumeSlider);
audio.volume = 1;
volumeSlider.addEventListener("change",function(){
  audio.volume = volumeSlider.sliderValue;
});

// ======================= Time Control
// Setup time slider using sliderfy,js
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

// On ended
audio.addEventListener("ended",function(){
  playlist.next();
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