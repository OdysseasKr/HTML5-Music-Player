// Global player elements
var audioElement = document.getElementById("audio");
var sourceElement = document.getElementById("source");
var canvasElement = document.getElementById("timeBar");
var playButtonElement = document.getElementById("playBtn");
var volumeSliderElement = document.getElementById("volumeSlider");
var nextButtonElement = document.getElementById("nextBtn");
var previousButtonElement = document.getElementById("previousBtn");

// On load set the default values to the audio element 
sourceElement.src = playlist.getActive().src;
audioElement.load();

// Play Button
playButtonElement.addEventListener("click",function(){
  if (audioElement.paused)
    audioElement.play();
  else 
    audioElement.pause();
});

// Setup volume slider using sliderfy.js
sliderfy(volumeSliderElement);
audioElement.volume = 1;
volumeSliderElement.addEventListener("change",function(){
  audioElement.volume = volumeSliderElement.sliderValue;
});


//Next Button
nextButtonElement.addEventListener("click",function(){
  playlist.next();
  loadNewTrack(playlist.getActive().src);
});

// On ended
audioElement.addEventListener("ended",function(){
  playlist.next();
  loadNewTrack(playlist.getActive().src);
});

//Previous button
previousButtonElement.addEventListener("click",function(){
  playlist.previous();
  loadNewTrack(playlist.getActive().src);
});

// Canvas Click
canvasElement.addEventListener("mousedown",function(event){
  var x = event.pageX;
  x -= canvasElement.offsetLeft;
  audioElement.currentTime = (x / canvasElement.width) * audioElement.duration; 
});

/**
 * Loads a new track on the audio elementFromPoint
 * @sourceString The source of the new track
 */
function loadNewTrack(sourceString){
  sourceElement.src = sourceString;
  audioElement.load();
  audioElement.play();
}