/* Typing Intro */
const text = "Welcome. You are viewing the interface of Satyam Kumar. The boss is currently offline. Let's begin.";
let i = 0;
const speed = 45;
const target = document.getElementById("typing");

function type() {
  if (i < text.length) {
    target.innerHTML += text.charAt(i);
    i++;
    setTimeout(type, speed);
  }
}
type();

/* Female AI Voice */
function speak() {
  const msg = new SpeechSynthesisUtterance(
    "Welcome. You are viewing the interface of Satyam Kumar. The boss is currently offline. Let's begin."
  );
  msg.rate = 0.9;
  msg.pitch = 1.2;

  const voices = speechSynthesis.getVoices();
  const female = voices.find(v => v.name.toLowerCase().includes("female")) || voices[0];
  msg.voice = female;

  speechSynthesis.speak(msg);
}

window.addEventListener("load", () => {
  setTimeout(speak, 1200);
});

/* Particle Background */
const canvas = document.getElementById("ai-bg");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = Array.from({ length: 70 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 0.5,
  vy: (Math.random() - 0.5) * 0.5
}));

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.fillStyle = "#3fd2ff";
    ctx.fillRect(p.x,p.y,2,2);
  });
  requestAnimationFrame(animate);
}
animate();

/* 3D Tilt */
document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    card.style.transform =
      `rotateX(${-(y-r.height/2)/12}deg) rotateY(${(x-r.width/2)/12}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});
