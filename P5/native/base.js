var Base = (function() {

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
        document.body.addEventListener("mousemove", function(event) { Main.onMouseMove(event.clientX, event.clientY); });
        document.body.addEventListener("click", function(event) { Main.onClick(event.clientX, event.clientY); });
        document.body.addEventListener("keydown", Main.onKeyDown);
        Main.setupScene(width, height, context);
	}

	function start() {
        setDelta();
        mustStop = false;
        loop();
	}

	function loop() {
        setDelta();
        Main.update(delta);

		// clear
		context.clearRect(0, 0, canvas.width, canvas.height);
        
		Main.render(context);

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

    return { init: init, start: start, stop: stop }
})();
