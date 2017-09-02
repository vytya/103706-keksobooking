'use strict';

(function () {
  var i;
  var choosenValue;
  var choosenIndex;

  window.synchronizeFields = function (firstInput, secondInput, firstData, secondData, syncFunction) {
    if (typeof syncFunction === 'function') {
      firstInput.addEventListener('change', function () {
        choosenValue = firstInput.value;
        choosenIndex = firstData.indexOf(choosenValue);

        syncFunction(secondInput, secondData[choosenIndex]);
      });

      secondInput.addEventListener('change', function () {
        choosenValue = secondInput.value;
        choosenIndex = secondData.indexOf(choosenValue);

        syncFunction(firstInput, firstData[choosenIndex]);
      });
    }
  };
}());
