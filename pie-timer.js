/*
* Pie Timer
*
* A simple pie display/timer
*
* Proper credit goes to both
* http://atomicnoggin.ca/blog/2010/02/20/pure-css3-pie-charts/ and
* http://blakek.us/css3-pie-graph-timer-with-jquery/
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
        color: '#888',
        duration: 5000,
        withPercent: true,
        withCloser: true,
        closerColor: '#DDD',
        animate: true,
        block: false,
        size: 150
      };

      if (settings) { $.extend(options, settings); }

      return this.each(function() {

        if (options.animate) {
          $(this).pietimer('play', options);
        } else {
          $(this).pietimer('draw', options);
        }
      });
    },

    draw: function(settings) {
      var options = {
        percent: 100,
        color: '#888',
        withPercent: true,
        withCloser: true,
        closerColor: '#DDD',
        block: false,
        size: 150
      };
      if (settings) { $.extend(options, settings); }

      $(this).empty();
      $(this).css('font-size', options.size+'px');

      if (options.withPercent) {
        $(this).append('<div class="percent">'+ Math.round(options.percent) +'%</div>');
      }

      if (options.withCloser) {
        $(this).append('<div class="closer"></div>');
      }

      var elem = $('<div class="slice"><div class="pie"></div></div>');

      if (options.percent > 50) {
        elem.addClass('gt50');
        elem.append('<div class="pie fill"></div>');
      }

      var deg = 360 / 100 * options.percent;
      elem.children('.pie').css({
        '-moz-transform': 'rotate('+deg+'deg)',
        '-webkit-transform': 'rotate('+deg+'deg)',
        '-o-transform': 'rotate('+deg+'deg)',
        msTransform: 'rotate('+deg+'deg)',
        'transform': 'rotate('+deg+'deg)'
      });

      if (options.block) {
        $(this).addClass('fill');

        elem.children('.pie').css('background-color', options.color);
        $(this).find('.closer').css('background-color', options.closerColor);
      } else {
        elem.children('.pie').css('border-color', options.color);
        $(this).find('.closer').css('border-color', options.closerColor);
      }

      $(this).append(elem);
    },

    play: function(options) {
      var tseconds = options.duration;
      var tfinish = new Date().getTime() + options.duration;
      var upercent = options.percent;

      var timer = setInterval(function() {
        var seconds = (tfinish - new Date().getTime());

        if (seconds <= 0) {
          options.percent = upercent;
          $(this).pietimer('draw', options);

          clearInterval(timer);
        } else {
          options.percent = upercent - ((seconds / tseconds) * upercent);

          $(this).pietimer('draw', options);
        }
      }.bind(this), 50);
    },

    stop: function() {
      console.log('stopping');
    },
  };

})(jQuery);

if (typeof Function.prototype.bind != 'function') {
  Function.prototype.bind = function (bind) {
    var self = this;
    return function () {
      var args = Array.prototype.slice.call(arguments);
      return self.apply(bind || null, args);
    };
  };
}
