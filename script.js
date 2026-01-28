const text = "Software Engineer | Full-Stack Developer";
let index = 0;

function typeEffect() {
  const element = document.querySelector(".typing");
  if (index < text.length) {
    element.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, 80);
  }
}

window.onload = typeEffect;
