var font;
var clock;

function preload() {
    font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
    createCanvas(800, 200);
    background(51);
    colorMode(HSB);
    clock = new Clock();
    clock.init();
}

function draw() {
    background(0);
    clock.update();
    clock.show();
}
