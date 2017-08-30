'use strict';

(function () {
  var i;

  window.pin.renderPins(window.data);

  var pinsList = document.querySelectorAll('.pin:not(.pin__main)');
  var closeDialog = document.querySelector('.dialog__close');

  var openPinDialog = function (event) {
    window.utils.isEnterEvent(event, function () {
      window.pin.open(event);
      window.card.open(event);
    });
    window.utils.isClickEvent(event, function () {
      window.pin.open(event);
      window.card.open(event);
    });
  };

  var closePinDialog = function (event) {
    window.utils.isEscEvent(event, function () {
      window.pin.close(event);
      window.card.close(event);
    });
    window.utils.isClickEvent(event, function () {
      window.pin.close(event);
      window.card.close(event);
    });
  };

  // Add events listeners at all pins
  for (i = 0; i < pinsList.length; i++) {
    pinsList[i].addEventListener('click', openPinDialog);
    pinsList[i].addEventListener('keydown', openPinDialog);
  }

  var onCloseGlobalEvent = function (event) {
    window.utils.isEscEvent(event, closePinDialog);
  };

  document.addEventListener('keydown', onCloseGlobalEvent);

  closeDialog.addEventListener('click', closePinDialog);
}());
