var Main = {
	canvas: null, 
	context: null, 
	width: 0, 
	height: 0, 
	mustStop: false, 
	delta: 0, 
	then: Date.now(), 
	fps: 0,
	self: null,

	init: function(canvasId) {
		self = this;
		self.canvas = document.getElementById(canvasId);
		self.context = canvas.getContext("2d");
		self.width = canvas.width = window.innerWidth;
		self.height = canvas.height = window.innerHeight;

        document.body.addEventListener("mousemove", function(event) {self.onMouseMove(event.clientX, event.clientY); });
        document.body.addEventListener("click", function(event) { self.onClick(event.clientX, event.clientY); });
        document.body.addEventListener("keydown", self.onKeyDown);
	},

	start: function() {
        self.setDelta();
        self.mustStop = false;
        self.loop();
	},

	loop: function() {
        self.setDelta();
        self.update(self.delta);

		// clear
		self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
        
		self.render();

        self.context.font = "30px Arial";
        self.context.fillStyle = "#FF0000";
        self.context.fillText(self.fps, 10, 30);

        if (!self.mustStop)
        {
            requestAnimationFrame(self.loop);
        }
    },

    stop: function() {
        self.mustStop = true;
    },

    setDelta: function() {
        var now = Date.now();
        self.delta = (now - self.then) / 1000; // seconds since last frame
        self.then = now;
        self.fps = Math.floor(1 / self.delta);
    },

    /*****************************************************************/
    /*****************************************************************/
    /*****************************************************************/
    /*****************************************************************/
    /*****************************************************************/
    /*****************************************************************/

    balls: [],
    ballImg: null,
    pointA: null,
    pointB: null,

    onClick: function(x, y) {
    },

    onMouseMove: function(x, y) {
    },

    onKeyDown: function (event) {
        switch(event.keyCode) {
            case 37: // left
                break;
            case 38: // up
                break;
            case 39: // right
                break;
            case 40: // down
                break;
			case 27: // escape
				self.stop();
				break;
        }
    },

    setupScene: function() {
        var sun1 = particle.create(300, 200, 0, 0);
        sun1.mass = 100;
        sun1.radius = 10;

        self.pointA = particle.create(self.width / 2, self.height / 2, 0, 0, 0.05);
        self.pointA.vx = utils.randomRange(-1, 1);
        self.pointA.vy = utils.randomRange(-1, 1);
        self.pointA.radius = 10;

        self.pointB = particle.create(self.width / 2, self.height / 2, 0, 0, 0.05);
        self.pointB.vx = utils.randomRange(-1, 1);
        self.pointB.vy = utils.randomRange(-1, 1);
        self.pointB.radius = 10;

        self.ballImg = document.createElement("img");
        self.ballImg.addEventListener("load", function() {
            self.start();
        });
        self.ballImg.src = "ball.png";
    },

	update: function(delta) {
        self.pointA.springTo(self.pointB, 0.002, 10);
        //self.pointB.springTo(self.pointA, 0.002, 20);
		self.pointA.update();
		self.pointB.update();
	},

	render: function() {
        self.context.beginPath();
        self.context.moveTo(self.pointA.x, self.pointA.y);
        self.context.lineTo(self.pointB.x, self.pointB.y);
        self.context.stroke();

        self.context.drawImage(self.ballImg, self.pointA.x - (self.ballImg.width / 2), self.pointA.y - (self.ballImg.height / 2));
        self.context.drawImage(self.ballImg, self.pointB.x - (self.ballImg.width / 2), self.pointB.y - (self.ballImg.height / 2));
	},
};
