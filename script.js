// Optional subtle AI greeting (safe)
window.addEventListener("load", () => {
  if ("speechSynthesis" in window) {
    const msg = new SpeechSynthesisUtterance(
      "Welcome. You are viewing the interface of Satyam Kumar."
    );
    msg.rate = 0.9;
    msg.pitch = 0.8;
    msg.volume = 0.6;
    speechSynthesis.speak(msg);
  }
});
