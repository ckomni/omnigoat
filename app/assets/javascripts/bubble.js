var splashBubble = {

  config: {
    offset: 0,
    distance: 0.8,
    refresh: 30, // FPS of refresh for bubble postions
    loadFactor: 1, // Influence of bubble amount on refresh rate
    speed: 1, // amount of rotation for each refresh (default 1)
    steps: 100, // amount of steps to put between each bubble
  },

  pause: function() { // stop
    splashBubble.paused = !splashBubble.paused
  },

  rotate: function(elements) {
    var quantity = elements.length
    elements.each(function(index){
      var i = $(this);
      distance = (Math.min(window.innerWidth, window.innerHeight)/2 * splashBubble.config.distance);
      var angle = (2*Math.PI / quantity) * index + splashBubble.config.offset;
      i.css({
        'transform': "translate3d(" + (distance * Math.cos(angle) - 50) + "px , " + (distance * Math.sin(angle) - 50) + "px , 0px)",
        'box-shadow': (distance/50 * Math.cos(angle)) + 'px ' + (distance/50 * Math.sin(angle)) + 'px ' + (distance/20) + 'px rgba(0,0,0, ' + (100/distance) + ')'
      });
    });
    if(splashBubble.config.offset >= 2*Math.PI) {splashBubble.config.offset=0}
    else {splashBubble.config.offset += ((2*Math.PI)/(quantity * splashBubble.config.steps) * splashBubble.config.speed)};
  },

  init: function () {
    splashBubble.bubbles = $(".image-bubble");
  }
}

$(document).ready(function(){
  splashBubble.init();
  setInterval(function() {
    if(!splashBubble.paused) { // only run function if nothing is pausing the animation
      splashBubble.rotate(splashBubble.bubbles, 1000 / splashBubble.bubbles.length)
    }
  }, (1000 / splashBubble.config.refresh) );

})
