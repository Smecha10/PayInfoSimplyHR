import json, os

BASE = r"c:\Users\Smech\OneDrive\Desktop\Businesses\SimplyHR\Pay Info"
PAY_FILE = os.path.join(BASE, "pest_control_pay_data.json")
COMP_FILE = os.path.join(BASE, "pest_control_compliance_data.json")
STARTUP_FILE = os.path.join(BASE, "pest_control_startup_data.json")
OUT_FILE = os.path.join(BASE, "index.html")

with open(PAY_FILE) as f:
    pay_str = f.read()
with open(COMP_FILE) as f:
    comp_str = f.read()
with open(STARTUP_FILE) as f:
    startup_str = f.read()

STARTUP_HTML = """
      <!-- ── START-UP COMPLIANCE TAB CONTENT ── -->
      <div id="content-startup" class="tab-content">

        <!-- Hero -->
        <div class="startup-hero">
          <div class="startup-hero-icon">&#x1F680;</div>
          <div class="startup-hero-info">
            <h1 id="startup-hero-title">Start-Up &amp; Company Growth</h1>
            <p>Know exactly which federal and state HR laws trigger as you hire more employees.</p>
          </div>
        </div>

        <div class="emp-selector-wrap">
          <div class="emp-selector-top">
            <div class="emp-count-label">Current / Target Employee Count</div>
            <div class="emp-count-display-wrap">
              <span class="emp-count-display" id="emp-count-display">10</span>
              <span style="font-size:1rem;color:var(--text-muted);font-weight:600">Employees</span>
            </div>
          </div>
          
          <div class="slider-container">
            <span style="font-size:0.875rem;font-weight:700;color:var(--text-muted)">1</span>
            <input type="range" min="1" max="500" value="10" class="emp-slider" id="emp-count-slider">
            <span style="font-size:0.875rem;font-weight:700;color:var(--text-muted)">500+</span>
            <input type="number" min="1" max="500" value="10" class="emp-input" id="emp-count-input">
          </div>
          
          <div class="tl-container">
            <div class="tl-step" id="tl-step-1"><div class="tl-dot"></div><div class="tl-label">1</div></div>
            <div class="tl-step" id="tl-step-15"><div class="tl-dot"></div><div class="tl-label">15</div></div>
            <div class="tl-step" id="tl-step-20"><div class="tl-dot"></div><div class="tl-label">20</div></div>
            <div class="tl-step" id="tl-step-50"><div class="tl-dot"></div><div class="tl-label">50</div></div>
            <div class="tl-step" id="tl-step-100"><div class="tl-dot"></div><div class="tl-label">100</div></div>
          </div>
        </div>
        
        <div class="card-title" style="margin-bottom:4px;display:flex;justify-content:space-between">
          <span>Active Legal Obligations</span>
          <span style="color:var(--text-secondary);text-transform:none;letter-spacing:normal;font-weight:400" id="startup-state-name"></span>
        </div>
        
        <div class="startup-laws-grid" id="startup-laws-grid">
          <!-- Dynamically populated cards -->
        </div>

      </div>
"""

