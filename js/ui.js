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
          <div class="card-title">PROFILE</div>
          <div class="tags">
            <span class="tag">${escapeHtml(p.role)}</span>
            <span class="tag">${escapeHtml(p.location)}</span>
            <span class="tag">BOSS: OFFLINE</span>
          </div>
        </div>

        <div class="card">
          <div class="card-title">FOCUS</div>
          <p class="p">Software engineering, automation concepts, and building real product experiences with clean systems.</p>
          <div class="tags">
            <span class="tag">QUALITY</span>
            <span class="tag">SPEED</span>
            <span class="tag">RELIABILITY</span>
          </div>
        </div>
      </div>
    `;
  }

  if (viewKey === "skills") {
    const skills = data.skills || [];
    return `
      <p class="p">Core skills overview.</p>
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
      <p class="p">Projects showcase.</p>
      <div class="grid">
        ${projects.map(pr => `
          <div class="card">
            <div class="card-title">${escapeHtml(pr.title)}</div>
            <p class="p">${escapeHtml(pr.description)}</p>
            <div class="tags">
              ${(pr.stack || []).map(s => `<span class="tag">${escapeHtml(s)}</span>`).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  if (viewKey === "experience") {
    const exp = data.experience || [];
    return `
      <p class="p">Professional experience.</p>
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

  // contact (email + linkedin only)
  return `
    <div class="h1">Contact</div>
    <p class="p">You can contact me via email or LinkedIn.</p>

    <div class="grid" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
      <div class="card">
        <div class="card-title">EMAIL</div>
        <p class="p"><b>${escapeHtml(p.email)}</b></p>
        <div class="card-links">
          <a href="mailto:${encodeURIComponent(p.email)}">Send Email</a>
        </div>
      </div>

      <div class="card">
        <div class="card-title">LINKEDIN</div>
        <p class="p">Professional profile</p>
        <div class="card-links">
          <a target="_blank" rel="noopener" href="${escapeHtml(p.linkedin)}">Open LinkedIn</a>
        </div>
      </div>
    </div>
  `;
}
