// Improved Group Effects program that allows individual instances of effects

function Effect(name) {
  this.name = name
  this.instances = []
  this.config = {refresh: 5}

  this.createInstance = function(group, options) { // Creates an instance of the effect on the specified group of objects
    this.instances[this.instances.length] = new EffectInstance(this, group, options)
    console.log(this.instances[this.instances.length-1])
    this.instances[this.instances.length-1].setOptions(options).run()
    return this
  }

  // this.calculate = function () {
  //   return this
  // }

}

function EffectInstance(effect, group, options) {
  console.log(effect)
  this.effect = effect
  this.target = group
  this.status = "active"

  this.config = effect.config
  for (o in options) {
    this.config[o] = o[o]
    console.log(this.config[o])
  }

  this.pause = function() { // method for pausing the effect
    if (this.status == "paused") {
      this.status = "active"
    }
    else {
      this.status = "paused"
    }
    console.log(this.name + ": " + this.status)
  }

  this.run = function() {
    if (this.status == "stopped") {
      effect = instance.effect
      effect.instances[effect.instances.indexOf(instance)]
    }
    else {
      var thisInstance = this
      setTimeout(function() {
        if (!(thisInstance.status == "paused")) {
          thisInstance.effect.calculate(thisInstance)
        }
        thisInstance.run()

      }, (1000 / thisInstance.config.refresh))

    }
  }

  this.setOptions = function(optionsHash) { // changes the config of the instance, then returns the instance
    for (o in optionsHash) {
      this.config[o] = optionsHash[o]
    }
    return this
  }


}

var sineWave = new Effect("SineWave")
sineWave.config = {
  refresh: 30,
  angle: 90,
  offset: 0,
  frequency: 30,
  wavelength: 1,
  amplitude: 10 // amplitude of wave in pixels
}
sineWave.calculate = function(instance) {
  angle = (instance.config.angle / 360) * (2 * Math.PI)
  for (i = 0; i < instance.target.length; i++) {
    yOffset = Math.sin(((instance.config.offset*Math.PI)/instance.config.frequency + (i/instance.config.wavelength))) * instance.config.amplitude
    instance.target[i].style.transform = "translate3D(" + yOffset * Math.cos(angle) + "px ," + yOffset * Math.sin(angle) + "px, 0)"
  }
  instance.config.offset += 1
  if (instance.config.offset >= instance.config.frequency * 2) {
    instance.config.offset = 0
  }
}

var bubbleRotate = new Effect("BubbleRotate")
bubbleRotate.config = {
  refresh: 30,
  offset: 0,
  distance: 0.8,
  loadFactor: 1, // Influence of bubble amount on refresh rate
  speed: 1, // amount of rotation for each refresh (default 1)
  steps: 100, // amount of steps to put between each bubble
}
bubbleRotate.calculate = function(instance) {
  var quantity = instance.target.length
  for (i = 0; i < quantity; i++ ) {
    //var i = $(this);
    distance = (Math.min(window.innerWidth, window.innerHeight)/2 * instance.config.distance);
    angle = (2*Math.PI / quantity) * i + instance.config.offset;
    instance.target[i].style.position = "absolute"
    instance.target[i].style.transform = "translate3d(" + (distance * Math.cos(angle) - 50) + "px , " + (distance * Math.sin(angle) - 50) + "px , 0px)"
    instance.target[i].style.boxShadow = (distance/50 * Math.cos(angle)) + 'px ' + (distance/50 * Math.sin(angle)) + 'px ' + (distance/20) + 'px rgba(0,0,0, ' + (100/distance) + ')'
  };
  if(instance.config.offset >= 2*Math.PI) {instance.config.offset=0}
  else {instance.config.offset += ((2*Math.PI)/(quantity * instance.config.steps) * instance.config.speed)};
}

var pulsar = new Effect("Pulsar")
pulsar.config = {
  offset: 0,
  frequency: 30,
  wavelength: 1,
  amplitude: 0.2
}
pulsar.calculate = function(instance) {
  for (i = 0; i < instance.target.length; i++) {
    yOffset = Math.sin(((instance.config.offset*Math.PI)/instance.config.frequency + (i/instance.config.wavelength))) * instance.config.amplitude + 1
    instance.target[i].style.transform = "scale(" + yOffset + ")"
  }
  instance.config.offset += 1
  if (instance.config.offset >= instance.config.frequency * 2) {
    instance.config.offset = 0
  }
}
