var vertices_begin;
var arrColor;

function square(num, inpFile) {
  console.log("square")
  canvas = document.getElementById('webgl-app')
  gl = canvas.getContext('experimental-webgl')
  gl.clearColor(1,1,1,1);
  gl.viewport( 0, 0, canvas.width, canvas.height );

  program = initShaders('vert','frag')
  gl.useProgram(program)

  if ((inpFile == true)) {
    vertices_begin = localStorage.getItem("arrInpVert").split(",").map(function(e) {
      return parseFloat(e);
  })
    arrColor = localStorage.getItem("arrInpColor").split(",").map(function(e) {
      return parseFloat(e);
  })
  }
  else {
    vertices_begin = [
      -0.1, -0.1,
      -0.1, 0.1,
      0.1, 0.1,
      0.1, -0.1
    ];
    arrColor = [1,0,0,1] ; 
  }
  console.log(vertices_begin)
  console.log(arrColor)
  if (num != ""){
    vertices = multiply(num, vertices_begin)
  }

  var vertBuf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
  
  var vertexPos = gl.getAttribLocation(shaderProgram, 'vPosition')
  gl.vertexAttribPointer(vertexPos, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(vertexPos)
  
  render(arrColor, gl.TRIANGLE_FAN, vertices.length/2)

  localStorage.setItem("typeModel","Line")
  localStorage.setItem("vertices",vertices)
  localStorage.setItem("color",arrColor)

}

function multiply(a, matrix){
  // console.log("matric.length " + matrix.length)
  // console.log("matric.length " + matrix[0])

  for (var i=0; i<matrix.length; i++){
    matrix[i] = matrix[i] * a;
  }
  // console.log(matrix)
  return matrix
}

function render(arrColor, shape, length){
  // ex : gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length/2)
  
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