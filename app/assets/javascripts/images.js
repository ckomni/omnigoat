$(document).ready(function(){
  // use jquery to assign a background-image to divs with a data-image attribute
  $("[data-image]").each(function(index){
    var i = $(this);
    var i_url = i.attr('data-image');
    i.css({"background-image": "url(" + i_url + ")"})
  });

  updateImages();

  $(".panel-background,.image-link").each(function(index){
    var i = $(this);
    var q = Number(i.attr('image_no'));
    var n = Number(i.attr('neighbors'));
    i.css({
      "z-index": q,
      top: (100 * -q) - 100 + "%"
    });
  });

  var animating = false;

  // Image switching function for mouse hovering over panel
  $(".panel").mouseenter(function(){
    $(".panel-background.icon", this).css({transform: "scale(1.2)", opacity: 0.4});
    $(".panel-background", this).each(function(index){
      var i = $(this);
      var n = Number(i.attr('neighbors'));
      // If the panel background has any neighbors, execute image-shuffle code
      if(n > 0) {
        var q = Number(i.attr('image_no'));
        // If the panel background is already in the 0 position, move it to the front and fade it in
        if(q==0) {
          q = n;
          i.attr('image_no', q);
          i.css({"z-index": q, opacity:0}).css({opacity:1});
        }
        else {
          q = q-1;
          i.attr('image_no', q);
          i.css({"z-index": q}).css({opacity:0});
        }
      }
    })
  })

  $(".panel").mouseleave(function(){
    $(".panel-background.icon", this).css({transform: "scale(1)", opacity: 0.2});
    $(".panel-background", this).each(function(index){
      var i = $(this);
    })

  })

})

$(window).resize(function(){
  updateImages();
})

// given an object that has a background image, updates the image
function updateImages() {
  $(".post-banner .image").each(function(index){
    var container = $(this)
    var url = container.attr('data-image');

    image = new Image();
    image.src = url;
    $(image).load(function () {
      var width_ratio = image.width/container.width();
      var height_ratio = image.height/container.height();
      var image_ratio = Math.min(width_ratio, height_ratio);

      //options
      var blurFactor = Math.pow(image_ratio, -1.5)
      var scaleFactor = 1 + 0.2 * (1 - image_ratio)

      if (image_ratio < 1) {
        console.log(container.attr('id') + ' blur: ' + blurFactor.toFixed(2) + 'px; scale: ' + (scaleFactor*100).toFixed(2) + '%');
        container.css({
          filter: "blur(" + blurFactor + "px)",
          "-webkit-filter": "blur(" + blurFactor + "px)",
          transform: "scale(" + scaleFactor + ")"
        })
      }
      else {
        console.log(container.attr('id') + ' blur/scale disabled');
        container.css({
          filter: "blur(0px)",
          "-webkit-filter": "blur(0px)",
          transform: "scale(1)",
        })
      }
    });
  });
}
