//angle and power change slider
document.addEventListener("keydown",(e)=>{
    if(e.key=="ArrowRight"){
        angleSlider.value=Number(angleSlider.value)+1;
        angleSlider.dispatchEvent(new Event("input"));
    }
    else if(e.key=="ArrowLeft"){
        angleSlider.value=Number(angleSlider.value)-1;
        angleSlider.dispatchEvent(new Event("input"));
    }
    else if(e.key=="ArrowUp"){
        powerSlider.value=Number(powerSlider.value)+1;
        powerSlider.dispatchEvent(new Event("input"));
    }
    else if(e.key=="ArrowDown"){
        powerSlider.value=Number(powerSlider.value)-1;
        powerSlider.dispatchEvent(new Event("input"));
    }
    else if(e.key==" "){
        fire();
    }
    else return;
    e.preventDefault();
});

let wind;
function newWind(){
    wind=Math.round(Math.random() * 20 - 10);
    if(wind>0) document.querySelector("#wind").textContent="→ "+wind;
    else if(wind<0) document.querySelector("#wind").textContent="← "+Math.abs(wind);
    else document.querySelector("#wind").textContent="0";
}
newWind();

var hp1=100;var hp2=100;
var turn=1;
var angle1=0;var angle2=0;
var power1=45;var power2=45;
var radianAngle1=Number(angle1)*Math.PI/180;;
var radianAngle2=Number(angle2)*Math.PI/180;;
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
        pen.clearRect(0, 0, 1000, 500);
            document.querySelector("#turnno").textContent=turn;
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
draw();
})

draw();
function burst(x, y) {
    let particles = [];

    for (let i = 0; i < 8; i++) {
        let angle = Math.random() * Math.PI * 2;
        let speed = Math.random() * 1.5 + 0.5;

        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 10
        });
    }

    function animateBurst() {

        for (let p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;

            pen.beginPath();
            pen.arc(p.x, p.y, 2, 0, Math.PI * 2);
            pen.fill();
        }

        particles = particles.filter(p => p.life > 0);

        if (particles.length > 0) {
            requestAnimationFrame(animateBurst);
        }
    }

    animateBurst();
}
function hitTank(x,y,tankX){
    return x>=tankX && x<=tankX+40 && y>=412;
}
function fire(){
    
    power1=Number(powerSlider.value);
    power2=power1;
    angle1=Number(angleSlider.value);
    angle2=angle1;
    radianAngle1 = Number(angle1)*Math.PI/180;
    radianAngle2 = Number(angle2)*Math.PI/180;
    draw();
    var vx;var vy;
    power2=power1;
    if(turn==1){
        console.log(`power  = ${power1} angle = ${radianAngle1}`)
        vx=power1*Math.cos(radianAngle1)*0.2;
        vy=-power1*Math.sin(radianAngle1)*0.2;
        var x = tipX;var y=tipY;
        var steps=0;
        let path=[];
       function throwBall(){
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
            vx+=wind*0.006;
            steps++;
            //check if hit the other tank
            if(hitTank(x,y,840)){
                burst(x,y);
                if(x<=850 || x>=870) hp2-=20;
                else hp2-=30;
                document.querySelector("#hp2-text").textContent=hp2+" HP";
                document.querySelector("#hp2-fill").style.width=hp2+"%";
                turn=2;
                newWind();
            }
            else if(y>=440){
                pen.fillStyle="#ffd400";
                for(let i=0;i<path.length;i++){
                    if(i%3==0) pen.fillRect(path[i].x-2,path[i].y-2,4,4);
                }
                turn=2;
                newWind();
            }
            else{
                requestAnimationFrame(throwBall);
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
    }
    else{
        
        console.log(`power  = ${power2} angle = ${radianAngle2}`)
        console.log(`power  = ${power1} angle = ${radianAngle1}`)
        vx=power2*Math.cos(radianAngle2)*0.2;
        vy=-power2*Math.sin(radianAngle2)*0.2;
        var x = tip2X;var y=tip2Y;
        var steps=0;
        let path=[];
       function throwBall(){
            draw();
        pen.beginPath();
        pen.arc(x,y,4,0,Math.PI*2);
        pen.fillStyle="#ffd400";
        pen.fill();
        pen.closePath();
        path.push({x,y});
            x-=vx;
            y+=vy;
            vx-=wind*0.006;
            vy+=0.25;
            steps++;
            //check if hit the other tank
            if(hitTank(x,y,120)){
                burst(x,y);
                if(x<=120 || x>=140) hp1-=20;
                else hp1-=30;
                document.querySelector("#hp1-text").textContent=hp1+" HP";
                document.querySelector("#hp1-fill").style.width=hp1+"%";
                turn=1;
                newWind();
            }
            else if(y>=440){
                pen.fillStyle="#ffd400";
                for(let i=0;i<path.length;i++){
                    if(i%3==0) pen.fillRect(path[i].x-2,path[i].y-2,4,4);
                }
                turn=1;
                newWind();
            }
            else{
                requestAnimationFrame(throwBall);
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
    };
    if(hp1<=0){
        gameOver(2);
    }
    else if(hp2<=0){
        gameOver(1);
    }
    console.log("now turn is of player "+turn);
    document.querySelector("#turnno").textContent=turn;
    
}
function gameOver(winner){
    document.querySelector("#winner").textContent="PLAYER "+winner+" WINS";
    document.querySelector("#game-over").style.display="flex";
}



