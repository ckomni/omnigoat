$(document).ready(function(){
  $(".notification").each(function(index){
    $(this).delay(index*500).slideDown(500).delay(5000).slideUp(500);
  });


})
