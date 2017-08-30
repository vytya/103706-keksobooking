'use strict';

(function () {
  var pinsList = document.querySelectorAll('.pin:not(.pin__main)');
  var closeDialog = document.querySelector('.dialog__close');
  var i;

  // Add events listeners at all pins
  for (i = 0; i < pinsList.length; i++) {
    pinsList[i].addEventListener('click', window.pin.open);
    pinsList[i].addEventListener('keydown', window.pin.open);

    pinsList[i].addEventListener('click', window.card.open);
    pinsList[i].addEventListener('keydown', window.card.open);
  }

  var onCloseGlobalEvent = function (event) {
    window.utils.isEscEvent(event, window.card.close);
    window.utils.isEscEvent(event, window.pin.close);
  };

  document.addEventListener('keydown', onCloseGlobalEvent);

  closeDialog.addEventListener('click', window.card.close);
  closeDialog.addEventListener('click', window.pin.close);
}());
