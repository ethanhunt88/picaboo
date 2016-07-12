var recognition = new webkitSpeechRecognition();
var goBtn = document.querySelector('button');

function goButton() {
  recognition.start();

  recognition.onresult = function(event) {
    console.log("yes");
  }
}

goBtn.addEventListener('click', goButton);