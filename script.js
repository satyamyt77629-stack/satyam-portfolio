// Scroll reveal
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach(el => observer.observe(el));

// 3D tilt
const tilt = document.querySelector(".tilt");

if (tilt) {
  tilt.addEventListener("mousemove", e => {
    const rect = tilt.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rx = ((y / rect.height) - 0.5) * 8;
    const ry = ((x / rect.width) - 0.5) * -8;

    tilt.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });

  tilt.addEventListener("mouseleave", () => {
    tilt.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}
