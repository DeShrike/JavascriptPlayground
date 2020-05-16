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

    var balls = [],
        ballCount = 400,
        mst = [], 
        done = false;

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

        // create points
        for (var i = 0; i < ballCount; i++)
        {
            var x = utils.randomRange(0, width);
            var y = utils.randomRange(0, height);
            var n = node.create(x, y);
            balls.push(n);
        }

        // create graph
        for (var i = 0; i < ballCount; i++)
        {
            var a = balls[i];
            for (var j = 0; j < ballCount; j++)
            {
                var b = balls[j];
                if (j != i)
                {
                    var d = utils.distance(a, b);
                    var e = edge.create(i,j,d);
                    a.edges.push(e);
                    // console.log(i + ' to ' + j + ' = ' + d);
                }
            }
        }

        mst.push(balls[0]);

        start();
    }

	function update(delta) {
        if (done)
        {
            return;
        }

        var xx = [];

        for (var i = 0; i < mst.length; i++)
        {
            var n = mst[i];
            for (var j = 0; j < n.edges.length; j++ )
            {
                xx.push(n.edges[j]);
            }
        }

        // xx sorteren op dist
        var xs = xx.sort(function(a, b) {
            return a.dist - b.dist;
        });

        var added = false;
        for (var i=0;i<xs.length;i++)
        {
            var xxx = xs[i];
            var bb = balls[xxx.b]
            if (mst.indexOf(bb) == -1)
            {
                added = true;
                mst.push(balls[xxx.b]);
                break;
            }
        }

        if (!added)
        {
            done = true;
        }
	}

	function render() {

        context.fillStyle = "#000000";
        context.strokeStyle ="#000000";

        for (var i = 0; i < ballCount; i++)
        {
            var ball = balls[i];
            context.beginPath();
            context.arc(ball.x, ball.y, 2, 0, Math.PI * 2);
            context.fill();
        }

        var mstlength = mst.length;
        var a = mst[0];
        for (var i = 1; i < mstlength; i++)
        {
            var b = mst[i];
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
            a = b;
        }

        // self.context.beginPath();
        // self.context.moveTo(self.pointA.x, self.pointA.y);
        // self.context.lineTo(self.pointB.x, self.pointB.y);
        // self.context.stroke();
	}

    return { init: init }
})();


