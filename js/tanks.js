//angle and power change slider
const angleSlider = document.querySelector('#angle');
const angle = document.querySelector('#angle-value');
angleSlider.addEventListener("input",()=>angle.textContent=angleSlider.value+'°');
const powerSlider = document.querySelector('#power');
const power = document.querySelector('#power-value');
powerSlider.addEventListener("input",()=>power.textContent=powerSlider.value);

//drawing tanks and grouns
const canvas = document.querySelector("#game");
const pen = canvas.getContext("2d");

// //tank1 
// pen.fillStyle="#2b7bff";
// pen.fillRect(120,410,30,30);
// //tank2
// pen.fillStyle="#ff2a4a";
// pen.fillRect(850,410,30,30);
// function drawTank(x,color){
//     pen.fillStyle
// }

//tank
function drawTank(x, color) {
  //tracks
  pen.fillStyle = "#333";
  pen.fillRect(x, 432, 40, 8);
  //body
  pen.fillStyle = color;
  pen.fillRect(x + 3, 422, 34, 10);
  //turret
  pen.fillRect(x +10,412, 20, 10);
}
function draw(){
    //ground
pen.fillStyle="#29d66a";
pen.fillRect(0,440,1000,1000)
pen.fillStyle="#ffd400";
const radianAngle = Number(angleSlider.value)*Math.PI/180;
const tipX=140+Math.cos(radianAngle)*25;
const tipY=417-Math.sin(radianAngle)*25;
pen.strokeStyle = "#ffd400";
pen.lineWidth = 5;

pen.beginPath();
pen.moveTo(140, 417);
pen.lineTo(tipX, tipY);
pen.stroke();
pen.beginPath();
pen.moveTo(860, 417);
pen.lineTo(835, 417);
pen.stroke();
// pen.fillRect(120+25,415,20,5);
drawTank(120, "#2b7bff");
pen.fillStyle="#ffd400";
// pen.fillRect(840-5,415,20,5);
drawTank(840,"#ff2a4a");
//barrels
}

angleSlider.addEventListener("input",()=>{
    pen.clearRect(0, 0, 1000, 500);
draw();
})

draw();



