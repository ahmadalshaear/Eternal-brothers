let team = [];
let blueTeam = [];
let yellowTeam = [];

function showSection(id) {
    document.querySelectorAll('.container').forEach(c => c.style.display='none');
    document.getElementById(id).style.display='block';
}

document.getElementById('homeBtn').onclick = () => showSection('main');
document.getElementById('blueBtn').onclick = () => showSection('blue');
document.getElementById('yellowBtn').onclick = () => showSection('yellow');

function addMember() {
    const name = document.getElementById('nameInput').value.trim();
    if (!name) return alert("Name required!");
    team.push(name);
    renderList('teamList', team);
    document.getElementById('nameInput').value='';
}

function renderList(id, list) {
    const ul = document.getElementById(id);
    ul.innerHTML = list.map((n,i)=>`<li>${i+1}. ${n}</li>`).join('');
}

// ------------------ Chat ------------------
let chatMessages = [];

function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;
    const name = document.getElementById('nameInput').value.trim() || "Anonymous";
    chatMessages.push({name, text});
    renderChat();
    input.value='';
}

function renderChat() {
    const box = document.getElementById('chatBox');
    box.innerHTML = chatMessages.map(m => `<div>${m.name}: ${m.text}</div>`).join('');
}

function clearChat() {
    if (!confirm("Clear chat?")) return;
    chatMessages=[];
    renderChat();
}

// عرض الصفحة الرئيسية أولاً
showSection('main');
