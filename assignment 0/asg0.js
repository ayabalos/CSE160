// DrawTriangle.js (c) 2012 matsuda

function areaTriangle(v1, v2){
  let area = (Math.abs(Vector3.cross(v1, v2).elements[2]))/2;
  return area;
}
function angleBetween(v1, v2){

  const dotprod = Vector3.dot(v1, v2);

  const mag1 = v1.magnitude();
  const mag2 = v2.magnitude();

  const ctheta = dotprod / (mag1 * mag2);
  const rad = Math.acos(ctheta);
  const degree = rad * (180 / Math.PI);

  return degree;
  
}

function drawVector(vector, colour){
  var unit = 20;

  var originX = 200;
  var originY = 200;

  var finalX = originX + vector.elements[0] * unit;
  var finalY = originY - vector.elements[1] * unit; 

  ctx.beginPath();
  ctx.moveTo(originX, originY);
  ctx.lineTo(finalX,finalY);
  ctx.strokeStyle = colour;
  ctx.lineWidth = 1;
  ctx.stroke();  
}

function handleDrawOperationEvent(){
  ctx.clearRect(0,0,400,400);
 ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue
  ctx.fillRect(0, 0, 400, 400);
  var valx1 = document.getElementById("inputX1").value;
  var valy1 = document.getElementById("inputY1").value;

  var valx2 = document.getElementById("inputX2").value;
  var valy2 = document.getElementById("inputY2").value;

  const v1 = new Vector3([valx1, valy1, 0]);
  const v2 = new Vector3([valx2, valy2, 0]);
  
  var operation = document.getElementById("opSelect").value;
  var scalar = document.getElementById("scalar").value;

  if(operation == "add"){
    const v3 = new Vector3(v1.elements);
    v3.add(v2);
    drawVector(v3, "green");
    drawVector(v1, "red");
    drawVector(v2, "blue");
  }
  else if(operation == "subtract"){
    const v3 = new Vector3(v1.elements);
    v3.sub(v2);
    drawVector(v3, "green"); 
    drawVector(v1, "red");
    drawVector(v2, "blue");
  }
  else if(operation == "multiply"){
    const v3 = new Vector3(v1.elements);
    v3.mul(scalar);
    const v4 = new Vector3(v2.elements);
    v4.mul(scalar);
    drawVector(v1, "red");
    drawVector(v2, "blue");
    drawVector(v3, "green");
    drawVector(v4, "green");
  }
  else if(operation == "divide"){
    const v3 = new Vector3(v1.elements);
    v3.div(scalar);
    const v4 = new Vector3(v2.elements);
    v4.div(scalar);

    drawVector(v1, "red");
    drawVector(v2, "blue");
    drawVector(v3, "green");
    drawVector(v4, "green");
  }
  else if(operation == "magnitude"){
    console.log("Mag1:", v1.magnitude());
    console.log("Mag2:", v2.magnitude())
    drawVector(v1, "red");
    drawVector(v2, "blue");
  }
  else if(operation == "normalize"){
    const v3 = new Vector3(v1.elements);
    v3.normalize();
    const v4 = new Vector3(v2.elements);
    v4.normalize();

     drawVector(v1, "red");
    drawVector(v2, "blue");
    drawVector(v3, "green");
    drawVector(v4, "green");
  }
  else if(operation == "angle"){
    console.log("Angle Between:", angleBetween(v1, v2));
    drawVector(v1, "red");
    drawVector(v2, "blue");

  }
  else if(operation == "area"){
    console.log("Area of the triangle:", areaTriangle(v1, v2));
    drawVector(v1, "red");
    drawVector(v2, "blue");
  }
}

function handleDrawEvent(){

  ctx.clearRect(0,0,400,400);
 ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue
  ctx.fillRect(0, 0, 400, 400);
  var valx1 = document.getElementById("inputX1").value;
  var valy1 = document.getElementById("inputY1").value;

  var valx2 = document.getElementById("inputX2").value;
  var valy2 = document.getElementById("inputY2").value;

  const newVectorOne = new Vector3([valx1, valy1, 0]);
  const newVectorTwo = new Vector3([valx2, valy2, 0]);

  drawVector(newVectorOne, "red");
  drawVector(newVectorTwo, "blue");
}

function main() {  
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  ctx = canvas.getContext('2d');

  // Draw a blue rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue
  ctx.fillRect(0, 0, 400, 400);        // Fill a rectangle with the color
}
