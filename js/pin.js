'use strict';

(function () {
  var pinsBlock = document.querySelector('.tokyo__pin-map');
  var pinTemplate = document.querySelector('#pin-template').content;
  var fragment = document.createDocumentFragment();

  var i;

  var renderPin = function (data) {
    var clonedPinTemplate = pinTemplate.cloneNode(true);

    window.utils.fillData(clonedPinTemplate, '.pin', 'left', data.location.x);
    window.utils.fillData(clonedPinTemplate, '.pin', 'top', data.location.y);
    window.utils.fillData(clonedPinTemplate, 'img', 'src', data.author.avatar);

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
