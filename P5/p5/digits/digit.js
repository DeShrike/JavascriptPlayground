function Digit(digit, offsetx, offsety) {
    this.digit = digit;
    this.offsetx = offsetx;
    this.offsety = offsety;
    this.vehicles = [];
}

Digit.prototype.init = function () {
    var points = font.textToPoints(this.digit, 0, 0, 192, {
        sampleFactor: 0.1
    });
    
    var maxy = 0;
    var miny = 100000;
    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        var vehicle = new Vehicle(pt.x + this.offsetx, pt.y + this.offsety);
        if (vehicle.target.y > maxy) {
            maxy = vehicle.target.y;
        }
        if (vehicle.target.y < miny) {
            miny = vehicle.target.y;
        }

        this.vehicles.push(vehicle);
    }

    for (var i = 0; i < this.vehicles.length; i++) {
        var v = this.vehicles[i];
        v.color = floor(map(v.target.y, miny, maxy, 0, 255));
    }
    
    console.log(this.digit + " = " + this.vehicles.length + " vehicles" );
}

Digit.prototype.update = function () {
    for (var i = 0; i < this.vehicles.length; i++) {
        var v = this.vehicles[i];
        v.behaviors();
        v.update();
    }
}

Digit.prototype.show = function() {
    stroke(255);
    for (var i = 0; i < this.vehicles.length; i++) {
        var v = this.vehicles[i];
        v.show();
    }
}