COMPLIANCE_HTML = """
      <!-- ── COMPLIANCE TAB CONTENT ── -->
      <div id="content-compliance" class="tab-content">

        <!-- Hero -->
        <div class="comp-hero">
          <div class="comp-hero-abbr" id="comp-hero-abbr">TX</div>
          <div class="comp-hero-info">
            <h1 id="comp-hero-name">Texas</h1>
            <p id="comp-hero-sub">HR Compliance &amp; Regulatory Overview</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
              <span id="comp-risk-badge" class="risk-badge">1099 Risk: MODERATE</span>
              <span class="hero-tag" id="comp-ic-test">Federal Standard (IRS/DOL)</span>
            </div>
          </div>
        </div>

        <!-- At a Glance -->
        <div class="comp-section">
          <div class="comp-section-header">
            <span class="comp-section-icon">&#x26A1;</span>
            <span class="comp-section-title">At a Glance — State Employment Law Snapshot</span>
            <span class="comp-section-sub" id="comp-role-glance-label"></span>
          </div>
          <div class="glance-grid">
            <div class="glance-item"><div class="glance-label">Minimum Wage</div><div class="glance-value" id="glance-minwage">—</div></div>
            <div class="glance-item"><div class="glance-label">Paid Sick Leave</div><div class="glance-value" id="glance-psl">—</div></div>
            <div class="glance-item"><div class="glance-label">Daily Overtime</div><div class="glance-value" id="glance-daily-ot">—</div></div>
            <div class="glance-item"><div class="glance-label">State Income Tax</div><div class="glance-value" id="glance-tax">—</div></div>
            <div class="glance-item"><div class="glance-label">OT Rule</div><div class="glance-value" id="glance-ot-rule">—</div></div>
            <div class="glance-item"><div class="glance-label">Contractor Risk</div><div class="glance-value" id="glance-ic-risk">—</div></div>
          </div>
        </div>

        <!-- General HR Notes -->
        <div class="comp-section">
          <div class="comp-section-header">
            <span class="comp-section-icon">&#x1F4CB;</span>
            <span class="comp-section-title">General State HR Compliance Notes</span>
          </div>
          <p style="font-size:0.875rem;color:var(--text-secondary);line-height:1.7" id="comp-general-notes"></p>
        </div>

        <!-- Role-Specific Compliance -->
        <div class="comp-section">
          <div class="comp-section-header">
            <span class="comp-section-icon">&#x1F464;</span>
            <span class="comp-section-title">Role-Specific Compliance</span>
            <span class="comp-section-sub">Switch roles in the left sidebar</span>
          </div>
          <div class="role-comp-note" id="comp-role-note"></div>
          <div style="margin-top:14px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
            <div class="glance-item"><div class="glance-label">Classification</div><div class="glance-value" style="font-size:0.82rem" id="comp-flsa-class">—</div></div>
            <div class="glance-item"><div class="glance-label">FLSA Status</div><div class="glance-value" style="font-size:0.82rem" id="comp-flsa-status">—</div></div>
            <div class="glance-item"><div class="glance-label">Overtime Rule</div><div class="glance-value" style="font-size:0.82rem" id="comp-flsa-ot">—</div></div>
          </div>
          <div style="margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <div class="card-title" style="margin-bottom:8px">Key Federal Laws</div>
              <ul class="comp-list" id="comp-federal-laws"></ul>
            </div>
            <div>
              <div class="card-title" style="margin-bottom:8px;color:#ef4444">Key Compliance Risks</div>
              <ul class="comp-list danger" id="comp-key-risks"></ul>
            </div>
          </div>
        </div>

        <!-- Paid Sick Leave -->
        <div class="comp-section">
          <div class="comp-section-header">
            <span class="comp-section-icon">&#x1FA7A;</span>
            <span class="comp-section-title">Paid Sick Leave</span>
            <span class="comp-section-sub" id="comp-psl-status"></span>
          </div>
          <p style="font-size:0.875rem;color:var(--text-secondary);line-height:1.6" id="comp-psl-details"></p>
        </div>

        <!-- W-2 vs 1099 -->
        <div class="comp-section">
          <div class="comp-section-header">
            <span class="comp-section-icon">&#x2696;&#xFE0F;</span>
            <span class="comp-section-title">W-2 vs 1099 — Sales Rep Classification</span>
            <span id="comp-ic-risk-badge" class="risk-badge" style="margin-left:auto">—</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:14px">
            <div class="glance-item"><div class="glance-label">Classification Test</div><div class="glance-value" style="font-size:0.82rem" id="comp-ic-test-used">—</div></div>
            <div class="glance-item"><div class="glance-label">Sales Rep 1099 Viable?</div><div class="glance-value" style="font-size:0.82rem" id="comp-sales-viable">—</div></div>
            <div class="glance-item"><div class="glance-label">Technician 1099 Viable?</div><div class="glance-value" style="font-size:0.82rem" id="comp-tech-viable">—</div></div>
          </div>
          <div class="role-comp-note" style="margin-bottom:14px" id="comp-ic-state-note"></div>
          <div class="card-title" style="margin-bottom:10px">&#x2714; Sales Rep Classification Checklist</div>
          <div class="w2-factor-row w2-factor-head" style="border-bottom:1px solid var(--border);padding-bottom:6px;margin-bottom:4px">
            <div>FACTOR</div><div style="color:#10b981">&#x25B2; Indicates W-2</div><div style="color:#94a3b8">&#x25B8; Indicates 1099</div>
          </div>
          <div id="comp-w2-checklist"></div>
          <div style="margin-top:16px">
            <div class="card-title" style="margin-bottom:8px;color:#ef4444">&#x26A0; Misclassification Penalties</div>
            <ul class="comp-list danger" id="comp-penalties"></ul>
          </div>
        </div>

        <!-- Key Deadlines -->
        <div class="comp-section">
          <div class="comp-section-header">
            <span class="comp-section-icon">&#x1F4C5;</span>
            <span class="comp-section-title">Key Compliance Deadlines</span>
          </div>
          <ul class="comp-list warn" id="comp-deadlines"></ul>
        </div>

        <!-- Disclaimer -->
        <div class="disclaimer">
          <span class="disclaimer-icon">&#x26A0;</span>
          <span>This information is for <strong>strategic HR reference purposes only</strong> and does not constitute legal advice. Laws change frequently — consult a licensed employment attorney before making classification or compensation decisions.</span>
        </div>

        <!-- Compliance Sources -->
        <div class="comp-section">
          <div class="comp-section-header">
            <span class="comp-section-icon">&#x1F4DA;</span>
            <span class="comp-section-title">Compliance Data Sources</span>
          </div>
          <div class="sources-list" id="comp-sources-list"></div>
        </div>

      </div>
"""

