// ── Talent Acquisition / iSolved Questionnaire Tab ──

const TQ_SECTIONS = [
  {
    id: "company", title: "Company & Access", icon: "🏢",
    fields: [
      { id: "company_name", label: "Company Name", type: "text", required: true },
      { id: "main_contact", label: "Main Hiring Contact (name, email, phone)", type: "text", required: true },
      { id: "full_access", label: "Who should have full access to all jobs, applicants, and reports?", type: "textarea" },
      { id: "hiring_managers", label: "Who are your hiring managers, and which jobs or departments should each one see?", type: "textarea" },
      { id: "assigned_only", label: "Are there users who should only see applicants specifically assigned to them?", type: "textarea" }
    ]
  },
  {
    id: "jobs", title: "Jobs & Job Descriptions", icon: "📋",
    fields: [
      { id: "current_roles", label: "Please list all current roles you are hiring for (titles only)", type: "textarea", required: true },
      { id: "existing_jds", label: "Do you have existing job descriptions for these roles?", type: "radio", options: ["Yes — for all roles", "Yes — for some roles", "No — we need help creating them"] },
      { id: "standardize_jds", label: "Do you want us to help standardize job descriptions (templates, required sections, benefits, etc.)?", type: "radio", options: ["Yes", "No", "Let's discuss"] },
      { id: "recurring_roles", label: "Which roles are recurring / frequently rehired where reusable templates would help?", type: "textarea" }
    ]
  },
  {
    id: "workflow", title: "Workflow & Collaboration", icon: "⚙️",
    fields: [
      { id: "bottlenecks", label: "Where are your biggest bottlenecks today? (check all that apply)", type: "checkbox", options: ["Too few applicants", "Too many unqualified applicants", "Managers slow to review applicants", "Scheduling interviews", "Offers / approvals", "Candidate drop-off", "Other"] },
      { id: "bottlenecks_other", label: "If 'Other', please describe", type: "text", conditional: "bottlenecks:Other" },
      { id: "reviewers", label: "Who needs to be involved in reviewing and approving candidates for most roles?", type: "textarea" },
      { id: "diff_processes", label: "Do different departments follow different hiring processes we should know about?", type: "textarea" }
    ]
  },
  {
    id: "pain", title: "Hiring Pain Points", icon: "🔥",
    fields: [
      { id: "biggest_pain", label: "What are your biggest pain points today?", type: "textarea", required: true },
      { id: "dropoff", label: "Where in the process do candidates most often drop off?", type: "checkbox", options: ["Application stage", "Screening / initial review", "Interview scheduling", "During interviews", "Offer stage", "Not sure"] },
      { id: "pain_details", label: "Any additional details on hiring challenges?", type: "textarea" }
    ]
  },
  {
    id: "calendars", title: "Calendars & Scheduling", icon: "📅",
    fields: [
      { id: "calendar_system", label: "Which calendar systems do you use?", type: "checkbox", options: ["Google Calendar", "Microsoft Outlook", "Apple Calendar", "Other"] },
      { id: "calendar_other", label: "If 'Other', please specify", type: "text", conditional: "calendar_system:Other" },
      { id: "auto_sync", label: "Do you want interviews to auto-sync to hiring managers' calendars?", type: "radio", options: ["Yes", "No", "Let's discuss"] },
      { id: "schedule_perms", label: "Who should be allowed to set interview times?", type: "textarea" },
      { id: "view_perms", label: "Who should only be able to view interview schedules?", type: "textarea" },
      { id: "reschedule_perms", label: "Who should be able to reschedule / cancel interviews?", type: "textarea" }
    ]
  },
  {
    id: "interviews", title: "Interview Structure & Scorecards", icon: "📝",
    fields: [
      { id: "current_scorecards", label: "Do you currently use any interview scorecards or structured rating forms?", type: "radio", options: ["Yes", "No", "Informally / inconsistent"] },
      { id: "want_scorecards", label: "Would you like standardized interview scorecards set up inside the system (ratings, required questions, comments)?", type: "radio", options: ["Yes", "No", "Let's discuss"] },
      { id: "interview_stages", label: "What are your typical interview stages? (e.g., phone screen → hiring manager → panel)", type: "textarea" },
      { id: "stage_participants", label: "For each stage, who usually participates?", type: "textarea" },
      { id: "score_visibility", label: "Who should be able to see and edit scores and notes?", type: "textarea" }
    ]
  },
  {
    id: "communication", title: "Candidate Communication", icon: "💬",
    fields: [
      { id: "comm_methods", label: "How do you currently communicate with candidates?", type: "checkbox", options: ["Email", "Phone", "SMS / Text", "Through the ATS", "Other"] },
      { id: "template_rejection", label: "Do you want standardized rejection email templates?", type: "radio", options: ["Yes", "No", "Already have them"] },
      { id: "template_scheduling", label: "Do you want standardized next-step / scheduling email templates?", type: "radio", options: ["Yes", "No", "Already have them"] },
      { id: "template_offer", label: "Do you want standardized offer email templates?", type: "radio", options: ["Yes", "No", "Already have them"] },
      { id: "compliance_branding", label: "Are there any compliance or branding requirements for candidate communication?", type: "textarea" }
    ]
  },
  {
    id: "service", title: "Service Preference", icon: "🎯",
    fields: [
      { id: "service_pref", label: "Which service model do you prefer?", type: "radio", options: [
        "We provide a bucket of pre-screened candidates and your team does all scheduling",
        "We handle scheduling interviews for you based on manager availability"
      ]},
      { id: "interview_days", label: "If we schedule, what days/times are generally acceptable for interviews?", type: "textarea" },
      { id: "multi_stage", label: "If we schedule, do you want single-stage or multi-stage interviews set up automatically?", type: "radio", options: ["Single-stage only", "Multi-stage (phone screen → onsite → panel)", "Depends on the role — let's discuss"] },
      { id: "notify_who", label: "Who should be notified when interviews are scheduled or changed? (names/roles)", type: "textarea" }
    ]
  },
  {
    id: "success", title: "Success & Sign-Off", icon: "✅",
    fields: [
      { id: "success_metrics", label: "How will you define success with this setup in the first 90 days? (e.g., time-to-fill, quality of hire, manager satisfaction)", type: "textarea", required: true },
      { id: "signoff_who", label: "Who will sign off that the configuration (permissions, calendars, scorecards, templates) is correct?", type: "text", required: true },
      { id: "additional_notes", label: "Any additional notes, questions, or concerns?", type: "textarea" }
    ]
  }
];

