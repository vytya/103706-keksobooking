'use strict';

(function () {
  var IMAGE = {
    width: 52,
    height: 42
  };

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

  var getFeatures = function (array, element) {
    array.forEach(function (it) {
      var featureElement = document.createElement('span');
      featureElement.classList.add('feature__image');
      featureElement.classList.add('feature__image--' + it);
      element.appendChild(featureElement);
    });
  };

  var getPhotos = function (array, element) {
    array.forEach(function (it) {
      var imageElement = document.createElement('img');
      imageElement.width = IMAGE.width;
      imageElement.height = IMAGE.height;
      imageElement.src = it;
      element.appendChild(imageElement);
    });
  };

  var dialogPanelParent = document.querySelector('#offer-dialog');
  var dialogPanelTemplate = document.querySelector('#lodge-template').content;

  var renderDialogData = function (data) {
    dialogPanelParent.querySelector('.dialog__panel').remove();

    var clonedDialogPanelTemplate = dialogPanelTemplate.cloneNode(true);

    clonedDialogPanelTemplate.querySelector('.lodge__title').textContent = data.offer.title;
    clonedDialogPanelTemplate.querySelector('.lodge__address').textContent = data.offer.address;
    clonedDialogPanelTemplate.querySelector('.lodge__price span').textContent = data.offer.price;
    clonedDialogPanelTemplate.querySelector('.lodge__type').textContent = getPropertyType(data.offer.type);
    clonedDialogPanelTemplate.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + data.offer.guests + ' гостей в ' + data.offer.rooms + ' комнатах';
    clonedDialogPanelTemplate.querySelector('.lodge__checkin-time').textContent = 'Заезд после  ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    clonedDialogPanelTemplate.querySelector('.lodge__description').textContent = data.offer.description;
    dialogPanelParent.querySelector('img').src = data.author.avatar;

    if (data.offer.features.length !== 0) {
      getFeatures(data.offer.features, clonedDialogPanelTemplate.querySelector('.lodge__features'));
    }

    if (data.offer.photos.length !== 0) {
      getPhotos(data.offer.photos, clonedDialogPanelTemplate.querySelector('.lodge__photos'));
    }

    return clonedDialogPanelTemplate;
  };

  window.card = {
    open: function (data) {
      if (dialogPanelParent.classList.contains('hidden')) {
        dialogPanelParent.classList.remove('hidden');
      }

      dialogPanelParent.appendChild(renderDialogData(data));
    },

    close: function () {
      dialogPanelParent.classList.add('hidden');
    }
  };
}());
