'use strict';

(function () {
  var ERROR_BOX_SHADOW = 'inset 0 0 0 2px red';

  var titleInput = document.querySelector('#title');
  var priceInput = document.querySelector('#price');
  var addressInput = document.querySelector('#address');

  var checkCustomValidity = function (input) {

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
    checkCustomValidity(titleInput);
  });
  titleInput.addEventListener('change', function () {
    checkCustomValidity(titleInput);
  });
  priceInput.addEventListener('invalid', function () {
    checkCustomValidity(priceInput);
  });
  priceInput.addEventListener('change', function () {
    checkCustomValidity(priceInput);
  });
  addressInput.addEventListener('invalid', function () {
    checkCustomValidity(addressInput);
  });
  addressInput.addEventListener('change', function () {
    checkCustomValidity(addressInput);
  });

  // Form depends & relations
  var noticeForm = document.querySelector('.notice__form');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var typeSelect = document.querySelector('#type');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');

  var syncValues = function (element, value) {
    element.value = value;
  };

  window.synchronizeFields(timeInSelect, timeOutSelect, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(timeOutSelect, timeInSelect, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);

  window.synchronizeFields(roomNumberSelect, capacitySelect, ['1', '2', '3', '100'], ['1', '2', '3', '0'], syncValues);
  window.synchronizeFields(capacitySelect, roomNumberSelect, ['1', '2', '3', '0'], ['1', '2', '3', '100'], syncValues);

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  window.synchronizeFields(typeSelect, priceInput, ['flat', 'bungalo', 'house', 'palace'], [1000, 0, 5000, 10000], syncValueWithMin);

  noticeForm.addEventListener('submit', function () {
    if (noticeForm.checkValidity()) {
      noticeForm.submit();
      noticeForm.reset();
    }
  });
}());
