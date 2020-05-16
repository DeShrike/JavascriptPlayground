function Clock() {
    this.digits = [];
}

Clock.prototype.init = function(){
    var offset = 30;
    var increment = 120;

    for (var d = 0; d <= 4; d++)
    {
        var digit = new Digit(d + "", offset, 170);
        this.digits.push(digit);
        offset += increment;
    }

    var digit = new Digit(":", offset, 170);
    this.digits.push(digit);
    offset += increment;

    var digit2 = new Digit(".", offset, 170);
    this.digits.push(digit2);
    offset += increment;

    for (var i = 0; i < this.digits.length; i++) {
        var digit = this.digits[i];
        digit.init();
    }
}

Clock.prototype.update = function() {
    for (var i = 0; i < this.digits.length; i++) {
        var d = this.digits[i];
        d.update();
    }
}

Clock.prototype.show = function() {
    for (var i = 0; i < this.digits.length; i++) {
        var d = this.digits[i];
        d.show();
    }
}
