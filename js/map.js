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

  for (i = 0; i < window.data.length; i++) {
    fragment.appendChild(renderPin(window.data[i]));
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
