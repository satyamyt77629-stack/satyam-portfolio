/* AI BOOT SEQUENCE */
const lines = [
  "SYSTEM BOOTING...",
  "INITIALIZING INTERFACE...",
  "LOADING AI MODULES...",
  "IDENTITY CONFIRMED: SATYAM KUMAR",
  "STATUS: ONLINE"
];

const terminal = document.getElementById("aiTerminal");
let line = 0;

function typeLine() {
  if (line < lines.length) {
    terminal.innerHTML += "> " + lines[line] + "\n";
    line++;
    setTimeout(typeLine, 600);
  } else {
    setTimeout(() => {
      document.getElementById("aiBoot").style.display = "none";
      document.querySelectorAll(".hidden").forEach(el => el.classList.add("show"));
    }, 900);
  }
}
typeLine();

/* SCROLL REVEAL */
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});

/* 3D TILT */
document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = -(y / rect.height - 0.5) * 10;
    const ry = (x / rect.width - 0.5) * 10;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});
