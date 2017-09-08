'use strict';

(function () {
  var KEY_CODES = {
    escape: 27,
    enter: 13
  };

  var MAIN_PIN_MARKER = {
    width: 75,
    height: 94
  };

  var ERROR_BOX_SHADOW = 'inset 0 0 0 2px red';

  var i;

  var pins = [];

  var onSuccessLoad = function (data) {
    pins = data;
    window.map.updatePins();
  };

  window.backend.load(onSuccessLoad, window.backend.onError);

  var openPinDialog = function (event, data) {
    window.pin.activatePin(event.currentTarget);
    window.card.openDialog(data[window.pin.activePinIndex]);
  };

  var closeDialog = document.querySelector('.dialog__close');

  var closePinDialog = function () {
    window.pin.deactivateAllPins();
    window.card.closeDialog();
  };

  var checkSelectFilters = function(activeFilter, checkElement) {
    if (checkElement.offer.type === activeFilter) {
      return true;
    }
  };

  window.map = {
    updatePins: function () {
      var activeFilters = window.activeFilters;

      var pinFilteredArray = pins.
          filter(function (it) {
            if (activeFilters[0] !== 'any') {
              return checkSelectFilters(activeFilters[0], it);;
            } else {
              return true;
            }
          });

          /*filter(function(it, i, array){
            if (activeFilters[1] !== 'any') {
              switch (activeFilters[1]) {
                case 'middle':
                  return it.offer.price > 10000 && it.offer.price < 50000;
                case 'low':
                  return it.offer.price < 10000;
                case 'high':
                  return it.offer.price > 50000;
              }
            } else {
              return array;
            }

          });*/
//console.log(pinFilteredArray);

      var pinsArray = (pinFilteredArray.length === 0) ? pins : pinFilteredArray;

      window.pin.renderPins(pinFilteredArray);

      // Add events listeners at all pins
      for (i = 0; i < window.pin.pinsList.length; i++) {
        window.pin.pinsList[i].addEventListener('click', function (event) {
          openPinDialog(event, pinsArray);
        });
        window.pin.pinsList[i].addEventListener('keydown', function (event) {
          if (event.keyCode === KEY_CODES.enter) {
            openPinDialog(event, pinsArray);
          }
        });
      }
    }
  };

  closeDialog.addEventListener('click', function () {
    closePinDialog();
  });

  closeDialog.addEventListener('keydown', function (event) {
    if (event.keyCode === KEY_CODES.enter) {
      closePinDialog();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === KEY_CODES.escape) {
      closePinDialog();
    }
  });

  var map = document.querySelector('.tokyo');
  var mapSize = {
    width: map.clientWidth,
    height: map.clientHeight
  };

  var mainPin = document.querySelector('.pin__main');
  var addressInput = document.querySelector('#address');

  var pinAddressCoord = {
    x: mainPin.offsetLeft + MAIN_PIN_MARKER.width / 2,
    y: mainPin.offsetTop + MAIN_PIN_MARKER.height
  };

  // Default pin values to address
  addressInput.value = 'x: ' + pinAddressCoord.x + ', y: ' + pinAddressCoord.y;

  mainPin.addEventListener('mousedown', function (event) {
    event.preventDefault();

    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();

      addressInput.style.boxShadow = '';

      var shift = {
        x: startCoords.x - moveEvent.clientX,
        y: startCoords.y - moveEvent.clientY
      };

      startCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      // Change address input coords in value
      pinAddressCoord = {
        x: mainPin.offsetLeft - shift.x + Math.floor(MAIN_PIN_MARKER.width / 2),
        y: mainPin.offsetTop - shift.y + MAIN_PIN_MARKER.height
      };

      if (pinAddressCoord.x >= 0 && pinAddressCoord.x <= mapSize.width && pinAddressCoord.y >= 0 && pinAddressCoord.y <= mapSize.height) {
        // Change place of pin
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

        addressInput.value = 'x: ' + pinAddressCoord.x + ', y: ' + pinAddressCoord.y;
      }
    };

    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  addressInput.addEventListener('input', function (event) {
    var inputArray = event.target.value.replace(',', '').split(' ');
    var coordX = +inputArray[1];
    var coordY = +inputArray[3];

    if (typeof (coordX) === 'number' && coordX >= 0 && coordX <= mapSize.width && typeof (coordY) === 'number' && coordY >= 0 && coordY <= mapSize.height) {
      addressInput.style.boxShadow = '';

      mainPin.style.top = (coordY - MAIN_PIN_MARKER.height) + 'px';
      mainPin.style.left = (coordX - MAIN_PIN_MARKER.width / 2) + 'px';
    } else {
      addressInput.style.boxShadow = ERROR_BOX_SHADOW;

      mainPin.style.top = (mapSize.height - MAIN_PIN_MARKER.height) + 'px';
      mainPin.style.left = (mapSize.width - MAIN_PIN_MARKER.width / 2) + 'px';

      addressInput.value = 'x: ' + mapSize.width + ', y: ' + mapSize.height;
    }
  });
}());
