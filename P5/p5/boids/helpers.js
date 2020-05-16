function intersect(p0, p1, p2, p3) {
    var s, s1_x, s1_y, s2_x, s2_y, t;

    s1_x = p1.x - p0.x;
    s1_y = p1.y - p0.y;
    s2_x = p3.x - p2.x;
    s2_y = p3.y - p2.y;
    s = (-s1_y * (p0.x - p2.x) + s1_x * (p0.y - p2.y)) / (-s2_x * s1_y + s1_x * s2_y);
    t = (s2_x * (p0.y - p2.y) - s2_y * (p0.x - p2.x)) / (-s2_x * s1_y + s1_x * s2_y);
    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
        return createVector(p0.x + (t * s1_x),  p0.y + (t * s1_y));
    }
    return null;
}

// Function to check intercept of line seg and circle
// A,B end points of line segment
// C center of circle
// radius of circle
// returns true if touching or crossing else false   
function doesLineInterceptCircle(A, B, C, radius) {
    var dist;
    const v1x = B.x - A.x;
    const v1y = B.y - A.y;
    const v2x = C.x - A.x;
    const v2y = C.y - A.y;
    // get the unit distance along the line of the closest point to
    // circle center
    const u = (v2x * v1x + v2y * v1y) / (v1y * v1y + v1x * v1x);
    
    
    // if the point is on the line segment get the distance squared
    // from that point to the circle center
    if(u >= 0 && u <= 1){
        dist  = (A.x + v1x * u - C.x) ** 2 + (A.y + v1y * u - C.y) ** 2;
    } else {
        // if closest point not on the line segment
        // use the unit distance to determine which end is closest
        // and get dist square to circle
        dist = u < 0 ?
                (A.x - C.x) ** 2 + (A.y - C.y) ** 2 :
                (B.x - C.x) ** 2 + (B.y - C.y) ** 2;
    }
    return dist < radius * radius;
}
