'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

  var checkImageAndRenderTagHandler = function (chooser, preview) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var uploadedImage = document.createElement('img');
        uploadedImage.width = 70;
        uploadedImage.height = 70;
        uploadedImage.src = reader.result;
        preview.innerHTML = '';
        preview.appendChild(uploadedImage);
      });

      reader.readAsDataURL(file);
    }
  };
  var imageChooserHandler = function (chooser, preview) {
    chooser.addEventListener('dragover', function (event) {
      event.preventDefault();

      chooser.parentNode.classList.add('dragover');
      checkImageAndRenderTagHandler(chooser, preview);
    });
    chooser.addEventListener('drop', function (event) {
      event.preventDefault();

      chooser.parentNode.classList.remove('dragover');
      checkImageAndRenderTagHandler(chooser, preview);
    });
    chooser.addEventListener('change', function () {
      checkImageAndRenderTagHandler(chooser, preview);
    });
  };

  var fileChooserAvatar = document.querySelector('.notice__photo input[type=file]');
  var previewAvatar = document.querySelector('.notice__preview');

  imageChooserHandler(fileChooserAvatar, previewAvatar);

  var fileChooserForm = document.querySelector('.form__element input[type=file]');
  var previewForm = document.querySelector('.form__photo');

  imageChooserHandler(fileChooserForm, previewForm);
}());
