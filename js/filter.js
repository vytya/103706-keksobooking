'use strict';

(function () {
  var filters = document.querySelector('.tokyo__filters');
  var selectFilters = filters.querySelectorAll('select');
  var featureFilters = filters.querySelectorAll('input[type="checkbox"]');

  var activeFilters = [];
  var selectActiveFilters = [];
  var checkboxActiveValues = [];

  var updateActiveFiltersAndPins = function () {
    activeFilters = selectActiveFilters.concat(checkboxActiveValues);

    console.log(activeFilters);
  };

  [].map.call(selectFilters, function (it, i) {
    var filterObject = {
      name: it.name,
      value: it.value
    };

    selectActiveFilters.push(filterObject);

    it.addEventListener('change', function (event) {
      selectActiveFilters[i].value = event.target.value;

      updateActiveFiltersAndPins();
    });
  });

  [].map.call(featureFilters, function (it, i) {
    var filterObject = {
      name: it.value,
      value: it.checked
    };

    checkboxActiveValues.push(filterObject);

    it.addEventListener('change', function (event) {
      checkboxActiveValues[i].value = event.target.checked;

      updateActiveFiltersAndPins();
    });
  });

  updateActiveFiltersAndPins();
}());
