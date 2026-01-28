const access = document.getElementById("access");
const boot = document.getElementById("boot");
const jarvis = document.getElementById("jarvis");
const bootText = document.getElementById("bootText");
const enterBtn = document.getElementById("enterBtn");

let hasEntered = false;

const bootLines = [
  "> SYSTEM ONLINE",
  "> INITIALIZING NEURAL INTERFACE",
  "> LOADING USER PROFILE",
  "> INTERFACE: SATYAM KUMAR",
  "> STATUS: BOSS OFFLINE",
  "> ACCESS GRANTED"
];

enterBtn.onclick = () => {
  if (hasEntered) return;
  hasEntered = true;

  access.classList.remove("active");
  boot.classList.add("active");

  runBoot();
};

function runBoot() {
  let i = 0;
  bootText.textContent = "";

  const interval = setInterval(() => {
    bootText.textContent += bootLines[i] + "\n";
    i++;

    if (i === bootLines.length) {
      clearInterval(interval);
      setTimeout(showJarvis, 800);
    }
  }, 600);
}

function showJarvis() {
  boot.classList.remove("active");
  jarvis.classList.add("active");
}
