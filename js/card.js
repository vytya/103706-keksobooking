'use strict';

(function () {
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

    clonedDialogPanelTemplate.querySelector('.lodge__title').innerHTML = data.offer.title;
    clonedDialogPanelTemplate.querySelector('.lodge__address').innerHTML = data.offer.address;
    clonedDialogPanelTemplate.querySelector('.lodge__price').innerHTML = data.offer.price + '&#x20bd;/ночь';
    clonedDialogPanelTemplate.querySelector('.lodge__type').innerHTML = getPropertyType(data.offer.type);
    clonedDialogPanelTemplate.querySelector('.lodge__rooms-and-guests').innerHTML = 'Для ' + data.offer.guests + ' гостей в ' + data.offer.rooms + ' комнатах';
    clonedDialogPanelTemplate.querySelector('.lodge__checkin-time').innerHTML = 'Заезд после  ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    clonedDialogPanelTemplate.querySelector('.lodge__features').innerHTML = getFeatures(data.offer.features);
    clonedDialogPanelTemplate.querySelector('.lodge__description').innerHTML = data.offer.description;
    dialogPanelParent.querySelector('img').src = data.author.avatar;

    return clonedDialogPanelTemplate;
  };

  window.card = {
    openDialog: function (data) {
      if (dialogPanelParent.classList.contains('hidden')) {
        dialogPanelParent.classList.remove('hidden');
      }

      dialogPanelParent.appendChild(renderDialogData(data));
    },

    closeDialog: function () {
      dialogPanelParent.classList.add('hidden');
    }
  };
}());
