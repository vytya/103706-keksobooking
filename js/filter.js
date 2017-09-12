'use strict';

(function () {
  var filtersElements = document.querySelector('.tokyo__filters');
  var selectElements = filtersElements.querySelectorAll('select');
  var checkboxElements = filtersElements.querySelectorAll('input[type="checkbox"]');
  var activeFilters;

  var updateActiveFilters = function () {
    activeFilters = activeSelectValues.concat(checkboxActiveValues);
    window.debounce(window.map.updatePins);
  };

  window.filter = {
    filterData: function (pins) {
      var pinFilteredArray = pins.filter(function (it) {
        var ok = true;

        if (activeFilters[0] !== 'any') {
          ok = it.offer.type === activeFilters[0];
        }

        if (ok && activeFilters[1] !== 'any') {
          switch (activeFilters[1]) {
            case 'middle':
              ok = it.offer.price >= 10000 && it.offer.price <= 50000;
              break;

            case 'low':
              ok = it.offer.price < 10000;
              break;

            case 'high':
              ok = it.offer.price > 50000;
              break;
          }
        }

        if (ok && activeFilters[2] !== 'any') {
          ok = it.offer.rooms === +activeFilters[2];
        }

        if (ok && activeFilters[3] !== 'any') {
          ok = it.offer.guests === +activeFilters[3];
        }

        if (ok && activeFilters[4]) {
          ok = it.offer.features.some(function (itIn) {
            return itIn === 'wifi';
          });
        }

        if (ok && activeFilters[5]) {
          ok = it.offer.features.some(function (itIn) {
            return itIn === 'dishwasher';
          });
        }

        if (ok && activeFilters[6]) {
          ok = it.offer.features.some(function (itIn) {
            return itIn === 'parking';
          });
        }

        if (ok && activeFilters[7]) {
          ok = it.offer.features.some(function (itIn) {
            return itIn === 'washer';
          });
        }

        if (ok && activeFilters[8]) {
          ok = it.offer.features.some(function (itIn) {
            return itIn === 'elevator';
          });
        }

        if (ok && activeFilters[9]) {
          ok = it.offer.features.some(function (itIn) {
            return itIn === 'conditioner';
          });
        }

        return ok;
      });

      return pinFilteredArray;
    }
  };

  var activeSelectValues = [].map.call(selectElements, function (it) {
    it.addEventListener('change', function (event) {
      changeSelectValue(event);
    });

    return it.value;
  });

  var checkboxActiveValues = [].map.call(checkboxElements, function (it) {
    it.addEventListener('change', function (event) {
      changeCheckboxValue(event);
    });

    return it.checked;
  });

  var changeSelectValue = function (event) {
    var changedSelectIndex = [].slice.call(selectElements).indexOf(event.target);
    activeSelectValues[changedSelectIndex] = event.target.value;

    updateActiveFilters();
  };

  var changeCheckboxValue = function (event) {
    var changedCheckboxIndex = [].slice.call(checkboxElements).indexOf(event.target);
    checkboxActiveValues[changedCheckboxIndex] = event.target.checked;

    updateActiveFilters();
  };

  updateActiveFilters();
}());