PAY_TAB_HTML = """
      <!-- ── PAY TAB CONTENT ── -->
      <div id="content-pay" class="tab-content active">

        <div class="state-hero">
          <div class="state-hero-abbr" id="hero-abbr">TX</div>
          <div class="state-hero-info">
            <h1 id="hero-name">Texas</h1>
            <p id="hero-lic-body">Loading...</p>
            <div class="hero-tags" id="hero-tags"></div>
          </div>
        </div>

        <div class="card">
          <div class="role-header" id="role-header"></div>
          <div class="pay-grid">
            <div class="pay-stat"><div class="pay-stat-label">Median Annual</div><div class="pay-stat-value accent" id="stat-median">—</div><div class="pay-stat-sub">State median salary</div></div>
            <div class="pay-stat"><div class="pay-stat-label">Median Hourly</div><div class="pay-stat-value" id="stat-hourly">—</div><div class="pay-stat-sub">Equivalent hourly rate</div></div>
            <div class="pay-stat"><div class="pay-stat-label">National Median</div><div class="pay-stat-value" style="color:var(--accent2)" id="stat-national">—</div><div class="pay-stat-sub">BLS national benchmark</div></div>
          </div>
        </div>

        <div class="range-card card">
          <div class="range-header"><span class="range-title" id="range-state-label">Salary Range</span><span class="range-vs">Blue marker = National median</span></div>
          <div class="range-bar-wrap"><div class="range-bar-fill" id="range-bar-fill"></div><div class="range-national-marker" id="range-national-marker"></div></div>
          <div class="range-labels"><span id="range-low">—</span><span style="color:var(--text-muted);font-size:0.72rem">10th-90th Percentile Range</span><span id="range-high">—</span></div>
        </div>

        <div class="notes-card card" id="notes-card" style="display:none">
          <div class="notes-card-title">&#x1F4A1; State-Specific Insights</div>
          <p id="role-notes"></p>
        </div>

        <div class="compare-banner">
          <p>Compare <strong>this state</strong> side-by-side with another state for the selected role.</p>
          <button class="btn btn-outline btn-sm" id="compare-toggle">Compare States</button>
        </div>

        <div class="compare-panel" id="compare-panel">
          <select class="compare-select" id="compare-state-select"></select>
          <div id="compare-content"></div>
        </div>

        <div class="card">
          <div class="card-title">Licensing &amp; Regulatory Info</div>
          <div class="license-grid">
            <div class="license-item"><div class="license-item-label">Regulatory Body</div><div class="license-item-value" id="lic-body">—</div></div>
            <div class="license-item"><div class="license-item-label">Continuing Education</div><div class="license-item-value" id="lic-ce">—</div></div>
            <div class="license-item"><div class="license-item-label">Reciprocity</div><div class="license-item-value" id="lic-recip">—</div></div>
            <div class="license-item"><div class="license-item-label">Official Resource</div><a class="license-link" id="lic-url" href="#" target="_blank" rel="noopener">Visit Website &#x2197;</a></div>
          </div>
        </div>

        <div class="card"><div class="card-title">Data Sources</div><div class="sources-list" id="sources-list"></div></div>

      </div>
"""

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Pest Control Dashboard — SimplyHR</title>
  <meta name="description" content="Pay data, HR compliance, and startup employee thresholds for pest control roles across all 50 U.S. states."/>
  <link rel="stylesheet" href="styles.css"/>
</head>
<body>

<script>
window.__PAY_DATA__ = {pay_str};
window.__COMP_DATA__ = {comp_str};
window.__STARTUP_DATA__ = {startup_str};
</script>

<header class="header">
  <div class="header-inner">
    <div class="logo">
      <div class="logo-icon">&#x1FAB2;</div>
      <div>
        <div style="font-weight:700">SimplyHR</div>
        <div class="header-title">Pest Control <span>Intelligence Dashboard</span></div>
      </div>
    </div>
    <div class="spacer"></div>
    <span class="badge">All 50 States</span>
  </div>
</header>

<nav class="tab-nav">
  <button class="tab-btn active" id="tab-pay">&#x1F4B0; Pay Data</button>
  <button class="tab-btn compliance-tab" id="tab-compliance">&#x2696;&#xFE0F; HR Compliance &amp; Legal</button>
  <button class="tab-btn startup-tab" id="tab-startup">&#x1F680; Start-Up &amp; Growth</button>
</nav>

<div class="layout">

  <aside class="sidebar">
    <div class="card">
      <div class="card-title">Search States</div>
      <div class="search-wrap">
        <span class="search-icon">&#x1F50D;</span>
        <input id="search-input" type="text" placeholder="Type a state name..." autocomplete="off"/>
      </div>
    </div>
    <div class="card" style="flex:1;min-height:0">
      <div class="card-title">All States (50)</div>
      <div class="state-list" id="state-list"></div>
    </div>
    <div class="card">
      <div class="card-title">Select Role</div>
      <div class="role-pills" id="role-pills"></div>
    </div>
  </aside>

  <main class="main" id="main">
    <div id="main-content" class="fade-in">
{PAY_TAB_HTML}
{COMPLIANCE_HTML}
{STARTUP_HTML}
    </div>
  </main>
</div>

<script src="app.js"></script>
<script src="compliance.js"></script>
<script src="startup_compliance.js"></script>
</body>
</html>"""

with open(OUT_FILE, "w", encoding="utf-8") as f:
    f.write(html)
print("Done:", OUT_FILE)
