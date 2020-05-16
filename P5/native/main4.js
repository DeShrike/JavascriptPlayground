var Main = (function() {

	var canvas = null, 
	    context = null, 
	    width = 0, 
    	height = 0, 
    	mustStop = false, 
    	delta = 0, 
    	then = Date.now(), 
    	fps = 0;

	function init(canvasId) {
		canvas = document.getElementById(canvasId);
		context = canvas.getContext("2d");
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;

        document.body.addEventListener("mousemove", function(event) { onMouseMove(event.clientX, event.clientY); });
        document.body.addEventListener("click", function(event) { onClick(event.clientX, event.clientY); });
        document.body.addEventListener("keydown", onKeyDown);
        setupScene();
	}

	function start() {
        setDelta();
        mustStop = false;
        loop();
	}

	function loop() {
        setDelta();
        update(delta);

		// clear
		context.clearRect(0, 0, canvas.width, canvas.height);
        
		render();

        context.font = "30px Arial";
        context.fillStyle = "#FF0000";
        context.fillText(fps, 10, 30);
        context.fillStyle = "#000000";
        
        if (!mustStop)
        {
            requestAnimationFrame(loop);
        }
    }

    function stop() {
        mustStop = true;
    }

    function setDelta() {
        var now = Date.now();
        delta = (now - then) / 1000; // seconds since last frame
        then = now;
        fps = Math.floor(1 / delta);
    }

    /*****************************************************************/
    /*****************************************************************/
    /*****************************************************************/
    /*****************************************************************/
    /*****************************************************************/
    /*****************************************************************/

    var balls = []
        ballCount = 20,
        maxDistance = 200;

    function onClick(x, y) {
    }

    function onMouseMove(x, y) {
    }

    function onKeyDown(event) {
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
				stop();
				break;
        }
    }

    function setupScene() {

        for (var i = 0; i < ballCount; i++)
        {
            var ball = particle.create(width / 2, height / 2, 0, 0);
            ball.vx = utils.randomRange(-3, 3);
            ball.vy = utils.randomRange(-3, 3);
            ball.x = utils.randomRange(0, width);
            ball.y = utils.randomRange(0, height);
            balls.push(ball);
        }

        start();
    }

	function update(delta) {
        for (var i = 0; i < ballCount; i++)
        {
            var ball = balls[i];
            ball.update();
            if (ball.x > width || ball.x < 0)
            {
                ball.vx *= -1;
            }

            if (ball.y > height || ball.y < 0)
            {
                ball.vy *= -1;
            }
        }
	}

	function render() {

        for (var a = 0; a < ballCount; a++)
        {
            for (var b = 0; b < ballCount; b++)
            {
                if (a == b)
                {
                    continue;
                }

                var ballA = balls[a];
                var ballB = balls[b];
                
                var dist = utils.distance(ballA, ballB);
                if (dist < maxDistance)
                {
                    var gr = Math.round(dist / maxDistance * 256);
                    var color = "rgb(" + gr + "," + gr + "," + gr + ")";
                    context.strokeStyle = color;
                    context.beginPath();
                    context.moveTo(ballA.x, ballA.y);
                    context.lineTo(ballB.x, ballB.y);
                    context.stroke();
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
	}

    return { init: init }
})();
