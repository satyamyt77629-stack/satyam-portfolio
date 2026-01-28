const bootLines = [
  "> SYSTEM ONLINE",
  "> INITIALIZING NEURAL INTERFACE",
  "> LOADING USER PROFILE",
  "> INTERFACE: SATYAM KUMAR",
  "> STATUS: BOSS OFFLINE",
  "> MESSAGE:",
  "> YOU ARE VIEWING THE INTERFACE OF SATYAM KUMAR.",
  "> YOU MAY EXPLORE THE SYSTEM, REVIEW PROJECTS, OR INITIATE CONTACT.",
  "> ACCESS GRANTED"
];

const bootText = document.getElementById("boot-text");
let index = 0;

function typeLine(line, cb) {
  let i = 0;
  const timer = setInterval(() => {
    bootText.textContent += line[i];
    i++;
    if (i === line.length) {
      clearInterval(timer);
      bootText.textContent += "\n";
      setTimeout(cb, 250);
    }
  }, 26);
}

function startBoot() {
  if (index < bootLines.length) {
    typeLine(bootLines[index], () => {
      index++;
      startBoot();
    });
  } else {
    speak();
    setTimeout(showMain, 3800);
  }
}

function speak() {
  if (!window.speechSynthesis) return;
  const msg = new SpeechSynthesisUtterance(
    "You are viewing the interface of Satyam Kumar. The boss is currently offline. You may explore the system."
  );
  msg.rate = 0.9;
  msg.pitch = 1.1;
  speechSynthesis.speak(msg);
}

function showMain() {
  document.getElementById("boot-screen").style.display = "none";
  document.getElementById("main-site").classList.add("visible");
  document.body.style.overflow = "auto";
}

/* PARALLAX */
const parallax = document.getElementById("parallax");
document.addEventListener("mousemove", e => {
  const x = (window.innerWidth / 2 - e.clientX) / 30;
  const y = (window.innerHeight / 2 - e.clientY) / 30;
  parallax.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

window.onload = () => {
  setTimeout(startBoot, 500);
};
