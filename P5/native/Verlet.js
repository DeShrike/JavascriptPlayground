var Main = (function() {

	var width = 0, 
    	height = 0;

    var balls = [],
        ballDiameter = 5,
        sticks = [],
        blocks = [],
        maxBalls = 10,
        shootInterval = 100,
        lastShoot = Date.now();
        bounce = 1,         // 0.9
        gravity = 0.00,      // 0.5
        friction = 1;   // 0.999

    function init(canvas) {
        Base.init(canvas);
        Base.start();
    }

    function onClick(x, y) {
        addBall();
         // + Math.random() * 50 - 25,
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

        balls.push({
            x: 100,
            y: 100,
            oldx: 100 + Math.random() * 10 - 5,
            oldy: 100 + Math.random() * 10 - 5,
        });

        balls.push({
            x: 150,
            y: 110,
            oldx: 145,
            oldy: 105,
        });

        balls.push({
            x: 250,
            y: 110,
            oldx: 200,
            oldy: 105,
        });

        sticks.push({
            p0: balls[0],
            p1: balls[1],
            length: distance(balls[0], balls[1])
        });
        sticks.push({
            p0: balls[1],
            p1: balls[2],
            length: distance(balls[1], balls[2])
        });

        blocks.push({
            x1: 200,
            y1: 50,
            x2: 240,
            y2: 300
        });
    }

    function addBall() {
        var ball = {
            x: 100, // + Math.random() * 10 - 5,
            y: 102, // + Math.random() * 10 - 5,
            oldx: 95, // + Math.random() * 10 - 5,
            oldy: 96, // + Math.random() * 10 - 5,
        };
        balls.push(ball);
    }

    function updateBalls(delta)
    {
        for (var i = 0; i < balls.length; i++)
        {
            var ball = balls[i];
            var vx = (ball.x - ball.oldx) * friction;
            var vy = (ball.y - ball.oldy) * friction;
            ball.oldx = ball.x;
            ball.oldy = ball.y;

            ball.x += vx;
            ball.y += vy;
            ball.y += gravity;
        }
    }

    function updateSticks()
    {
        for(var i = 0; i < sticks.length; i++) {
            var s = sticks[i],
                dx = s.p1.x - s.p0.x,
                dy = s.p1.y - s.p0.y,
                distance = Math.sqrt(dx * dx + dy * dy),
                difference = s.length - distance,
                percent = difference / distance / 2,
                offsetX = dx * percent,
                offsetY = dy * percent;

            s.p0.x -= offsetX;
            s.p0.y -= offsetY;
            s.p1.x += offsetX;
            s.p1.y += offsetY;
        }
    }

    function constrainPoints()
    {
        for(var i = 0; i < balls.length; i++) {
            var p = balls[i],
                vx = (p.x - p.oldx) * friction;
                vy = (p.y - p.oldy) * friction;

            if (p.x + ballDiameter > width) {
                p.x = width - ballDiameter;
                p.oldx = p.x + vx * bounce;
            }
            else if (p.x - ballDiameter < 0) {
                p.x = 0 + ballDiameter;
                p.oldx = p.x + vx * bounce;
            }
            if (p.y + ballDiameter> height) {
                p.y = height - ballDiameter;
                p.oldy = p.y + vy * bounce;
            }
            else if (p.y - ballDiameter < 0) {
                p.y = 0 + ballDiameter;
                p.oldy = p.y + vy * bounce;
            }
        }

    }

    function checkBlockHits()
    {
        for(var i = 0; i < balls.length; i++) {
            var ball = balls[i];

            for(var j = 0; j < blocks.length; j++) {
                var block = blocks[j];
 
            var vx = (ball.x - ball.oldx);
            if (vx < 0) // is moving to the left
            {
                // check right
                if (utils.inRange(ball.x, block.x1, block.x2))
                {
                    if (utils.inRange(ball.y, block.y1, block.y2))
                    {
                        ball.x = block.x2 + ballDiameter;
                        ball.oldx = ball.x + vx;
                    }
                }        
            }}
        }        
    }

    function distance(p0, p1) {
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

	function update(delta) {
        
        if (balls.length < maxBalls)
        {
            if (lastShoot + shootInterval < Date.now())
            {
                addBall();
                lastShoot = Date.now();
            }
        }

        updateBalls(delta);
        checkBlockHits();

        for(var i = 0; i < 1; i++) {
            updateSticks();
            constrainPoints();
        }
	}

	function render(context) {

        for (var i = 0; i < balls.length; i++)
        {
            var ball = balls[i];
            context.beginPath();
            context.arc(ball.x, ball.y, ballDiameter, 0, Math.PI * 2);
            context.fill();
        }

        context.beginPath();
        for(var i = 0; i < sticks.length; i++) {
            var s = sticks[i];
            context.moveTo(s.p0.x, s.p0.y);
            context.lineTo(s.p1.x, s.p1.y);
        }
        context.stroke();

        context.beginPath();
        for(var i = 0; i < blocks.length; i++) {
            var s = blocks[i];
            context.moveTo(s.x1, s.y1);
            context.lineTo(s.x2, s.y1);
            context.lineTo(s.x2, s.y2);
            context.lineTo(s.x1, s.y2);
            context.lineTo(s.x1, s.y1);
        }
        context.stroke();

        // self.context.beginPath();
        // self.context.moveTo(self.pointA.x, self.pointA.y);
        // self.context.lineTo(self.pointB.x, self.pointB.y);
        // self.context.stroke();
	}

    return { 
            init: init, 
            update: update, 
            render: render, 
            onClick: onClick, 
            onMouseMove: onMouseMove, 
            onKeyDown: onKeyDown, 
            setupScene: setupScene
        }
})();
