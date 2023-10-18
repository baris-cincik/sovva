let plushie = 'octopus';
console.log('setting progress for ' + plushie);

localStorage.removeItem(plushie + '-progress');

//global progress dictionary. Will be filled with process
var ProgressDictionary;

window.onload = function () {
  //perform initial processing(will fill dictionary too)
  FillProgressDictionary();

  if (ProgressDictionary) {
    //add coloring event to all accordions
    AddColorEvent();
  } else {
    console.log('Failed to fetch tutorial progress');
  }
};

function AddColorEvent() {
  var accordionElements = document.querySelectorAll('#accordion-element');

  accordionElements.forEach(function (element) {
    var videoElement = element.querySelector('video');
    if (videoElement) {
      videoElement.addEventListener('play', function () {
        // Add your desired functionality here
        console.log('A video is played!');
        //call colorHeader with the innerText
        //update global dictionary
      });
    } else {
      //no video element. Add event to header button click
      var buttonElement = element.querySelector('#accordion-header');
      if (buttonElement) {
        buttonElement.addEventListener('click', function () {
          console.log('An accordion without a video is clicked!');
          //call colorHeader with the innerText
          //update global dictionary
        });
      }
    }
  });
}

function FillProgressDictionary() {
  var progressItem = localStorage.getItem(plushie + '-progress');
  //progress exists
  if (progressItem) {
    console.log(
      'This is a revisit! Coloring the appropriate headers: ' + progressItem
    );
    var progressDict = JSON.parse(progressItem);
    if (!progressDict) {
      return;
    }

    for (var key in progressDict) {
      console.log('Deciding if we should color Key:', key, 'Value:', value);
      // set progress for this key value pair
      var value = progressDict[key];
      if (value == true) {
        colorHeader(key);
      }
    }
  }
  //first time
  else {
    console.log('This is their first time. Initiating empty dictionary ...');
    let beginnerDict = getBeginnerDictionary();
    var dictionaryString = JSON.stringify(beginnerDict);
    localStorage.setItem(plushie + '-progress', dictionaryString);
    ProgressDictionary = beginnerDict;
  }
}

//colors the specified header to green
function colorHeader(innerText) {
  var spanElement = document.querySelector('span');
  if (spanElement && spanElement.innerText === innerText) {
    console.log('Span found. Coloring now ..');
    var accordionHeader = spanElement.closest('#accordion-header');

    if (accordionHeader) {
      accordionHeader.style.backgroundColor = 'green';
      accordionHeader.style.setProperty(
        'background-color',
        'green',
        'important'
      );
    }
  }
}

//returns a dictionary with all progress set to false
function getBeginnerDictionary() {
  var dictionary = {};
  var accordionHeaders = document.querySelectorAll('#accordion-header');
  accordionHeaders.forEach(function (element) {
    var spanElement = element.querySelector('span');
    if (spanElement) {
      var spanText = spanElement.innerText;
      dictionary[spanText] = false;
      console.log('Added to dictionary: ' + spanText);
    }
  });
  if (Object.keys(dictionary).length !== 0) {
    console.log('The beginner dictionary is initiated.');
    return dictionary;
  } else {
    console.log('The beginner dictionary FAILED to initiate.');
  }
}
