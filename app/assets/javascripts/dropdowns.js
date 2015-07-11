var target = null;
var hover = null;
var animationSpeed = 0;
$(document).ready(function(){
  $("[data-dropdown]").mouseenter(function(){
    oldHover = hover;
    hover = $(this);
    if(target) {
      oldTarget = target;
      target = hover.data("dropdown");
      if(oldTarget != target) {
        $("#" + oldTarget).fadeOut(0).data({"open": "false"});
        oldHover.removeAttr("active");
        $("#" + target).fadeIn(0).data({"open": "true"});
        hover.attr("active", "");
      }
    }
    else {
      target = hover.data("dropdown");
      $("#" + target).fadeIn(animationSpeed).data({"open": "true"});
      hover.attr("active", "");
    }
  })
  $(".navbar").mouseleave(function(){
    $("#" + target).fadeOut(animationSpeed).data({"open": "false"});
    if(hover) {hover.removeAttr("active")};
    target = null;
  })
})
