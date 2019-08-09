// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const formText = document.querySelector('form');
const inputText = document.getElementById('text-input');
const selectVoice = document.getElementById('voice-select');
const rate = document.getElementById('rate');
const rateValue = document.getElementById('rate-value');
const pitch = document.getElementById('pitch');
const pitchValue = document.getElementById('pitch-value');
const body = document.querySelector('body');

// Init voices array
let voices = [];

function getVoices() {
  voices = synth.getVoices();

  // Loop through voices and create an option for each one
  voices.forEach(voice => {
    const option = document.createElement('option');
    // Fill option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')';

    // Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    selectVoice.appendChild(option);
  });
}

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak
function speak() {
  // Check if speaking
  if (synth.speaking) {
    console.error('Already speaking...');
    return;
  }
  if (inputText.value !== '') {
    // Add background animation
    body.style.background = '#141414 url(images/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';
    // Get speak text
    const speakText = new SpeechSynthesisUtterance(inputText.value);
    // Speak end
    speakText.onend = function(e) {
      console.log('Done speaking...');
      body.style.background = '#141414';
    };

    // Speak error
    speakText.onerror = function(e) {
      console.error('Something went wrong');
    };

    // Selected voice
    const selectedVoice = selectVoice.selectedOptions[0].getAttribute(
      'data-name'
    );

    // Loop through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set rate and pitch
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Speak
    synth.speak(speakText);
  }
}

// Event Listeners

// Text form sumbit
formText.addEventListener('submit', function(e) {
  e.preventDefault();
  speak();
  inputText.blur();
});

// Rate value change
rate.addEventListener('change', function(e) {
  rateValue.textContent = rate.value;
});

// Pitch value change
pitch.addEventListener('change', function(e) {
  pitchValue.textContent = pitch.value;
});

// Voice select change
selectVoice.addEventListener('change', function(e) {
  speak();
});
