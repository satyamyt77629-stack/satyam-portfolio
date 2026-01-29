/* SATYAM INTERFACE - app.js
   - 3D world background (Three.js)
   - HUD navigation
   - Loads profile.json
   - Voice welcome (after Enter click)
   - Command console (open projects, open contact, mute/unmute, etc.)
*/

(function () {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // Elements
  const boot = $("#boot");
  const enterBtn = $("#enterBtn");
  const hud = $("#hud");

  const brandTitle = $("#brandTitle");
  const brandSub = $("#brandSub");
  const assistantNameEl = $("#assistantName");

  const viewTitle = $("#viewTitle");
  const yearEl = $("#year");
  const footerName = $("#footerName");

  const fullNameEl = $("#fullName");
  const roleEl = $("#role");
  const bioEl = $("#bio");
  const handleEl = $("#handle");
  const locationEl = $("#location");
  const emailTextEl = $("#emailText");

  const resumeBtn = $("#resumeBtn");
  const githubBtn = $("#githubBtn");
  const linkedinBtn = $("#linkedinBtn");

  const emailLink = $("#emailLink");
  const phoneLink = $("#phoneLink");
  const githubLink = $("#githubLink");
  const linkedinLink = $("#linkedinLink");

  const muteBtn = $("#muteBtn");
  const speakBtn = $("#speakBtn");

  const consoleEl = $("#console");
  const cmdInput = $("#cmdInput");
  const cmdSend = $("#cmdSend");

  const clockEl = $("#clock");
  const dateEl = $("#date");
  const statusText = $("#statusText");
  const dot = document.querySelector(".dot");
  const voiceStatus = $("#voiceStatus");

  const skillsGrid = $("#skillsGrid");
  const projectsGrid = $("#projectsGrid");
  const experienceList = $("#experienceList");

  const contactForm = $("#contactForm");
  const cName = $("#cName");
  const cEmail = $("#cEmail");
  const cMsg = $("#cMsg");

  // State
  let PROFILE = null;
  let muted = false;

  // Persist mute
  try {
    muted = localStorage.getItem("satyam_muted") === "1";
  } catch (_) {}

  // ---------- Console helpers ----------
  function log(line) {
    const div = document.createElement("div");
    div.className = "console-line";
    div.textContent = `▸ ${line}`;
    consoleEl.appendChild(div);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  // ---------- Views ----------
  const VIEWS = ["about", "skills", "projects", "experience", "contact"];

  function showView(name) {
    if (!VIEWS.includes(name)) name = "about";
    VIEWS.forEach(v => {
      const el = $(`#view-${v}`);
      if (!el) return;
      el.classList.toggle("hidden", v !== name);
    });

    $$(".nav-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.view === name);
    });

    viewTitle.textContent = name.toUpperCase();
    log(`Switched view → ${name.toUpperCase()}`);
  }

  // ---------- Voice ----------
  function setVoiceStatus(text) {
    voiceStatus.textContent = text;
  }

  function speak(text) {
    if (!text) return;
    if (muted) {
      setVoiceStatus("MUTED");
      return;
    }
    if (!("speechSynthesis" in window)) {
      setVoiceStatus("UNAVAILABLE");
      log("Voice not supported in this browser.");
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.02;
      u.pitch = 1.0;
      u.volume = 1;

      setVoiceStatus("SPEAKING");
      u.onend = () => setVoiceStatus("READY");
      u.onerror = () => setVoiceStatus("ERROR");
      window.speechSynthesis.speak(u);
    } catch (e) {
      setVoiceStatus("ERROR");
      log("Voice error: " + e.message);
    }
  }

  function setMuted(v) {
    muted = v;
    try { localStorage.setItem("satyam_muted", muted ? "1" : "0"); } catch (_) {}
    log(muted ? "Voice muted." : "Voice unmuted.");
    setVoiceStatus(muted ? "MUTED" : "READY");
  }

  // ---------- Load data ----------
  async function loadProfile() {
    const res = await fetch("./data/profile.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load profile.json");
    return await res.json();
  }

  function applyProfile(data) {
    PROFILE = data;

    // Top
    brandTitle.textContent = data.interfaceTitle || "SATYAM INTERFACE";
    assistantNameEl.textContent = data.assistantName || "J.A.R.V.I.S";
    brandSub.textContent = "Boss is offline • Portfolio access granted";

    // About
    const p = data.profile || {};
    fullNameEl.textContent = p.fullName || "Satyam";
    footerName.textContent = p.fullName || "Satyam";
    roleEl.textContent = p.role || "Developer";
    bioEl.textContent = p.bio || "";
    handleEl.textContent = p.handle || "@satyam";
    locationEl.textContent = p.location || "India";
    emailTextEl.textContent = p.email || "you@example.com";

    // Links
    const links = (p.links || {});
    resumeBtn.href = links.resume || "#";
    githubBtn.href = links.github || "#";
    linkedinBtn.href = links.linkedin || "#";

    // Contact direct links
    const email = p.email || "";
    const phone = p.phone || "";

    emailLink.textContent = email || "---";
    emailLink.href = email ? `mailto:${email}` : "#";

    phoneLink.textContent = phone || "---";
    phoneLink.href = phone ? `tel:${phone.replace(/\s/g, "")}` : "#";

    githubLink.textContent = links.github ? "Open" : "---";
    githubLink.href = links.github || "#";

    linkedinLink.textContent = links.linkedin ? "Open" : "---";
    linkedinLink.href = links.linkedin || "#";

    // Skills
    skillsGrid.innerHTML = "";
    (data.skills || []).forEach(group => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="card-title">${escapeHtml(group.category || "Skills")}</div>
        <div class="badges">
          ${(group.items || []).map(s => `<span class="badge">${escapeHtml(s)}</span>`).join("")}
        </div>
        <div class="scanline"></div>
      `;
      skillsGrid.appendChild(card);
    });

    // Projects
    projectsGrid.innerHTML = "";
    (data.projects || []).forEach(pr => {
      const live = pr.links?.live;
      const gh = pr.links?.github;
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="card-title">${escapeHtml(pr.title || "Project")}</div>
        <div class="card-sub">${escapeHtml(pr.description || "")}</div>

        <div class="badges">
          ${(pr.stack || []).map(s => `<span class="badge">${escapeHtml(s)}</span>`).join("")}
        </div>

        <div class="card-links">
          ${live ? `<a href="${escapeAttr(live)}" target="_blank" rel="noopener">Live</a>` : ""}
          ${gh ? `<a href="${escapeAttr(gh)}" target="_blank" rel="noopener">GitHub</a>` : ""}
        </div>

        <div class="scanline"></div>
      `;
      projectsGrid.appendChild(card);
    });

    // Experience
    experienceList.innerHTML = "";
    (data.experience || []).forEach(ex => {
      const item = document.createElement("div");
      item.className = "item";
      item.innerHTML = `
        <div class="item-top">
          <div class="item-role">${escapeHtml(ex.role || "Role")} • ${escapeHtml(ex.company || "")}</div>
          <div class="item-meta">${escapeHtml(ex.period || "")}</div>
        </div>
        <div class="item-desc">${escapeHtml(ex.description || "")}</div>
      `;
      experienceList.appendChild(item);
    });

    log("Profile loaded successfully.");
  }

  // Simple HTML escape (safe for innerHTML usage)
  function escapeHtml(str) {
    return String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
  function escapeAttr(str) {
    return String(str ?? "").replaceAll('"', "%22");
  }

  // ---------- Command parser ----------
  function normalizeCmd(s) {
    return String(s || "").trim().toLowerCase();
  }

  function runCommand(raw) {
    const cmd = normalizeCmd(raw);
    if (!cmd) return;

    log(`Command received: "${cmd}"`);

    if (cmd === "help" || cmd === "?") {
      log("Commands: open about | open skills | open projects | open experience | open contact | mute | unmute | welcome | download resume");
      return;
    }

    if (cmd.startsWith("open ")) {
      const view = cmd.replace("open ", "").trim();
      if (VIEWS.includes(view)) showView(view);
      else log(`Unknown view "${view}". Try: about/skills/projects/experience/contact`);
      return;
    }

    if (cmd === "mute") {
      setMuted(true);
      return;
    }

    if (cmd === "unmute") {
      setMuted(false);
      return;
    }

    if (cmd === "welcome") {
      speak(PROFILE?.welcomeSpeech || "Welcome to Satyam Interface. Boss is offline.");
      return;
    }

    if (cmd === "download resume") {
      const url = PROFILE?.profile?.links?.resume;
      if (url && url !== "#") {
        window.open(url, "_blank", "noopener");
        log("Opening resume...");
      } else {
        log("Resume link not set in profile.json");
      }
      return;
    }

    log("Unknown command. Type 'help'.");
  }

  // ---------- Clock ----------
  function tickTime() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    clockEl.textContent = `${hh}:${mm}:${ss}`;

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    dateEl.textContent = `${months[now.getMonth()]} ${String(now.getDate()).padStart(2,"0")} ${now.getFullYear()}`;
  }

  // ---------- Contact form (mailto) ----------
  function setupContactForm() {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const to = PROFILE?.profile?.email;
      if (!to) {
        log("Email not set in profile.json");
        return;
      }

      const subject = encodeURIComponent(`Portfolio Contact: ${cName.value}`);
      const body = encodeURIComponent(
        `Name: ${cName.value}\nEmail: ${cEmail.value}\n\nMessage:\n${cMsg.value}\n`
      );

      const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
      window.location.href = mailto;
      log("Opening email client...");
      contactForm.reset();
    });
  }

  // ---------- Boot / Enter ----------
  function enterInterface() {
    boot.classList.add("hidden");
    hud.classList.remove("hidden");

    // show offline style
    statusText.textContent = "OFFLINE";
    if (dot) {
      dot.style.background = "rgba(255,200,120,0.92)";
      dot.style.boxShadow = "0 0 18px rgba(255,200,120,0.7)";
    }

    // speak welcome
    const text = PROFILE?.welcomeSpeech ||
      "Welcome to Satyam Interface. Boss is offline. You can view the portfolio and contact with him.";
    speak(text);

    log("Interface started.");
    showView("about");
  }

  // ---------- 3D World (Three.js) ----------
  function startWorld() {
    const canvas = $("#bg");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 7);

    // Lights
    const ambient = new THREE.AmbientLight(0x88ffff, 0.35);
    scene.add(ambient);

    const dir = new THREE.DirectionalLight(0x88ffff, 0.55);
    dir.position.set(4, 3, 5);
    scene.add(dir);

    // Starfield
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1200;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPos[i3 + 0] = (Math.random() - 0.5) * 80;
      starPos[i3 + 1] = (Math.random() - 0.5) * 80;
      starPos[i3 + 2] = (Math.random() - 0.5) * 80;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x66ffff, size: 0.03, transparent: true, opacity: 0.55 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // World sphere (wireframe + points)
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 40, 40),
      new THREE.MeshStandardMaterial({
        color: 0x0b2230,
        emissive: 0x0b2230,
        metalness: 0.2,
        roughness: 0.6,
        transparent: true,
        opacity: 0.65
      })
    );
    scene.add(sphere);

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(2.23, 26, 26)),
      new THREE.LineBasicMaterial({ color: 0x66ffff, transparent: true, opacity: 0.20 })
    );
    scene.add(wire);

    // Orbit points “network”
    const netGeo = new THREE.BufferGeometry();
    const netCount = 900;
    const netPos = new Float32Array(netCount * 3);
    for (let i = 0; i < netCount; i++) {
      const i3 = i * 3;
      // random points on sphere surface
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 2.28 + (Math.random() * 0.08);
      netPos[i3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      netPos[i3 + 1] = r * Math.cos(phi);
      netPos[i3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    netGeo.setAttribute("position", new THREE.BufferAttribute(netPos, 3));
    const netMat = new THREE.PointsMaterial({ color: 0x88ffff, size: 0.03, transparent: true, opacity: 0.75 });
    const net = new THREE.Points(netGeo, netMat);
    scene.add(net);

    // Subtle ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.8, 0.02, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0x66ffff, transparent: true, opacity: 0.18 })
    );
    ring.rotation.x = Math.PI / 2.4;
    scene.add(ring);

    let t = 0;

    function animate() {
      requestAnimationFrame(animate);
      t += 0.003;

      sphere.rotation.y += 0.0016;
      wire.rotation.y += 0.0019;
      net.rotation.y += 0.0017;

      ring.rotation.z += 0.0012;

      stars.rotation.y += 0.0003;
      stars.rotation.x += 0.0001;

      // slight camera float
      camera.position.x = Math.sin(t) * 0.08;
      camera.position.y = Math.cos(t * 0.9) * 0.06;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();

    // Resize
    window.addEventListener("resize", () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  // ---------- Events ----------
  function bindEvents() {
    // Nav buttons
    $$(".nav-btn").forEach(btn => {
      btn.addEventListener("click", () => showView(btn.dataset.view));
    });

    // Command input
    cmdSend.addEventListener("click", () => {
      runCommand(cmdInput.value);
      cmdInput.value = "";
      cmdInput.focus();
    });
    cmdInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        runCommand(cmdInput.value);
        cmdInput.value = "";
      }
    });

    // Voice buttons
    muteBtn.addEventListener("click", () => setMuted(true));
    speakBtn.addEventListener("click", () => {
      speak(PROFILE?.welcomeSpeech || "");
      log("Repeating welcome message.");
    });

    // Enter
    enterBtn.addEventListener("click", enterInterface);
  }

  // ---------- Init ----------
  async function init() {
    yearEl.textContent = String(new Date().getFullYear());

    bindEvents();
    setupContactForm();
    startWorld();

    tickTime();
    setInterval(tickTime, 1000);

    // Mute state
    setVoiceStatus(muted ? "MUTED" : "READY");

    // Load profile
    try {
      const data = await loadProfile();
      applyProfile(data);
      log("Type 'help' to see commands.");
    } catch (e) {
      log("ERROR: " + e.message);
      bioEl.textContent = "Could not load profile.json. Check that /data/profile.json exists.";
    }
  }

  init();
})();
