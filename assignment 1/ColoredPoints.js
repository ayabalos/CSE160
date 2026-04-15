// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =`
  attribute vec4 a_Position;
  uniform float u_size;
  void main(){
    gl_Position = a_Position;
    gl_PointSize = u_size;
  }`

// Fragment shader program
var FSHADER_SOURCE =`
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`

  //global varz
let canvas;
let gl; 
let a_Position;
let u_FragColor;
let u_size;

function setupWebGL(){
  //retrieve canvas element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl",{preserveDrawingBuffer:true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
}

function connectVariablesToGLSL(){
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
   a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
   u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  u_size = gl.getUniformLocation(gl.program, 'u_size');
  if (!u_size){
    console.log("Failed to get storage location of u_size");
    return;
  }
}

const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

let g_selectedColour = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize= 1;
let g_selectedType=POINT;
let g_segments = 10;

function htmlSliders(){
  document.getElementById('sliderRed').addEventListener('mouseup', function() { g_selectedColour[0] = this.value;});
  document.getElementById('sliderGreen').addEventListener('mouseup', function() { g_selectedColour[1] = this.value;});
  document.getElementById('sliderBlue').addEventListener('mouseup', function() { g_selectedColour[2] = this.value;});

  document.getElementById('size').addEventListener('mouseup', function() { g_selectedSize = this.value;});

  document.getElementById('pointButton').onclick = function () {g_selectedType=POINT};
   document.getElementById('TriangleButton').onclick = function () {g_selectedType=TRIANGLE};
   document.getElementById('CircleButton').onclick = function () {g_selectedType=CIRCLE};


   document.getElementById('segCount').addEventListener('mouseup', function() {g_segments = this.value;});


}

function main() {
  
  setupWebGL();
  connectVariablesToGLSL();
  htmlSliders();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousemove = function(ev) {if(ev.buttons == 1) { click(ev) }};
  

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_shapesList = [];

function convertCoordinatesEventToGL(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return ([x,y]);
}

function clearCanvas(){
  g_shapesList = [];
  renderAllShapes();
}



function renderAllShapes(){
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_shapesList.length;
  for(var i = 0; i < len; i++) {
   g_shapesList[i].render();
  
}
}

function click(ev) {

  [x,y] = convertCoordinatesEventToGL(ev);

  let point;
    if (g_selectedType==POINT){
      point = new Point();
    }else if(g_selectedType==TRIANGLE){
      point = new Triangle();
    }
    else{
      point = new Circle();
    }
  point.position=[x,y];
  point.color =  g_selectedColour.slice();
  point.size = g_selectedSize
  g_shapesList.push(point);
  // // Store the coordinates to g_points array
  // g_points.push([x, y]);
  // // Store the coordinates to g_points array
  // g_colors.push(g_selectedColour.slice());

  // g_sizes.push(g_selectedSize);

  renderAllShapes();
}
