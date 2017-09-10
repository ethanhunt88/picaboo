var goBtn = document.querySelector('button');
var input = document.querySelector('.input');
var errorInfo = document.querySelector('.error-info');

function goButton() {
  removeErrorDisplay();

  goBtn.disabled = true;
  goBtn.textContent = "Listening";

  var recognition = new webkitSpeechRecognition();
  recognition.start();

  recognition.onresult = function(event) {
    var word = event.results[0][0].transcript;

    $("#images").empty();

    if(word == "stop") {
      input.textContent = '';
      stopListening();
    } else {
      input.textContent = word;
      renderImages(word);
      goButton();
    }
  }

  recognition.onerror = function(event) {
    goBtn.disabled = false;
    goBtn.textContent = "Go";
    errorType = event.error;

    if(errorType == 'no-speech') {
      goButton();
    } else {
      errorInfo.textContent = 'Error occurred in recognition: ' + errorType;
      activateButton();
    }
  }

  function stopListening() {
    recognition.stop();
    goBtn.disabled = false;
    goBtn.textContent = "Go";
  }
}

function renderImages(wordInput) {
  $.ajax({
    url: 'https://api.flickr.com/services/feeds/photos_public.gne',
    dataType: 'jsonp',
    data: { "tags": wordInput, "format": "json" }
  });
}

function jsonFlickrFeed(json) {
  $.each(json.items, function(i, item) {
    $("<img />").attr("src", item.media.m).appendTo("#images");
  });
};

function activateButton() {
  goBtn.addEventListener('click', goButton);
}

function removeErrorDisplay() {
  errorInfo.textContent = '';
}

activateButton();

stoplistening (525539591060)

