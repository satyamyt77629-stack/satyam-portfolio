const intro = document.getElementById("intro");
const ui = document.getElementById("interface");
const enterBtn = document.getElementById("enter-btn");

const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const sound = document.getElementById("slideSound");

let index = 0;

// ENTER INTERFACE (SAFE)
enterBtn.onclick = () => {
  intro.style.display = "none";
  ui.style.display = "block";

  setTimeout(() => {
    speak(
      "You are viewing the interface of Satyam Kumar. The boss is currently offline."
    );
  }, 600);
};

// SLIDE CONTROL
function showSlide(i) {
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
  sound.currentTime = 0;
  sound.play();
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
