'use strict';

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var addZeroField = function (number) {
  return number = (number < 10) ? '0' + number : number;
};

var getShuffledArray = function (array) {
  var temporaryValue;
  var randomIndex;

  for (var i = 0; i < array.length; i++) {
    randomIndex = Math.floor(Math.random() * i);

    temporaryValue = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

var getRandomArrayElement = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
};

var NAMESOFPROPERTIES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPES = [
  'flat',
  'house',
  'bungalo'
];

var CHECKINOUTHOURS = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURESLIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

// Make random data
var shuffledNameOfProperties = getShuffledArray(NAMESOFPROPERTIES);
var nearbyProperty = [];
var photos = [];
var i;

for (i = 0; i < 8; i++) {
  var featuresListString = getShuffledArray(FEATURESLIST).slice(0, getRandomNumber(1, FEATURESLIST.length));
  var locationX = getRandomNumber(300, 900);
  var locationY = getRandomNumber(100, 500);

  nearbyProperty[i] = {
    'author': {
      'avatar': 'img/avatars/user' + addZeroField(i + 1) + '.png',
    },
    'offer': {
      'title': shuffledNameOfProperties[i],
      'address': locationX + ', ' + locationY,
      'price': getRandomNumber(1000, 1000000),
      'type': getRandomArrayElement(TYPES),
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 100),
      'checkin': getRandomArrayElement(CHECKINOUTHOURS),
      'checkout': getRandomArrayElement(CHECKINOUTHOURS),
      'features': featuresListString,
      'description': '',
      'photos': photos
    },
    'location': {
      'x': locationX,
      'y': locationY
    }
  };
}

// Display pins
var pinsBlock = document.querySelector('.tokyo__pin-map');
var pinTemplate = document.querySelector('#pin-template').content;
var fragment = document.createDocumentFragment();

var marker = {
  'width': 56,
  'height': 75
};

var fillData = function (clonedNode, selector, type, value) {
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
};

var renderPin = function (data) {
  var clonedPinTemplate = pinTemplate.cloneNode(true);

  fillData(clonedPinTemplate, '.pin', 'left', data.location.x);
  fillData(clonedPinTemplate, '.pin', 'top', data.location.y);
  fillData(clonedPinTemplate, 'img', 'src', data.author.avatar);

  return clonedPinTemplate;
};

for (i = 0; i < nearbyProperty.length; i++) {
  fragment.appendChild(renderPin(nearbyProperty[i]));
}

pinsBlock.appendChild(fragment);

// Display dialog panel
var getPropertyType = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
      break;

    case 'bungalo':
      return 'Бунгало';
      break;

    case 'house':
      return 'Дом';
      break;
  }
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

dialogPanelParent.querySelector('.dialog__panel').remove();

var renderDialogData = function (data) {
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

  dialogPanelParent.appendChild(renderDialogData(nearbyProperty[0]));
