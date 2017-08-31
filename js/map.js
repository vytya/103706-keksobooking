'use strict';

(function () {
  var KEY_CODES = {
    escape: 27,
    enter: 13
  };

  var i;

  window.pin.renderPins(window.data);

  var openPinDialog = function (event) {
    if (event.type === 'click' || event.keyCode === KEY_CODES.enter) {
      window.pin.activatePin(event.currentTarget);
      window.card.openDialog(window.data[window.pin.activePinIndex]);
    }
  };

  var closePinDialog = function (event) {
    if (event.type === 'click' || event.keyCode === KEY_CODES.escape) {
      window.pin.deactivateAllPins();
      window.card.closeDialog();
    }
  };

  var closePinDialogGlobal = function (event) {
    if (event.keyCode === KEY_CODES.escape) {
      closePinDialog(event);
    }
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

  var closeDialog = document.querySelector('.dialog__close');
  closeDialog.addEventListener('click', closePinDialog);
  document.addEventListener('keydown', closePinDialogGlobal);
}());
