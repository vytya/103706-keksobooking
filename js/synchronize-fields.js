'use strict';

(function () {
  var choosenValue;
  var choosenIndex;

  window.synchronizeFields = function (firstInput, secondInput, firstData, secondData, syncFunction) {
    if (typeof syncFunction === 'function') {
      firstInput.addEventListener('change', function () {
        choosenValue = firstInput.value;
        choosenIndex = firstData.indexOf(choosenValue);

        syncFunction(secondInput, secondData[choosenIndex]);
      });
    }
  };
}());
