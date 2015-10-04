// An attempt to consolidate all special group effects into a new clean code interface

/*

function Effect(name) {
  this.name = name
  this.config = {refresh: 30}
  this.status = "inactive"
  this.pause = function() { // method for pausing the effect
    if (this.status == "paused") {
      this.status = "active"
    }
    else {
      this.status = "paused"
    }
    console.log(this.name + ": " + this.status)
  }

  this.initialize = function(group, options) {
    if (options) {
      this.setOptions(options)
      console.log(Object.keys(options).length + " default option(s) have been changed")
    }
    var currentEffect = this
    setTimeout(function() {
      if (!(currentEffect.status == "paused")) {
        currentEffect.status = "active"
        currentEffect.calculate(group)
      }
      currentEffect.initialize(group)
    }, (1000 / currentEffect.config.refresh))
  }

  this.setOptions = function(optionsHash) {
    currentEffect = this
    for (o in optionsHash) {
      thisOption = o
      console.log(thisOption + ": " + this.config.o + " -> " + optionsHash[o])
      this.config[o] = optionsHash[o]
      console.log("New value: " + this.config.o)
    }
  }

}

var sineWave = new Effect("SineWave")
sineWave.config = {
  angle: 90,
  refresh: 30,
  offset: 0,
  frequency: 30,
  wavelength: 1,
  amplitude: 10
}
sineWave.calculate = function(group) {
  angle = (sineWave.config.angle / 360) * (2 * Math.PI)
  for (i = 0; i < group.length; i++) {
    yOffset = Math.sin(((sineWave.config.offset*Math.PI)/sineWave.config.frequency + (i/sineWave.config.wavelength))) * sineWave.config.amplitude
    group[i].style.transform = "translate3D(" + yOffset * Math.cos(angle) + "px ," + yOffset * Math.sin(angle) + "px, 0)"
  }
  sineWave.config.offset += 1
  if (sineWave.config.offset >= sineWave.config.frequency * 2) {
    sineWave.config.offset = 0
  }
}

var bubbleRotate = new Effect("BubbleRotate")
bubbleRotate.config = {
    offset: 0,
    distance: 0.8,
    refresh: 30, // FPS of refresh for bubble postions
    loadFactor: 1, // Influence of bubble amount on refresh rate
    speed: 1, // amount of rotation for each refresh (default 1)
    steps: 100, // amount of steps to put between each bubble
}
bubbleRotate.calculate = function(group) {
  var quantity = group.length
  for (i = 0; i < quantity; i++ ) {
    //var i = $(this);
    distance = (Math.min(window.innerWidth, window.innerHeight)/2 * bubbleRotate.config.distance);
    angle = (2*Math.PI / quantity) * i + bubbleRotate.config.offset;
    group[i].style.position = "absolute"
    group[i].style.transform = "translate3d(" + (distance * Math.cos(angle) - 50) + "px , " + (distance * Math.sin(angle) - 50) + "px , 0px)"
    group[i].style.boxShadow = (distance/50 * Math.cos(angle)) + 'px ' + (distance/50 * Math.sin(angle)) + 'px ' + (distance/20) + 'px rgba(0,0,0, ' + (100/distance) + ')'
  };
  if(bubbleRotate.config.offset >= 2*Math.PI) {bubbleRotate.config.offset=0}
  else {bubbleRotate.config.offset += ((2*Math.PI)/(quantity * bubbleRotate.config.steps) * bubbleRotate.config.speed)};
}

var pulsar = new Effect("Pulsar")

*/
