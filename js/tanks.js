//angle and power change slider
var turn=1;
var angle1=0;var angle2=0;
var power1=0;var power2=0;
var radianAngle1=0;
var radianAngle2=0;
var tipX;var tip2X;var tip2Y;var tipY;
const angleSlider = document.querySelector('#angle');
const angle = document.querySelector('#angle-value');
angleSlider.addEventListener("input",()=>{angle.textContent=angleSlider.value+'°'
    if(turn==1)angle1=Number(angleSlider.value);
else angle2=Number(angleSlider.value);
});
const powerSlider = document.querySelector('#power');
const power = document.querySelector('#power-value');
powerSlider.addEventListener("input",()=>{power.textContent=powerSlider.value;
    if(turn==1)power1=Number(powerSlider.value);
    else power2=Number(powerSlider.value);
});

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

radianAngle1 = Number(angle1)*Math.PI/180;
radianAngle2 = Number(angle2)*Math.PI/180;
tipX=140+Math.cos(radianAngle1)*25;
tipY=417-Math.sin(radianAngle1)*25;
tip2X=860-Math.cos(radianAngle2)*25;
tip2Y=417-Math.sin(radianAngle2)*25;
pen.strokeStyle = "#ffd400";
pen.lineWidth = 5;

pen.beginPath();
pen.moveTo(140, 417);
pen.lineTo(tipX, tipY);
pen.stroke();
pen.beginPath();
pen.moveTo(860, 417);
pen.lineTo(tip2X, tip2Y);
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
function fire(){
    var vx;var vy;
    power2=power1;
    if(turn==1){
        console.log(`power  = ${power1} angle = ${angle1}`)
        vx=power1*Math.cos(radianAngle1)*0.2;
        vy=-power1*Math.sin(radianAngle2)*0.2;
        var x = tipX;var y=tipY;
        var steps=0;
        let path=[];
       function throwBall(){
            pen.clearRect(0, 0, 1000, 500);
            draw();
        pen.beginPath();
        pen.arc(x,y,4,0,Math.PI*2);
        pen.fillStyle="#ffd400";
        pen.fill();
        pen.closePath();
        path.push({x,y});
            x+=vx;
            y+=vy;
            vy+=0.25;
            steps++;
            if(y<440){
        requestAnimationFrame(throwBall);}
        for(i=0;i<path.length;i++){
            //     pen.lineWidth=5;
            // pen.fillStyle='#ffd400';
            // pen.beginPath();
            pen.moveTo(path[i].x,path[i].y);
            pen.lineTo(path[i].x+5,path[i].y-5);
            pen.stroke();
        }
       
       }
       throwBall();
        for(i=0;i<path.length;i++){
                pen.lineWidth=5;
            pen.fillStyle='#ffd400';
            pen.beginPath();
            pen.moveTo(path[i].x+20,path[i].y-20);
            pen.lineTo(path[i].x+5,path[i].y-5);
            pen.stroke();
        }
        // pen.lineWidth=5;
        // pen.fillStyle='#ffd400';
        // function pathDraw(){
        //     pen.beginPath();
        //     pen.moveTo(Pathx,Pathy);
        //     pen.lineTo(Pathx,Pathy);
        //     pen.stroke();
        //     Pathx+=vx;
        //     Pathy+=vy;
        //     Pathy+=0.25;
        //     if(Pathy<440){
        //         requestAnimationFrame(pathDraw);
        //     }
        // }
        // pathDraw();
        turn=2;
    }
    else turn=1;
    console.log("now turn is of player "+turn);
}



