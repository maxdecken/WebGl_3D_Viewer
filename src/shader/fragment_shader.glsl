precision mediump float;
    varying vec4 v_col;

    uniform float u_bright;
    
    void main() {
           gl_FragColor = u_bright * v_col;
    }