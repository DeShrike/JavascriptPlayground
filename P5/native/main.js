var Main = (function() {

	var width = 0, 
    	height = 0;

    var balls = [],
        ballCount = 100,
        maxDistance = 200;

    function init(canvas) {
        Base.init(canvas);
        Base.start();
    }

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
				Base.stop();
				break;
        }
    }

    function setupScene(w, h) {
        width = w;
        height = h;
        for (var i = 0; i < ballCount; i++)
        {
            var ball = particle.create(width / 2, height / 2, 0, 0);
            ball.vx = utils.randomRange(-3, 3);
            ball.vy = utils.randomRange(-3, 3);
            ball.x = utils.randomRange(0, width);
            ball.y = utils.randomRange(0, height);
            balls.push(ball);
        }
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

	function render(context) {

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

    return { init: init, update: update, render: render, onClick: onClick, onMouseMove: onMouseMove, onKeyDown: onKeyDown, setupScene: setupScene}
})();
