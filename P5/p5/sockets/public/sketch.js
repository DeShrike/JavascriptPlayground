p5.disableFriendlyErrors = true;  // disables FES



var socket;

function setup() { 
    
  createCanvas(400, 400);

  background(51);

  socket = io.connect("http://localhost:3000");

  socket.on("mousemsg", newDrawing);
} 



function newDrawing(data)
{
  noStroke();
  fill(200);
  ellipse(data.x, data.y, 50, 50);
}

function mouseDrag()
{
  var data = { x: mouseX, y: mouseY };
  socket.emit("muousemsg", data); 	  


}

function draw() { 
 
  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 50, 50);
}

