'use strict';

(function () {
  var filters = document.querySelector('.tokyo__filters');
  var selectFilters = filters.querySelectorAll('select');
  var featureFilters = filters.querySelectorAll('input[type="checkbox"]');

  var selectActiveFilters = [];
  var checkboxActiveValues = [];

  var updateActiveFilters = function () {
    window.activeFilters = selectActiveFilters.concat(checkboxActiveValues);
    window.map.updatePins(window.activeFilters);
  };

  [].map.call(selectFilters, function (it, i) {
    var key = it.name;
    var filterObject = {};
    filterObject[key] = it.value;

    selectActiveFilters.push(filterObject);

    it.addEventListener('change', function (event) {
      selectActiveFilters[i][key] = event.target.value;

      updateActiveFilters();
    });
  });

  [].map.call(featureFilters, function (it, i) {
    var key = it.value;
    var filterObject = {};
    filterObject[key] = it.checked;

    checkboxActiveValues.push(filterObject);

    it.addEventListener('change', function (event) {
      checkboxActiveValues[i][key] = event.target.checked;

      updateActiveFilters();
    });
  });

  updateActiveFilters();
}());
