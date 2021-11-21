//This programm is based on a lecture and exericeses done at the HTW-Berlin IMI Studies in the Computer Graphics course in the wintersemster 2021/22.
var gl, program, canvas, bufferSize;

var transX_slider = document.getElementById("transX_slider");
var transY_slider = document.getElementById("transY_slider");
var rotationZ_slider = document.getElementById("rotationZ_slider");
var rotationX_slider = document.getElementById("rotationX_slider");
var scale_slider = document.getElementById("scale_slider");
var brightness_slider = document.getElementById("brightness_slider");

init();


async function init() {
    var width = 600;
    var height = 600;

    canvas = document.getElementById('viewport');
    canvas.width = width;
    canvas.height = height;
    gl = document.getElementById('viewport').getContext('webgl');

    let vertexShaderSource = document.getElementById("vertex_s").innerText;
    let fragmentShaderSource = document.getElementById("fragment_s").innerText;

    program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    gl.useProgram(program);

    gl.enable(gl.DEPTH_TEST);
    
    let data = await fetch("https://raw.githubusercontent.com/StrippgenHTW/imistuff/master/parisDS.bin").then(e =>  e.arrayBuffer());

    let positions = data.slice(0, 3872172);
    let colors = data.slice(3872172,  6453620);
    let index = data.slice(6453620, 12054152);

    bufferSize = index.byteLength/4;

    buffer(program, positions ,"a_position", 3, gl.FLOAT, false);
    buffer(program, colors ,"a_col", 4, gl.UNSIGNED_SHORT, true);

    var vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(index), gl.STATIC_DRAW);

    window.requestAnimationFrame(render);
}


function render(time) {
    var xOff = transX_slider.value/100;
    var xOffsetLocation = gl.getUniformLocation(program, "u_xTrans");
    gl.uniform1f(xOffsetLocation, xOff);  

    var yOff = transY_slider.value/100;
    var yOffsetLocation = gl.getUniformLocation(program, "u_yTrans");
    gl.uniform1f(yOffsetLocation, yOff);  

    var angleZ = (rotationZ_slider.value%360) * (Math.PI/180);
    var angleOffsetLocation = gl.getUniformLocation(program, "u_zAngle");
    gl.uniform1f(angleOffsetLocation, angleZ);

    var angleX = (rotationX_slider.value%360) * (Math.PI/180);
    var angleOffsetLocation = gl.getUniformLocation(program, "u_xAngle");
    gl.uniform1f(angleOffsetLocation, angleX);

    var scale = scale_slider.value /10;
    var scaleOffsetLocation = gl.getUniformLocation(program, "u_scale");
    gl.uniform1f(scaleOffsetLocation, scale); 

    var brightness = brightness_slider.value /10;
    var brightnessOffsetLocation = gl.getUniformLocation(program, "u_bright");
    gl.uniform1f(brightnessOffsetLocation, brightness); 

    gl.clearColor(0,0,0,1)
    gl.clear(gl.COLOR_BUFFER_BIT);

    var ext = gl.getExtension('OES_element_index_uint');
    if(!ext){
    console.log("No EXT");
    }
    
    var primitiveType = gl.TRIANGLES;
    var offset = 0;

    gl.drawElements(gl.TRIANGLES, bufferSize, gl.UNSIGNED_INT, offset);

    window.requestAnimationFrame(render);
}

function buffer(program, data, attribName, size, type, normalize){
    var bufferData = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferData);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    var bufferAttributeLocation = gl.getAttribLocation(program, attribName);

    var stride = 0;
    var offset = 0;  
    gl.vertexAttribPointer(bufferAttributeLocation, size, type, normalize, stride, offset)

    gl.enableVertexAttribArray(bufferAttributeLocation);
}
