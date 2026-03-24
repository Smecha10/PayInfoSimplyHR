// ── Compliance Tab Logic ──
// Appended to app.js — loaded after the pay tab logic

let COMP_DATA = null;
let activeTab = "pay"; // 'pay' or 'compliance'
let compRole = "pest_control_technician";

const ROLE_LABELS_MAP = {
  pest_control_technician: "Pest Control Technician",
  route_manager: "Route Manager",
  sales_inspector: "Sales Inspector / Sales Rep",
  branch_manager: "Branch Manager",
  office_admin: "Office / Customer Service Admin",
};

function initCompliance() {
  COMP_DATA = window.__COMP_DATA__;
  if (!COMP_DATA) return;
  setupTabs();
  buildCompRolePills();
  renderCompliance(selectedState);
}

function setupTabs() {
  document.getElementById("tab-pay").addEventListener("click", () => switchTab("pay"));
  document.getElementById("tab-compliance").addEventListener("click", () => switchTab("compliance"));
}

function switchTab(tab) {
  activeTab = tab;
  document.getElementById("tab-pay").classList.toggle("active", tab === "pay");
  document.getElementById("tab-compliance").classList.toggle("active", tab === "compliance");
  document.getElementById("content-pay").classList.toggle("active", tab === "pay");
  document.getElementById("content-compliance").classList.toggle("active", tab === "compliance");
  // Update role pill styles
  updateRolePillStyles();
}

function updateRolePillStyles() {
  document.querySelectorAll(".role-pill").forEach(btn => {
    const isComp = activeTab === "compliance";
    const thisRole = btn.dataset.role;
    const isActive = isComp ? thisRole === compRole : thisRole === selectedRole;
    btn.classList.toggle("active", !isComp && isActive);
    btn.classList.toggle("comp-active", isComp && isActive);
  });
}

function buildCompRolePills() {
  // Reuse same pills, just add comp click
  document.querySelectorAll(".role-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      if (activeTab === "compliance") selectCompRole(btn.dataset.role);
    });
  });
}

function selectCompRole(role) {
  compRole = role;
  updateRolePillStyles();
  renderCompliance(selectedState);
}

function riskClass(risk) {
  if (!risk) return "risk-moderate";
  const r = risk.toUpperCase();
  if (r.includes("VERY")) return "risk-very-high";
  if (r === "HIGH") return "risk-high";
  return "risk-moderate";
}

