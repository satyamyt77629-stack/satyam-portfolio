// js/ui.js
export function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function renderView(viewKey, data) {
  const p = data.profile;

  if (viewKey === "about") {
    const about = p.about || [];
    return `
      <div class="h1">${escapeHtml(p.fullName)}</div>
      <div class="sub">${escapeHtml(p.role)} • ${escapeHtml(p.company)}</div>
      ${about.map(line => `<p class="p">${escapeHtml(line)}</p>`).join("")}

      <div class="grid" style="margin-top:14px;">
        <div class="card">
          <div class="card-title">IDENTITY</div>
          <div class="tags">
            <span class="tag">${escapeHtml(p.role)}</span>
            <span class="tag">${escapeHtml(p.location)}</span>
          </div>
        </div>

        <div class="card">
          <div class="card-title">STATUS</div>
          <p class="p">Boss is offline. Portfolio access granted.</p>
          <div class="tags">
            <span class="tag">ACCESS: GRANTED</span>
            <span class="tag">MODE: PORTFOLIO</span>
          </div>
        </div>
      </div>
    `;
  }

  if (viewKey === "skills") {
    const skills = data.skills || [];
    return `
      <p class="p">A clean overview of my core skills. (Edit in <b>data/profile.json</b>)</p>
      <div class="grid">
        ${skills.map(g => `
          <div class="card">
            <div class="card-title">${escapeHtml(g.group)}</div>
            <div class="tags">
              ${(g.items || []).map(x => `<span class="tag">${escapeHtml(x)}</span>`).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  if (viewKey === "projects") {
    const projects = data.projects || [];
    return `
      <p class="p">Projects showcase. Replace # links with your real GitHub/Live URLs.</p>
      <div class="grid">
        ${projects.map(pr => `
          <div class="card">
            <div class="card-title">${escapeHtml(pr.title)}</div>
            <p class="p">${escapeHtml(pr.description)}</p>
            <div class="tags">
              ${(pr.stack || []).map(s => `<span class="tag">${escapeHtml(s)}</span>`).join("")}
            </div>
            <div class="card-links">
              ${pr.links?.github && pr.links.github !== "#" ? `<a target="_blank" rel="noopener" href="${escapeHtml(pr.links.github)}">GitHub</a>` : `<span class="muted">GitHub: add link</span>`}
              ${pr.links?.live && pr.links.live !== "#" ? `<a target="_blank" rel="noopener" href="${escapeHtml(pr.links.live)}">Live</a>` : `<span class="muted">Live: add link</span>`}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  if (viewKey === "experience") {
    const exp = data.experience || [];
    return `
      <p class="p">Professional experience timeline.</p>
      ${exp.map(e => `
        <div class="card" style="margin-bottom:12px;">
          <div class="card-title">${escapeHtml(e.role)} • ${escapeHtml(e.company)}</div>
          <p class="p">${escapeHtml(e.period)}</p>
          <ul style="margin:0; padding-left:18px; color: rgba(230,255,255,.72); line-height:1.7;">
            ${(e.bullets || []).map(b => `<li style="margin:6px 0;">${escapeHtml(b)}</li>`).join("")}
          </ul>
          <div class="tags" style="margin-top:10px;">
            ${(e.tech || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
          </div>
        </div>
      `).join("")}
    `;
  }

  // contact
  return `
    <p class="p">Use the options below to contact me.</p>
    <div class="grid">
      <div class="card">
        <div class="card-title">EMAIL</div>
        <p class="p">${escapeHtml(p.email)}</p>
        <div class="card-links">
          <a href="mailto:${encodeURIComponent(p.email)}">Send Email</a>
        </div>
      </div>

      <div class="card">
        <div class="card-title">PHONE</div>
        <p class="p">${escapeHtml(p.phone)}</p>
        <div class="card-links">
          <a href="tel:${escapeHtml(p.phone)}">Call</a>
        </div>
      </div>

      <div class="card">
        <div class="card-title">LINKEDIN</div>
        <p class="p">Professional profile</p>
        <div class="card-links">
          <a target="_blank" rel="noopener" href="${escapeHtml(p.links.linkedin)}">Open</a>
        </div>
      </div>

      <div class="card">
        <div class="card-title">GITHUB</div>
        <p class="p">Projects & code</p>
        <div class="card-links">
          <a target="_blank" rel="noopener" href="${escapeHtml(p.links.github)}">Open</a>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="card">
      <div class="card-title">SEND MESSAGE</div>
      <p class="p">This site is static. The form uses mailto (opens your mail app).</p>

      <form id="contactForm">
        <div style="display:grid; gap:10px;">
          <input class="cmd" id="cName" placeholder="Your name" required />
          <input class="cmd" id="cEmail" placeholder="Your email" type="email" required />
          <textarea class="cmd" id="cMsg" placeholder="Your message" rows="5" required></textarea>
          <button class="btn primary" type="submit">SEND</button>
        </div>
      </form>
    </div>
  `;
}
