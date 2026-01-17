export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="section">
        <h1 style={{ fontSize: "42px", marginBottom: "12px" }}>
          Satyam Kumar
        </h1>
        <p style={{ fontSize: "18px", color: "#475569" }}>
          Full Stack Developer | Software Engineer | Stock Trader
        </p>
        <p className="subtext" style={{ marginTop: "16px" }}>
          I build scalable web applications and solve real-world engineering
          problems using clean, maintainable code.
        </p>
      </section>

      {/* ABOUT */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <h2 className="heading">About Me</h2>
        <p className="subtext">
          I am currently pursuing a Bachelor of Engineering in Information
          Technology and working as a Software Engineer Intern at Gyanyug RIG
          Innovation.
        </p>
        <p className="subtext" style={{ marginTop: "12px" }}>
          Alongside software development, I am actively involved in stock
          trading, which strengthens my analytical and decision-making skills.
        </p>
      </section>

      {/* SKILLS */}
      <section className="section">
        <h2 className="heading">Skills</h2>
        <div className="card">HTML, CSS, JavaScript</div>
        <div className="card">React & Next.js</div>
        <div className="card">Backend Development</div>
        <div className="card">REST APIs</div>
        <div className="card">Git & GitHub</div>
        <div className="card">Problem Solving</div>
      </section>

      {/* PROJECTS */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <h2 className="heading">Projects</h2>
        <div className="card">
          <strong>Automatic Door Lock System</strong>
          <p className="subtext">
            Automated security system focused on reliability and control logic.
          </p>
        </div>
        <div className="card">
          <strong>Automatic Water Pump Controller</strong>
          <p className="subtext">
            Automation system designed to improve efficiency and reduce manual
            intervention.
          </p>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section">
        <h2 className="heading">Experience</h2>
        <div className="card">
          <strong>Software Engineer Intern</strong>
          <p className="subtext">Gyanyug RIG Innovation</p>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="section" style={{ backgroundColor: "#f8fafc" }}>
        <h2 className="heading">Education</h2>
        <p className="subtext">
          Bachelor of Engineering (Information Technology) — Currently Pursuing
        </p>
      </section>

      {/* CONTACT */}
      <section className="section">
        <h2 className="heading">Contact</h2>
        <p className="subtext">
          Email: <strong>satya.myt77629@gmail.com</strong>
        </p>
      </section>
    </>
  );
}