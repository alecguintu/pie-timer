$(document).ready(function() {
  $("#full-pie").pietimer();
  $("#new-timer").pietimer({percent:28, withPercent:false, block:true, size:100, color:'#00C', closerColor:'#39F'});
  $("#other-timer").pietimer({percent:61, color:'#CC6699', closerColor:'#CC99FF'});
  $("#no-closer-timer").pietimer({percent:82, animate:true, withCloser:false, color:'#993333'});
  $("#delay-timer").pietimer({block:true, duration:10000});

  $("#another-timer").pietimer('draw', {percent:35, closerColor:'#C8E1BE', color:'#72B359'});
  $("#another-one-timer").pietimer({percent:73, animate:false, withCloser:false});
  $("#one-more").pietimer('draw', {percent:52, block:true});
});
