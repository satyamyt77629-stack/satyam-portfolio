// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach(el => observer.observe(el));

// 3D TILT EFFECT
const tilt = document.querySelector(".tilt");

if (tilt) {
  tilt.addEventListener("mousemove", e => {
    const rect = tilt.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 10;
    const rotateY = ((x / rect.width) - 0.5) * -10;

    tilt.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tilt.addEventListener("mouseleave", () => {
    tilt.style.transform = "rotateX(0) rotateY(0)";
  });
}
