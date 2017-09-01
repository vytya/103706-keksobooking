'use strict';

(function () {
  var KEY_CODES = {
    escape: 27,
    enter: 13
  };

  var i;

  window.pin.renderPins(window.data);

  var openPinDialog = function (event) {
    window.pin.activatePin(event.currentTarget);
    window.card.openDialog(window.data[window.pin.activePinIndex]);
  };

  var closePinDialog = function () {
    window.pin.deactivateAllPins();
    window.card.closeDialog();
  };

  // Add events listeners at all pins
  for (i = 0; i < window.pin.pinsList.length; i++) {
    window.pin.pinsList[i].addEventListener('click', function (event) {
      openPinDialog(event);
    });
    window.pin.pinsList[i].addEventListener('keydown', function (event) {
      if (event.keyCode === KEY_CODES.enter) {
        openPinDialog(event);
      }
    });
  }

  var closeDialog = document.querySelector('.dialog__close');

  closeDialog.addEventListener('click', function () {
    closePinDialog();
  });

  closeDialog.addEventListener('keydown', function (event) {
    if (event.keyCode === KEY_CODES.enter) {
      closePinDialog();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === KEY_CODES.escape) {
      closePinDialog();
    }
  });
}());
