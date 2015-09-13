var panelShuffler = {
  config: {
    minWait: 5000,
    maxWait: 7500,
    speed: 1000,
  },

  init: function(){
    $(".panel-background").each(function(){
      i = $(this)
      q = i.attr("image_no")
      i.css({
        "z-index": q,
        top: q * -100 - 100 + "%"
      })
    })
  },
  initiate: function(){
    allPanels = $(".panel[shuffle]")
    options = allPanels.length
    thisPanel = allPanels[Math.floor(Math.random()*options)];
    panelShuffler.shuffle(thisPanel);
    setTimeout(panelShuffler.initiate, panelShuffler.config.minWait + Math.random()*(panelShuffler.config.maxWait - panelShuffler.config.minWait))
  },
  shuffle: function(panel){ // function that shuffles the background images in a panel
    $(".panel-background", panel).each(function(index){
      var i = $(this);
      var n = Number(i.attr('neighbors'));
      // If the panel background has any neighbors, execute image-shuffle code
      if(n > 0) {
        var q = Number(i.attr('image_no'));
        // If the panel background is already in the 0 position, move it to the front and fade it in
        if(q==0) {
          q = n;
          i.attr('image_no', q);
          // i.css({"z-index": q, opacity:0}).css({opacity:1});
          i.css({"z-index": q}).fadeTo(panelShuffler.config.speed, 1);
        }
        else {
          q = q-1;
          i.attr('image_no', q);
          i.css({"z-index": q}).delay(panelShuffler.config.speed).fadeTo(0,0);
        }
      }
    })
  },
  arrange: function(elements) {

  }
}
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

  panelShuffler.init();
  panelShuffler.initiate();

  // setInterval(function() {
  //   allPanels = $(".panel[shuffle]")
  //   thisPanel = allPanels[Math.floor(Math.random()*allPanels.length)];
  //   panelShuffler.shuffle(thisPanel);
  //
  // }, 5000)

  // Image switching function for mouse hovering over post-link panel
  $(".panel").mouseenter(function(){
    $(".panel-background.icon", this).css({transform: "scale(1.2)", opacity: 0.4});
  })

  $(".panel").mouseleave(function(){
    $(".panel-background.icon", this).css({transform: "scale(1)", opacity: 0.2});
  })

})
