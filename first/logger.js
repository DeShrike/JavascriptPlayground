
const url = 'http://logger.io/log';

function log(message){

    console.log(message);

}

module.exports.log = log;

console.log(__filename);
console.log(__dirname);
