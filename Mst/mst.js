class Mst {
    constructor(list) {
        this.visited = [];
        this.unvisited = [];
        this.edges = [];

        let boundary = new Rectangle(width / 2, height / 2, width, height);
        this.qtree = new QuadTree(boundary, 5);

        for (let v of list) {
            this.unvisited.push(v);
        }

        this.visited.push(this.unvisited[0]);
        this.unvisited.splice(0, 1);


        for (let p of this.unvisited) {
            let point = new Point(p.pos.x, p.pos.y, p);
            this.qtree.insert(point);
        }
    }

    calculate() {
        while (this.unvisited.length > 0) {



            let minDist = width * width * height * height;
            let best1 = -1;
            let best2 = -1;
            let bu = null;
            for (let v of this.visited) {

                let range = new Circle(v.pos.x, v.pos.y, 50);
                let points = this.qtree.query(range);

                if (points.length === 0)
                {
                     range = new Circle(v.pos.x, v.pos.y, 100);
                     points = this.qtree.query(range);
                }

                if (points.length === 0)
                {
                     range = new Circle(v.pos.x, v.pos.y, 150);
                     points = this.qtree.query(range);
                }

                if (points.length === 0)
                {
                     range = new Circle(v.pos.x, v.pos.y, 200);
                     points = this.qtree.query(range);
                }

                for (let p of points) {
                    let u = p.userData;
                    let d = dist(v.pos.x, v.pos.y, u.pos.x, u.pos.y);
                    if (d < minDist) {
                        minDist = d;
                        best1 = v.ix;
                        best2 = u.ix;
                        bu = u;
                    }
                }
            }

            if (bu != null) {
                let bux = this.unvisited.indexOf(bu);
                this.unvisited.splice(bux, 1);
                this.qtree.remove(bu)
                this.visited.push(bu);
                let e = new Edge(best1, best2);
                this.edges.push(e);
            }
        }
    }
}

class Edge {
    constructor(node1, node2) {
        this.node1 = node1;
        this.node2 = node2;
    }
}
