$(document).ready(function() {
  $("#full-pie").pietimer();
  $("#new-timer").pietimer({percent:28, withPercent:false, block:true});
  $("#other-timer").pietimer({percent:61, animate:true});
  $("#no-closer-timer").pietimer({percent:82, animate:true, withCloser:false});
  $("#delay-timer").pietimer({block:true, duration:10000});

  $("#another-timer").pietimer('draw', {percent:35});
  $("#another-one-timer").pietimer({percent:73, animate:false, withCloser:false});
  $("#one-more").pietimer('draw', {percent:52, block:true});
});
