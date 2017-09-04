'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },

    onError: function (message) {
      var node = document.createElement('div');

      node.style.width = 50 + '%';
      node.style.height = 100 + 'px';
      node.style.backgroundColor = 'red';
      node.style.position = 'fixed';
      node.style.zIndex = 10;
      node.style.top = 50 + '%';
      node.style.left = 50 + '%';
      node.style.transform = 'translate(-50%, -50%)';
      node.style.display = 'flex';
      node.style.alignItems = 'center';
      node.style.justifyContent = 'center';

      node.textContent = message;

      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
}());
