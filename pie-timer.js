/*
* Pie Timer
*
* A simple pie display/timer
*
* Credit goes to http://atomicnoggin.ca/blog/2010/02/20/pure-css3-pie-charts/
* and for initial code from http://blakek.us/css3-pie-graph-timer-with-jquery/
* and I expanded and made into a jQuery plugin
*
* Author: Alec Guintu
* and to those the code originated from.
*
* v1.0
*************************************************************************/
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
        duration: 5000,
        withPercent: true,
        withCloser: true,
        animate: true,
        block: false
      }

      if (settings) { $.extend(options, settings); }

      return this.each(function() {
        var elem = $(this);

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

      $(this).empty();

      if (options.withPercent) {
        $(this).append('<div class="percent">'+ Math.round(options.percent) +'%</div>');
      }

      if (options.withCloser) {
        $(this).append('<div class="closer"></div>');
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

      if (options.block) {
        $(this).addClass('fill');
      }

      $(this).append(elem);
    },

    play: function(options) {
      $(this).data('tseconds', options.duration);
      $(this).data('tfinish', new Date().getTime() + options.duration);
      $(this).data('uPercent', options.percent);

      var timer = setInterval(function() {
        var seconds = ($(this).data('tfinish') - new Date().getTime());

        if (seconds <= 0) {
          options.percent = $(this).data('uPercent');
          $(this).pietimer('draw', options);

          clearInterval($(this).data('timer'));
        } else {
          options.percent = $(this).data('uPercent') - ((seconds / $(this).data('tseconds')) * $(this).data('uPercent'));

          $(this).pietimer('draw', options);
        }
      }.bind(this), 50);

      $(this).data('timer', timer);
    },

    stop: function() {
      console.log('stopping');
    },
  };

})(jQuery);

