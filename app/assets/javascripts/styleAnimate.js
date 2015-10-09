function AnimateStyle(node, attribute, endValue, options) { // given a node, attribute and end value, animate the style using defaults or an options hash
  var config = {
    function: "ease",
    time: 500,
    delay: 0,
  }
  for (o in options) {
    config[o] = options[o]
  }
  var storeTransition = node.style.transition
  node.style.transition = attribute + " " + config.time/1000 + "s " + config.delay/1000 + "s " + config.function
  node.style[attribute] = endValue
  setTimeout(function(){
    node.style.transition = storeTransition
  }, config.time)
  // return node
}

// TO-DO allow function to handle hashes of attributes and animate them all appropriately
