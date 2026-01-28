const welcome = document.getElementById("welcome");
const boot = document.getElementById("boot");
const bootText = document.getElementById("bootText");
const ui = document.getElementById("interface");

const startBtn = document.getElementById("startBtn");

const slides = document.querySelectorAll(".slide");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let index = 0;

const bootLines = [
  "> SYSTEM ONLINE",
  "> INITIALIZING NEURAL INTERFACE",
  "> LOADING USER PROFILE",
  "> INTERFACE: SATYAM KUMAR",
  "> STATUS: BOSS OFFLINE",
  "> YOU ARE VIEWING THE INTERFACE OF SATYAM KUMAR",
  "> ACCESS GRANTED"
];

// START
startBtn.onclick = () => {
  welcome.classList.add("hidden");
  boot.classList.remove("hidden");
  runBoot();
};

function runBoot() {
  let i = 0;
  function typeLine() {
    if (i < bootLines.length) {
      bootText.textContent += bootLines[i] + "\n";
      i++;
      setTimeout(typeLine, 400);
    } else {
      setTimeout(showUI, 800);
    }
  }
  typeLine();
}

function showUI() {
  boot.classList.add("hidden");
  ui.classList.remove("hidden");

  speak(
    "You are viewing the interface of Satyam Kumar. The boss is currently offline."
  );
}

// SLIDES
function showSlide(i) {
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
}

nextBtn.onclick = () => {
  index = (index + 1) % slides.length;
  showSlide(index);
};

prevBtn.onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
};

// VOICE (SAFE)
function speak(text) {
  if (!window.speechSynthesis) return;
  speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 0.95;
  msg.pitch = 1.05;
  speechSynthesis.speak(msg);
}
