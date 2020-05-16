class Boid
{
    constructor(x, y)
    {
        this.pos = createVector(x, y);
        this.dir = createVector(0, 0);
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
        this.r = 5;
        this.maxspeed = 4 * random() + 3;
        this.maxforce = 0.1;
        this.color = 255;

        this.vel.setMag(0.5);
        this.sensorRange = this.r * 10;
        this.sensorAngleR = radians(20);
        this.sensorAngleL = radians(-20);
    }

    checkSensors()
    {
        var dl = this.checkSensor(this.sensorAngleL);
        var dr = this.checkSensor(this.sensorAngleR);
        return { dR: dr, dL: dl};
    }

    checkCollisions()
    {
        for (var w of walls)
        {
            if (doesLineInterceptCircle(w.p1, w.p2, this.pos, this.r))
            {
                return true;
            }
        }

        return false;
    }

    checkSensor(sensorAngle)
    {
        var theta = this.vel.heading(); // + radians(90);

        var n = p5.Vector.fromAngle(sensorAngle);
        n.rotate(theta);
        n.setMag(this.sensorRange);
        var v = this.pos.copy();
        v.add(n);

        for (var w of walls)
        {
            var i = intersect(this.pos, v, w.p1, w.p2);
            if (i != null)
            {
                // ellipse(i.x, i.y, 5);
                let d = p5.Vector.dist(this.pos, i);
                return d;
            }
        }

        return null;
    }

    think()
    {
        const rot = 10;
        var result = this.checkSensors();
        if (result.dR != null && result.dL != null)
        {
            this.vel.mult(0);
        }
        else if (result.dR != null)
        {
            this.vel.rotate(radians(-rot));
        }
        else if (result.dL != null)
        {
            this.vel.rotate(radians(rot));
        }

        // var a = p5.Vector.random2D();
        // a.setMag(0.1);
        // this.applyForce(a);
    }

    update()
    {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.wrapAround();
    }

    wrapAround() 
    {
        if (this.pos.x < -this.r)  this.pos.x = width + this.r;
        if (this.pos.y < -this.r)  this.pos.y = height + this.r;
        if (this.pos.x > width + this.r) this.pos.x = -this.r;
        if (this.pos.y > height + this.r) this.pos.y = -this.r;
    }

    show() 
    {
        fill(255);
        noStroke();
        //stroke(this.color, 100, 100);
        strokeWeight(1);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }

    showSensors()
    {
        stroke(0, 255, 0);
        var theta = this.vel.heading(); // + radians(90);
        push();
        translate(this.pos.x,this.pos.y);
        rotate(theta);  

        var l = p5.Vector.fromAngle(this.sensorAngleL);
        l.setMag(this.sensorRange);
        line (0, 0, l.x, l.y);

        var r = p5.Vector.fromAngle(this.sensorAngleR);
        r.setMag(this.sensorRange);
        line (0, 0, r.x, r.y);

        pop();
    }

    // A method that calculates and applies a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    seek(target) 
    {
        let desired = p5.Vector.sub(target, this.pos); // A vector pointing from the location to the target
        // Normalize desired and scale to maximum speed
        desired.normalize();
        desired.mult(this.maxspeed);
        // Steering = Desired minus Velocity
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce); // Limit to maximum steering force
        this.applyForce(steer);
        return steer;
    }

    applyForce (f) 
    {
        this.acc.add(f);
    }
}
