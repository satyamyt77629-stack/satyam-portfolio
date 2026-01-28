/* ===============================
   AI BOOT + VOICE NARRATION
================================ */

const bootLines = [
  "SYSTEM BOOTING...",
  "INITIALIZING AI INTERFACE...",
  "LOADING DEVELOPER PROFILE...",
  "IDENTITY CONFIRMED: SATYAM KUMAR",
  "STATUS: ONLINE"
];

const terminal = document.getElementById("aiTerminal");
let index = 0;

function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 0.85;
  msg.pitch = 0.8;
  msg.voice = speechSynthesis.getVoices().find(v => v.name.includes("Google")) || null;
  speechSynthesis.speak(msg);
}

function bootSequence() {
  if (index < bootLines.length) {
    terminal.innerHTML += `> ${bootLines[index]}\n`;
    speak(bootLines[index]);
    index++;
    setTimeout(bootSequence, 700);
  } else {
    setTimeout(() => {
      document.getElementById("aiBoot").style.display = "none";
      document.querySelectorAll(".hidden").forEach(el => el.classList.add("show"));
    }, 1000);
  }
}
bootSequence();

/* ===============================
   PARTICLE NEURAL BACKGROUND
================================ */

const canvas = document.getElementById("ai-bg");
const ctx = canvas.getContext("2d");
let w, h;
let particles = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < 70; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    ctx.fillStyle = "#7aa2ff";
    ctx.fillRect(p.x, p.y, 2, 2);

    particles.forEach(o => {
      const d = Math.hypot(p.x - o.x, p.y - o.y);
      if (d < 120) {
        ctx.strokeStyle = "rgba(122,162,255,0.08)";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(o.x, o.y);
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

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
   3D TILT
================================ */

document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = -(y / r.height - 0.5) * 10;
    const ry = (x / r.width - 0.5) * 10;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});

/* ===============================
   AI CONSOLE
================================ */

const input = document.getElementById("consoleInput");
const output = document.getElementById("consoleOutput");

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const cmd = input.value.toLowerCase();
    output.textContent += `\n> ${cmd}\n`;

    if (cmd === "help") {
      output.textContent += "Available commands: about, skills, contact\n";
    } else if (cmd === "about") {
      output.textContent += "AI Profile: Software Engineer, Full Stack, AI-Driven Systems\n";
    } else if (cmd === "contact") {
      output.textContent += "Email: satya.myt77629@gmail.com\n";
    } else {
      output.textContent += "Unknown command\n";
    }
    input.value = "";
  }
});
