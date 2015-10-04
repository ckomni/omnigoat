var panImage = {
  config: {},
  mousetrack: function(element, event) {
    var percX = event.pageX/window.innerWidth;
    var percY = (event.pageY - window.pageYOffset)/window.innerHeight;
    var cubicX = ((percX*100-50)*2500)/2500 + 50;
    var cubicY = ((percY*100-50)*2500)/2500 + 50;
    element.css({
      "background-position": cubicX + "% " + cubicY + "%",
      })
  },
  resize: function(elements) {
    elements.each(function(index){
      var container = $(this);
      var banner = container.parent();
      var url = container.attr('data-image');
      image = new Image();
      image.src = url;

      $(image).load(function () {
        var width_ratio = image.width/container.width();
        var height_ratio = image.height/container.height();
        var image_ratio = Math.min(width_ratio, height_ratio);
        if (width_ratio > height_ratio) {container.css({"background-size": (width_ratio/height_ratio)*100 + 15 + "%"})}
      });
    });
  },
}

$(document).ready(function(){
  var bannerImages = $(".post-background .image");
  //panImage.resize(bannerImages);
  //$(window).resize(function(){panImage.resize(bannerImages)});
  // $(document).mousemove(function(event){
  //     panImage.mousetrack(bannerImages, event);
  // })

})
