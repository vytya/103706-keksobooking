'use strict';

(function () {
  var i;
  var closeDialog = document.querySelector('.dialog__close');
  var pinsList = document.querySelectorAll('.pin:not(.pin__main)');
  var dialogPanelParent = document.querySelector('#offer-dialog');

  var closePinAndHideDialog = function () {
    dialogPanelParent.classList.add('hidden');

    for (i = 0; i < pinsList.length; i++) {
      pinsList[i].classList.remove('pin--active');
    }
  };

  var onCloseEvent = function (event) {
    window.data.isEnterEvent(event, closePinAndHideDialog);
    window.data.isClickEvent(event, closePinAndHideDialog);
  };

  closeDialog.addEventListener('click', onCloseEvent);
}());
