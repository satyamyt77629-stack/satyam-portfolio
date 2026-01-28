/* ===============================
   AI BOOT + VOICE
================================ */

const bootLines = [
  "SYSTEM ONLINE",
  "INTERFACE: SATYAM KUMAR",
  "STATUS: BOSS OFFLINE",
  "ACCESS GRANTED"
];

const terminal = document.getElementById("aiTerminal");
let idx = 0;

function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 0.85;
  msg.pitch = 0.8;
  speechSynthesis.speak(msg);
}

function boot() {
  if (idx < bootLines.length) {
    terminal.innerHTML += `> ${bootLines[idx]}\n`;
    if (idx === 2) {
      speak("Welcome. You are viewing the interface of Satyam Kumar. The boss is currently offline. You may explore his work or leave a message via email.");
    }
    idx++;
    setTimeout(boot, 700);
  } else {
    setTimeout(() => {
      document.getElementById("aiBoot").style.display = "none";
      document.querySelectorAll(".hidden, .reveal").forEach(el => el.classList.add("show"));
    }, 1000);
  }
}
boot();

/* ===============================
   PARTICLE BACKGROUND
================================ */

const canvas = document.getElementById("ai-bg");
const ctx = canvas.getContext("2d");
let w, h;
let nodes = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < 70; i++) {
  nodes.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  });
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  nodes.forEach(n => {
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > w) n.vx *= -1;
    if (n.y < 0 || n.y > h) n.vy *= -1;

    ctx.fillStyle = "#7aa2ff";
    ctx.fillRect(n.x, n.y, 2, 2);

    nodes.forEach(o => {
      const d = Math.hypot(n.x - o.x, n.y - o.y);
      if (d < 120) {
        ctx.strokeStyle = "rgba(122,162,255,0.08)";
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(o.x, o.y);
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(animate);
}
animate();

/* ===============================
   FACE PARALLAX
================================ */

const face = document.getElementById("face");
document.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 8;
  const y = (e.clientY / window.innerHeight - 0.5) * 8;
  face.style.transform = `translate(${x}px, ${y}px)`;
});

/* ===============================
   SCROLL REVEAL
================================ */

const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});

/* ===============================
   AI CONSOLE COMMANDS
================================ */

const input = document.getElementById("consoleInput");
const output = document.getElementById("consoleOutput");

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const cmd = input.value.toLowerCase();
    output.textContent += `\n> ${cmd}\n`;

    if (cmd === "help") {
      output.textContent += "Commands: projects, experience, contact\n";
    } else if (cmd === "projects") {
      document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
      output.textContent += "Navigating to Projects module...\n";
    } else if (cmd === "experience") {
      document.getElementById("experience").scrollIntoView({ behavior: "smooth" });
      output.textContent += "Opening Experience module...\n";
    } else if (cmd === "contact") {
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
      output.textContent += "Initiating contact channel...\n";
    } else {
      output.textContent += "Unknown command\n";
    }
    input.value = "";
  }
});
