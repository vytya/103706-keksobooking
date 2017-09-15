'use strict';

(function () {
  var PRICE_FROM = 10000;
  var PRICE_TO = 50000;

  var filterElements = document.querySelector('.tokyo__filters');
  var selectElements = [].slice.call(filterElements.querySelectorAll('select'));
  var checkboxElements = [].slice.call(filterElements.querySelectorAll('input[type="checkbox"]'));
  var activeFilters;

  var updateActiveFilters = function () {
    activeFilters = activeSelectValues.concat(checkboxActiveValues);
    window.debounce(window.map.updatePins);
  };

  var checkRadioButtonValue = function (element, value) {
    return element.some(function (it) {
      return it === value;
    });
  };

  var checkSelectValue = function (element, value) {
    return element === value;
  };

  window.filter = {
    filterData: function (pins) {
      var filteredPins = pins.filter(function (it) {
        var ok = true;

        if (activeFilters[0] !== 'any') {
          ok = checkSelectValue(it.offer.type, activeFilters[0]);
        }

        if (ok && activeFilters[1] !== 'any') {
          switch (activeFilters[1]) {
            case 'middle':
              ok = it.offer.price >= PRICE_FROM && it.offer.price <= PRICE_TO;
              break;

            case 'low':
              ok = it.offer.price < PRICE_FROM;
              break;

            case 'high':
              ok = it.offer.price > PRICE_TO;
              break;
          }
        }

        if (ok && activeFilters[2] !== 'any') {
          ok = checkSelectValue(it.offer.rooms, activeFilters[2]);
        }

        if (ok && activeFilters[3] !== 'any') {
          ok = checkSelectValue(it.offer.guests, activeFilters[3]);
        }

        if (ok && activeFilters[4]) {
          ok = checkRadioButtonValue(it.offer.features, 'wifi');
        }

        if (ok && activeFilters[5]) {
          ok = checkRadioButtonValue(it.offer.features, 'dishwasher');
        }

        if (ok && activeFilters[6]) {
          ok = checkRadioButtonValue(it.offer.features, 'parking');
        }

        if (ok && activeFilters[7]) {
          ok = checkRadioButtonValue(it.offer.features, 'washer');
        }

        if (ok && activeFilters[8]) {
          ok = checkRadioButtonValue(it.offer.features, 'elevator');
        }

        if (ok && activeFilters[9]) {
          ok = checkRadioButtonValue(it.offer.features, 'conditioner');
        }

        return ok;
      });

      return filteredPins;
    }
  };

  var activeSelectValues = selectElements.map(function (it) {
    it.addEventListener('change', function (event) {
      changeSelectValue(event);
    });

    return it.value;
  });

  var checkboxActiveValues = checkboxElements.map(function (it) {
    it.addEventListener('change', function (event) {
      changeCheckboxValue(event);
    });

    return it.checked;
  });

  var changeSelectValue = function (event) {
    var changedSelectIndex = selectElements.indexOf(event.target);
    activeSelectValues[changedSelectIndex] = event.target.value;

    updateActiveFilters();
  };

  var changeCheckboxValue = function (event) {
    var changedCheckboxIndex = checkboxElements.indexOf(event.target);
    checkboxActiveValues[changedCheckboxIndex] = event.target.checked;

    updateActiveFilters();
  };

  updateActiveFilters();
}());
