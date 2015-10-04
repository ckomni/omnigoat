var useAttribute = { //
  color: function(elements) {
    elements.each(function(){
      var i = $(this);
      var color = i.attr('data-color');
      i.css({"background-color": color})
    });
  },
  image: function(elements) {
    elements.each(function(){
      var i = $(this);
      var url = i.attr('data-image');
      var q = i.attr('image_no');
      console.log("attaching: " + url);
      i.css({
        "background-image": "url(" + url + ")",
        })
    });
  },

}

$(document).ready(function(){
  useAttribute.image($("[data-image]"));
  useAttribute.color($("[data-color]"));

})
