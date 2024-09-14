let Vertex = function(x, y, z, g) {
    this.pos = { x: x, y: y, z: z };
    this.edges = [];
    this.selected = false;
    this.i = g.vertices.length;
    g.vertices.push(this);
    // var frequencies = [98.00, 123.47, 146.83, 196.00, 246.94, 293.66];
    let r = floor(random(6));
    // let r = floor(random(frequencies.length));
    this.freq = r;
    // this.freq = frequencies[r];
    // this.voice = new p5.Oscillator();
    // this.voice.setType("triangle");
    // this.env = new p5.Envelope();
    // this.env.setADSR(0.05, 0.1, 0.5, 2);
    // this.env.setRange(0.9, 0);
    // this.voice.start();
    // this.voice.freq(frequencies[r]);
    // this.voice.amp(this.env);
    this.functions = false;
};

Vertex.prototype.show = function() {
    vertices.push(this.pos.x, this.pos.y, this.pos.z, 1);
    if (this.selected) {
        selectedVertices.push(this.pos.x, this.pos.y, this.pos.z, 1);
    }
};

if (false) {

Vertex.prototype.show = function() {
    // vertices.push(this.pos.x, this.pos.y, this.pos.z, 1);
    if (this.edges.length) {
        let l = (drawCount + this.i) * 0.05  % 1;
        let a = this.edges[0].a.pos;
        let b = this.edges[0].b.pos;
        let lx = lerp(a.x, b.x, l);
        let ly = lerp(a.y, b.y, l);
        let lz = lerp(a.z, b.z, l);
        vertices.push(lx, ly, lz, Math.abs((l - 0.5) * 2) * -1 + 1);
    }
    if (this.selected) {
        selectedVertices.push(this.pos.x, this.pos.y, this.pos.z, 1);
    }
};

Vertex.prototype.show = function() {
    // vertices.push(this.pos.x, this.pos.y, this.pos.z, 1);
    if (this.edges.length) {
        let l = (drawCount + this.i) * 0.05  % 1;
        let a = this.edges[0].a.pos;
        let b = this.edges[0].b.pos;
        let lx = lerp(a.x, b.x, l);
        let ly = lerp(a.y, b.y, l);
        let lz = lerp(a.z, b.z, l);
        let alpha = Math.abs((l - 0.5) * 2) * -1 + 1;
        vertices.push(lx, ly, lz, Math.pow(alpha, 0.5));
    }
    if (this.selected) {
        selectedVertices.push(this.pos.x, this.pos.y, this.pos.z, 1);
    }
};

Vertex.prototype.show = function() {
    // vertices.push(this.pos.x, this.pos.y, this.pos.z, 1);
    if (this.edges.length) {
        for (let i = 0; i < this.edges.length; i++) {
            let l = (drawCount + this.i + i) * 0.05  % 1;
            let a = this.edges[i].a.pos;
            let b = this.edges[i].b.pos;
            let lx = lerp(a.x, b.x, l);
            let ly = lerp(a.y, b.y, l);
            let lz = lerp(a.z, b.z, l);
            vertices.push(lx, ly, lz, Math.abs((l - 0.5) * 2) * -1 + 1);
        }
    }
    if (this.selected) {
        selectedVertices.push(this.pos.x, this.pos.y, this.pos.z, 1);
    }
};

}

Vertex.prototype.addEdge = function(e) {
    this.edges.push(e);
};

Vertex.prototype.addFunction = function(n) {
    this.functions = n;
};