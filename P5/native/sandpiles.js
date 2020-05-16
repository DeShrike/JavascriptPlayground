window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        size = 200,
		pileWidth = size + 1,
        pileHeight = size + 1,
        cellSize = 1,
        offsetx = 0,
        offsety = 0,
        maxPile = 7,
        previousValue = -1,
        stopRequested = false,
		cells = [],
		newCells = [];

    init();
    iterate();

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
            case 107: // +
                cellSize++;
                break;
            case 109: // -
                cellSize--; 
                if (cellSize < 1)
                {
                    cellSize = 1;
                }
                break;
			case 27: // escape
                stopRequested = true;
				break;
        }
        console.log(event.keyCode);
    }

    function iterate()
    {
        draw();
        if (update() === false || stopRequested)
        {
            return;
        }

        requestAnimationFrame(iterate);
    }

    function init() {
        document.body.addEventListener("keydown", onKeyDown);

        for (var y = 0; y < pileHeight; y++)
        {
            cells[y] = [];
            newCells[y] = [];
        }
        
        for (var x = 0; x < pileWidth; x++)
        {
            for (var y = 0; y < pileHeight; y++)
            {
                cells[x][y] = 0;
                newCells[x][y] = 0;
            }
        }

        cells[size / 2][size / 2] = 100000;
	}

    function update() {

        var hasToppled = topple();
        return hasToppled;
	}

    function draw() {
        context.clearRect(0, 0, width, height);
        context.fillStyle = "#000";
        previousValue = -1;
        var startx = 0;
        var px = startx;
        var py = 0;
        for (var y = 0; y < pileHeight; y++)
        {
            for (var x = 0; x < pileWidth; x++)
            {
                setFillStyle(cells[x][y]);
                context.fillRect(px, py, cellSize, cellSize);
                px += cellSize;
            }
            py += cellSize;
            px = startx;
        }
    }
    
    function setFillStyle(count) {
        if (count === previousValue)
        {
            return;
        }

        var fill = "#000";
        switch (count)
        {
            case 0:
                break;
            case 1:
                fill = "#FF0000";
                break;
            case 2:
                fill = "#00FF00";
                break;
            case 3:
                fill = "#0000FF";
                break;
            case 4:
                fill = "#FFFF00";
                break;
            case 5:
                fill = "#FF00FF";
                break;
            case 6:
                fill = "#00FFFF";
                break;
            case 7:
                fill = "#FF5050";
                break;
            default:
                fill = "#FFFFFF";
                break;
        }

        context.fillStyle = fill;
        previousValue = count;
    }

    function topple() {
        console.log("topple");
        var hasToppled = false;
        for (var y = 0; y < pileHeight; y++)
        {
            for (var x = 0; x < pileWidth; x++)
            {
                newCells[x][y] = 0;
            }
        }

        for (var y = 0; y < pileHeight; y++)
        {
            for (var x = 0; x < pileWidth; x++)
            {
                var pile = cells[x][y];
                if (pile > maxPile)
                {
                    var rest = pile % 4;
                    var div = (pile - rest) / 4;
                    newCells[x][y] = rest;
                    addToCell(x - 1, y, div);
                    addToCell(x + 1, y, div);
                    addToCell(x, y + 1, div);
                    addToCell(x, y - 1, div);
                    hasToppled = true;
                }
                else
                {
                    newCells[x][y] += cells[x][y];
                }
            }
        }

        for (var y = 0; y < pileHeight; y++)
        {
            for (var x = 0; x < pileWidth; x++)
            {
                cells[x][y] = newCells[x][y];
            }
        }

        return hasToppled;
    }

    function addToCell(x, y, count)
    {
        if (x < 0 || x >= pileWidth)
        {
            return;
        }

        if (y < 0 || y >= pileHeight)
        {
            return;
        }

        newCells[x][y] += count;
    }
};
