// ── Start-Up & Company Growth (Tab 3) Logic ──
// Appended to app.js — loaded after the pay tab and compliance logic

let STARTUP_DATA = null;
let currentEmployeeCount = 10;

function initStartup() {
  STARTUP_DATA = window.__STARTUP_DATA__;
  if (!STARTUP_DATA) return;
  
  // Wire up the new tab
  document.getElementById("tab-startup").addEventListener("click", () => switchTab("startup"));
  
  // Wire up slider and inputs
  const slider = document.getElementById("emp-count-slider");
  const input = document.getElementById("emp-count-input");
  
  slider.addEventListener("input", (e) => {
    input.value = e.target.value;
    updateEmployeeCount(parseInt(e.target.value, 10));
  });
  
  input.addEventListener("change", (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > 500) val = 500;
    slider.value = val;
    input.value = val;
    updateEmployeeCount(val);
  });
  
  // Initial render
  updateEmployeeCount(10);
}

function updateEmployeeCount(count) {
  currentEmployeeCount = count;
  document.getElementById("emp-count-display").textContent = count;
  renderStartupCompliance(selectedState);
}

// Modify the existing switchTab function inside compliance.js to handle the third tab
const _origSwitchTab = switchTab;
window.switchTab = function(tab) {
  _origSwitchTab(tab); // This handles pay/compliance toggle logic mostly
  
  // Explicitly handle all three tabs
  document.getElementById("tab-pay").classList.toggle("active", tab === "pay");
  document.getElementById("tab-compliance").classList.toggle("active", tab === "compliance");
  document.getElementById("tab-startup").classList.toggle("active", tab === "startup");
  
  document.getElementById("content-pay").classList.toggle("active", tab === "pay");
  document.getElementById("content-compliance").classList.toggle("active", tab === "compliance");
  document.getElementById("content-startup").classList.toggle("active", tab === "startup");
  
  if (tab === "startup") {
    renderStartupCompliance(selectedState);
  }
};

// Also wire into state selection
const _origSelectStateStartup = window.selectState;
window.selectState = function(abbr) {
  _origSelectStateStartup(abbr);
  if (STARTUP_DATA && activeTab === "startup") {
    renderStartupCompliance(abbr);
  }
};

function renderStartupCompliance(abbr) {
  if (!STARTUP_DATA) return;
  
  // Set state title
  const stateName = document.querySelector(".state-btn.active")?.textContent.replace(abbr, '').trim() || abbr;
  document.getElementById("startup-state-name").textContent = stateName;
  
  const count = currentEmployeeCount;
  
  // Filter federal laws
  let activeFed = [];
  STARTUP_DATA.federal.forEach(tier => {
    if (count >= tier.threshold) {
      activeFed.push(...tier.laws.map(l => ({...l, source: 'Federal', threshold: tier.threshold})));
    }
  });
  
  // Filter state overrides
  let activeState = [];
  if (STARTUP_DATA.state_overrides[abbr]) {
    STARTUP_DATA.state_overrides[abbr].forEach(tier => {
      if (count >= tier.threshold) {
        activeState.push(...tier.laws.map(l => ({...l, source: abbr, threshold: tier.threshold})));
      }
    });
  }
  
  // Render list
  const container = document.getElementById("startup-laws-grid");
  container.innerHTML = "";
  
  const allLaws = [...activeState, ...activeFed].sort((a,b) => b.threshold - a.threshold); // Highest thresholds on top
  
  if (allLaws.length === 0) {
    container.innerHTML = "<div style='color:var(--text-muted);padding:20px'>No specific thresholds triggered. Standard basic employment laws apply.</div>";
    return;
  }
  
  allLaws.forEach(law => {
    const isState = law.source !== 'Federal';
    
    // Check if this law overrides a federal one (simple string search for WARN, FMLA, etc)
    const isOverride = isState && (law.title.includes("WARN") || law.title.includes("Sick") || law.title.includes("Leave") || law.title.includes("FMLA"));
    
    const card = document.createElement("div");
    card.className = `startup-law-card ${isState ? 'state-law' : 'fed-law'}`;
    
    let riskBadge = `<span class="risk-badge ${riskClass(law.risk)}">${law.risk} RISK</span>`;
    
    card.innerHTML = `
      <div class="sl-header">
        <div class="sl-title">${escHtml(law.title)}</div>
        ${riskBadge}
      </div>
      <div class="sl-meta">
        <span class="sl-tag ${isState ? 'sl-tag-state' : 'sl-tag-fed'}">${isState ? abbr + ' State Law' : 'Federal Law'}</span>
        <span class="sl-tag" style="background:rgba(255,255,255,0.05)">Trigger: ${law.threshold}+ Emp</span>
        ${isOverride ? '<span class="sl-tag" style="background:rgba(245,158,11,0.15);color:#f59e0b">Overrides Federal</span>' : ''}
      </div>
      <div class="sl-desc">${escHtml(law.desc)}</div>
    `;
    
    container.appendChild(card);
  });
  
  // Update threshold timeline UI
  updateTimeline(count);
}

function updateTimeline(count) {
  const steps = [1, 15, 20, 50, 100];
  steps.forEach(step => {
    const el = document.getElementById(`tl-step-${step}`);
    if (!el) return;
    if (count >= step) {
      el.classList.add("passed");
      el.classList.remove("next");
    } else {
      el.classList.remove("passed");
      // Pick the next immediate one
      const prevStep = [...steps].reverse().find(s => s <= count) || 0;
      if (step > prevStep && step === steps.find(s => s > prevStep)) {
        el.classList.add("next");
      } else {
        el.classList.remove("next");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initStartup, 150);
});
