var boids;
var oldBoids;
var walls;
var target;

function preload() {
}

function setup() {
    var canvas = createCanvas(800, 500);
    canvas.parent("canvas-parent");
    
    oldBoids = [];
    boids = [];
    for (var i = 0;i < 20; i++)
    {
        addBoid();
    }

    walls = [];
    addWall(100, 100, 200, 100);
    addWall(200, 100, 200, 120);
    addWall(200, 120, 100, 120);
    addWall(100, 100, 100, 120);

    addWall(300, 100, 300, 200);

    addWall(300, 400, 400, 400);

    addWall(100, 250, 500, 250);
    addWall(500, 250, 600, 200);

    addWall(650, 150, 600, 350);

    background(153, 0, 102);
    colorMode(HSB);
    colorMode(RGB);
    textAlign(LEFT, TOP);

    target = createVector(random(width), random(height));
}

function addBoid()
{
    var b = new Boid(random(width),random(height));
    boids.push(b);
}

function addWall(x1, y1, x2, y2)
{
    var w = new Wall(x1, y1, x2, y2);
    walls.push(w);
}

function draw() {
    background(0);

    for (var wall of walls)
    {
        wall.show();
    }

    noStroke();
    fill(255,0,0);
    ellipse(target.x, target.y, 10);

    for (var i = boids.length - 1; i >= 0; i--)
    {
        var boid = boids[i];
        boid.seek(target);
        boid.think();
        boid.update();
        boid.show();
        boid.showSensors();
        /*if (boid.checkCollisions())
        {
            oldBoids.push(boid);
            boids.splice(i, 1);
        }*/
    }

    if (frameCount % 200 == 0)
    {
        target = createVector(random(width), random(height));
    }
}