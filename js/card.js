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

  var fillData = function (clonedNode, selector, type, value) {
    if (type === 'html') {
      clonedNode.querySelector(selector).innerHTML = value;
    } else {
      throw new Error('parameter "fill" must be equal to "html"');
    }
  };

  var renderDialogData = function (data) {
    dialogPanelParent.querySelector('.dialog__panel').remove();

    var clonedDialogPanelTemplate = dialogPanelTemplate.cloneNode(true);

    fillData(clonedDialogPanelTemplate, '.lodge__title', 'html', data.offer.title);
    fillData(clonedDialogPanelTemplate, '.lodge__address', 'html', data.offer.address);
    fillData(clonedDialogPanelTemplate, '.lodge__price', 'html', data.offer.price + '&#x20bd;/ночь');
    fillData(clonedDialogPanelTemplate, '.lodge__type', 'html', getPropertyType(data.offer.type));
    fillData(clonedDialogPanelTemplate, '.lodge__rooms-and-guests', 'html', 'Для ' + data.offer.guests + ' гостей в ' + data.offer.rooms + ' комнатах');
    fillData(clonedDialogPanelTemplate, '.lodge__checkin-time', 'html', 'Заезд после  ' + data.offer.checkin + ', выезд до ' + data.offer.checkout);
    fillData(clonedDialogPanelTemplate, '.lodge__features', 'html', getFeatures(data.offer.features));
    fillData(clonedDialogPanelTemplate, '.lodge__description', 'html', data.offer.description);

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
