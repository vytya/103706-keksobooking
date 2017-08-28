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

  window.data = {
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    getRandomArrayElement: function (array) {
      var randomIndex = Math.floor(Math.random() * array.length);

      return array[randomIndex];
    },

    isEscEvent: function (event, action) {
      if (event.keyCode === KEY_CODES.escape) {
        action();
      }
    },

    isEnterEvent: function (event, action) {
      if (event.keyCode === KEY_CODES.enter) {
        action();
      }
    },

    isClickEvent: function (event, action) {
      if (event.type === 'click') {
        action();
      }
    },

    fillData: function (clonedNode, selector, type, value) {
      var marker = {
        'width': 56,
        'height': 75
      };

      if (type === 'left') {
        clonedNode.querySelector(selector).style.left = value - marker.width / 2 + 'px';
      } else if (type === 'top') {
        clonedNode.querySelector(selector).style.top = value - marker.height + 'px';
      } else if (type === 'src') {
        clonedNode.querySelector(selector).src = value;
      } else if (type === 'html') {
        clonedNode.querySelector(selector).innerHTML = value;
      } else {
        throw new Error('parameter "fill" must be equal to "left", "top", "src" or "html"');
      }
    },

    renderDialogData: function (data, parent, template) {
      parent.querySelector('.dialog__panel').remove();

      var clonedDialogPanelTemplate = template.cloneNode(true);

      window.data.fillData(clonedDialogPanelTemplate, '.lodge__title', 'html', data.offer.title);
      window.data.fillData(clonedDialogPanelTemplate, '.lodge__address', 'html', data.offer.address);
      window.data.fillData(clonedDialogPanelTemplate, '.lodge__price', 'html', data.offer.price + '&#x20bd;/ночь');
      window.data.fillData(clonedDialogPanelTemplate, '.lodge__type', 'html', getPropertyType(data.offer.type));
      window.data.fillData(clonedDialogPanelTemplate, '.lodge__rooms-and-guests', 'html', 'Для ' + data.offer.guests + ' гостей в ' + data.offer.rooms + ' комнатах');
      window.data.fillData(clonedDialogPanelTemplate, '.lodge__checkin-time', 'html', 'Заезд после  ' + data.offer.checkin + ', выезд до ' + data.offer.checkout);
      window.data.fillData(clonedDialogPanelTemplate, '.lodge__features', 'html', getFeatures(data.offer.features));
      window.data.fillData(clonedDialogPanelTemplate, '.lodge__description', 'html', data.offer.description);

      parent.querySelector('img').src = data.author.avatar;

      return clonedDialogPanelTemplate;
    }
  };
}());
