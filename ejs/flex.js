const ejs = require('ejs');

const model = {
	model: {
		title: "The Title",
		type: 1,
		rows: 2,
		columns: 4,
		blocks: [
			{ title: "Block 1" },
			{ title: "Block 2" },
			{ title: "Block 3" },
			{ title: "Block 4" },
			{ title: "Block 5" },
			{ title: "Block 6" },
			{ title: "Block 7" },
			{ title: "Block 8" },
		]
	}
};

ejs.renderFile("templates/flex.ejs", model, { compileDebug: false, debug: false }, function (err, str) {
	// console.log(err);
	console.log(str);
	console.log(__dirname);
});

