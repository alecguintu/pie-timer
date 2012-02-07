(function($) {

  $.fn.pietimer = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);

    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.tooltip');
    }  
  };

  var methods = {
    init: function(settings) {
      var options = {
        percent: 100,
        time: 5000,
        withPercent: true,
        withCloser: true,
        animate: true,
        block: false
      }

      if (settings) { $.extend(options, settings); }

      return this.each(function() {
        var elem = $(this);
        elem.pietimer('draw', options);

        if (options.animate) {
          elem.pietimer('play', options);
        } else {
          elem.pietimer('draw', options);
        }
      });
    },

    // options [HASH] percent, withPercent, withCloser, block
    draw: function(settings) {
      var options = {
        percent: 100,
        withPercent: true,
        withCloser: true,
        block: false
      }
      if (settings) { $.extend(options, settings); }

      if (options.withPercent) {
        $(this).append('<div class="percent">'+ Math.round(options.percent) +'%</div>');
      }

      if (options.withCloser) {
        $(this).append('<div class="closer"></div><div class="closer filler"></div>');
      }

      var elem = $('<div class="slice"><div class="pie"></div></div>');

      if (options.percent > 50) {
        elem.addClass('gt50');
        elem.append('<div class="pie fill"></div>')
      }

      var deg = 360 / 100 * options.percent;
      elem.children('.pie').css({
        '-moz-transform':'rotate('+deg+'deg)',
        '-webkit-transform':'rotate('+deg+'deg)',
        '-o-transform':'rotate('+deg+'deg)',
        'transform':'rotate('+deg+'deg)'
      });

      $(this).append(elem);

      if (options.block) {
        $(this).addClass('fill');
      }
    },

    // options [HASH] percent, withPercent, withCloser, block
    play: function(options) {
      $(this).data('tseconds', options.time);
      $(this).data('tfinish', new Date().getTime() + options.time);
      $(this).data('uPercent', options.percent);

      e = $(this);
      var timer = setInterval(function() {
        var seconds = (e.data('tfinish') - new Date().getTime());

        if (seconds <= 0) {
          options.percent = 100
          e.pietimer('draw', options);

          clearInterval(e.data('timer'));
        } else {
          options.percent = 100 - ((seconds / e.data('tseconds')) * 100);

          e.pietimer('draw', options);
        }
      }, 50);

      $(this).data('timer', timer);
    },

    stop: function() {
      console.log('stopping');
    },
  };

})(jQuery);


$(document).ready(function() {
  $("#new-timer").pietimer({percent:55, withPercent:false, block:true});
  $("#other-timer").pietimer({percent:65, animate:false});
  $("#another-timer").pietimer({percent:35, animate:false});
  $("#another-one-timer").pietimer({percent:73, animate:false, withCloser:false});
});

