var vertices = [];
var arrColor;
var side = 3;
var length = 0.5;

window.onload = function init(){
  // enter = submit
  document.getElementById('polygonSides').addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      console.log(event.target.value)
      side = event.target.value;
    }
  })

  document.getElementById('polygonLength').addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      console.log(event.target.value)
      length = event.target.value;
    }
  })
}

function polygon(){
    canvas = document.getElementById('webgl-app')
    gl = canvas.getContext('experimental-webgl')
    gl.clearColor(1,1,1,1);
    gl.viewport( 0, 0, canvas.width, canvas.height );

    program = initShaders('vert','frag')
    gl.useProgram(program)
    console.log("tes")

    setupVert(side, length)
    console.log(vertices)
    arrColor = [1,0,0,1]

    var vertBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
  
    var vertexPos = gl.getAttribLocation(shaderProgram, 'vPosition')
    gl.vertexAttribPointer(vertexPos, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vertexPos)
  
    render(arrColor, gl.TRIANGLE_FAN, vertices.length/2)
}

function randomInt(range) {
    return Math.floor(Math.random() * range)
}

function randomVert(side) {
    vertices = []
    for (var i=0; i<side; ++i){
        randX = randomInt(10)
        x = randomInt(10) * (Math.pow(-1, randX)) / 10
        randY = randomInt(10)
        y = randomInt(10) * (Math.pow(-1, randY)) / 10
        vertices.push(x)
        vertices.push(y)
    }
}

function setupVert(side, length) {
    vertices = []
    vertices.push(-0.3);
    vertices.push(-0.8);

    var oldX = -0.3;
    var oldY = -0.8;

    for (var i = 0; i < side-1; i++){
        var theta = i * 2 * Math.PI / side;
        var y = length * Math.sin(theta);
        var x = length * Math.cos(theta);

        y += oldY;
        x += oldX;

        vertices.push(x);
        vertices.push(y);

        oldX = x;
        oldY = y;
    }
}

function render(arrColor, shape, length){    
    var uniformCol = gl.getUniformLocation(shaderProgram, 'u_fragColor')
    gl.uniform4fv(uniformCol, arrColor);
    gl.drawArrays(shape, 0, length);
}
  
function initShaders(vertId, fragId){
    var vert = document.getElementById(vertId).innerText
    var frag = document.getElementById(fragId).innerText
  
    var vertShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertShader, vert)
    gl.compileShader(vertShader)
    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
        alert('Error when compiling shaders: ' + gl.getShaderInfoLog(vertShader))
    }
  
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragShader, frag)
    gl.compileShader(fragShader)
    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
        alert('Error when compiling shaders: ' + gl.getShaderInfoLog(fragShader))
    }
  
    shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertShader)
    gl.attachShader(shaderProgram, fragShader)
    gl.linkProgram(shaderProgram)
  
    return shaderProgram;
}