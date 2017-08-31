'use strict';

(function () {
  var i;

  window.pin.renderPins(window.data);

  var closeDialog = document.querySelector('.dialog__close');

  var openPinDialog = function (event) {
    window.utils.isEnterEvent(event, function () {
      window.pin.activatePin(event.currentTarget);
      window.card.openDialog(window.pin.activePinIndex);
    });
    window.utils.isClickEvent(event, function () {
      window.pin.activatePin(event.currentTarget);
      window.card.openDialog(window.pin.activePinIndex);
    });
  };

  var closePinDialog = function (event) {
    window.utils.isEscEvent(event, function () {
      window.pin.deactivateAllPins();
      window.card.closeDialog();
    });
    window.utils.isClickEvent(event, function () {
      window.pin.deactivateAllPins();
      window.card.closeDialog();
    });
  };

  var closePinDialogGlobal = function (event) {
    window.utils.isEscEvent(event, closePinDialog);
  };

  // Add events listeners at all pins
  for (i = 0; i < window.pin.pinsList.length; i++) {
    window.pin.pinsList[i].addEventListener('click', function (event) {
      openPinDialog(event);
    });
    window.pin.pinsList[i].addEventListener('keydown', function (event) {
      openPinDialog(event);
    });
  }

  closeDialog.addEventListener('click', closePinDialog);
  document.addEventListener('keydown', closePinDialogGlobal);
}());
