/* BOOT SCREEN */
const bootLines = [
  "> SYSTEM ONLINE",
  "> INITIALIZING NEURAL INTERFACE",
  "> LOADING USER PROFILE",
  "> INTERFACE: SATYAM KUMAR",
  "> STATUS: BOSS OFFLINE",
  "> ACCESS GRANTED"
];

const bootText = document.getElementById("boot-text");
const bootScreen = document.getElementById("boot-screen");

let i = 0;
function runBoot() {
  if (i < bootLines.length) {
    bootText.innerText += bootLines[i] + "\n";
    i++;
    setTimeout(runBoot, 500);
  } else {
    setTimeout(() => {
      bootScreen.style.opacity = "0";
      setTimeout(() => bootScreen.remove(), 700);
    }, 800);
  }
}
runBoot();

/* SLIDE NAVIGATION */
const links = document.querySelectorAll("[data-slide]");
const slides = document.querySelectorAll(".slide");

links.forEach(link => {
  link.addEventListener("click", () => {
    const target = link.dataset.slide;

    slides.forEach(s =>
      s.classList.toggle("active", s.id === target)
    );

    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(
        `Opening ${target} section`
      );
      msg.rate = 0.9;
      msg.volume = 0.6;
      speechSynthesis.speak(msg);
    }
  });
});
// ===== JARVIS IDLE DETECTION (SAFE) =====

let jarvisIdleTimer;

function jarvisSetIdle() {
  document.getElementById("jarvis-idle-core").style.opacity = "1";
}

function jarvisSetActive() {
  document.getElementById("jarvis-idle-core").style.opacity = "0";
  clearTimeout(jarvisIdleTimer);
  jarvisIdleTimer = setTimeout(jarvisSetIdle, 4000);
}

["mousemove", "keydown", "scroll", "touchstart"].forEach(evt => {
  window.addEventListener(evt, jarvisSetActive);
});

jarvisSetIdle();
