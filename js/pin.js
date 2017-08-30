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

  // Activate clicked pin & load active info to dialog window
  var activatePin = function (pin) {
    var pinsList = document.querySelectorAll('.pin:not(.pin__main)');

    for (i = 0; i < pinsList.length; i++) {
      pinsList[i].classList.remove('pin--active');

      if (pin === pinsList[i]) {
        window.pin.activePinIndex = i;
      }
    }

    pin.classList.add('pin--active');
  };


  // Close dialog and remove active pin class
  var closePin = function () {
    var pinsList = document.querySelectorAll('.pin:not(.pin__main)');

    for (i = 0; i < pinsList.length; i++) {
      pinsList[i].classList.remove('pin--active');
    }
  };

  window.pin = {
    renderPins: function (data) {
      for (i = 0; i < data.length; i++) {
        fragment.appendChild(renderPin(data[i]));
      }

      pinsBlock.appendChild(fragment);
    },

    open: function (pin) {
      activatePin(pin);
    },

    close: function (event) {
      window.utils.isEscEvent(event, closePin);
      window.utils.isClickEvent(event, closePin);
    }
  };
}());
