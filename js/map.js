'use strict';

(function () {
  var i;

  window.pin.renderPins(window.data);

  var closeDialog = document.querySelector('.dialog__close');

  var openPinDialog = function (event, pin) {
    window.utils.isEnterEvent(event, function () {
      window.pin.activatePin(pin);
      window.card.open(pin);
    });
    window.utils.isClickEvent(event, function () {
      window.pin.activatePin(pin);
      window.card.open(pin);
    });
  };

  var closePinDialog = function (event) {
    window.utils.isEscEvent(event, function () {
      window.pin.deactivateAllPins();
      window.card.close(event);
    });
    window.utils.isClickEvent(event, function () {
      window.pin.deactivateAllPins();
      window.card.close(event);
    });
  };

  // Add events listeners at all pins
  for (i = 0; i < window.pin.pinsList.length; i++) {
    window.pin.pinsList[i].addEventListener('click', function (event) {
      openPinDialog(event, event.currentTarget);
    });
    window.pin.pinsList[i].addEventListener('keydown', function (event) {
      openPinDialog(event, event.currentTarget);
    });
  }

  var onCloseGlobalEvent = function (event) {
    window.utils.isEscEvent(event, closePinDialog);
  };

  document.addEventListener('keydown', onCloseGlobalEvent);

  closeDialog.addEventListener('click', closePinDialog);
}());
