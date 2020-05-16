var node = {
    x: 0,
    y: 0,
    edges: [],
	create: function(x, y) {
		var obj = Object.create(this);
		obj.x = x;
		obj.y = y;
		obj.edges = [];
		return obj;
	}
};


var edge = {
	a: 0,
	b: 0,
	dist: 0,

	create: function(a, b, dist) {
		var obj = Object.create(this);
		obj.a = a;
		obj.b = b;
		obj.dist = dist;
		return obj;
	}
};