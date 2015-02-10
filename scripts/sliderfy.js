function sliderfy(sliderEl) {
    var filler = sliderEl.lastChild;
    var handle = filler.lastChild;
    var handleWidth = handle?handle.offsetWidth:0;
    var container = sliderEl.getBoundingClientRect();
    var fullWidth = sliderEl.offsetWidth;
    var active = false;
    
    // Create event to dispatch when value is changed
    var changedEvent;
    try {
        changedEvent = new Event("change");
    } 
    catch(e) {
        changedEvent = document.createEvent('Event');
        changedEvent.initEvent('change', true, true);   
    }
    sliderEl.sliderValue = filler.offsetWidth / fullWidth;
    
    // Called when changing the value of slider
    var mouseMoveCallback = function(e){
        posX = e.pageX || e.clientX;
        posY = e.pageY || e.clientY;
        
        // Change the width of the sliding div if not outside of bounds
        if (posX > container.right) 
            filler.style.width = fullWidth + "px";
        else if (posX < container.left)
            filler.style.width = handleWidth + "px";
        else
            filler.style.width = posX - container.left + handleWidth/2 + "px";
        
        
        sliderEl.sliderValue = (filler.offsetWidth - handleWidth) / (fullWidth-handleWidth);
        sliderEl.dispatchEvent(changedEvent);
    }
    
    // Add mousedown listener for the slider
    sliderEl.addEventListener("mousedown",function(e){
        active = true;
        // Stop the default lement dragging from happening
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        // Change the value of the slider according to mouse click
        var realPos = (e.pageX || e.clientX) - container.left;
        filler.style.width = realPos + handleWidth/2 + "px";
        // Add listener for mouse move
        window.addEventListener("mousemove",mouseMoveCallback,false);
    });
    
    // Add mouseup listener for the slider
    window.addEventListener("mouseup",function(){
        if (active) {
          done();
          active = false;
        }
    },false);
    
    // Run this when action is finished
    function done() {
        window.removeEventListener("mousemove",mouseMoveCallback,false);
        sliderEl.sliderValue = (filler.offsetWidth - handleWidth) / (fullWidth-handleWidth);
        sliderEl.dispatchEvent(changedEvent);
    }
}