let tqCurrentSection = 0;
let tqFormData = {};

function initQuestionnaire() {
  document.getElementById("tab-questionnaire").addEventListener("click", () => switchTab("questionnaire"));
  renderQuestionnaire();
}

function renderQuestionnaire() {
  renderTQProgress();
  renderTQSection(tqCurrentSection);
  updateTQNav();
}

// ── Progress Bar ──
function renderTQProgress() {
  const bar = document.getElementById("tq-progress-bar");
  bar.innerHTML = "";
  TQ_SECTIONS.forEach((sec, i) => {
    const step = document.createElement("div");
    step.className = "tq-step" + (i === tqCurrentSection ? " active" : "") + (i < tqCurrentSection ? " done" : "");
    step.innerHTML = `<span class="tq-step-num">${i < tqCurrentSection ? "✓" : i + 1}</span><span class="tq-step-label">${sec.title}</span>`;
    step.onclick = () => { saveCurrentSection(); tqCurrentSection = i; renderQuestionnaire(); };
    bar.appendChild(step);
  });
  // Overall progress
  const pct = document.getElementById("tq-progress-pct");
  const filled = Object.keys(tqFormData).filter(k => tqFormData[k] && (Array.isArray(tqFormData[k]) ? tqFormData[k].length > 0 : tqFormData[k].trim && tqFormData[k].trim() !== "")).length;
  const total = TQ_SECTIONS.reduce((a, s) => a + s.fields.length, 0);
  const percent = Math.round((filled / total) * 100);
  pct.style.width = percent + "%";
  document.getElementById("tq-progress-text").textContent = percent + "% complete";
}

