var dropDown = {
  target: null,
  hover: null,
  speed: 0,
}

// var target = null;
// var hover = null;
// var animationSpeed = 0;
$(document).ready(function(){
  $("[data-dropdown]").mouseenter(function(){
    oldHover = dropDown.hover;
    dropDown.hover = $(this);
    if(dropDown.target) {
      oldTarget = dropDown.target;
      dropDown.target = dropDown.hover.data("dropdown");
      if(oldTarget != dropDown.target) {
        $("#" + oldTarget).fadeOut(0).data({"open": "false"});
        oldHover.removeAttr("active");
        $("#" + dropDown.target).fadeIn(0).data({"open": "true"});
        dropDown.hover.attr("active", "");
      }
    }
    else {
      dropDown.target = dropDown.hover.data("dropdown");
      $("#" + dropDown.target).fadeIn(dropDown.speed).data({"open": "true"});
      dropDown.hover.attr("active", "");
    }
  })
  $(".navbar").mouseleave(function(){
    $("#" + dropDown.target).fadeOut(dropDown.speed).data({"open": "false"});
    if(dropDown.hover) {dropDown.hover.removeAttr("active")};
    dropDown.target = null;
  })
})
