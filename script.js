/* TYPING INTRO */
const intro =
"Welcome. You are viewing the interface of Satyam Kumar. The boss is currently offline.";

let i = 0;
const typing = document.getElementById("typing");

function type() {
  if (i < intro.length) {
    typing.innerHTML += intro.charAt(i);
    i++;
    setTimeout(type, 45);
  } else {
    setTimeout(() => {
      typing.classList.add("fade-out");
      document.querySelectorAll(".hidden").forEach(el => {
        el.style.opacity = 1;
        el.style.transition = "1.5s";
      });
    }, 2000);
  }
}
type();

/* SCROLL REVEAL */
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(r => {
    const top = r.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      r.classList.add("active");
    }
  });
});

/* TILT EFFECT */
const tilt = document.querySelector(".tilt");
tilt.addEventListener("mousemove", e => {
  const rect = tilt.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rx = (y / rect.height - 0.5) * 15;
  const ry = (x / rect.width - 0.5) * -15;
  tilt.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
});
tilt.addEventListener("mouseleave", () => {
  tilt.style.transform = "rotateX(0) rotateY(0)";
});

/* NEURAL BACKGROUND */
const canvas = document.getElementById("neural");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let points = Array.from({length:80},()=>({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  vx:(Math.random()-0.5)*0.4,
  vy:(Math.random()-0.5)*0.4
}));

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  points.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>canvas.width)p.vx*=-1;
    if(p.y<0||p.y>canvas.height)p.vy*=-1;
    points.forEach(q=>{
      const d=Math.hypot(p.x-q.x,p.y-q.y);
      if(d<120){
        ctx.strokeStyle=`rgba(99,102,241,${1-d/120})`;
        ctx.beginPath();
        ctx.moveTo(p.x,p.y);
        ctx.lineTo(q.x,q.y);
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(animate);
}
animate();
