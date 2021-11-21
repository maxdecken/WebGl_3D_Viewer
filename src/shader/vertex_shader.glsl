attribute vec4 a_col;
    attribute vec4 a_position;

    uniform float u_xTrans;
    uniform float u_yTrans;
    uniform float u_zAngle;
    uniform float u_xAngle;
    uniform float u_scale;

    varying vec4 v_col;

    void main() {
        mat4 rotationMatrixZ;
        rotationMatrixZ[0] = vec4(cos(u_zAngle),0,-sin(u_zAngle),0);
        rotationMatrixZ[1] = vec4(0, 1,0, 0);
        rotationMatrixZ[2] = vec4(sin(u_zAngle),0,cos(u_zAngle),0);
        rotationMatrixZ[3] = vec4(0,0,0,1);

        mat4 rotationMatrixX;
        rotationMatrixX[0] = vec4(1,0,0,0);
        rotationMatrixX[1] = vec4(0, cos(u_xAngle),-sin(u_xAngle), 0);
        rotationMatrixX[2] = vec4(0,sin(u_xAngle),cos(u_xAngle),0);
        rotationMatrixX[3] = vec4(0,0,0,1);

        mat4 scaleMatrix;
        scaleMatrix[0] = vec4(u_scale, 0, 0, 0);
        scaleMatrix[1] = vec4(0, u_scale, 0, 0);
        scaleMatrix[2] = vec4(0, 0, u_scale, 0);
        scaleMatrix[3] = vec4(0, 0, 0, 1);

        gl_Position =  rotationMatrixZ * rotationMatrixX * scaleMatrix *  (a_position + vec4(u_xTrans, u_yTrans, 0, 1));
        v_col = 3.0 * a_col;
        gl_PointSize = 1.0;
    }