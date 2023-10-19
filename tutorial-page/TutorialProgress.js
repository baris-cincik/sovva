const IS_DEBUG = true;
let plushie = 'octopus';
log('setting progress for ' + plushie);

localStorage.removeItem(plushie + '-progress');

//global progress dictionary. Will be filled with process
var ProgressDictionary;

window.onload = function () {
  NameElements();
  //perform initial processing(will fill dictionary too)
  FillProgressDictionary();

  if (ProgressDictionary) {
    //add coloring event to all accordions
    AddColorEvent();
  } else {
    log('Failed to fetch tutorial progress');
  }
};

function AddColorEvent() {
  var accordionRows = document.querySelectorAll('#accordion-row');
  log('Found ' + accordionRows.length + ' accordion rows');
  accordionRows.forEach(function (row) {
    var videoElement = row.querySelector('video');
    if (videoElement) {
      videoElement.addEventListener('play', function () {
        // Add your desired functionality here
        log('A video is played!');
        let accordionRow = videoElement.closest('#accordion-row');
        let accordionHeader = accordionRow.querySelector('#accordion-header');
        if (accordionHeader) {
          log('Coloring the header 1');
          let span = accordionHeader.querySelector('span');
          let id = span.innerText;
          colorHeader(id);
          UpdateProgressDictionary(id);
        }
      });
    } else {
      //no video element. Add event to header button click
      var accordionHeader = row.querySelector('#accordion-header');
      if (accordionHeader) {
        accordionHeader.addEventListener('click', function () {
          log('An accordion without a video is clicked!');
          //call colorHeader with the innerText
          //update global dictionary
          let span = accordionHeader.querySelector('span');
          let id = span.innerText;
          colorHeader(id);
          UpdateProgressDictionary(id);
        });
      }
    }
  });
}

function FillProgressDictionary() {
  var progressItem = localStorage.getItem(plushie + '-progress');
  //progress exists
  if (progressItem) {
    log('This is a revisit! Coloring the appropriate headers: ' + progressItem);
    var progressDict = JSON.parse(progressItem);
    if (!progressDict) {
      return;
    }

    for (var key in progressDict) {
      log('Deciding if we should color Key:', key, 'Value:', value);
      // set progress for this key value pair
      var value = progressDict[key];
      if (value == true) {
        colorHeader(key);
      }
    }
  }
  //first time
  else {
    log('This is their first time. Initiating empty dictionary ...');
    let beginnerDict = getBeginnerDictionary();
    var dictionaryString = JSON.stringify(beginnerDict);
    localStorage.setItem(plushie + '-progress', dictionaryString);
    ProgressDictionary = beginnerDict;
  }
}

//updates the given entry to true, then saves the new dict in local storage
function UpdateProgressDictionary(id) {
  ProgressDictionary[id] = true;
  //UPDATE LOCAL STORAGE
}

//colors the specified header to green
function colorHeader(innerText) {
  log('Colouring header with id: ' + innerText);
  var spanElement = document.getElementById(innerText);
  if (spanElement) {
    log('Span found. Coloring now ..');
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
      log('Added to dictionary: ' + spanText);
    }
  });
  if (Object.keys(dictionary).length !== 0) {
    log('The beginner dictionary is initialized.');
    return dictionary;
  } else {
    log('The beginner dictionary FAILED to initialized.');
  }
}

function NameElements() {
  var accordionComponents = document.querySelectorAll('#accordion-component');

  accordionComponents.forEach(function (accordionComponent) {
    var accordionTab = accordionComponent.querySelector(
      '[data-pf-type="Accordion"]'
    );

    if (accordionTab) {
      var accordionRows = accordionTab.querySelectorAll(
        '[data-pf-type="Accordion"]'
      );

      accordionRows.forEach(function (accordionRow) {
        accordionRow.id = 'accordion-row';

        var accordionHeader = accordionRow.querySelector(
          '[data-pf-type="Accordion.Header"]'
        );

        if (accordionHeader) {
          accordionHeader.id = 'accordion-header';

          var accordionSpan = accordionHeader.querySelector('span');
          if (accordionSpan) {
            accordionSpan.id = accordionSpan.innerText;
          }
        }
      });
    } else {
      // Accordion tab not found
    }
  });
}

function addIdToChildSpans() {
  var accordionHeaders = document.querySelectorAll('#accordion-header');

  accordionHeaders.forEach(function (accordionHeader) {
    var spanElements = accordionHeader.querySelectorAll('span');
    spanElements.forEach(function (spanElement) {
      spanElement.id = spanElement.innerText;
    });
  });
}

function log(toPrint) {
  if (IS_DEBUG) {
    console.log(toPrint);
  }
}
