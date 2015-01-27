/**
 * This object represents the playlist that is played in the audio player
 */
var playlist = {
  
  list:[
          {
            name:"War Drums of the Far East",
            artist:"TeknoAxe",
            src:"music/War_Drums_of_the_Far_East.mp3"
          },
          
          {
            name: "Chiptune Does Dubstep",
            artist:"TeknoAxe",
            src: "music/Chiptune_Does_Dubstep.mp3"
          },
          
          {
            name: "Angels Flying Through Hell",
            artist:"TeknoAxe",
            src: "music/Angels_Flying_Through_Hell.mp3"
          }
        ],
  activeTrack: 0,
  next: function() {
    if (this.activeTrack == this.list.length - 1)
      this.activeTrack = 0;
    else
      this.activeTrack +=1;
  },
  previous: function() {
    if (this.activeTrack == 0)
      this.activeTrack = this.list.length - 1;
    else
      this.activeTrack -= 1;
  },
  getActive: function() {
    return this.list[this.activeTrack];
  } 
}