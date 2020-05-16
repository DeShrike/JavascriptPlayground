const express = require('express');
const bodyParser = require('body-parser');

// https://www.youtube.com/watch?v=pKd0Rpw7O48

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/api/scanner/auth', (req, res) => {
   
    console.log(req.body);

    const token = { Username: 'John', Token: 'ABCDEF', Expires: '2018-04-30' }
    res.send(token);
    //console.log(req.body.username);
    //console.log(req.body.password);
});

app.get('/api/scanitems', (req, res) => {

    res.send('Hello World');
    console.log(req.headers);
    console.log("API GET");

});

app.get('/api/scanner/:id', (req, res) => {

    res.send('Hello World');
    console.log("API GET");

});

app.put('/api/scanner/collect', (req, res) => {

    console.log(req.headers);
    console.log(req.body);

    res.send('Hello World');
    console.log("API PUT");

}); 

app.post('/api/scanner/:id', (req, res) => {

    console.log(req.headers);
    console.log(req.body);

    res.send('Hello World');
    console.log("API POST");

});

app.delete('/api/scanitems/:id', (req, res) => {

    res.send('Hello World');
    console.log("API DELETE");

});

const port = process.env.PORT || 3000;

app.listen(port, "10.192.10.118", () => { console.log('Listening on port ' + port) });

