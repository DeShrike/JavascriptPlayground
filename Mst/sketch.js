var vehicles = [];
var count = 100;
var mst;

function preload() {

}

function setup() {
  createCanvas(640, 480);
  for (var i = 0; i < count; i++) {
    var v = new Vehicle(random(width), random(height), i);
    vehicles.push(v);
  }
}

function draw() {

  background(0);
  for (let v of vehicles) {
    v.update();
    v.checkBounds();
  }

  mst = new Mst(vehicles);
  mst.calculate();

  /*for (let v of vehicles) {
    v.show();
  }*/

  for (let n of mst.edges) {
    let v1 = vehicles[n.node1];
    let v2 = vehicles[n.node2];
    stroke(255);
    line(v1.pos.x, v1.pos.y, v2.pos.x, v2.pos.y);
  }
}
