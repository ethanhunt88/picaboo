var recognition = new webkitSpeechRecognition();
var goBtn = document.querySelector('button');
var input = document.querySelector('.input');
var confidence = document.querySelector('.confidence-level');
var errorInfo = document.querySelector('.error-info');

function goButton() {
  goBtn.disabled = true;
  goBtn.textContent = "Listening";
  recognition.start();

  recognition.onresult = function(event) {
    var word = event.results[0][0].transcript;
    var confidenceLevel = event.results[0][0].confidence;

    input.textContent = word;
    confidence.textContent = confidenceLevel;

    $("#images").empty();
    renderImages(word);
    
  }

  recognition.onspeechend = function() {
    recognition.stop();
    goBtn.disabled = false;
    goBtn.textContent = "Go";
  }

  recognition.onerror = function(event) {
    goBtn.disabled = false;
    goBtn.textContent = "Go";
    goBtn.textContent = 'Start new test';
    errorInfo.textContent = 'Error occurred in recognition: ' + event.error;
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

goBtn.addEventListener('click', goButton);
