/* ================= BOOT ================= */

const bootLines = [
  "> SYSTEM ONLINE",
  "> INTERFACE: SATYAM KUMAR",
  "> STATUS: BOSS OFFLINE",
  "> ACCESS GRANTED"
];

const bootText = document.getElementById("boot-text");
const boot = document.getElementById("boot");

let i = 0;
function bootType() {
  if (i < bootLines.length) {
    bootText.textContent += bootLines[i] + "\n";
    i++;
    setTimeout(bootType, 600);
  } else {
    setTimeout(() => {
      boot.classList.add("fade-out");
      setTimeout(() => boot.remove(), 1500);
      document.querySelectorAll(".hidden").forEach(e => e.style.opacity = 1);
    }, 1200);
  }
}
bootType();

/* ================= SCROLL REVEAL ================= */

const reveals = document.querySelectorAll(".reveal");
addEventListener("scroll", () => {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

/* ================= FACE-TRACKING PARALLAX ================= */

const character = document.querySelector(".character");

addEventListener("mousemove", e => {
  const x = (e.clientX / innerWidth - 0.5) * 20;
  const y = (e.clientY / innerHeight - 0.5) * -20;
  character.style.transform =
    `rotateY(${x}deg) rotateX(${y}deg) translateZ(10px)`;
});

/* ================= IDLE AI THINKING ================= */

let idleTime = 0;
setInterval(() => {
  idleTime++;
  if (idleTime > 3) {
    character.style.transform += " rotateZ(1deg)";
  }
}, 1000);

addEventListener("mousemove", () => idleTime = 0);

/* ================= NEURAL BG ================= */

const canvas = document.getElementById("neural");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

let nodes = Array.from({ length: 80 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  nodes.forEach(a => {
    a.x += a.vx;
    a.y += a.vy;

    if (a.x < 0 || a.x > canvas.width) a.vx *= -1;
    if (a.y < 0 || a.y > canvas.height) a.vy *= -1;

    nodes.forEach(b => {
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 120) {
        ctx.strokeStyle = `rgba(99,102,241,${1 - d / 120})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(animate);
}
animate();
