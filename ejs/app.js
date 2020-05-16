const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// or app.use(express.static('public'))
// or app.use('/static', express.static('public'))
// or app.use('/static', express.static(path.join(__dirname, 'public')))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/x', function (req, res) {
	res.status(500).send('Something broke!')
});

app.get('/y', function (req, res) {
	res.status(404).send("Sorry can't find that!")
});

app.get('/', function (req, res) {
	res.render('index', { names: ["Piet", "Pol", "Jan"], title: "homepage", kind: 1 });
});

