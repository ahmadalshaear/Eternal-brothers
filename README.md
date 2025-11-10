<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Eternal Brothers FC</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body {
  font-family: Arial, sans-serif;
  background-color: #121212;
  color: #e0e0e0;
  padding: 10px;
  text-align: center;
  margin:0;
}
.nav-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
button {
  padding: 10px 16px;
  border: none;
  font-weight: 700;
  font-size: 15px;
  border-radius: 8px;
  cursor: pointer;
  width: 30%;
  max-width: 130px;
}
#homeBtn { background:#d32f2f; color:#fff; }
#blueBtn { background:#1976d2; color:#fff; }
#yellowBtn { background:#fbc02d; color:#000; }

.container {
  max-width: 95%;
  margin: auto;
  background: #1e1e1ecc;
  padding: 20px 10px;
  border-radius: 15px;
  box-shadow: 0 0 10px #000;
  display: none;
}
h1 { font-size: 20px; color: #d32f2f; margin-bottom: 5px; font-weight:bold; }
h1::before, h1::after { content: "⚽"; margin: 0 6px; }
h2 { font-size: 20px; color: #fff; margin: 15px 0 8px; }
input[type=text], input[type=time] {
  padding: 10px; width: 80%; margin: 8px 0;
  border-radius: 8px; border: 1px solid #555;
  text-align: center; font-size: 15px;
  background-color: #2c2c2c; color: #fff;
}
button.addBtn { padding: 8px 14px; margin: 6px; font-size: 14px; }
ul { list-style: none; padding: 0; text-align: left; margin-top: 10px; font-weight: bold; font-family: "Arial Black", Arial, sans-serif; }
li { margin: 6px 0; padding: 8px; border-radius: 12px; font-size: 15px; display:flex; justify-content: space-between; align-items: center; }
#teamList li { background: #a8e6a1; color:black; }
#waitingList li { background: #ffe0e0; color:black; }
#blueList li { background: rgba(25,118,210,0.7); color:black; }
#yellowList li { background: rgba(251,192,42,0.7); color:black; }

#chatBox { max-height: 300px; overflow-y: auto; background: #2c2c2c; padding: 10px; border-radius: 8px; margin-bottom: 10px; text-align: left; }
.message-time { font-size: 12px; color: #aaa; margin-left: 6px; }
.match-time { font-size:16px; margin:5px 0; color:#fff; }
.match-note { font-size:14px; margin:5px 0; color:#fdd835; }
.address-container { position: relative; display: inline-block; margin-bottom: 15px; }
.address-pin { position: absolute; left: -25px; top: 50%; transform: translateY(-50%); font-size: 20px; }
#matchAddress { font-weight:bold; font-size:18px; cursor:pointer; user-select:none; color:#fff; }

.field {
  width: 100%;
  max-width: 400px;
  height: 250px;
  background: #4CAF50;
  margin: 10px auto 20px auto;
  border: 2px solid #fff;
  border-radius: 10px;
  position: relative;
  touch-action: none;
}
.field::before {
  content:"";
  position:absolute;
  top:0; left:0; right:0; bottom:0;
  border:2px solid #fff;
  border-radius:10px;
}
.field .center-circle,
.field .penalty-box-left,
.field .penalty-box-right,
.field .mid-line {
  position:absolute;
  border:2px solid #fff;
  content:"";
}
.field .center-circle { width:50px; height:50px; border-radius:50%; top:50%; left:50%; transform:translate(-50%,-50%); }
.field .penalty-box-left { width:60px; height:120px; top:50%; left:0; transform:translateY(-50%); }
.field .penalty-box-right { width:60px; height:120px; top:50%; right:0; transform:translateY(-50%); }
.field .mid-line { width:0; height:100%; border-left:2px solid #fff; top:0; left:50%; transform:translateX(-50%); }

.player-marker {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  cursor: grab;
  user-select: none;
  text-align:center;
}
.player-name { position:absolute; width:100px; text-align:center; left:-30px; top:-20px; font-size:12px; color:#fff; }

@media (max-width: 500px) {
  button { width: 28%; font-size: 14px; }
  input[type=text], input[type=time] { width: 90%; font-size: 14px; }
  #matchAddress { font-size:16px; }
}
</style>
</head>
<body>

<div class="nav-buttons">
  <button id="blueBtn" onclick="showSection('blue')">Blue</button>
  <button id="homeBtn" onclick="showSection('main')">Home</button>
  <button id="yellowBtn" onclick="showSection('yellow')">Yellow</button>
</div>

<div id="main" class="container">
  <h1>Eternal Brothers FC</h1>
  <div class="address-container">
    <span class="address-pin">📍</span>
    <span id="matchAddress">Click here to set match address</span>
  </div>
  <div class="match-time">✔️ The match will be on Sunday at 9:40 AM</div>
  <div class="match-note">Please follow the group chat in case of any changes</div>

  <h2>Add Player to Main Team</h2>
  <input type="text" id="nameInput" placeholder="Enter player name">
  <button class="addBtn" onclick="addMember()">Add</button>

  <h2>Main Team List (24 players max)</h2>
  <ul id="teamList"></ul>

  <h2>Waiting List</h2>
  <ul id="waitingList"></ul>

  <h2>Team Chat</h2>
  <input type="text" id="chatName" placeholder="Enter your name to enable chat">
  <button class="addBtn" onclick="enableChat()">✔️ Confirm</button>
  <div id="chatBox"></div>
  <input type="text" id="chatInput" placeholder="Type your message..." style="width:80%;" disabled>
  <button class="addBtn" id="sendBtn" onclick="sendMessage()" disabled style="background:green;">Send</button>
  <button class="addBtn" style="background:#d32f2f; font-size:12px;" onclick="clearChat()">Clear Chat</button>
</div>

<div id="blue" class="container" style="background:#1565c0aa;">
  <h2>Blue Team 🔵</h2>
  <input type="text" id="blueInput" placeholder="Enter player name">
  <button class="addBtn" onclick="addBlue()">Add</button>
  <ul id="blueList"></ul>
  <h3>Blue Team Plan</h3>
  <div id="bluePlan" class="field"></div>
</div>

<div id="yellow" class="container" style="background:#fdd835aa; color:#000;">
  <h2>Yellow Team 🟡</h2>
  <input type="text" id="yellowInput" placeholder="Enter player name">
  <button class="addBtn" onclick="addYellow()">Add</button>
  <ul id="yellowList"></ul>
  <h3>Yellow Team Plan</h3>
  <div id="yellowPlan" class="field"></div>
</div>

<!-- Audio files should be placed in the same folder -->
<audio id="sendSound" src="send.ogg" ></audio>
<audio id="alarmSound" src="alarm.ogg" ></audio>

<script>
// نفس السكربت الأصلي بدون تغيير روابط خارجية
// Navigation
function showSection(id){
  document.querySelectorAll('.container').forEach(c=>c.style.display='none');
  document.getElementById(id).style.display='block';
  document.body.style.background = (id==="blue") ? "#0d47a1" : (id==="yellow" ? "#fff176" : "#121212");
  document.body.style.color = (id==="yellow") ? "#000" : "#e0e0e0";
}
showSection('main');

// Data
let team = JSON.parse(localStorage.getItem("mainTeam") || "[]");
let waiting = JSON.parse(localStorage.getItem("waiting") || "[]");
let blueTeam = JSON.parse(localStorage.getItem("blueTeam") || "[]");
let yellowTeam = JSON.parse(localStorage.getItem("yellowTeam") || "[]");
let chatMessages = JSON.parse(localStorage.getItem("chat") || "[]");
let bluePlanPos = JSON.parse(localStorage.getItem("bluePlanPos") || "[]");
let yellowPlanPos = JSON.parse(localStorage.getItem("yellowPlanPos") || "[]");

const maxTeamSize=12;
const userColors = {};
function getUserColor(name){
  if(userColors[name]) return userColors[name];
  const colors = ["#2196F3","#FF9800","#4CAF50","#9C27B0","#00BCD4","#FFC107","#E91E63","#9E9E9E"];
  const color = colors[Math.floor(Math.random()*colors.length)];
  userColors[name] = color;
  return color;
}
function saveLocal(){
  localStorage.setItem("mainTeam", JSON.stringify(team));
  localStorage.setItem("waiting", JSON.stringify(waiting));
  localStorage.setItem("blueTeam", JSON.stringify(blueTeam));
  localStorage.setItem("yellowTeam", JSON.stringify(yellowTeam));
  localStorage.setItem("chat", JSON.stringify(chatMessages));
  localStorage.setItem("bluePlanPos", JSON.stringify(bluePlanPos));
  localStorage.setItem("yellowPlanPos", JSON.stringify(yellowPlanPos));
}

// باقي الدوال (addMember, addBlue, addYellow, renderAll, chat...) بدون تغيير
// ... انسخها كما هي من الكود الأصلي
</script>
</body>
</html>
