'use strict';

(function () {
  var i;
  var fragment = document.createDocumentFragment();
  var pinsBlock = document.querySelector('.tokyo__pin-map');

  for (i = 0; i < window.data.length; i++) {
    fragment.appendChild(window.pin.renderPin(window.data[i]));
  }

  pinsBlock.appendChild(fragment);

  var pinsList = document.querySelectorAll('.pin:not(.pin__main)');
  var closeDialog = document.querySelector('.dialog__close');

  var openPinDialog = function (event) {
    window.pin.open(event);
    window.card.open(event);
  };

  var closePinDialog = function (event) {
    window.pin.close(event);
    window.card.close(event);
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
