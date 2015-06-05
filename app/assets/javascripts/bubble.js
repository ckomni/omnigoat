var offset = 0;
var paused = false;
var speed = 42

$(document).ready(function(){
  var bubbles = $(".image-bubble")
  setInterval(function() {
    if(!paused) { // only run function if nothing is pausing the animation
      rotate(bubbles, 1000 / bubbles.length)
    }
  }, 5 + bubbles.length * 2 ); // update speed

  /*
  $(".image-bubble").mouseenter(function(){paused = true;}) // Pause the animation when a bubble is hovered over
  $(".image-bubble").mouseleave(function(){paused = false;}) // Resume animation when mouse leaves bubble
  */

})

// takes a collection of document objects and rotation speed, applies CSS to objects to update their circular arrangement
function rotate(elements, divisions) {
  var quantity = elements.length
  elements.each(function(index){
    var i = $(this);
    distance = (Math.min(window.innerWidth, window.innerHeight)/2 * 0.8);
    var angle = (2*Math.PI / quantity) * index + offset;
    i.css({
      left: "calc(" + (distance * Math.cos(angle) - 50) + "px + 50%)",
      top: "calc(" + (distance * Math.sin(angle) - 50) + "px + 50%)",
      'box-shadow': (distance/50 * Math.cos(angle)) + 'px ' + (distance/50 * Math.sin(angle)) + 'px ' + (distance/20) + 'px rgba(0,0,0, ' + (100/distance) + ')'
    });
  });
  if(offset >= 2*Math.PI){offset=0} // Reset offset when full revolution has been made
  else {offset += (2*Math.PI)/(divisions * quantity)}; // increments offset as a fraction of radians by using the speed input
}
