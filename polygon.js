var vertices = [];
var build = true;
var arrColor;
var side = 3;
var length = 0.5;
var color = "R";
var colorHex = {r: 1, g:0, b:0};
var setWarna;

function setRed(){
    color = "R"
    polygon();
}

function setBlue(){
    color = "B"
    polygon();
}

function setGreen(){
    color = "G"
    polygon();
}

function setColor(event){
    colorHex = event.target.value;
    colorHex = hexToRGB(colorHex);
    console.log(colorHex)
    colorHex.r = colorHex.r / 255;
    colorHex.g = colorHex.g / 255;
    colorHex.b = colorHex.b / 255;
    polygon();
}

function hexToRGB(hex){
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function polygon(inpFile, set){
    //console.log(colorHex);
    canvas = document.getElementById('webgl-app')
    gl = canvas.getContext('experimental-webgl')
    gl.clearColor(1,1,1,1);
    gl.viewport( 0, 0, canvas.width, canvas.height );

    program = initShaders('vert','frag')
    gl.useProgram(program)
    console.log("tes")

    if (inpFile == true) {
        vertices = localStorage.getItem("arrInpVert").split(",").map(function(e) {
          return parseFloat(e);
      })
        arrColor = localStorage.getItem("arrInpColor").split(",").map(function(e) {
          return parseFloat(e);
      })
    }
    else {
        if (set){
            setupVert(side, length)
        }
        console.log(vertices)
        arrColor = [colorHex.r,colorHex.g,colorHex.b, 1];
    }

    var vertBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
  
    var vertexPos = gl.getAttribLocation(shaderProgram, 'vPosition')
    gl.vertexAttribPointer(vertexPos, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vertexPos)
  
    render(arrColor, gl.TRIANGLE_FAN, vertices.length/2)

    localStorage.setItem("typeModel","Polygon")
    localStorage.setItem("vertices",vertices)
    localStorage.setItem("color",arrColor)
    pol = true;
    gar = false;
    kotak = false;
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

function searchVert(mousePos){
    for (var i =0; i<vertices.length; i=i+2){
        if ((Math.abs(vertices[i]-mousePos.x) < 0.05) && (Math.abs(vertices[i+1]-mousePos.y) < 0.05)){
            var koorAwal = {x: vertices[i], y:vertices[i+1]}
            return koorAwal;
        }
    }
}

function fixVert(mousePos){
    for (var i =0; i<vertices.length; i=i+2){
        if ((Math.abs(vertices[i]-koorAwal.x) < 0.05) && (Math.abs(vertices[i+1]-koorAwal.y)  < 0.05)){
            break;
        }
    }
    console.log(i)
    vertices[i] = mousePos.x;
    vertices[i+1] = mousePos.y;
    polygon(false, false)
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