// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
});

reveals.forEach(r => observer.observe(r));

// 3D Tilt
const tilt = document.querySelector(".tilt");

tilt.addEventListener("mousemove", e => {
  const rect = tilt.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateX = ((y / rect.height) - 0.5) * 15;
  const rotateY = ((x / rect.width) - 0.5) * -15;

  tilt.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

tilt.addEventListener("mouseleave", () => {
  tilt.style.transform = "rotateX(0) rotateY(0)";
});
