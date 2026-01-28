const bootLines = [
  "> SYSTEM ONLINE",
  "> INITIALIZING NEURAL INTERFACE",
  "> LOADING USER PROFILE",
  "> INTERFACE: SATYAM KUMAR",
  "> STATUS: BOSS OFFLINE",
  "> YOU ARE VIEWING THE INTERFACE OF SATYAM KUMAR.",
  "> THE BOSS IS CURRENTLY OFFLINE.",
  "> ACCESS GRANTED"
];

const bootText = document.getElementById("boot-text");
let line = 0;

function typeBoot() {
  if (line < bootLines.length) {
    bootText.textContent += bootLines[line] + "\n";
    line++;
    setTimeout(typeBoot, 400);
  } else {
    setTimeout(() => {
      document.getElementById("boot-screen").style.display = "none";
      document.getElementById("intro").classList.remove("hidden");
    }, 1000);
  }
}

typeBoot();

/* VOICE */
function speak(text) {
  if (!window.speechSynthesis) return;
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 0.95;
  msg.pitch = 1.1;
  window.speechSynthesis.speak(msg);
}

/* ENTER */
document.getElementById("enter-btn").onclick = () => {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("interface").classList.remove("hidden");

  speak(
    "You are viewing the interface of Satyam Kumar. The boss is currently offline."
  );
};

/* SLIDES */
const slides = document.querySelectorAll(".slide");
let current = 0;

function showSlide(i) {
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
}

document.getElementById("next").onclick = () => {
  current = (current + 1) % slides.length;
  showSlide(current);
};

document.getElementById("prev").onclick = () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
};
