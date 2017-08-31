'use strict';

(function () {
  var pinsBlock = document.querySelector('.tokyo__pin-map');
  var pinTemplate = document.querySelector('#pin-template').content;
  var fragment = document.createDocumentFragment();

  var i;

  var fillData = function (clonedNode, selector, type, value) {
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
    } else {
      throw new Error('parameter "fill" must be equal to "left", "top" or "src"');
    }
  };

  var renderPin = function (data) {
    var clonedPinTemplate = pinTemplate.cloneNode(true);

    fillData(clonedPinTemplate, '.pin', 'left', data.location.x);
    fillData(clonedPinTemplate, '.pin', 'top', data.location.y);
    fillData(clonedPinTemplate, 'img', 'src', data.author.avatar);

    return clonedPinTemplate;
  };

  window.pin = {
    renderPins: function (data) {
      for (i = 0; i < data.length; i++) {
        fragment.appendChild(renderPin(data[i]));
      }

      pinsBlock.appendChild(fragment);
      window.pin.pinsList = document.querySelectorAll('.pin:not(.pin__main)');
    },

    activatePin: function (pin) {
      for (i = 0; i < window.pin.pinsList.length; i++) {
        if (pin === window.pin.pinsList[i]) {
          window.pin.activePinIndex = i;
          pin.classList.add('pin--active');
        } else {
          window.pin.pinsList[i].classList.remove('pin--active');
        }
      }
    },

    deactivateAllPins: function () {
      for (i = 0; i < window.pin.pinsList.length; i++) {
        window.pin.pinsList[i].classList.remove('pin--active');
      }
    }
  };
}());
