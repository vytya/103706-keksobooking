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

  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var addZeroField = function (number) {
    return (number < 10) ? '0' + number : number;
  };

  var getShuffledArray = function (array) {
    array.sort(function () {
      return Math.random() - 0.5;
    });

    return array;
  };

  var getRandomArrayElement = function (array) {
    var randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
  };

  // Make random data
  var shuffledNameOfProperties = getShuffledArray(NAMES_OF_PROPERTIES);
  var nearbyPropertyData = [];
  var photos = [];
  var i;

  for (i = 0; i < PINS_NUMBER; i++) {
    var featuresListString = getShuffledArray(FEATURES_LIST).slice(0, getRandomNumber(1, FEATURES_LIST.length));
    var locationX = getRandomNumber(300, 900);
    var locationY = getRandomNumber(100, 500);

    nearbyPropertyData[i] = {
      author: {
        avatar: 'img/avatars/user' + addZeroField(i + 1) + '.png'
      },
      offer: {
        title: shuffledNameOfProperties[i],
        address: locationX + ', ' + locationY,
        price: getRandomNumber(1000, 1000000),
        type: getRandomArrayElement(TYPES),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 100),
        checkin: getRandomArrayElement(CHECK_IN_OUT_HOURS),
        checkout: getRandomArrayElement(CHECK_IN_OUT_HOURS),
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

  window.data = nearbyPropertyData;
}());
