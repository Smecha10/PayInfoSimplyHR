let DATA = null;
let selectedState = "TX";
let selectedRole = "pest_control_technician";
let compareState = null;
let compareMode = false;

const ROLE_ICONS = {
  pest_control_technician: { icon: "🪲", cls: "tech" },
  route_manager: { icon: "🗺️", cls: "route" },
  sales_inspector: { icon: "🤝", cls: "sales" },
  branch_manager: { icon: "🏢", cls: "branch" },
  office_admin: { icon: "📋", cls: "admin" },
};

function init() {
  try {
    DATA = window.__PAY_DATA__;
    if (!DATA) throw new Error("Pay data not found. Please re-run generate_pay_data.py.");
    buildSidebar();
    buildRolePills();
    renderState(selectedState);
    buildCompareSelect();
    document.getElementById("search-input").addEventListener("input", filterStates);
    document.getElementById("compare-toggle").addEventListener("click", toggleCompare);
    document.getElementById("compare-state-select").addEventListener("change", e => {
      compareState = e.target.value || null;
      if (compareMode && compareState) renderCompare();
    });
  } catch (e) {
    document.getElementById("main").innerHTML = `<div class="card" style="color:#f87171">Error loading data: ${e.message}</div>`;
  }
}

function buildSidebar() {
  const list = document.getElementById("state-list");
  list.innerHTML = "";
  const states = Object.values(DATA.states).sort((a, b) => a.name.localeCompare(b.name));
  states.forEach(st => {
    const btn = document.createElement("button");
    btn.className = "state-btn" + (st.abbr === selectedState ? " active" : "");
    btn.dataset.abbr = st.abbr;
    btn.innerHTML = `<span class="abbr">${st.abbr}</span>${st.name}`;
    btn.onclick = () => selectState(st.abbr);
    list.appendChild(btn);
  });
}

function buildRolePills() {
  const container = document.getElementById("role-pills");
  container.innerHTML = "";
  Object.entries(DATA.states[selectedState].roles).forEach(([key, role]) => {
    const btn = document.createElement("button");
    btn.className = "role-pill" + (key === selectedRole ? " active" : "");
    btn.dataset.role = key;
    btn.textContent = role.label;
    btn.onclick = () => selectRole(key);
    container.appendChild(btn);
  });
}

function buildCompareSelect() {
  const sel = document.getElementById("compare-state-select");
  sel.innerHTML = '<option value="">— Select a state —</option>';
  const states = Object.values(DATA.states).sort((a, b) => a.name.localeCompare(b.name));
  states.forEach(st => {
    const opt = document.createElement("option");
    opt.value = st.abbr;
    opt.textContent = `${st.abbr} — ${st.name}`;
    sel.appendChild(opt);
  });
}

function selectState(abbr) {
  selectedState = abbr;
  document.querySelectorAll(".state-btn").forEach(b => b.classList.toggle("active", b.dataset.abbr === abbr));
  renderState(abbr);
  if (compareMode && compareState) renderCompare();
}

function selectRole(role) {
  selectedRole = role;
  document.querySelectorAll(".role-pill").forEach(b => b.classList.toggle("active", b.dataset.role === role));
  renderRole(DATA.states[selectedState], role);
  if (compareMode && compareState) renderCompare();
}

function filterStates(e) {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll(".state-btn").forEach(btn => {
    const matches = btn.textContent.toLowerCase().includes(q);
    btn.style.display = matches ? "" : "none";
  });
}

function fmt(n) { return "$" + n.toLocaleString(); }
function fmtHr(n) { return "$" + n.toFixed(2) + "/hr"; }

function renderState(abbr) {
  const st = DATA.states[abbr];
  if (!st) return;

  // Hero
  document.getElementById("hero-abbr").textContent = st.abbr;
  document.getElementById("hero-name").textContent = st.name;
  document.getElementById("hero-lic-body").textContent = "Regulated by " + st.licensing.body;
  document.getElementById("hero-tags").innerHTML = `
    <span class="hero-tag">📋 License Required</span>
    <span class="hero-tag">📚 CE: ${st.licensing.continuing_education}</span>
    <span class="hero-tag">🔄 ${st.licensing.reciprocity}</span>
  `;

  // Licensing
  document.getElementById("lic-body").textContent = st.licensing.body;
  document.getElementById("lic-ce").textContent = st.licensing.continuing_education;
  document.getElementById("lic-recip").textContent = st.licensing.reciprocity;
  const regLink = document.getElementById("lic-url");
  regLink.href = st.licensing.regulatory_url;
  regLink.textContent = "Visit Regulatory Website ↗";

  renderRole(st, selectedRole);
}

