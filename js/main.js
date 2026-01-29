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

let DATA = null;
let muted = false;

// preload voices (Chrome fix)
if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

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

function pickIndianFemaleVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  if (!voices.length) return null;

  const enIN = voices.filter(v => /en-IN/i.test(v.lang));
  const femaleHint = (v) => {
    const n = (v.name || "").toLowerCase();
    return /(female|woman|zira|siri|google)/i.test(n);
  };

  return (
    enIN.find(femaleHint) ||
    enIN[0] ||
    voices.find(v => /en/i.test(v.lang)) ||
    voices[0] ||
    null
  );
}

function speak(text) {
  if (muted) return;

  if (!("speechSynthesis" in window)) {
    log(`<span class="k">JARVIS:</span> Voice not supported.`, "warn");
    return;
  }

  try {
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);

    // sweet tone
    utter.rate = 0.95;
    utter.pitch = 1.15;
    utter.volume = 1;

    const v = pickIndianFemaleVoice();
    if (v) utter.voice = v;

    setVoiceState("SPEAKING");
    utter.onend = () => setVoiceState("READY");
    utter.onerror = () => setVoiceState("ERROR");

    window.speechSynthesis.speak(utter);
  } catch {
    setVoiceState("ERROR");
  }
}

function sectionLabel(key) {
  const labels = {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    experience: "Experience",
    certifications: "Certifications",
    contact: "Contact"
  };
  return labels[key] || "Section";
}

function showView(key, { speakOpening = true } = {}) {
  const map = {
    about: "ABOUT",
    skills: "SKILLS",
    projects: "PROJECTS",
    experience: "EXPERIENCE",
    certifications: "CERTIFICATIONS",
    contact: "CONTACT"
  };
  const title = map[key] || "ABOUT";
  viewTitle.textContent = title;

  viewEl.innerHTML = renderView(key, DATA);

  document.querySelectorAll(".navbtn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === key);
  });

  const label = sectionLabel(key);
  log(`<span class="k">JARVIS:</span> Opened <b>${title}</b>.`);
  if (speakOpening) speak(`Opening ${label}.`);
}

function runCommand(raw) {
  const cmd = String(raw || "").trim().toLowerCase();
  if (!cmd) return;

  log(`<span class="k">YOU:</span> ${cmd}`);

  if (cmd === "help" || cmd === "?") {
    log(`<span class="k">JARVIS:</span> Commands: <b>about</b>, <b>skills</b>, <b>projects</b>, <b>experience</b>, <b>certifications</b>, <b>contact</b>, <b>mute</b>, <b>unmute</b>, <b>welcome</b>, <b>clear</b>.`);
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

  const cleaned = cmd.replace(/^open\s+/, "");
  const allowed = ["about", "skills", "projects", "experience", "certifications", "contact"];
  if (allowed.includes(cleaned)) {
    showView(cleaned, { speakOpening: true });
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

  brandTitle.textContent = data.interfaceTitle || "SATYAM INTERFACE";
  brandRole.textContent = "Boss is offline • Portfolio access";
  brandLocation.textContent = data.profile.location || "Earth Node";

  footerName.textContent = (data.profile.fullName || "Satyam").split(" ")[0];
  yearEl.textContent = String(new Date().getFullYear());

  $("#gateTitle").textContent = data.interfaceTitle || "SATYAM INTERFACE";
  $("#gateSub").textContent = `${data.assistantName || "JARVIS"} • Voice greeting on Enter`;

  const navLinkedIn = document.getElementById("navLinkedIn");
  if (navLinkedIn) navLinkedIn.href = data.profile.linkedin;

  log(`<span class="k">SYS:</span> Interface ready. Type <b>help</b> for commands.`);
}

function enterInterface({ silent = false } = {}) {
  gate.classList.add("hidden");
  hud.classList.remove("hidden");

  muted = !!silent;
  setVoiceState(muted ? "MUTED" : "READY");

  log(`<span class="k">SYS:</span> Access granted.`);
  log(`<span class="k">SYS:</span> Boss status: <span class="err">OFFLINE</span>.`);

  const msg = DATA.welcomeSpeech;
  log(`<span class="k">JARVIS:</span> ${msg}`);
  if (!silent) speak(msg);

  // first view
  showView("about", { speakOpening: false });
}

function bindUI() {
  document.querySelectorAll(".navbtn").forEach(btn => {
    btn.addEventListener("click", () => showView(btn.dataset.view, { speakOpening: true }));
  });

  document.querySelectorAll(".chip").forEach(ch => {
    ch.addEventListener("click", () => runCommand(ch.dataset.cmd));
  });

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

  enterBtn.addEventListener("click", () => enterInterface({ silent: false }));
  silentBtn.addEventListener("click", () => enterInterface({ silent: true }));

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
  createWorld($("#world"));

  tickClock();
  setInterval(tickClock, 1000);

  const data = await loadProfile();
  applyData(data);
  bindUI();
}

init().catch((e) => {
  console.error(e);
  alert("Error loading portfolio. Check console and file paths.");
});
