export default function Home() {
  return (
    <main style={styles.main}>
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <h1 style={styles.name}>Satyam Kumar</h1>
        <h2 style={styles.title}>Software Engineer</h2>
        <p style={styles.tagline}>
          Full Stack Developer passionate about building scalable web
          applications and solving real-world problems with clean, efficient
          code.
        </p>
      </section>

      {/* ABOUT SECTION */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>About Me</h3>
        <p style={styles.text}>
          I am a Software Engineer with a strong foundation in Information
          Technology and hands-on experience in full stack development.
          Currently working at <b>Gyanyug</b>, I focus on developing reliable,
          user-friendly applications while continuously improving my problem-
          solving skills. I enjoy learning new technologies and applying them
          to practical projects.
        </p>
      </section>

      {/* SKILLS */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Skills</h3>
        <div style={styles.grid}>
          <Skill text="Full Stack Development" />
          <Skill text="Problem Solving" />
          <Skill text="JavaScript & Web Technologies" />
          <Skill text="React & Next.js" />
          <Skill text="Backend & APIs" />
          <Skill text="Version Control (Git & GitHub)" />
        </div>
      </section>

      {/* EXPERIENCE */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Experience</h3>
        <div style={styles.card}>
          <h4>Software Engineer – Gyanyug</h4>
          <p>
            Currently working as a Software Engineer, contributing to
            application development, improving features, and solving technical
            challenges in real-world projects.
          </p>
        </div>
      </section>

      {/* PROJECTS */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Projects</h3>
        <div style={styles.projectGrid}>
          <Project
            title="Automatic Door Lock"
            desc="An embedded system project focused on secure and automated door locking mechanisms."
          />
          <Project
            title="Automatic Water Pump"
            desc="A smart system that controls water pumping automatically based on water levels."
          />
          <Project
            title="Thermoelectric Generator"
            desc="A project that generates electricity using temperature differences."
          />
        </div>
      </section>

      {/* EDUCATION */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Education</h3>
        <div style={styles.card}>
          <p>
            <b>Bachelor of Engineering</b> – Information Technology
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Contact</h3>
        <p>Email: <a href="mailto:satya.myt77629@gmail.com">satya.myt77629@gmail.com</a></p>
        <p>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/satyam-kumar-649733304"
            target="_blank"
          >
            View Profile
          </a>
        </p>
      </section>
    </main>
  );
}

/* COMPONENTS */
function Skill({ text }) {
  return <div style={styles.skill}>{text}</div>;
}

function Project({ title, desc }) {
  return (
    <div style={styles.card}>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

/* STYLES */
const styles = {
  main: {
    fontFamily: "Arial, sans-serif",
    padding: "40px",
    maxWidth: "1000px",
    margin: "auto",
    color: "#111",
  },
  hero: {
    marginBottom: "60px",
  },
  name: {
    fontSize: "48px",
    margin: 0,
  },
  title: {
    fontSize: "24px",
    color: "#555",
    marginTop: "10px",
  },
  tagline: {
    marginTop: "20px",
    fontSize: "18px",
    maxWidth: "600px",
  },
  section: {
    marginBottom: "50px",
  },
  sectionTitle: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  text: {
    fontSize: "16px",
    lineHeight: 1.6,
    maxWidth: "800px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  },
  projectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  skill: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    background: "#fafafa",
  },
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
  },
};