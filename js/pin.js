'use strict';

(function () {
  var NAMES_OF_PROPERTIES = [
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

  var CHECK_IN_OUT_HOURS = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var FEATURES_LIST = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var PINS_NUMBER = 8;

  var addZeroField = function (number) {
    return (number < 10) ? '0' + number : number;
  };

  var getShuffledArray = function (array) {
    array.sort(function () {
      return Math.random() - 0.5;
    });

    return array;
  };

  // Make random data
  var shuffledNameOfProperties = getShuffledArray(NAMES_OF_PROPERTIES);
  var nearbyPropertyData = [];
  var photos = [];
  var i;

  for (i = 0; i < PINS_NUMBER; i++) {
    var featuresListString = getShuffledArray(FEATURES_LIST).slice(0, window.data.getRandomNumber(1, FEATURES_LIST.length));
    var locationX = window.data.getRandomNumber(300, 900);
    var locationY = window.data.getRandomNumber(100, 500);

    nearbyPropertyData[i] = {
      author: {
        avatar: 'img/avatars/user' + addZeroField(i + 1) + '.png'
      },
      offer: {
        title: shuffledNameOfProperties[i],
        address: locationX + ', ' + locationY,
        price: window.data.getRandomNumber(1000, 1000000),
        type: window.data.getRandomArrayElement(TYPES),
        rooms: window.data.getRandomNumber(1, 5),
        guests: window.data.getRandomNumber(1, 100),
        checkin: window.data.getRandomArrayElement(CHECK_IN_OUT_HOURS),
        checkout: window.data.getRandomArrayElement(CHECK_IN_OUT_HOURS),
        features: featuresListString,
        description: '',
        photos: photos
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }

  // Display pins
  var pinsBlock = document.querySelector('.tokyo__pin-map');
  var pinTemplate = document.querySelector('#pin-template').content;
  var dialogPanelParent = document.querySelector('#offer-dialog');
  var dialogPanelTemplate = document.querySelector('#lodge-template').content;
  var fragment = document.createDocumentFragment();

  var renderPin = function (data) {
    var clonedPinTemplate = pinTemplate.cloneNode(true);

    window.data.fillData(clonedPinTemplate, '.pin', 'left', data.location.x);
    window.data.fillData(clonedPinTemplate, '.pin', 'top', data.location.y);
    window.data.fillData(clonedPinTemplate, 'img', 'src', data.author.avatar);

    return clonedPinTemplate;
  };

  for (i = 0; i < nearbyPropertyData.length; i++) {
    fragment.appendChild(renderPin(nearbyPropertyData[i]));
  }

  pinsBlock.appendChild(fragment);

  // Pins events
  var pinsList = document.querySelectorAll('.pin:not(.pin__main)');

  // Activate clicked pin & load active info to dialog window
  var activatePinAndOpenDialog = function (pin) {
    var activePinIndex;

    for (i = 0; i < pinsList.length; i++) {
      if (pin === pinsList[i]) {
        activePinIndex = i;
      }

      pinsList[i].classList.remove('pin--active');
    }

    dialogPanelParent.appendChild(window.data.renderDialogData(nearbyPropertyData[activePinIndex], dialogPanelParent, dialogPanelTemplate));

    pin.classList.add('pin--active');
  };

  var onPinEvent = function (event) {
    window.data.isEnterEvent(event, function () {
      activatePinAndOpenDialog(event.currentTarget);
    });

    window.data.isClickEvent(event, function () {
      activatePinAndOpenDialog(event.currentTarget);
    });
  };

  // Add events listeners at all pins
  for (i = 0; i < pinsList.length; i++) {
    pinsList[i].addEventListener('click', onPinEvent);
    pinsList[i].addEventListener('keydown', onPinEvent);
  }
}());

