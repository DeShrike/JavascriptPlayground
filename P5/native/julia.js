var Main = (function() {

	var width = 0, 
    	height = 0;

    var minr = -2.5,
        maxr = 1,
        mini = -1,
        maxi = -1;
    var cx = -1.1,
        cy = 0.19;
    var maxIterations = 256 * 2;
    var imageData;
    var done;
    var colorPalette; 
    var step;
    var clickedr = 0,
        clickedi = 0;
    var stepDecrement = 5
        initialStep = 1 + (4 * stepDecrement);

    var stepr, stepu;
    var currentx, currenty;

    function init(canvas) {
        Base.init(canvas);
        Base.start();
    }

    function onClick(x, y) {
        clickedr = minr + (x * stepr);
        clickedi = mini + (y * stepi);

        var currentExtentR = maxr - minr;
        var currentExtentI = maxi - mini;

        minr = clickedr - (currentExtentR / 4);
        maxr = clickedr + (currentExtentR / 4);

        mini = clickedi - (currentExtentI / 4);
        maxi = clickedi + (currentExtentI / 4);

        currentx = 0;
        currenty = 0;

        stepr = (maxr - minr) / width;
        stepi = (maxi - mini) / height;

        stepr = stepi = Math.max(stepr, stepi);
        maxr = minr + (width * stepr);
        maxi = mini + (height * stepi);

        step = initialStep;

        if (done)
        {
            done = false;
            Base.start()
        }
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

    function setupScene(w, h, context) {
        width = w;
        height = h;

        currentx = 0;
        currenty = 0;

        stepr = (maxr - minr) / width;
        stepi = (maxi - mini) / height;

        stepr = stepi = Math.max(stepr, stepi);

        maxr = minr + (width * stepr);
        maxi = mini + (height * stepi);

        imageData = context.createImageData(width, height);

        step = initialStep;

        done = false;

        colorPalette = new jPalette.ColorMap(256, [
                new jPalette.Color(255, 0, 0, 255),
                new jPalette.Color(255, 255, 0, 255),
                new jPalette.Color(0, 255, 255, 255),
                new jPalette.Color(0, 0, 255, 255),
              ]);
        
        // Generate a predefined color palette.
        // colorPalette = jPalette.ColorMap.get('whitetoblack')(256);
        // colorPalette = jPalette.ColorMap.get('rgb')(256);
        // colorPalette = jPalette.ColorMap.get('fire')(256);
        // colorPalette = jPalette.ColorMap.get('sky')(256);
        // colorPalette = jPalette.ColorMap.get('night')(256);
    }

    function update(delta)
    {
        for (var i = 1; i <= width; i += step)
        {
            doPixelMandel(delta);
            //doPixelJulia(delta);
        }
    }

    function doPixelJulia(delta)
    {
        if (done)
        {
            return;
        }

        var zx = minr + (currentx * stepr);
        var zy = mini + (currenty * stepi);

        // Iterate
        var iterations = 0;
        while (iterations < maxIterations && (zx * zx + zy * zy <= 4)) {
            var xtemp = zx * zx - zy * zy
            zy = 2 * zx * zy + cy 
            zx = xtemp + cx

            iterations++;
        }

        // Get palette color based on the number of iterations
        var color = {};
        if (iterations == maxIterations) {
            color = { r: 0, g: 0, b: 0};
        } else {
            var index = iterations % 256;
            color = colorPalette.getColorByIndex(index);
        }

        setPixels(currentx, currenty, color, step);
        nextPixel();

        /*
        f(z)=z^2+c
        For each pixel (x, y) on the screen, do:
        {
            zx = scaled x coordinate of pixel (scaled to lie in the Mandelbrot X scale (-2.5, 1))
            // zx represents the real part of z
            zy = scaled y coordinate of pixel (scaled to lie in the Mandelbrot Y scale (-1, 1))
            // zy represents the imaginary part of z 

            iteration = 0
            max_iteration = 1000
        
            while (zx*zx + zy*zy < 4  AND  iteration < max_iteration) 
            {
                xtemp = zx*zx - zy*zy
                zy = 2*zx*zy  + cy 
                zx = xtemp + cx
            
                iteration = iteration + 1 
            }
        
            if (iteration == max_iteration)
                return black;
            else
                return iteration;
        }
        */
        /*
        f(z)=z^n+c
        For each pixel (x, y) on the screen, do:
        {
            zx = scaled x coordinate of pixel (scaled to lie in the Mandelbrot X scale (-2.5, 1))
            zy = scaled y coordinate of pixel (scaled to lie in the Mandelbrot Y scale (-1, 1))
        
            iteration = 0
            max_iteration = 1000
        
            while (zx*zx + zy*zy < 4  AND  iteration < max_iteration) 
            {
                float xtmp = (zx*zx + zy*zy) ^ (n / 2) * cos(n * atan2(zy, zx)) + cx;
                zy = (zx*zx + zy*zy) ^ (n / 2) * sin(n * atan2(zy, zx)) + cy;
                zx=xtmp;
            
                iteration = iteration + 1
            } 
            if (iteration == max_iteration)
                return black;
            else
                return iteration;
        }
        */
    }

	function doPixelMandel(delta) {

        if (done)
        {
            return;
        }

        var rx = 0;
        var ry = 0;
        var a = 0;
        var b = 0;

        var currentr = minr + (currentx * stepr);
        var currenti = mini + (currenty * stepi);

        // Iterate
        var iterations = 0;
        while (iterations < maxIterations && (rx * rx + ry * ry <= 4)) {
            rx = a * a - b * b + currentr;
            ry = 2 * a * b + currenti;

            // Next iteration
            a = rx;
            b = ry;
            iterations++;
        }


        // Get palette color based on the number of iterations
        var color = {};
        if (iterations == maxIterations) {
            color = { r: 0, g: 0, b: 0};
        } else {
            var index = iterations % 256;
            color = colorPalette.getColorByIndex(index);
        }

        setPixels(currentx, currenty, color, step);

        nextPixel();
	}

    function nextPixel()
    {
        currentx += step;

        if (currentx >= width)
        {
            currentx = 0;
            currenty += step;

            // console.log(currentx + " " + currenty + " = " + currentr + " " + currenti);

            if (currenty >= height)
            {
                if (step == 1)
                {
                    done = true;
                    Base.stop();
                }
                else
                {
                    step -= stepDecrement;
                    currentx = 0;
                    currenty = 0;
                }
            }
        }
    }

	function render(context) {
        context.putImageData(imageData, 0, 0);

        context.fillStyle = "#FFFFFF";
        context.font = "15px Arial";
        var extent = "(" + minr + ", " + mini + ") - (" + maxr + ", " + maxi + ")";
        context.fillText(extent, 10, height - 30);
        var cliked = "(" + clickedr + ", " + clickedi + ")";
        context.fillText(cliked, 10, height - 10);
	}

    function setPixel(x, y, color)
    {
        // Apply the color
        var pixelindex = (y * width + x) * 4;
        imageData.data[pixelindex] = color.r;
        imageData.data[pixelindex + 1] = color.g;
        imageData.data[pixelindex + 2] = color.b;
        imageData.data[pixelindex + 3] = 255;
    }

    function setPixels(x, y, color, size)
    {
        if (size == 1)
        {
            setPixel(x, y, color);
            return;
        }

        // Apply the color
        for (var yy = 0; yy < size; yy++)
        {
            var pixelindex = ((y + yy) * width + x) * 4;
            for (xx = 0; xx < size; xx++)
            {
                imageData.data[pixelindex] = color.r;
                imageData.data[++pixelindex] = color.g;
                imageData.data[++pixelindex] = color.b;
                imageData.data[++pixelindex] = 255;
                pixelindex++;
            }
        }
    }

    /*
    * Convert hue-saturation-value/luminosity to RGB.
    *
    * Input ranges:
    *   H =   [0, 360] (integer degrees)
    *   S = [0.0, 1.0] (float)
    *   V = [0.0, 1.0] (float)
    */
    function hsv_to_rgb(h, s, v)
    {
        if ( v > 1.0 ) v = 1.0;
        var hp = h / 60.0;
        var c = v * s;
        var x = c * (1 - Math.abs((hp % 2) - 1));
        var rgb = [0, 0, 0];

        if ( 0 <= hp && hp < 1 ) rgb = [c, x, 0];
        if ( 1 <= hp && hp < 2 ) rgb = [x, c, 0];
        if ( 2 <= hp && hp < 3 ) rgb = [0, c, x];
        if ( 3 <= hp && hp < 4 ) rgb = [0, x, c];
        if ( 4 <= hp && hp < 5 ) rgb = [x, 0, c];
        if ( 5 <= hp && hp < 6 ) rgb = [c, 0, x];

        var m = v - c;
        rgb[0] += m;
        rgb[1] += m;
        rgb[2] += m;

        rgb[0] *= 255;
        rgb[1] *= 255;
        rgb[2] *= 255;
        return rgb;
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
