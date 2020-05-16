const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');

var emitter = new EventEmitter();
/*
const info = path.parse(__filename);
console.log(info);

fs.readdir('./', function (err, files) {
    if (err)
    {
        console.log('Error: ', err)
    }
    else{
        console.log(files);
        emitter.emit('FScompleted', { id: 1, method: 'readdir' });
    }
});

emitter.on('FScompleted', function(arg) {
    console.log('FScompleted', arg.id, arg.method);
});
*/

var runs = 2147483647;
	   
var counts = new Array(36 + 1);
var current = 0;
var i;

for (i=0;i<=36;i++)
{
    counts[i] = 0;
}

do {
    current++;
    doRun();
} while (current < runs);

console.log("Done");

for (i=0;i<=36;i++)
{
    if (counts[i] > 0)
    {
        console.log(counts[i]);
        //console.log(i + "\t" + counts[i]);
    }
}


function doRun() {
    var b1 = random(1, 6 + 1);
    var b2 = random(1, 6 + 1);
    var b3 = random(1, 6 + 1);
    var b4 = random(1, 6 + 1);
    var b5 = random(1, 6 + 1);
    var b6 = random(1, 6 + 1);

    var total = b1 + b2 + b3 + b4 + b5 + b6;
	if (current % 10000 == 0)
	{
	    console.log("Run " + current + ": " + b1 + " - " + b2 + " - " + b3 + " - " + b4 + " - " + b5 + " - " + b6);
	}
    counts[total]++;
}

function random (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
