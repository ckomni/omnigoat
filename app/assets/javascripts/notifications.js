$(document).ready(function(){
  $(".notification").each(function(index){
    $(this).delay(index*500).slideDown(500).delay(500).fadeTo(100, 1).delay(5000).fadeTo(100, 0).delay(100).slideUp(500);
  });


})
