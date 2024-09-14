if (false) {

// The correct 3d version that preserves the glow while rotating
smoothLine3D.vertText = `
    // beginGLSL
    #define pi 3.1415926535897932384626433832795
    attribute float index;
    attribute vec3 coordinatesA;
    attribute vec3 coordinatesB;
    attribute vec4 color;
    attribute float width;
    attribute vec2 uv;
    uniform vec2 resolution;
    uniform float time;
    varying vec4 c;
    varying vec2 uvs;
    varying vec2 wh;
    varying float t;
    float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    vec2 rotateUV(vec2 uv, float rotation, float mid) {
        return vec2(
          cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
          cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
        );
    }
    mat4 translate(float x, float y, float z) {
        return mat4(
            1.0,  0.0,  0.0,  0.0,
            0.0,  1.0,  0.0,  0.0,
            0.0,  0.0,  1.0,  0.0,
            x,      y,    z,  1.0
        );
    }
    mat4 xRotate(float a) {
        return mat4(
           1.0, 0.0,        0.0, 0.0,
           0.0, cos(a), -sin(a), 0.0,
           0.0, sin(a),  cos(a), 0.0,
           0.0, 0.0,        0.0, 1.0
        );
    }
    mat4 yRotate(float a) {
        return mat4(
           cos(a),  0.0, sin(a), 0.0,
           0.0,     1.0,    0.0, 0.0,
           -sin(a), 0.0, cos(a), 0.0,
           0.0,     0.0,    0.0, 1.0
        );
    }
    mat4 zRotate(float a) {
        return mat4(
           cos(a), -sin(a), 0.0, 0.0,
           sin(a),  cos(a), 0.0, 0.0,
           0.0,        0.0, 1.0, 0.0,
           0.0,        0.0, 0.0, 1.0
        );
    }
    void main(void) {
        float ratio = (resolution.y / resolution.x);
        vec2 pos = vec2(0., 0.);
        vec4 pos0 = vec4(coordinatesA, 1.);
        vec4 pos1 = vec4(coordinatesB, 1.);
        // pos0 = translate(0.0, 0., 1.5) * yRotate(time*2e-2) * xRotate(time*2e-2) * translate(0.0, 0., -1.5) * pos0;
        // pos1 = translate(0.0, 0., 1.5) * yRotate(time*2e-2) * xRotate(time*2e-2) * translate(0.0, 0., -1.5) * pos1;
        pos0.xy *= map(sin(time *1e-1+pos0.y*2.), -1., 1., 0.95, 1.0);
        pos1.xy *= map(sin(time *1e-1+pos1.y*2.), -1., 1., 0.95, 1.0);
        // pos0.xyz *= 0.15
        // pos1.xyz *= 0.1;
        // pos0 = zRotate(time*0.5e-2) * pos0;
        // pos1 = zRotate(time*0.5e-2) * pos1;
        pos0 = translate(cos(pos0.x+time*2e-1)*0.01, sin(pos0.y+time*2e-1)*0.01, 0.0) * pos0;
        pos1 = translate(cos(pos0.x+time*2e-1)*0.01, sin(pos0.y+time*2e-1)*0.01, 0.0) * pos1;
        // pos0 = translate(0.0, 0.0, 1.5) * pos0;
        // pos1 = yRotate(-time*0.5e-2) * pos1;
        // pos1 = xRotate(-time*0.5e-2) * pos1;
        // pos1 = translate(0.0, 0.0, 1.5) * pos1;
        pos0.xy = pos0.xy / pos0.z;
        pos1.xy = pos1.xy / pos1.z;
        float a = atan(pos1.y - pos0.y, pos1.x - pos0.x);
        float pi75 = pi * 0.75;
        float pi25 = pi * 0.25;
        float w = width * map(sin(time *1e-1+pos1.y*2.), -1., 1., 0.95, 2.0);
        if (index == 0.) {
            pos = pos0.xy + vec2(cos(a + pi75), sin(a + pi75)) * w;
        } else if (index == 1.) {
            pos = pos0.xy + vec2(cos(a - pi75), sin(a - pi75)) * w;
        } else if (index == 2.) {
            pos = pos1.xy + vec2(cos(a - pi25), sin(a - pi25)) * w;
        } else if (index == 3.) {
            pos = pos1.xy + vec2(cos(a + pi25), sin(a + pi25)) * w;
        }
        pos.x *= ratio;
        gl_Position = vec4(pos.x, pos.y, 0.0, 1.);
        wh = vec2(w * sin(pi75), length(pos1.xy - pos0.xy));
        c = color;
        uvs = uv;
        t = time;
    }
    // endGLSL
`;
smoothLine3D.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec4 c;
    varying vec2 uvs;
    varying vec2 wh;
    varying float t;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    void main(void) {
        vec2 fc = gl_FragCoord.xy;
        vec2 pos = gl_PointCoord;
        float rando = rand(pos);
        vec2 fwh = vec2(wh.x*2., wh.y+(wh.x*2.));
        vec2 uv = uvs * fwh;
        uv -= fwh * 0.5;
        float radius = wh.x;
        vec2 size = fwh * 0.5 - radius;
        radius *= 2.;
        float col = length(max(abs(uv), size) - size) - radius;
        col = min(col * -1. * (1. / radius), 1.0);
        col = pow(col, 3.) * 0.75 + pow(col, 43.);
        col = smoothstep(0., 1., col);
        // col = mix(pow(col, 10.)*0.25, col, sin(time*0.1+pos.y*0.5e1)*0.5+0.5);
                // c2l =x(pow(col, 10.)*0.2, col, sin(t*0.1+pos.y*0.5e1)*0.5+0.5);
                col = mix(pow(col, 10.)*0.2, col, sin(-t*0.1+length(pos * vec2(16./9.,1.))*0.125e1)*0.5+0.5);
        gl_FragColor = vec4(c.rgb, c.a * (max(col, 0.) - (rando * 0.05)));
        gl_FragColor.g = pow(col, 2.) *  0.2;
        gl_FragColor.b = pow(col, 2.) *  0.2;
        gl_FragColor.a = min(1., gl_FragColor.a + pow(col, 2.) *  0.25);
        // gl_FragColor.rgb = gl_FragColor.gbr;
    }
    // endGLSL
`;
smoothLine3D.vertText = smoothLine3D.vertText.replace(/[^\x00-\x7F]/g, "");
smoothLine3D.fragText = smoothLine3D.fragText.replace(/[^\x00-\x7F]/g, "");
smoothLine3D.init();

// A version of smoothDots3D that adjusts the dot size according to its Z value
smoothDots3D.vertText = `
    // beginGLSL
    attribute vec4 coordinates;
    uniform float time;
    uniform vec2 resolution;
    varying float t;
    float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    mat4 translate(float x, float y, float z) {
        return mat4(
            1.0,  0.0,  0.0,  0.0,
            0.0,  1.0,  0.0,  0.0,
            0.0,  0.0,  1.0,  0.0,
            x,      y,    z,  1.0
        );
    }
    mat4 xRotate(float a) {
        return mat4(
           1.0, 0.0,        0.0, 0.0,
           0.0, cos(a), -sin(a), 0.0,
           0.0, sin(a),  cos(a), 0.0,
           0.0, 0.0,        0.0, 1.0
        );
    }
    mat4 yRotate(float a) {
        return mat4(
           cos(a),  0.0, sin(a), 0.0,
           0.0,     1.0,    0.0, 0.0,
           -sin(a), 0.0, cos(a), 0.0,
           0.0,     0.0,    0.0, 1.0
        );
    }
    mat4 zRotate(float a) {
        return mat4(
           cos(a), -sin(a), 0.0, 0.0,
           sin(a),  cos(a), 0.0, 0.0,
           0.0,        0.0, 1.0, 0.0,
           0.0,        0.0, 0.0, 1.0
        );
    }
    void main(void) {
        float ratio = resolution.y / resolution.x;
        vec4 pos = vec4(coordinates.xyz, 1.);
        pos.xy *= map(sin(time *1e-1+pos.y*2.), -1., 1., 0.95, 1.0);
        pos = translate(cos(pos.x+time*2e-1)*0.01, sin(pos.y+time*2e-1)*0.01, 0.0) * pos;
        pos.x *= ratio;
        gl_Position = vec4(pos.x, pos.y, 0.0, pos.z);
        gl_PointSize = 25. / pos.z * coordinates.w;
    }
    // endGLSL
`;
smoothDots3D.fragText = `
    // beginGLSL
    precision mediump float;
    // uniform float time;
    varying float t;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        vec2 pos = gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 0.5;
        float l = 1.0 - length(pos - vec2(0.5)) * 4.;
        // l += (1.0 - length(pos - vec2(0.5)) * 2.) * 0.125;
        // l += distSquared * 0.25;
        distSquared -= 1.2;
        l += (distSquared - (l * distSquared));
        float halo = (1.0 - length(pos - vec2(0.5)) * 2.)*0.5;
        l = smoothstep(0., 1., l);
        l = pow(l, 3.);
        float noise = rand(pos - vec2(cos(t), sin(t))) * 0.0625;
        gl_FragColor = vec4(vec3(1.0, pow(l, 2.)*0.25, 0.25), (l+halo-noise)*0.5);
        // gl_FragColor.rgb = gl_FragColor.bgr;
    }
    // endGLSL
`;
smoothDots3D.vertText = smoothDots3D.vertText.replace(/[^\x00-\x7F]/g, "");
smoothDots3D.fragText = smoothDots3D.fragText.replace(/[^\x00-\x7F]/g, "");
smoothDots3D.init();

}