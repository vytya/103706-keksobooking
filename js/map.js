'use strict';

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

var KEY_CODES = {
  escape: 27,
  enter: 13
};

var PINS_NUMBER = 8;

var ERROR_BOX_SHADOW = 'inset 0 0 0 2px red';

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

for (i = 0; i < nearbyPropertyData.length; i++) {
  fragment.appendChild(renderPin(nearbyPropertyData[i]));
}

pinsBlock.appendChild(fragment);

// Display dialog panel
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

  dialogPanelParent.appendChild(renderDialogData(nearbyPropertyData[activePinIndex]));

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

// Form validations
var priceInput = document.querySelector('#price');

// Form depends & relations
var noticeForm = document.querySelector('.notice__form');
var timeInSelect = document.querySelector('#timein');
var timeOutSelect = document.querySelector('#timeout');
var typeSelect = document.querySelector('#type');
var roomNumberSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');
var submitButton = document.querySelector('.form__submit');

var getSelectedOptionIndex = function (event) {
  console.log(event);
  var selectOptions = event.target;
  var selectedOption;

  for (i = 0; i < selectOptions.length; i++) {
    if (selectOptions[i].selected === true) {
      selectedOption = i;
    }
  }

  return selectedOption;
};

var getSelectedOptionValue = function (select, selectedOptionIndex) {
  return select[selectedOptionIndex].value;
};

var getSelectedOptionText = function (select, selectedOptionIndex) {
  return select[selectedOptionIndex].text;
};

var changeMinPrice = function (event, select) {
  var selectedOptionIndex = getSelectedOptionIndex(event);
  var selectedOptionText = getSelectedOptionText(select, selectedOptionIndex);
  var minPrice;

  switch (selectedOptionText) {
    case 'Лачуга':
      minPrice = 0;
      break;
    case 'Квартира':
      minPrice = 1000;
      break;
    case 'Дом':
      minPrice = 5000;
      break;
    case 'Дворец':
      minPrice = 10000;
      break;
  }

  priceInput.setAttribute('min', minPrice);
};

var changeOptionInSelect = function (event, slaveSelect) {
  var selectedOption = getSelectedOptionIndex(event);

  slaveSelect[selectedOption].selected = true;
};

timeInSelect.addEventListener('change', function (event) {
  changeOptionInSelect(event, timeOutSelect);
});

timeOutSelect.addEventListener('change', function (event) {
  changeOptionInSelect(event, timeInSelect);
});

typeSelect.addEventListener('change', function (event) {
  changeMinPrice(event, typeSelect);
});

var changeAnother = function (event, master, slave) {
  var selectedOptionIndex = getSelectedOptionIndex(event);
  var selectedOptionValue = getSelectedOptionValue(master, selectedOptionIndex);
  var slaveIndex;

  if (event.target.id === 'room_number') {
    switch (selectedOptionValue) {
      case '1':
        slaveIndex = 2;
        break;
      case '2':
        slaveIndex = 1;
        break;
      case '3':
        slaveIndex = 0;
        break;
      case '100':
        slaveIndex = 3;
        break;
    }
  } else if (event.target.id === 'capacity') {
    switch (selectedOptionValue) {
      case '3':
        slaveIndex = 2;
        break;
      case '2':
        slaveIndex = 1;
        break;
      case '1':
        slaveIndex = 0;
        break;
      case '0':
        slaveIndex = 3;
        break;
    }
  }

  slave[slaveIndex].selected = true;
};

roomNumberSelect.addEventListener('change', function (event) {
  changeAnother(event, roomNumberSelect, capacitySelect);
});

capacitySelect.addEventListener('change', function (event) {
  changeAnother(event, capacitySelect, roomNumberSelect);
});

submitButton.addEventListener('click', function () {
  var requiredInputs = noticeForm.querySelectorAll('input[required]');
  var succefullState = true;

  for (i = 0; i < requiredInputs.length; i++) {
    requiredInputs[i].style.boxShadow = '';

    if (!requiredInputs[i].validity.valid) {
      requiredInputs[i].style.boxShadow = ERROR_BOX_SHADOW;

      succefullState = false;
    }
  }

  if (succefullState) {
    noticeForm.reset();
    noticeForm.submit();
  }
});