function renderCompliance(abbr) {
  if (!COMP_DATA || !abbr) return;
  const st = COMP_DATA.states[abbr];
  if (!st) return;
  const rc = COMP_DATA.role_compliance[compRole] || {};
  const w2 = COMP_DATA.w2_vs_1099;
  const ag = st.at_a_glance;

  // Hero
  document.getElementById("comp-hero-abbr").textContent = abbr;
  document.getElementById("comp-hero-name").textContent = st.name;
  document.getElementById("comp-hero-sub").textContent = "HR Compliance & Regulatory Overview";
  document.getElementById("comp-risk-badge").className = "risk-badge " + riskClass(ag.contractor_risk_level);
  document.getElementById("comp-risk-badge").textContent = "1099 Risk: " + ag.contractor_risk_level;
  document.getElementById("comp-ic-test").textContent = ag.contractor_test;

  // At a glance
  const mw = ag.min_wage || 7.25;
  const isFed = mw === 7.25;
  document.getElementById("glance-minwage").innerHTML = `<span class="${isFed ? "glance-warn" : "glance-yes"}">$${mw.toFixed(2)}/hr${isFed ? " (Federal)" : " (State)"}</span>`;
  document.getElementById("glance-psl").innerHTML = ag.paid_sick_leave_mandate
    ? '<span class="glance-yes">✓ Required</span>'
    : '<span class="glance-no">✗ Not Mandated</span>';
  document.getElementById("glance-daily-ot").innerHTML = ag.daily_overtime
    ? '<span class="glance-warn">⚠ Daily OT Required</span>'
    : '<span class="glance-no">Weekly Only (40 hrs)</span>';
  document.getElementById("glance-tax").innerHTML = ag.no_state_income_tax
    ? '<span class="glance-yes">✓ No State Income Tax</span>'
    : '<span class="glance-no">State Income Tax Applies</span>';
  document.getElementById("glance-ot-rule").textContent = st.overtime?.state_additions || "1.5x after 40 hrs/week";
  document.getElementById("glance-ic-risk").innerHTML = `<span class="risk-badge ${riskClass(ag.contractor_risk_level)}">${ag.contractor_risk_level}</span>`;

  // General compliance notes
  document.getElementById("comp-general-notes").textContent = st.general_notes;

  // Role-specific note
  const roleNote = (st.role_notes || {})[compRole] || rc.practical_notes || "";
  document.getElementById("comp-role-note").innerHTML = `<strong>${ROLE_LABELS_MAP[compRole]} — ${abbr}</strong>${escHtml(roleNote)}`;

  // FLSA classification
  document.getElementById("comp-flsa-class").textContent = rc.classification || "—";
  document.getElementById("comp-flsa-status").textContent = rc.flsa_status || "—";
  document.getElementById("comp-flsa-ot").textContent = rc.overtime_rule || "—";

  // Key federal laws
  const lawsEl = document.getElementById("comp-federal-laws");
  lawsEl.innerHTML = (rc.key_federal_laws || []).map(l => `<li>${escHtml(l)}</li>`).join("");

  // Key risks
  const risksEl = document.getElementById("comp-key-risks");
  risksEl.innerHTML = (rc.key_risks || []).map(r => `<li>${escHtml(r)}</li>`).join("");

  // Paid sick leave
  document.getElementById("comp-psl-status").innerHTML = ag.paid_sick_leave_mandate
    ? '<span class="glance-yes">✓ REQUIRED</span>' : '<span class="glance-no">Not Mandated</span>';
  document.getElementById("comp-psl-details").textContent = st.paid_sick_leave?.details || "No mandate.";

  // State contractor classification
  const cc = st.contractor_classification;
  document.getElementById("comp-ic-risk-badge").className = "risk-badge " + riskClass(cc?.risk_level);
  document.getElementById("comp-ic-risk-badge").textContent = cc?.risk_level || "MODERATE";
  document.getElementById("comp-ic-test-used").textContent = cc?.test_used || "—";
  const salesViable = cc?.sales_rep_1099_viable;
  const techViable = cc?.technician_1099_viable;
  document.getElementById("comp-sales-viable").innerHTML = salesViable
    ? '<span class="glance-yes">Potentially viable (with legal review)</span>'
    : '<span style="color:#ef4444;font-weight:600">NOT recommended — use W-2</span>';
  document.getElementById("comp-tech-viable").innerHTML = techViable
    ? '<span class="glance-yes">Possibly viable</span>'
    : '<span style="color:#ef4444;font-weight:600">NOT viable — must be W-2</span>';
  document.getElementById("comp-ic-state-note").textContent = cc?.state_specific_notes || "";

  // W-2 Checklist (same for all states — global)
  const checklistEl = document.getElementById("comp-w2-checklist");
  checklistEl.innerHTML = (w2.sales_rep_checklist || []).map(row => `
    <div class="w2-factor-row">
      <div class="w2-factor-label">${escHtml(row.factor)}</div>
      <div class="w2-factor-w2">▲ W-2: ${escHtml(row.w2_indicator)}</div>
      <div class="w2-factor-ic">▸ 1099: ${escHtml(row["1099_indicator"])}</div>
    </div>
  `).join("");

  // Penalties
  const penEl = document.getElementById("comp-penalties");
  penEl.innerHTML = (w2.penalties_for_misclassification || []).map(p => `<li>${escHtml(p)}</li>`).join("");

  // Key deadlines
  const dlEl = document.getElementById("comp-deadlines");
  dlEl.innerHTML = (st.key_compliance_deadlines || []).map(d => `<li>${escHtml(d)}</li>`).join("");

  // Compliance sources
  const srcEl = document.getElementById("comp-sources-list");
  srcEl.innerHTML = (COMP_DATA.meta.sources || []).map(s =>
    `<div class="source-item"><div class="source-dot" style="background:#f59e0b"></div><a href="${s.url}" target="_blank" rel="noopener">${escHtml(s.label)}</a></div>`
  ).join("");
}

function escHtml(str) {
  return String(str || "")
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}

// Wire up state selection to also refresh compliance tab
const _origSelectState = selectState;
window.selectState = function(abbr) {
  _origSelectState(abbr);
  if (COMP_DATA) {
    renderCompliance(abbr);
    document.getElementById("comp-hero-abbr").textContent = abbr;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // After main init, init compliance
  setTimeout(initCompliance, 100);
});
