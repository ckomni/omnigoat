$(document).ready(function(){
  $(document).mousemove(function(event){
        panImage(event);
  })

  function panImage(event) {
    var percX = event.pageX/window.innerWidth;
    var percY = (event.pageY - window.pageYOffset)/window.innerHeight;
    var cubicX = ((percX*100-50)*2500)/2500 + 50;
    var cubicY = ((percY*100-50)*2500)/2500 + 50;
    $(".post-banner.large .image").css({
      "background-position": cubicX + "% " + cubicY + "%",
      });
  }
})

$(window).resize(function(){updateImages()});

// Function that updates all images in the post banner
function updateImages() {
  $(".post-banner .image").each(function(index){
    var container = $(this);
    var banner = container.parent();
    var url = container.attr('data-image');
    image = new Image();
    image.src = url;

    $(image).load(function () {
      var width_ratio = image.width/container.width();
      var height_ratio = image.height/container.height();
      var image_ratio = Math.min(width_ratio, height_ratio);

      console.log("Width ratio: " + width_ratio.toFixed(2) + "; Height ratio: " + height_ratio.toFixed(2));

      if (width_ratio > height_ratio) {container.css({"background-size": (width_ratio/height_ratio)*100 + 15 + "%"})}

      //options
      var blurFactor = Math.pow(image_ratio, -1.5)
      var scaleFactor = 1 + 0.2 * (1 - image_ratio)

      if (image_ratio < 1) {
        // console.log(container.attr('id') + ' blur: ' + blurFactor.toFixed(2) + 'px; scale: ' + (scaleFactor*100).toFixed(2) + '%');
        container.css({
          filter: "blur(" + blurFactor + "px)",
          "-webkit-filter": "blur(" + blurFactor + "px)",
        })
      }
      else {
        // console.log(container.attr('id') + ' blur/scale disabled');
        container.css({
          filter: "blur(0px)",
          "-webkit-filter": "blur(0px)",
        })
      }
    });
  });
}