// ── Section Render ──
function renderTQSection(idx) {
  const sec = TQ_SECTIONS[idx];
  const container = document.getElementById("tq-form-area");
  container.innerHTML = `
    <div class="tq-section-header">
      <span class="tq-section-icon">${sec.icon}</span>
      <div>
        <h3>${sec.title}</h3>
        <p>Section ${idx + 1} of ${TQ_SECTIONS.length}</p>
      </div>
    </div>
    <div class="tq-fields">
      ${sec.fields.map(f => renderTQField(f)).join("")}
    </div>
  `;
  // Attach change listeners
  sec.fields.forEach(f => {
    if (f.type === "checkbox") {
      document.querySelectorAll(`input[name="${f.id}"]`).forEach(cb => {
        cb.addEventListener("change", () => handleConditionals(sec));
      });
    }
  });
  handleConditionals(sec);
}

function renderTQField(f) {
  const val = tqFormData[f.id] || "";
  const req = f.required ? '<span class="tq-req">*</span>' : "";

  if (f.type === "text") {
    return `<div class="tq-field" data-id="${f.id}" ${f.conditional ? `data-conditional="${f.conditional}"` : ""}>
      <label>${f.label}${req}</label>
      <input type="text" name="${f.id}" value="${escHTML(val)}" placeholder="Type your answer..." />
    </div>`;
  }
  if (f.type === "textarea") {
    return `<div class="tq-field" data-id="${f.id}" ${f.conditional ? `data-conditional="${f.conditional}"` : ""}>
      <label>${f.label}${req}</label>
      <textarea name="${f.id}" rows="3" placeholder="Type your answer...">${escHTML(val)}</textarea>
    </div>`;
  }
  if (f.type === "radio") {
    return `<div class="tq-field" data-id="${f.id}">
      <label>${f.label}${req}</label>
      <div class="tq-options">
        ${f.options.map(o => `<label class="tq-option"><input type="radio" name="${f.id}" value="${escHTML(o)}" ${val === o ? "checked" : ""} /><span>${o}</span></label>`).join("")}
      </div>
    </div>`;
  }
  if (f.type === "checkbox") {
    const checked = Array.isArray(val) ? val : [];
    return `<div class="tq-field" data-id="${f.id}">
      <label>${f.label}${req}</label>
      <div class="tq-options tq-options-check">
        ${f.options.map(o => `<label class="tq-option"><input type="checkbox" name="${f.id}" value="${escHTML(o)}" ${checked.includes(o) ? "checked" : ""} /><span>${o}</span></label>`).join("")}
      </div>
    </div>`;
  }
  return "";
}