function renderRole(st, role) {
  const rd = st.roles[role];
  if (!rd) return;
  const nat = DATA.meta.national_baselines[role];
  const icon = ROLE_ICONS[role];

  // Role header
  document.getElementById("role-header").innerHTML = `
    <div class="role-icon ${icon.cls}">${icon.icon}</div>
    <div>
      <h2>${rd.label}</h2>
      <small>${st.name} — Pay & Compensation Data</small>
    </div>
    <span class="updated-badge">Updated ${rd.last_updated}</span>
  `;

  // Stats
  document.getElementById("stat-median").textContent = fmt(rd.median_annual);
  document.getElementById("stat-hourly").textContent = fmtHr(rd.median_hourly);
  document.getElementById("stat-national").textContent = fmt(nat.median);

  // Range bar
  const globalLow = 28000, globalHigh = 120000;
  const range = globalHigh - globalLow;
  const fillPct = ((rd.range_high - globalLow) / range) * 100 - ((rd.range_low - globalLow) / range) * 100;
  const fillStart = ((rd.range_low - globalLow) / range) * 100;
  const natPct = ((nat.median - globalLow) / range) * 100;

  document.getElementById("range-bar-fill").style.cssText = `width:${fillPct}%;left:${fillStart}%;position:absolute`;
  document.getElementById("range-national-marker").style.left = natPct + "%";
  document.getElementById("range-low").textContent = fmt(rd.range_low);
  document.getElementById("range-high").textContent = fmt(rd.range_high);
  document.getElementById("range-state-label").textContent = st.name + " Salary Range";

  // Notes
  const notesEl = document.getElementById("role-notes");
  notesEl.textContent = rd.notes || "";
  document.getElementById("notes-card").style.display = rd.notes ? "block" : "none";

  // Sources
  const srcList = document.getElementById("sources-list");
  srcList.innerHTML = DATA.meta.sources.map(s =>
    `<div class="source-item"><div class="source-dot"></div><a href="${s.url}" target="_blank" rel="noopener">${s.label}</a></div>`
  ).join("");

  // Comparison refresh
  if (compareMode && compareState) renderCompare();

  document.querySelector(".fade-in")?.classList.remove("fade-in");
  document.getElementById("main-content").classList.add("fade-in");
  setTimeout(() => document.getElementById("main-content").classList.remove("fade-in"), 400);
}

function toggleCompare() {
  compareMode = !compareMode;
  document.getElementById("compare-panel").classList.toggle("active", compareMode);
  document.getElementById("compare-toggle").textContent = compareMode ? "Close Comparison" : "Compare States";
  if (compareMode && compareState) renderCompare();
}

function renderCompare() {
  const stA = DATA.states[selectedState];
  const stB = DATA.states[compareState];
  if (!stA || !stB) return;

  const rdA = stA.roles[selectedRole];
  const rdB = stB.roles[selectedRole];

  function colHTML(st, rd) {
    const diff = rd.median_annual - DATA.meta.national_baselines[selectedRole].median;
    const diffStr = (diff >= 0 ? "+" : "") + fmt(diff) + " vs national";
    return `
      <div class="compare-col">
        <h4>${st.abbr} — ${st.name}</h4>
        <div class="compare-row"><span>Median Annual</span><span>${fmt(rd.median_annual)}</span></div>
        <div class="compare-row"><span>Range Low</span><span>${fmt(rd.range_low)}</span></div>
        <div class="compare-row"><span>Range High</span><span>${fmt(rd.range_high)}</span></div>
        <div class="compare-row"><span>Hourly</span><span>${fmtHr(rd.median_hourly)}</span></div>
        <div class="compare-row"><span>vs National</span><span style="color:${diff>=0?'#10b981':'#f87171'}">${diffStr}</span></div>
        <div class="compare-row"><span>CE Requirement</span><span>${st.licensing.continuing_education}</span></div>
        <div class="compare-row"><span>Reciprocity</span><span>${st.licensing.reciprocity}</span></div>
      </div>
    `;
  }

  document.getElementById("compare-content").innerHTML = `
    <h3>Comparing: ${rdA.label}</h3>
    <div class="compare-grid">
      ${colHTML(stA, rdA)}
      ${colHTML(stB, rdB)}
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", init);
