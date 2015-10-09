function Notification(node) { // object representing notifications
  this.node = node
  this.show = function() {
    var notification = this.node
    notification.style.display = "block"
    AnimateStyle(notification, "opacity", 1, {time: 1000})
    return this
  }
  this.hide = function() {
    var notification = this.node
    AnimateStyle(notification, "opacity", 0)
    setTimeout(function() {
      notification.style.display = "none"
    }, 500 )
    return this
  }
}

function LoadNotifications(nodes) {
  if (nodes) {
    GroupAnimate(nodes, "opacity", 1, {interval: 500})
    setTimeout(function(){
      GroupAnimate(nodes, "opacity", 0, {interval: 500})
    }, 5000)
  }
}

// $(document).ready(function(){
//   $(".notification").each(function(index){
//     $(this).delay(index*500).slideDown(500).delay(5000).slideUp(500);
//   });
// })
