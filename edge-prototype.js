let Edge = function(a, b) {
    this.a = a;
    this.b = b;
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