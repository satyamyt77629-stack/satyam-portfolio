const content = document.getElementById("content");
const buttons = document.querySelectorAll("nav button");

const sections = {
  about: `
    <h3>About Me</h3>
    <p>
      I am an Information Technology undergraduate with a strong focus on building
      reliable, scalable, and maintainable software systems.
    </p>
    <p>
      My interests lie in full-stack development, backend architecture,
      and solving real-world problems through clean system design.
    </p>
  `,

  philosophy: `
    <h3>Engineering Philosophy</h3>
    <p>
      I believe great engineering is silent, reliable, and intentional.
      Every line of code should earn its place.
    </p>
    <p>
      I prioritize clean architecture, predictable systems,
      and long-term maintainability over short-term solutions.
    </p>
  `,

  projects: `
    <h3>AI-Driven Projects</h3>
    <div class="project">Automatic Water Pump Control (IoT)</div>
    <div class="project">Automatic Security Alert System</div>
    <div class="project">Thermoelectric Generator</div>
    <div class="project">Task Management Web App</div>
    <div class="project">Personal Portfolio Interface</div>
  `,

  experience: `
    <h3>Experience</h3>
    <p><strong>Software Engineer</strong></p>
    <p>Gyanyug RIG Innovation</p>
    <p>
      Building real-world, production-grade software systems
      with a focus on scalability, performance optimization,
      and secure backend architecture.
    </p>
  `,

  contact: `
    <h3>Contact</h3>
    <p>Email: satya.myt77629@gmail.com</p>
  `
};

// Default
content.innerHTML = sections.about;

// Navigation
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    content.innerHTML = sections[btn.dataset.section];
  });
});
