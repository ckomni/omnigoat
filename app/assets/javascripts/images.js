$(document).ready(function(){
  // use jquery to assign a background-image to divs with a data-image attribute
  $("[data-image]").each(function(index){
    var i = $(this);
    var url = i.attr('data-image');
    var q = i.attr('image_no');
    i.css({
      "background-image": "url(" + url + ")",
      "z-index": -q,
      top: -q*100 + "%"
      })
  });

  $(".panel-background,.image-link").each(function(index){
    var i = $(this);
    var q = Number(i.attr('image_no'));
    var n = Number(i.attr('neighbors'));
    i.css({
      "z-index": q,
      top: (100 * -q) - 100 + "%"
    });
  });

  // Image switching function for mouse hovering over post-link panel
  $(".panel").mouseenter(function(){
    $(".panel-background.icon", this).css({transform: "scale(1.2)", opacity: 0.4});
    $("[data-image]", this).each(function(index){
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
    $("[data-image]", this).each(function(index){
      var i = $(this);
    })

  })

  updateImages();

})
