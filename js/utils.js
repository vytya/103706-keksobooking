'use strict';

(function () {
  var KEY_CODES = {
    escape: 27,
    enter: 13
  };

  window.utils = {
    isClickEvent: function (event, action) {
      if (event.type === 'click') {
        action(event);
      }
    },

    isEscEvent: function (event, action) {
      if (event.keyCode === KEY_CODES.escape) {
        action(event);
      }
    },

    isEnterEvent: function (event, action) {
      if (event.keyCode === KEY_CODES.enter) {
        action(event);
      }
    },

    fillData: function (clonedNode, selector, type, value) {
      var marker = {
        'width': 56,
        'height': 75
      };

      if (type === 'left') {
        clonedNode.querySelector(selector).style.left = value - marker.width / 2 + 'px';
      } else if (type === 'top') {
        clonedNode.querySelector(selector).style.top = value - marker.height + 'px';
      } else if (type === 'src') {
        clonedNode.querySelector(selector).src = value;
      } else if (type === 'html') {
        clonedNode.querySelector(selector).innerHTML = value;
      } else {
        throw new Error('parameter "fill" must be equal to "left", "top", "src" or "html"');
      }
    }
  };
}());
