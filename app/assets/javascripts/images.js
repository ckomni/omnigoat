function useData(nodes, data, attribute) { //loads the image stored in data-image. If the background is going to stretch to cover the node, then apply a blur
  if (data == "image") {
    for (i = 0; i < nodes.length; i++) {
        nodes[i].style[attribute] = "url(" + nodes[i].dataset[data] + ")"
    }
    limitImages(nodes)
  }
  else {
    for (i = 0; i < nodes.length; i++) {
      nodes[i].style[attribute] = nodes[i].dataset[data]
    }
  }
  return nodes
}

function limitImages(nodes) { // given a set of nodes, make sure that none of the contained images are above native resolution using limitImage
  for (i = 0; i < nodes.length; i++) {
    if (nodes[i] instanceof HTMLElement) {
      (function() {
        var node = nodes[i]
        var image = new Image()
        image.src = node.dataset["image"]
        image.addEventListener("load", function(){
          limitImage(image, node)
        })
      })()
    }
  }
}

function limitImage(image, node ) { // if the native resolution of the image is too small for the node to CONTAIN, then limit its size to 100%
  var bgSize = window.getComputedStyle(node,null).getPropertyValue("background-size")
  var width_ratio = image.width/node.offsetWidth;
  var height_ratio = image.height/node.offsetHeight;
  if (bgSize == 'cover' || bgSize == 'fixed') {
    var image_ratio = Math.min(width_ratio, height_ratio);
    if (image_ratio < 1) {
      factor = (1 - image_ratio)
      node.style.filter = "blur(" + factor * 10 + "px)"
      node.style.webkitFilter = "blur(" + factor * 10 + "px)"
      node.style.transform = "scale(" + 1.05 + ")"
    } else {
      node.style.filter = ""
      node.style.webkitFilter = ""
      node.style.transform = ""
    }
  } else if (bgSize == 'contain') {
    var image_ratio = Math.max(width_ratio, height_ratio)
    if (image_ratio < 1) {
      node.style.backgroundSize = "initial"
      // console.log("computed node size: " + node.offsetWidth + " x " + node.offsetHeight)
    } else {
      node.style.backgroundSize = "contain"
    }
  }

}
