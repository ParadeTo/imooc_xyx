var canvas = document.getElementById('myCanvas')
var gl = canvas.getContext('webgl')

var program = gl.createProgram()

var VSHADER_SOURCE, FSHADER_SOURCE

var vertexShader, fragmentShader

VSHADER_SOURCE = '' +
    'attribute vec4 a_Position;\n' +
    'void main () {\n' +
        'gl_Position = a_Position;\n' +
    '}\n'

FSHADER_SOURCE =
  'void main () {\n' +
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n'

function createShader (gl, sourceCode, type) {
  var shader = gl.createShader(type)
  gl.shaderSource(shader, sourceCode)
  gl.compileShader(shader)
  return shader
}

// define vertex shader
vertexShader = createShader(gl, VSHADER_SOURCE, gl.VERTEX_SHADER)
// define frament shader
fragmentShader = createShader(gl, FSHADER_SOURCE, gl.FRAGMENT_SHADER)

// attach shader to program
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)

// link program to context
gl.linkProgram(program)
gl.useProgram(program)
gl.program = program

function initVertexBuffers (gl) {
  var vertices = new Float32Array([
    -1, 1, -1, -1, 1, -1
  ])
  var n = 3
  var vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  // write data into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  // get attribute a_Position address in vertex shader
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
  // enable a_Position variable
  gl.enableVertexAttribArray(a_Position)
  return n
}

// write the position of vertices to a vertex shader
var n = initVertexBuffers(gl)

// set clear coloe
gl.clearColor(0, 0, 0, 1)

function draw () {
  // clear canvas and add background color
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, n)
}

draw()
