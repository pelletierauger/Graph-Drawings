let Edge = function(a, b, g) {
    this.a = a;
    this.b = b;
    this.i = g.edges.length
};

Edge.prototype.show = function() {
    // line(this.a.pos.x, this.a.pos.y, this.b.pos.x, this.b.pos.y);
    add3DLine(
        this.a.pos.x, this.a.pos.y, this.a.pos.z,
        this.b.pos.x, this.b.pos.y, this.b.pos.z,
        1/5,
        1, 0, 0, 0.0001
    );
    add3DLine(
        this.a.pos.x, this.a.pos.y, this.a.pos.z,
        this.b.pos.x, this.b.pos.y, this.b.pos.z,
        1/45,
        1, 0, 0, 0.1
    );
};

// For very blurry results
if (true) {

Edge.prototype.show = function() {
    // line(this.a.pos.x, this.a.pos.y, this.b.pos.x, this.b.pos.y);
    add3DLine(
        this.a.pos.x, this.a.pos.y, this.a.pos.z,
        this.b.pos.x, this.b.pos.y, this.b.pos.z,
        1/3,
        1, 0, 0, 0.00001
    );
    // add3DLine(
    //     this.a.pos.x, this.a.pos.y, this.a.pos.z,
    //     this.b.pos.x, this.b.pos.y, this.b.pos.z,
    //     1/45,
    //     1, 0, 0, 0.1
    // );
};

}

// For the edge shimmer
if (false) {

Vertex.prototype.show = function() {
    // vertices.push(this.pos.x, this.pos.y, this.pos.z, 1);
    if (this.selected) {
        selectedVertices.push(this.pos.x, this.pos.y, this.pos.z, 1);
    }
};
Edge.prototype.show = function() {
    // line(this.a.pos.x, this.a.pos.y, this.b.pos.x, this.b.pos.y);
    add3DLine(
        this.a.pos.x, this.a.pos.y, this.a.pos.z,
        this.b.pos.x, this.b.pos.y, this.b.pos.z,
        1/3,
        1, 0, 0, 0.00001
    );
    // add3DLine(
    //     this.a.pos.x, this.a.pos.y, this.a.pos.z,
    //     this.b.pos.x, this.b.pos.y, this.b.pos.z,
    //     1/45,
    //     1, 0, 0, 0.1
    // );
    let l = (drawCount + this.i) * 0.05  % 1;
    let lx = lerp(this.a.pos.x, this.b.pos.x, l);
    let ly = lerp(this.a.pos.y, this.b.pos.y, l);
    let lz = lerp(this.a.pos.z, this.b.pos.z, l);
    let alpha = Math.abs((l - 0.5) * 2) * -1 + 1;
    alpha = Math.pow(alpha, 0.5) * 2;
    vertices.push(lx, ly, lz, alpha);
};

}

// For the blue lines
if (false) {

Edge.prototype.show = function() {
    // line(this.a.pos.x, this.a.pos.y, this.b.pos.x, this.b.pos.y);
    add3DLine(
        this.a.pos.x, this.a.pos.y, 1,
        this.b.pos.x, this.b.pos.y, 1,
        1/5,
        1, 0, 0, 0.2
    );
    add3DLine(
        this.a.pos.x, this.a.pos.y, 1,
        this.b.pos.x, this.b.pos.y, 1,
        1/45,
        1, 0, 0, 0.75
    );
};

}