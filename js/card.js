'use strict';

(function () {
  var KEY_CODES = {
    escape: 27,
    enter: 13
  };

  var i;

  var getPropertyType = function (type) {
    var returnType = '';

    switch (type) {
      case 'flat':
        returnType = 'Квартира';
        break;
      case 'bungalo':
        returnType = 'Бунгало';
        break;
      case 'house':
        returnType = 'Дом';
        break;
    }

    return returnType;
  };

  var getFeatures = function (array) {
    var returnString = '';

    for (i = 0; i < array.length; i++) {
      returnString = returnString + '<span class="feature__image feature__image--' + array[i] + '"></span>';
    }

    return returnString;
  };

  var dialogPanelParent = document.querySelector('#offer-dialog');
  var dialogPanelTemplate = document.querySelector('#lodge-template').content;

  var renderDialogData = function (data) {
    dialogPanelParent.querySelector('.dialog__panel').remove();

    var clonedDialogPanelTemplate = dialogPanelTemplate.cloneNode(true);

    window.utils.fillData(clonedDialogPanelTemplate, '.lodge__title', 'html', data.offer.title);
    window.utils.fillData(clonedDialogPanelTemplate, '.lodge__address', 'html', data.offer.address);
    window.utils.fillData(clonedDialogPanelTemplate, '.lodge__price', 'html', data.offer.price + '&#x20bd;/ночь');
    window.utils.fillData(clonedDialogPanelTemplate, '.lodge__type', 'html', getPropertyType(data.offer.type));
    window.utils.fillData(clonedDialogPanelTemplate, '.lodge__rooms-and-guests', 'html', 'Для ' + data.offer.guests + ' гостей в ' + data.offer.rooms + ' комнатах');
    window.utils.fillData(clonedDialogPanelTemplate, '.lodge__checkin-time', 'html', 'Заезд после  ' + data.offer.checkin + ', выезд до ' + data.offer.checkout);
    window.utils.fillData(clonedDialogPanelTemplate, '.lodge__features', 'html', getFeatures(data.offer.features));
    window.utils.fillData(clonedDialogPanelTemplate, '.lodge__description', 'html', data.offer.description);

    dialogPanelParent.querySelector('img').src = data.author.avatar;

    return clonedDialogPanelTemplate;
  };

  // Pins events
  var pinsList = document.querySelectorAll('.pin:not(.pin__main)');
  var closeDialog = document.querySelector('.dialog__close');

  // Activate clicked pin & load active info to dialog window
  var activatePinAndOpenDialog = function (pin) {
    var activePinIndex;

    if (dialogPanelParent.classList.contains('hidden')) {
      dialogPanelParent.classList.remove('hidden');
    }

    for (i = 0; i < pinsList.length; i++) {
      if (pin === pinsList[i]) {
        activePinIndex = i;
      }

      pinsList[i].classList.remove('pin--active');
    }

    dialogPanelParent.appendChild(renderDialogData(window.data.nearbyPropertyData[activePinIndex]));

    pin.classList.add('pin--active');
  };

  // Close dialog and remove active pin class
  var closePinAndHideDialog = function () {
    dialogPanelParent.classList.add('hidden');

    for (i = 0; i < pinsList.length; i++) {
      pinsList[i].classList.remove('pin--active');
    }
  };

  var onPinEvent = function (event) {
    if (event.keyCode === KEY_CODES.enter || event.type === 'click') {
      activatePinAndOpenDialog(event.currentTarget);
    }
  };

  var onCloseEvent = function (event) {
    if (event.keyCode === KEY_CODES.enter || event.type === 'click') {
      closePinAndHideDialog();
    }
  };

  var onCloseGlobalEvent = function (event) {
    if (event.keyCode === KEY_CODES.escape) {
      closePinAndHideDialog();
    }
  };

  // Add events listeners at all pins
  for (i = 0; i < pinsList.length; i++) {
    pinsList[i].addEventListener('click', onPinEvent);
    pinsList[i].addEventListener('keydown', onPinEvent);
  }

  closeDialog.addEventListener('click', onCloseEvent);
  document.addEventListener('keydown', onCloseGlobalEvent);
}());
