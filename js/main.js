// js/main.js
import { createWorld } from "./world.js";
import { renderView } from "./ui.js";

const $ = (sel) => document.querySelector(sel);

const gate = $("#gate");
const hud = $("#hud");
const enterBtn = $("#enterBtn");
const silentBtn = $("#silentBtn");

const brandTitle = $("#brandTitle");
const brandRole = $("#brandRole");
const brandLocation = $("#brandLocation");
const viewTitle = $("#viewTitle");
const viewEl = $("#view");

const consoleFeed = $("#consoleFeed");
const cmdInput = $("#cmdInput");
const cmdRun = $("#cmdRun");

const muteBtn = $("#muteBtn");
const repeatBtn = $("#repeatBtn");
const voiceState = $("#voiceState");

const clockEl = $("#clock");
const yearEl = $("#year");
const footerName = $("#footerName");

const linkLinkedIn = $("#linkLinkedIn");
const linkGitHub = $("#linkGitHub");
const linkResume = $("#linkResume");

let DATA = null;
let muted = false;
let world = null;

function log(line, cls = "") {
  const div = document.createElement("div");
  div.className = "line " + cls;
  div.innerHTML = line;
  consoleFeed.appendChild(div);
  consoleFeed.scrollTop = consoleFeed.scrollHeight;
}

function setVoiceState(s) {
  voiceState.textContent = s;
}

function speak(text) {
  if (muted) return;

  if (!("speechSynthesis" in window)) {
    log(`<span class="k">JARVIS:</span> Voice not supported in this browser.`, "warn");
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.02;
    u.pitch = 1.0;
    u.volume = 1;

    setVoiceState("SPEAKING");
    u.onend = () => setVoiceState("READY");
    u.onerror = () => setVoiceState("ERROR");
    window.speechSynthesis.speak(u);
  } catch (e) {
    setVoiceState("ERROR");
  }
}

function showView(key) {
  const map = {
    about: "ABOUT",
    skills: "SKILLS",
    projects: "PROJECTS",
    experience: "EXPERIENCE",
    contact: "CONTACT"
  };
  const title = map[key] || "ABOUT";
  viewTitle.textContent = title;

  viewEl.innerHTML = renderView(key, DATA);

  // contact form handler (mailto)
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("cName").value.trim();
      const email = document.getElementById("cEmail").value.trim();
      const msg = document.getElementById("cMsg").value.trim();

      const to = DATA.profile.email;
      const subject = encodeURIComponent(`Portfolio Contact: ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}\n`);
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      log(`<span class="k">SYS:</span> Opening mail client…`);
    });
  }

  // nav highlight
  document.querySelectorAll(".navbtn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === key);
  });

  log(`<span class="k">JARVIS:</span> Opened <b>${title}</b>.`);
}

function runCommand(raw) {
  const cmd = String(raw || "").trim().toLowerCase();
  if (!cmd) return;

  log(`<span class="k">YOU:</span> ${cmd}`);

  if (cmd === "help" || cmd === "?") {
    log(`<span class="k">JARVIS:</span> Commands: <b>about</b>, <b>skills</b>, <b>projects</b>, <b>experience</b>, <b>contact</b>, <b>mute</b>, <b>unmute</b>, <b>welcome</b>, <b>clear</b>.`);
    return;
  }

  if (cmd === "clear") {
    consoleFeed.innerHTML = "";
    log(`<span class="k">SYS:</span> Console cleared.`);
    return;
  }

  if (cmd === "mute") {
    muted = true;
    setVoiceState("MUTED");
    log(`<span class="k">SYS:</span> Voice muted.`);
    return;
  }

  if (cmd === "unmute") {
    muted = false;
    setVoiceState("READY");
    log(`<span class="k">SYS:</span> Voice unmuted.`);
    return;
  }

  if (cmd === "welcome") {
    const msg = DATA.welcomeSpeech;
    log(`<span class="k">JARVIS:</span> ${msg}`);
    speak(msg);
    return;
  }

  // support "open projects"
  const cleaned = cmd.replace(/^open\s+/, "");
  if (["about", "skills", "projects", "experience", "contact"].includes(cleaned)) {
    showView(cleaned);
    speak(`Opening ${cleaned}.`);
    return;
  }

  log(`<span class="k">JARVIS:</span> Unknown command. Type <b>help</b>.`, "warn");
}

function tickClock() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  clockEl.textContent = `${hh}:${mm}:${ss}`;
}

async function loadProfile() {
  const res = await fetch("./data/profile.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Could not load data/profile.json");
  return await res.json();
}

function applyData(data) {
  DATA = data;

  // top labels
  brandTitle.textContent = data.interfaceTitle || "SATYAM INTERFACE";
  brandRole.textContent = "Boss is offline • Portfolio access";
  brandLocation.textContent = data.profile.location || "Earth Node";

  footerName.textContent = (data.profile.fullName || "Satyam").split(" ")[0];
  yearEl.textContent = String(new Date().getFullYear());

  // links
  linkLinkedIn.href = data.profile.links.linkedin || "#";
  linkGitHub.href = data.profile.links.github || "#";
  linkResume.href = data.profile.links.resume || "#";

  // gate labels
  $("#gateTitle").textContent = data.interfaceTitle || "SATYAM INTERFACE";
  $("#gateSub").textContent = `${data.assistantName || "JARVIS"} • Voice greeting on Enter`;

  // initial console
  log(`<span class="k">SYS:</span> Interface ready. Type <b>help</b> for commands.`);
}

function enterInterface({ silent = false } = {}) {
  gate.classList.add("hidden");
  hud.classList.remove("hidden");

  // Start voice greeting only if not silent
  muted = !!silent;
  setVoiceState(muted ? "MUTED" : "READY");

  log(`<span class="k">SYS:</span> Access granted.`);
  log(`<span class="k">SYS:</span> Boss status: <span class="err">OFFLINE</span>.`);

  const msg = DATA.welcomeSpeech;
  log(`<span class="k">JARVIS:</span> ${msg}`);

  if (!silent) speak(msg);

  showView("about");
}

function bindUI() {
  // nav buttons
  document.querySelectorAll(".navbtn").forEach(btn => {
    btn.addEventListener("click", () => showView(btn.dataset.view));
  });

  // chips
  document.querySelectorAll(".chip").forEach(ch => {
    ch.addEventListener("click", () => runCommand(ch.dataset.cmd));
  });

  // command box
  cmdRun.addEventListener("click", () => {
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

  // gate buttons
  enterBtn.addEventListener("click", () => enterInterface({ silent: false }));
  silentBtn.addEventListener("click", () => enterInterface({ silent: true }));

  // controls
  muteBtn.addEventListener("click", () => {
    muted = !muted;
    setVoiceState(muted ? "MUTED" : "READY");
    log(`<span class="k">SYS:</span> Voice ${muted ? "muted" : "unmuted"}.`);
  });

  repeatBtn.addEventListener("click", () => {
    log(`<span class="k">JARVIS:</span> ${DATA.welcomeSpeech}`);
    speak(DATA.welcomeSpeech);
  });
}

async function init() {
  // world
  world = createWorld($("#world"));

  // clock
  tickClock();
  setInterval(tickClock, 1000);

  // data
  const data = await loadProfile();
  applyData(data);

  // ui events
  bindUI();
}

init().catch((e) => {
  console.error(e);
  // If something breaks early, at least show a minimal message
  alert("Error loading portfolio. Check console and file paths.");
});
