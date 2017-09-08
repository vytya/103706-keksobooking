'use strict';

(function () {
  var filters = document.querySelector('.tokyo__filters');
  var selectElements = filters.querySelectorAll('select');
  var featureElements = filters.querySelectorAll('input[type="checkbox"]');

  var selectActiveFilters = [];
  //var checkboxActiveValues = [];

  var updateActiveFilters = function () {
    window.activeFilters = selectActiveFilters;
    //window.activeFilters = selectActiveFilters.concat(checkboxActiveValues);
    window.map.updatePins(window.activeFilters);
  };

  selectActiveFilters = [].map.call(selectElements, function (it) {
    it.addEventListener('change', function(event) {
      changeSelectValues(event);
    });

    return it.value;
  });

  var changeSelectValues = function (event) {
    var changedSelectIndex = [].slice.call(selectElements).indexOf(event.target);
    selectActiveFilters[changedSelectIndex] = event.target.value;

    updateActiveFilters();
  }


  /*

  /*[].map.call(featureFilters, function (it, i) {
    var key = it.value;
    var filterObject = {};
    filterObject[key] = it.checked;

    checkboxActiveValues.push(filterObject);

    it.addEventListener('change', function (event) {
      checkboxActiveValues[i][key] = event.target.checked;

      updateActiveFilters();
    });
  });*/

  updateActiveFilters();
}());
