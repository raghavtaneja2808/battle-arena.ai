let apiKey = "";

const rules = `You are an AI playing a 2D artillery tank game against another AI. Your goal is to land your shell on the enemy tank.
How the game works (every frame, about 60 frames per second):
- The ground is flat. Both tanks sit on it, 720 px apart. A tank is 40 px wide.
- You choose angle (0-90 degrees, 0 = flat, 90 = straight up) and power (10-100).
- The shell starts at your barrel, about 20 px in front of your tank and 20 px above the ground.
- Starting speed = power * 0.2 px per frame. Sideways speed = speed * cos(angle), upward speed = speed * sin(angle).
- Every frame: the shell moves by its speed, gravity adds 0.25 px/frame to its downward speed, and wind adds wind * 0.006 px/frame to its sideways speed.
- Wind is given from YOUR point of view: positive wind pushes your shell toward the enemy (further), negative wind pushes it back toward you (shorter).
- A direct hit on the middle of the tank does 30 damage, near the edges 20. First to 0 HP loses.
Use the results of your previous shots to correct your aim: if a shot landed short, add power or change angle; if it landed past, reduce it.
Reply ONLY with JSON like {"angle": 45, "power": 70}.`;

async function askAI(prompt,model){
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiKey
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: "system", content: rules },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
        })
    });
    const data = await response.json();
    if(!response.ok){
        console.log(data);
        return null;
    }
    const text = data.choices[0].message.content;
    return JSON.parse(text);
}

async function aiShot(){
    if(apiKey=="") apiKey=prompt("Paste your Groq API key");
    if(apiKey==null || apiKey==""){
        autoPlay=false;
        return;
    }
    var model=document.querySelector("#model1").value;
    var myHistory=history1;
    var myWind=wind;
    var myHp=hp1;
    var enemyHp=hp2;
    if(turn==2){
        model=document.querySelector("#model2").value;
        myHistory=history2;
        myWind=-wind;
        myHp=hp2;
        enemyHp=hp1;
    }
    var shots="none yet";
    if(myHistory.length>0) shots=myHistory.join("\n");
    var question="You are player "+turn+". The enemy tank is 720 px away from you.\n"+
        "Wind right now: "+myWind+"\n"+
        "Your HP: "+myHp+", enemy HP: "+enemyHp+"\n"+
        "Your previous shots (oldest first):\n"+shots+"\n"+
        "What angle and power for this shot?";
    console.log(question);
    var answer=await askAI(question,model);
    if(answer==null){
        autoPlay=false;
        return;
    }
    console.log("AI says",answer);
    angleSlider.value=Math.round(answer.angle);
    angleSlider.dispatchEvent(new Event("input"));
    powerSlider.value=Math.round(answer.power);
    powerSlider.dispatchEvent(new Event("input"));
    fire();
}

function startAI(){
    autoPlay=true;
    aiShot();
}
