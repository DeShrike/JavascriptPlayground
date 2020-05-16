const ejs = require('ejs');

console.log(__dirname);


console.log("render");

const people = ['geddy', 'neil', 'alex'];

const html = ejs.render('<%= people.join(", "); %>', {people: people});

console.log(html);

console.log("renderFile");

const model = { model: { 
	title: "The Title",
	type: 1
}};

ejs.renderFile("templates/module.ejs", model, {compileDebug: false, debug: false}, function(err, str){
	// console.log(err);
    console.log(str);
});
