

let url = "https://westeurope.api.cognitive.microsoft.com/customvision/v3.0/Prediction/200e8a7c-9c54-4f79-a8e3-3f2b3b70280e/classify/iterations/image-recognatcher-v2/image";

let predictionKey = "381bde0a8fb44594beaa02abd766964e";
let button;
let label = "??";

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent('myContainer');
  video = createCapture(VIDEO);
  video.hide();
  button = createButton('Recognatch !');

  button.mousePressed(recognise);
}

function keyPressed() {
  if (keyCode === 65) {
    recognise();
  }
}

function _base64ToArrayBuffer(base64) {
  var binary_string =  window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array( len );
  for (var i = 0; i < len; i++)        {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

function recognise() {
 
  console.log("Recognatching");


   label ="thinking";

  var canvas = $('canvas')[0];
  var data = canvas.toDataURL('image/png').replace(/data:image\/png;base64,/, '');
 

  fetch(
    url,
    {
      method: "POST",
      headers: {
        "Prediction-Key": predictionKey,
        "Content-Type": "application/octet-stream"
      },
      body: _base64ToArrayBuffer(data)
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.responseData = JSON.stringify(data);
      let result = "";
      label = "Done";
      for (let prediction of data.predictions) {
        if (prediction.probability > 0.9) {
          label = prediction.tagName;
          return;
        }
      }
    })
    .catch(error => {
      console.error(error);
      label = "Error";
    });

  }



function draw() {
  background(220);
  imageMode(CORNER);
  image(video, 0, 0);
  textSize(32);
  text(label, 10,30);
}