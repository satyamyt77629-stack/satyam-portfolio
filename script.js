const access = document.getElementById("access");
const boot = document.getElementById("boot");
const bootText = document.getElementById("bootText");
const jarvis = document.getElementById("jarvis");

const enterBtn = document.getElementById("enter");
const navButtons = document.querySelectorAll(".nav-panel button");
const slides = document.querySelectorAll(".slide");

const bootLines = [
  "> SYSTEM ONLINE",
  "> INITIALIZING NEURAL INTERFACE",
  "> LOADING USER PROFILE",
  "> INTERFACE: SATYAM KUMAR",
  "> STATUS: BOSS OFFLINE",
  "> ACCESS GRANTED"
];

// ENTER
enterBtn.onclick = () => {
  access.classList.add("hidden");
  boot.classList.remove("hidden");
  runBoot();
};

// BOOT SEQUENCE
function runBoot() {
  let i = 0;
  function nextLine() {
    if (i < bootLines.length) {
      bootText.textContent += bootLines[i] + "\n";
      i++;
      setTimeout(nextLine, 420);
    } else {
      setTimeout(showJarvis, 800);
    }
  }
  nextLine();
}

// SHOW INTERFACE
function showJarvis() {
  boot.classList.add("hidden");
  jarvis.classList.remove("hidden");
}

// SLIDE CONTROL
function showSlide(index) {
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");
}

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    showSlide(Number(btn.dataset.slide));
  });
});
