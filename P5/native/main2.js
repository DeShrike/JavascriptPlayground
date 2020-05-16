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
        self.context.fillStyle = "#000000";
        
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
    ballCount: 200,
    angle: 0,
    maxDistance: 75,

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

        for (var i = 0; i < self.ballCount; i++)
        {
            var ball = particle.create(self.width / 2, self.height / 2, 0, 0);
            ball.sx = utils.randomRange(-1, 1);
            ball.sy = utils.randomRange(-1, 1);
            self.balls.push(ball);
        }

        self.start();
    },

	update: function(delta) {
        self.angle += 0.01;
        for (var i = 0; i < self.ballCount; i++)
        {
            var ball = self.balls[i];
            ball.x = Math.sin(self.angle * ball.sx) * self.width / 4 + self.width / 2;
            ball.y = Math.cos(self.angle * ball.sy) * self.height / 4 + self.height / 2;
        }
	},

	render: function() {

        for (var a = 0; a < self.ballCount; a++)
        {
            for (var b = 0; b < self.ballCount; b++)
            {
                if (a == b)
                {
                    continue;
                }

                var ballA = self.balls[a];
                var ballB = self.balls[b];
                
                var dist = utils.distance(ballA, ballB);
                if (dist < self.maxDistance)
                {
                    var gr = Math.round(dist / self.maxDistance * 256);
                    var color = "rgb(" + gr + "," + gr + "," + gr + ")";
                    self.context.strokeStyle = color;
                    self.context.beginPath();
                    self.context.moveTo(ballA.x, ballA.y);
                    self.context.lineTo(ballB.x, ballB.y);
                    self.context.stroke();
                }
            }
        }
/*
        for (var i = 0; i < self.ballCount; i++)
        {
            var ball = self.balls[i];
            self.context.beginPath();
            self.context.arc(ball.x, ball.y, 2, 0, Math.PI * 2);
            self.context.fill();
        }
*/
        // self.context.beginPath();
        // self.context.moveTo(self.pointA.x, self.pointA.y);
        // self.context.lineTo(self.pointB.x, self.pointB.y);
        // self.context.stroke();
	},
};
