'use strict';

(function () {
  var i;

  // Pins events
  var pinsList = document.querySelectorAll('.pin:not(.pin__main)');

  // Activate clicked pin & load active info to dialog window
  var activatePin = function (pin) {
    for (i = 0; i < pinsList.length; i++) {
      pinsList[i].classList.remove('pin--active');
    }

    pin.classList.add('pin--active');
  };

  // Close dialog and remove active pin class
  var closePin = function () {
    for (i = 0; i < pinsList.length; i++) {
      pinsList[i].classList.remove('pin--active');
    }
  };

  window.pin = {
    open: function (event) {
      window.utils.isEnterEvent(event, function () {
        activatePin(event.currentTarget);
      });
      window.utils.isClickEvent(event, function () {
        activatePin(event.currentTarget);
      });
    },

    close: function (event) {
      window.utils.isEscEvent(event, closePin);
      window.utils.isClickEvent(event, closePin);
    }
  };
}());
