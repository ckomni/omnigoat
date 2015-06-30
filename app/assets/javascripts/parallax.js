$(document).ready(function(){
  $(document).mousemove(function(event){
        handleMouseMove(event);
  })


  function handleMouseMove(event) {
    var percX = event.pageX/window.innerWidth;
    var percY = (event.pageY - window.pageYOffset)/window.innerHeight;
    var cubicX = ((percX*100-50)*2500)/2500 + 50;
    var cubicY = ((percY*100-50)*2500)/2500 + 50;
    console.log("scrollTop: " + window.pageYOffset )
    $(".post-banner.large .image").css({
      "background-position": cubicX + "% " + cubicY + "%",
      });
  }
})
