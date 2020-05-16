var Kermis = (function() {

	var runs = 100;
    var counts = new Array(36 + 1);
    var current = 0;

    function start() {
        current = 0;
        do {
            current++;


        } while (current < runs);
    }

    function doRun() {

    }

    return { 
            start: start
        }
})();
