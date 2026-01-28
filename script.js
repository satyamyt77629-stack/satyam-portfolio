const bootLines = [
  "> SYSTEM ONLINE",
  "> INITIALIZING NEURAL INTERFACE",
  "> LOADING USER PROFILE",
  "> INTERFACE: SATYAM KUMAR",
  "> STATUS: BOSS OFFLINE",
  "> MESSAGE:",
  "> YOU ARE VIEWING THE INTERFACE OF SATYAM KUMAR.",
  "> THE BOSS IS CURRENTLY OFFLINE.",
  "> YOU MAY EXPLORE THE SYSTEM, REVIEW PROJECTS, OR INITIATE CONTACT.",
  "> ACCESS GRANTED"
];

let currentLine = 0;
const bootElement = document.getElementById("boot-text");

/* TYPE EFFECT */
function typeLine(text, callback) {
  let i = 0;
  const interval = setInterval(() => {
    bootElement.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      bootElement.innerHTML += "<br/>";
      if (callback) setTimeout(callback, 350);
    }
  }, 35);
}

/* BOOT SEQUENCE */
function startBootSequence() {
  if (currentLine < bootLines.length) {
    typeLine(bootLines[currentLine], () => {
      currentLine++;
      startBootSequence();
    });
  } else {
    speakIntro();
    setTimeout(showMainInterface, 5000);
  }
}

/* 🔊 AI VOICE (AFTER TYPING FINISHES) */
function speakIntro() {
  if (!("speechSynthesis" in window)) return;

  const message = new SpeechSynthesisUtterance(
    "You are viewing the interface of Satyam Kumar. " +
    "The boss is currently offline. " +
    "You may explore the system, review projects, or initiate contact."
  );

  message.rate = 0.9;
  message.pitch = 1.15;
  message.volume = 1;

  const voices = speechSynthesis.getVoices();
  message.voice =
    voices.find(v => v.name.toLowerCase().includes("female")) || voices[0];

  speechSynthesis.speak(message);
}

/* SHOW MAIN SITE */
function showMainInterface() {
  document.getElementById("boot-screen").style.display = "none";
  document.getElementById("main-site").classList.add("visible");
}

/* START SYSTEM */
window.onload = () => {
  setTimeout(startBootSequence, 600);
};
