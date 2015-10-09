function useData(nodes, data, attribute) {
  if (data == "image") {
    for (i = 0; i < nodes.length; i++) {
      nodes[i].style[attribute] = "url(" + nodes[i].dataset[data] + ")"
    }
  }
  else {
    for (i = 0; i < nodes.length; i++) {
      nodes[i].style[attribute] = nodes[i].dataset[data]
    }
  }
  return nodes
}
