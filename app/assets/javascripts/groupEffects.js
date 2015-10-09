// Collection of funcitons designed to run perpetual animations on a group of nodes

function GroupEffect(name) {
  this.name = name
  this.instances = []
}

GroupEffect.prototype.config = {refresh: 25}
GroupEffect.prototype.calculate = function(){}
GroupEffect.prototype.createInstance = function(nodes, options){
  this.instances.push(new GroupEffectInstance(this, nodes, options))
  newInstance = this.instances[this.instances.length - 1]
  for (o in options) {
    newInstance.config[o] = options[o]
  }
  newInstance.setOptions(options).run()
  return this
}

function GroupEffectInstance(effect, nodes, options) {
  this.effect = effect
  this.target = nodes
  this.status = "active"
  this.config = effect.config
}

GroupEffectInstance.prototype.run = function() {
  if (this.status == "stopped") {
    instances = this.effect.instances
    instances.splice(instances.indexOf(this),1)
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

GroupEffectInstance.prototype.setOptions = function(optionsHash) {
  for (o in optionsHash) {
    this.config[o] = optionsHash[o]
  }
  return this
}

GroupEffectInstance.prototype.remove = function() {
  this.status = "stopped"
}

GroupEffectInstance.prototype.pause = function() {
  if (this.status == "paused") {
    this.status = "active"
  }
  else {
    this.status = "paused"
  }
  return this
}

var sineWave = new GroupEffect("SineWave")
sineWave.config = {
  refresh: 25,
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

var bubbleRotate = new GroupEffect("BubbleRotate")
bubbleRotate.config = {
  refresh: 25,
  offset: 0,
  distance: 0.75,
  loadFactor: 1, // Influence of bubble amount on refresh rate
  speed: 1, // amount of rotation for each refresh (default 1)
  steps: 100, // amount of steps to put between each bubble
}
bubbleRotate.calculate = function(instance) {
  var quantity = instance.target.length
  for (i = 0; i < quantity; i++ ) {
    distance = (Math.min(window.innerWidth, window.innerHeight)/2 * instance.config.distance);
    angle = (2*Math.PI / quantity) * i + instance.config.offset;
    instance.target[i].style.position = "absolute"
    instance.target[i].style.transform = "translate3d(" + (distance * Math.cos(angle) - 50) + "px , " + (distance * Math.sin(angle) - 50) + "px , 0px)"
    instance.target[i].style.boxShadow = (distance/50 * Math.cos(angle)) + 'px ' + (distance/50 * Math.sin(angle)) + 'px ' + (distance/20) + 'px rgba(0,0,0, ' + (100/distance) + ')'
  };
  if(instance.config.offset >= 2*Math.PI) {instance.config.offset=0}
  else {instance.config.offset += ((2*Math.PI)/(quantity * instance.config.steps) * instance.config.speed)};
}

var pulsar = new GroupEffect("Pulsar")
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
