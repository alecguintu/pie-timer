$(document).ready(function() {
  $("#full-pie").pietimer({block:true});
  $("#new-timer").pietimer({percent:35, withPercent:false, block:true});
  $("#delay-timer").pietimer({block:true, duration:10000});
  $("#other-timer").pietimer({percent:65, animate:true});
  $("#another-timer").pietimer('draw', {percent:35});
  $("#another-one-timer").pietimer({percent:73, animate:false, withCloser:false});
});
