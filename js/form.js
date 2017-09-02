'use strict';

(function () {
  var ERROR_BOX_SHADOW = 'inset 0 0 0 2px red';

  var i;
  var titleInput = document.querySelector('#title');
  var priceInput = document.querySelector('#price');
  var addressInput = document.querySelector('#address');

  var checkMaxMinInputLength = function (input) {

    if (!input.validity.valid) {
      input.style.boxShadow = ERROR_BOX_SHADOW;

      if (input.validity.tooShort) {
        var minLength = input.minLength;

        input.setCustomValidity('Название должно состоять минимум из ' + minLength + ' символов');
      } else if (input.validity.tooLong) {
        var maxLength = input.maxLength;

        input.setCustomValidity('Название не должно превышать ' + maxLength + ' символов');
      } else if (input.validity.rangeUnderflow) {
        var min = input.min;
        var max = input.max;

        input.setCustomValidity('Число должно быть больше ' + min + ' и меньше ' + max);
      } else if (input.validity.valueMissing) {
        input.setCustomValidity('Обязательное поле');
      } else {
        input.setCustomValidity('');
        input.style.boxShadow = '';
      }
    }
  };

  titleInput.addEventListener('invalid', function () {
    checkMaxMinInputLength(titleInput);
  });
  titleInput.addEventListener('change', function () {
    checkMaxMinInputLength(titleInput);
  });
  priceInput.addEventListener('invalid', function () {
    checkMaxMinInputLength(priceInput);
  });
  priceInput.addEventListener('change', function () {
    checkMaxMinInputLength(priceInput);
  });
  addressInput.addEventListener('invalid', function () {
    checkMaxMinInputLength(addressInput);
  });
  addressInput.addEventListener('change', function () {
    checkMaxMinInputLength(addressInput);
  });

  // Form depends & relations
  var noticeForm = document.querySelector('.notice__form');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var typeSelect = document.querySelector('#type');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var submitButton = document.querySelector('.form__submit');

  var changeMinPrice = function (event) {
    var selectedOptionIndex = event.target.selectedIndex;
    var minPrice;

    switch (selectedOptionIndex) {
      case 0:
        minPrice = 1000;
        break;
      case 1:
        minPrice = 0;
        break;
      case 2:
        minPrice = 5000;
        break;
      case 3:
        minPrice = 10000;
        break;
    }

    priceInput.setAttribute('min', minPrice);
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  window.synchronizeFields(timeInSelect, timeOutSelect, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);

  typeSelect.addEventListener('change', function (event) {
    changeMinPrice(event);
  });

  var changeAnother = function (event, slave) {
    var selectedOptionIndex = event.target.selectedIndex;
    var slaveIndex;
    var needToChangeIndex = true;

    if (event.target.id === 'room_number') {
      switch (selectedOptionIndex) {
        case 0:
          slaveIndex = 2;
          break;
        case 1:
          slaveIndex = 1;
          break;
        case 2:
          slaveIndex = 0;
          break;
        case 3:
          slaveIndex = 3;
          break;
      }
    } else if (event.target.id === 'capacity') {
      switch (selectedOptionIndex) {
        case 0:
          slaveIndex = 2;
          break;
        case 1:
          if (slave[1].selected || slave[2].selected) {
            needToChangeIndex = false;
          } else {
            slaveIndex = 1;
          }
          break;
        case 2:
          if (slave[0].selected || slave[1].selected || slave[2].selected) {
            needToChangeIndex = false;
          } else {
            slaveIndex = 0;
          }
          break;
        case 3:
          slaveIndex = 3;
          break;
      }
    }

    if (needToChangeIndex) {
      slave[slaveIndex].selected = true;
    }
  };

  roomNumberSelect.addEventListener('change', function (event) {
    changeAnother(event, capacitySelect);
  });

  capacitySelect.addEventListener('change', function (event) {
    changeAnother(event, roomNumberSelect);
  });

  submitButton.addEventListener('click', function () {
    var formElements = noticeForm.elements;
    var succefullState = true;


    for (i = 0; i < formElements.length; i++) {
      formElements[i].style.boxShadow = '';

      if (!formElements[i].validity.valid) {
        formElements[i].style.boxShadow = ERROR_BOX_SHADOW;

        succefullState = false;
      }
    }

    if (succefullState) {
      noticeForm.submit();
      noticeForm.reset();
    }
  });
}());
