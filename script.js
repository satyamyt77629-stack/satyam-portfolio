const bootLines = [
  "> SYSTEM ONLINE",
  "> INITIALIZING NEURAL INTERFACE",
  "> LOADING USER PROFILE",
  "> INTERFACE: SATYAM KUMAR",
  "> STATUS: BOSS OFFLINE",
  "> ACCESS GRANTED"
];

const bootText = document.getElementById("bootText");
let i = 0;

function runBoot() {
  if (i < bootLines.length) {
    bootText.innerHTML += bootLines[i] + "\n";
    i++;
    setTimeout(runBoot, 600);
  } else {
    setTimeout(() => {
      document.getElementById("boot").style.display = "none";
      document.getElementById("app").classList.remove("hidden");
    }, 800);
  }
}
runBoot();

/* SLIDES */
const slides = document.querySelectorAll(".slide");
const buttons = document.querySelectorAll(".sidebar button");
let current = 0;

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const index = Number(btn.dataset.slide);
    if (index === current) return;
    slides[current].classList.remove("active");
    slides[index].classList.add("active");
    current = index;
  });
});
