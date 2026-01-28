const slides = document.querySelectorAll(".slide");
let current = 0;
let scrolling = false;

const voices = [
  "Background loaded.",
  "Engineering philosophy initialized.",
  "Deploying project intelligence.",
  "Professional experience detected.",
  "Communication channels available."
];

function speak(text) {
  if (!speechSynthesis) return;
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 0.9;
  msg.pitch = 1.1;
  speechSynthesis.speak(msg);
}

function showSlide(index) {
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");

  if (voices[index - 1]) {
    speak(voices[index - 1]);
  }
}

window.addEventListener("wheel", e => {
  if (scrolling) return;
  scrolling = true;

  if (e.deltaY > 0 && current < slides.length - 1) {
    current++;
    showSlide(current);
  } else if (e.deltaY < 0 && current > 0) {
    current--;
    showSlide(current);
  }

  setTimeout(() => scrolling = false, 900);
});

/* BOOT */
const bootLines = [
  "> SYSTEM ONLINE",
  "> INITIALIZING NEURAL INTERFACE",
  "> INTERFACE: SATYAM KUMAR",
  "> STATUS: BOSS OFFLINE",
  "> ACCESS GRANTED"
];

const bootText = document.getElementById("boot-text");
let i = 0;

function boot() {
  if (i < bootLines.length) {
    bootText.textContent += bootLines[i] + "\n";
    i++;
    setTimeout(boot, 350);
  } else {
    setTimeout(() => {
      document.getElementById("boot").style.display = "none";
      showSlide(0);
    }, 1200);
  }
}

boot();

/* PARALLAX */
document.addEventListener("mousemove", e => {
  const img = document.querySelector(".hero-image img");
  if (!img) return;
  const x = (window.innerWidth / 2 - e.clientX) / 40;
  const y = (window.innerHeight / 2 - e.clientY) / 40;
  img.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});
