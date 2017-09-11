'use strict';

(function () {
  var filters = document.querySelector('.tokyo__filters');
  var selectElements = filters.querySelectorAll('select');
  var checkboxElements = filters.querySelectorAll('input[type="checkbox"]');

  var updateActiveFilters = function () {
    window.filters = activeSelectValues.concat(checkboxActiveValues);
    window.debounce(window.map.updatePins);
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