function escHTML(s) { return String(s || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

function handleConditionals(sec) {
  sec.fields.forEach(f => {
    if (!f.conditional) return;
    const [parentId, triggerVal] = f.conditional.split(":");
    const el = document.querySelector(`.tq-field[data-conditional="${f.conditional}"]`);
    if (!el) return;
    const checked = Array.from(document.querySelectorAll(`input[name="${parentId}"]:checked`)).map(c => c.value);
    el.style.display = checked.includes(triggerVal) ? "" : "none";
  });
}

// ── Save Current Section Data ──
function saveCurrentSection() {
  const sec = TQ_SECTIONS[tqCurrentSection];
  sec.fields.forEach(f => {
    if (f.type === "checkbox") {
      tqFormData[f.id] = Array.from(document.querySelectorAll(`input[name="${f.id}"]:checked`)).map(c => c.value);
    } else if (f.type === "radio") {
      const sel = document.querySelector(`input[name="${f.id}"]:checked`);
      tqFormData[f.id] = sel ? sel.value : "";
    } else {
      const el = document.querySelector(`[name="${f.id}"]`);
      tqFormData[f.id] = el ? el.value : "";
    }
  });
}

// ── Navigation ──
function updateTQNav() {
  document.getElementById("tq-btn-prev").style.visibility = tqCurrentSection === 0 ? "hidden" : "visible";
  const nextBtn = document.getElementById("tq-btn-next");
  const submitBtn = document.getElementById("tq-btn-submit");
  if (tqCurrentSection === TQ_SECTIONS.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "";
  } else {
    nextBtn.style.display = "";
    submitBtn.style.display = "none";
  }
}

function tqPrev() {
  if (tqCurrentSection > 0) { saveCurrentSection(); tqCurrentSection--; renderQuestionnaire(); }
}
function tqNext() {
  saveCurrentSection();
  // Validate required
  const sec = TQ_SECTIONS[tqCurrentSection];
  for (const f of sec.fields) {
    if (!f.required) continue;
    const v = tqFormData[f.id];
    if (!v || (typeof v === "string" && !v.trim()) || (Array.isArray(v) && v.length === 0)) {
      const el = document.querySelector(`.tq-field[data-id="${f.id}"]`);
      if (el) { el.classList.add("tq-error"); el.scrollIntoView({ behavior: "smooth", block: "center" }); }
      return;
    }
  }
  document.querySelectorAll(".tq-error").forEach(e => e.classList.remove("tq-error"));
  if (tqCurrentSection < TQ_SECTIONS.length - 1) { tqCurrentSection++; renderQuestionnaire(); }
}

function tqSubmit() {
  saveCurrentSection();
  // Validate all required
  for (let i = 0; i < TQ_SECTIONS.length; i++) {
    for (const f of TQ_SECTIONS[i].fields) {
      if (!f.required) continue;
      const v = tqFormData[f.id];
      if (!v || (typeof v === "string" && !v.trim()) || (Array.isArray(v) && v.length === 0)) {
        tqCurrentSection = i;
        renderQuestionnaire();
        setTimeout(() => {
          const el = document.querySelector(`.tq-field[data-id="${f.id}"]`);
          if (el) { el.classList.add("tq-error"); el.scrollIntoView({ behavior: "smooth", block: "center" }); }
        }, 100);
        return;
      }
    }
  }
  showTQResults();
}

// ── Results / Review ──
function showTQResults() {
  const container = document.getElementById("tq-form-area");
  const companyName = tqFormData.company_name || "Client";
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  container.innerHTML = `
    <div class="tq-results">
      <div class="tq-results-header">
        <div class="tq-results-icon">✅</div>
        <div>
          <h2>Questionnaire Complete</h2>
          <p>Talent Acquisition / iSolved Discovery for <strong>${escHTML(companyName)}</strong> — ${date}</p>
        </div>
      </div>
      <div class="tq-results-actions">
        <button class="tq-action-btn tq-action-save" onclick="tqDownload()">💾 Save as File</button>
        <button class="tq-action-btn tq-action-email" onclick="tqEmail()">📧 Email Results</button>
        <button class="tq-action-btn tq-action-edit" onclick="tqEdit()">✏️ Edit Answers</button>
      </div>
      <div class="tq-results-body" id="tq-results-body">
        ${TQ_SECTIONS.map(sec => `
          <div class="tq-result-section">
            <h4>${sec.icon} ${sec.title}</h4>
            ${sec.fields.map(f => {
              let val = tqFormData[f.id];
              if (Array.isArray(val)) val = val.join(", ");
              if (!val || (typeof val === "string" && !val.trim())) val = '<span class="tq-empty">Not answered</span>';
              else val = escHTML(val);
              return `<div class="tq-result-row"><div class="tq-result-q">${f.label}</div><div class="tq-result-a">${val}</div></div>`;
            }).join("")}
          </div>
        `).join("")}
      </div>
    </div>
  `;
  // Hide progress nav for results
  document.getElementById("tq-nav-bar").style.display = "none";
  document.getElementById("tq-progress-bar").parentElement.style.display = "none";
}

function tqEdit() {
  document.getElementById("tq-nav-bar").style.display = "";
  document.getElementById("tq-progress-bar").parentElement.style.display = "";
  tqCurrentSection = 0;
  renderQuestionnaire();
}

// ── Download as text file ──
function tqDownload() {
  const companyName = tqFormData.company_name || "Client";
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  let text = `TALENT ACQUISITION / iSOLVED QUESTIONNAIRE\n`;
  text += `Prepared for: ${companyName}\nDate: ${date}\n`;
  text += `${"═".repeat(60)}\n\n`;

  TQ_SECTIONS.forEach(sec => {
    text += `${"─".repeat(50)}\n`;
    text += `${sec.icon} ${sec.title.toUpperCase()}\n`;
    text += `${"─".repeat(50)}\n\n`;
    sec.fields.forEach(f => {
      let val = tqFormData[f.id];
      if (Array.isArray(val)) val = val.join(", ");
      if (!val || (typeof val === "string" && !val.trim())) val = "(Not answered)";
      text += `Q: ${f.label}\nA: ${val}\n\n`;
    });
  });

  text += `${"═".repeat(60)}\n`;
  text += `SimplyHR Consulting | simplyhrconsulting.com\n`;
  text += `austin@simplyhrconsulting.com | spencer@simplyhrconsulting.com\n`;

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `iSolved_Questionnaire_${companyName.replace(/[^a-zA-Z0-9]/g, "_")}_${new Date().toISOString().slice(0,10)}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Email results ──
function tqEmail() {
  const companyName = tqFormData.company_name || "Client";
  const subject = encodeURIComponent(`iSolved Talent Acquisition Questionnaire — ${companyName}`);
  let body = `TALENT ACQUISITION / iSOLVED QUESTIONNAIRE\nPrepared for: ${companyName}\nDate: ${new Date().toLocaleDateString()}\n\n`;

  TQ_SECTIONS.forEach(sec => {
    body += `--- ${sec.title.toUpperCase()} ---\n\n`;
    sec.fields.forEach(f => {
      let val = tqFormData[f.id];
      if (Array.isArray(val)) val = val.join(", ");
      if (!val || (typeof val === "string" && !val.trim())) val = "(Not answered)";
      body += `Q: ${f.label}\nA: ${val}\n\n`;
    });
  });

  body += `---\nSimplyHR Consulting | simplyhrconsulting.com\naustin@simplyhrconsulting.com`;

  window.location.href = `mailto:austin@simplyhrconsulting.com,spencer@simplyhrconsulting.com?subject=${subject}&body=${encodeURIComponent(body)}`;
}

// ── Wire into tab system ──
const _origSwitchTabTQ = window.switchTab;
window.switchTab = function(tab) {
  _origSwitchTabTQ(tab);
  document.getElementById("tab-questionnaire").classList.toggle("active", tab === "questionnaire");
  document.getElementById("content-questionnaire").classList.toggle("active", tab === "questionnaire");

  const sidebar = document.querySelector(".sidebar");
  const noSidebarTabs = ["competitors", "playbook", "questionnaire"];
  if (sidebar) sidebar.style.display = noSidebarTabs.includes(tab) ? "none" : "";
  const layout = document.querySelector(".layout");
  if (layout) layout.style.gridTemplateColumns = noSidebarTabs.includes(tab) ? "1fr" : "";
};

document.addEventListener("DOMContentLoaded", () => setTimeout(initQuestionnaire, 300));
