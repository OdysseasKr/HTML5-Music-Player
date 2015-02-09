/**
 * This object represents the playlist that is played in the audio player
 */
var playlist = {
  
  // The list containing the tracks
  list:[
          {
            name:"War Drums of the Far East",
            artist:"TeknoAxe",
            album:"Nice Album",
            src:"music/War_Drums_of_the_Far_East.mp3"
          },
          
          {
            name: "Chiptune Does Dubstep",
            artist:"TeknoAxe",
            album:"Great Album",
            src: "music/Chiptune_Does_Dubstep.mp3"
          },
          
          {
            name: "Angels Flying Through Hell",
            artist:"TeknoAxe",
            album:"Splendid Album",
            src: "music/Angels_Flying_Through_Hell.mp3"
          }
        ],
        
  // The index of the track currently being played
  activeTrack: 0,
  
  // Moves to the next track, loops if reaches end
  next: function() {
    if (this.activeTrack == this.list.length - 1)
      this.activeTrack = 0;
    else
      this.activeTrack +=1;
  },
  
  // Moves to the previous track
  previous: function() {
    if (this.activeTrack == 0)
      this.activeTrack = this.list.length - 1;
    else
      this.activeTrack -= 1;
  },
  
  // Returns the track currently being played
  getActive: function() {
    return this.list[this.activeTrack];
  } 
}