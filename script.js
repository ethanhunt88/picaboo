var recognition = new webkitSpeechRecognition();
var goBtn = document.querySelector('button');
var input = document.querySelector('.input');
var confidence = document.querySelector('.confidence-level');
var errorInfo = document.querySelector('.error-info');

var flickrKey = "364e95c8cf3225977dfa93be089744d7";
var flickrSecret = "ae571789c2e9c227";

function goButton() {
  goBtn.disabled = true;
  goBtn.textContent = "Listening";
  recognition.start();

  recognition.onresult = function(event) {
    var word = event.results[0][0].transcript;
    var confidenceLevel = event.results[0][0].confidence;
    input.textContent = word;
    confidence.textContent = confidenceLevel;
    console.log(event);
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

goBtn.addEventListener('click', goButton);