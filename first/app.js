const log = require('./logger');
const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');

var emitter = new EventEmitter();

log.log("Hello Node ");

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
