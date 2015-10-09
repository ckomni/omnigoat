// Collection of node animation functions that are only run once

// function NodeFunction() {
//   this.config = {
//     delay: 100
//   }
// }

function GroupAnimate(nodes, attribute, value, options) {
  options = options || {}
  interval = options["interval"] || GroupAnimate.config.interval
  var n = 0
  var groupAnim = setInterval(function() {
    if (n >= nodes.length) {
      clearInterval(groupAnim)
    }
    else {
      AnimateStyle(nodes[n], attribute, value, options)
    }
    n++
  }, interval)
}

GroupAnimate.config = { // defaults
  interval: 0,
}
