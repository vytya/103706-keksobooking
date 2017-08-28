'use strict';

(function () {
  var pinsList = document.querySelectorAll('.pin:not(.pin__main)');
  var dialogPanelParent = document.querySelector('#offer-dialog');

  var dialogPanelRemoveHiddenClass = function () {
    if (dialogPanelParent.classList.contains('hidden')) {
      dialogPanelParent.classList.remove('hidden');
    }
  };

  for (var i = 0; i < pinsList.length; i++) {
    pinsList[i].addEventListener('click', dialogPanelRemoveHiddenClass);

    pinsList[i].addEventListener('keydown', dialogPanelRemoveHiddenClass);
  }

  document.addEventListener('keydown', function (event) {
    window.data.isEscEvent(event, function () {
      dialogPanelParent.classList.add('hidden');

      for (i = 0; i < pinsList.length; i++) {
        pinsList[i].classList.remove('pin--active');
      }
    });
  });
}());
