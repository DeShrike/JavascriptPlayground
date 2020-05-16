// @ts-check
"use strict";

class Vehicle {
    constructor(x, y, ix) {
        this.pos = createVector(x, y);
        this.r = 3;
        this.v = p5.Vector.random2D().mult(3);
        this.ix = ix;
    }

    update() {
        this.pos.add(this.v);

        this.v = this.v.rotate((random() - 0.5) * 0.5);
    }

    checkBounds() {
        if (this.pos.x < this.r) {
            this.v.x *= -1;
        }

        if (this.pos.y < this.r) {
            this.v.y *= -1;
        }

        if (this.pos.x > width - this.r) {
            this.v.x *= -1;
        }

        if (this.pos.y > height - this.r) {
            this.v.y *= -1;
        }
    }

    show() {
        noStroke();
        fill(255);
        circle(this.pos.x, this.pos.y, this.r * 2);
    }
}
