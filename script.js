// Scroll reveal
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
});

// 3D Character Tilt
const character = document.querySelector('.hero-character');

if (character) {
  document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 30;
    const y = (window.innerHeight / 2 - e.clientY) / 30;
    character.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });

  document.addEventListener('mouseleave', () => {
    character.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}
