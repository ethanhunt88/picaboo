var recognition = new webkitSpeechRecognition();
var goBtn = document.querySelector('button');
var input = document.querySelector('.input');
var errorInfo = document.querySelector('.error-info');

function goButton() {
  goBtn.disabled = true;
  goBtn.textContent = "Listening";
  recognition.start();

  recognition.onresult = function(event) {
    var word = event.results[0][0].transcript;
    input.textContent = word;
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