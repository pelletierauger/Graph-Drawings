let Vertex = function(x, y, z, g) {
    this.pos = { x: x, y: y, z: z };
    this.edges = [];
    this.selected = false;
    g.push(this);
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

Vertex.prototype.addEdge = function(e) {
    this.edges.push(e);
};

Vertex.prototype.addFunction = function(n) {
    this.functions = n;
};