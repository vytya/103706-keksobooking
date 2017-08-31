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

  // Activate clicked pin & load active info to dialog window
  var openDialog = function (pin) {
    if (dialogPanelParent.classList.contains('hidden')) {
      dialogPanelParent.classList.remove('hidden');
    }

    dialogPanelParent.appendChild(renderDialogData(window.data[window.pin.activePinIndex]));
  };

  // Close dialog and remove active pin class
  var closeDialog = function () {
    dialogPanelParent.classList.add('hidden');
  };

  window.card = {
    open: function (event) {
      window.utils.isEnterEvent(event, function () {
        openDialog();
      });
      window.utils.isClickEvent(event, function () {
        openDialog();
      });
    },

    close: function (event) {
      if (event.keyCode === KEY_CODES.enter || event.keyCode === KEY_CODES.escape || event.type === 'click') {
        closeDialog();
      }
    }
  };
}());
