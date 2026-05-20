// ── Sales Playbook Tab (Tab 5) Logic ──

const PLAYBOOK_DATA = {
  pricing: {
    tiers: [
      { name: "Foundation", tagline: "Compliance Peace of Mind", color: "#10b981",
        rates: { "1-9": 595, "10-19": 895, "20-34": 1295, "35-49": 1695, "50-99": 2295, "100-200": 3195 },
        setup: { "1-9": 295, "10-19": 495, "20-34": 995, "35-49": 1495, "50-99": 1995, "100-200": "Custom" },
        features: [
          "Core handbook + state addendums",
          "Job descriptions",
          "1099 / employee classification audit",
          "Federal & state compliance templates",
          "Onboarding & offboarding support",
          "Anytime HR support — phone, text, email",
          "Safety Program basics",
          "HR audit & risk assessment",
          "Monthly strategy session"
        ]
      },
      { name: "Partner", tagline: "Your Fractional HR Partner", color: "#6366f1", popular: true,
        rates: { "1-9": 995, "10-19": 1495, "20-34": 1995, "35-49": 2495, "50-99": 3495, "100-200": 4995 },
        setup: { "1-9": 295, "10-19": 495, "20-34": 995, "35-49": 1495, "50-99": 1995, "100-200": "Custom" },
        features: [
          "Everything in Foundation, plus:",
          "Dedicated SimplyHR partner",
          "Recruiting playbook",
          "Performance management support",
          "Monthly manager coaching",
          "Annual benefits & compensation review",
          "Employee relations & investigations",
          "Safety / basic OSHA reporting support"
        ]
      },
      { name: "Strategic", tagline: "Fractional Chief People Officer", color: "#8b5cf6",
        rates: { "1-9": 1495, "10-19": 2195, "20-34": 2995, "35-49": 3695, "50-99": 4995, "100-200": 6995 },
        setup: { "1-9": 295, "10-19": 495, "20-34": 995, "35-49": 1495, "50-99": 1995, "100-200": "Custom" },
        features: [
          "Everything in Partner, plus:",
          "Annual workforce + talent plan",
          "Compensation architecture & bonus design",
          "Leadership development program",
          "Org design & succession planning",
          "Quarterly people metrics",
          "M&A diligence / RIF support",
          "HR technology & HRIS RFP support"
        ]
      }
    ],
    addons: [
      { name: "HR Starter Kit", price: "$2,495", desc: "Handbook + JDs + 1099 audit + offer/separation templates" },
      { name: "Fractional CHRO Hours", price: "$200/hr", desc: "5/10/20-hr blocks — board prep, M&A, exec search, comp design" },
      { name: "Compliance Audit", price: "$2,495", desc: "Multi-state I-9, W-4, wage & hour, classification audit + remediation plan" },
      { name: "Recruiting Placement", price: "15% of salary", desc: "Full-cycle recruiting for salary, sales, and manager roles" },
      { name: "Group Training", price: "$1,495/session", desc: "Half-day onsite or virtual — manager training, harassment prevention" },
      { name: "Payroll Support", price: "$15 PEPM", desc: "Per-employee-per-month payroll partnership for small teams" }
    ],
    keyStats: [
      { label: "Avg. Employment Lawsuit", value: "$75K", icon: "⚖️" },
      { label: "Cost to Replace 1 Employee", value: "$15K", icon: "🔄" },
      { label: "Owner Hours Recovered/Mo", value: "5–40 hrs", icon: "⏰" }
    ]
  },
  channels: [
    {
      id: "proposals",
      name: "Proposals Off the Rip",
      icon: "📄",
      color: "#6366f1",
      tagline: "Send fully-built proposals before they ask",
      description: "Your secret weapon — send research-backed, company-specific proposals to prospects before they've requested one. The proposal IS the pitch. Most competitors send brochures — you send answers.",
      steps: [
        { title: "Target Selection", time: "15 min/prospect", details: "Pick 5–10 companies/week: 10–100 employees, pest control/HVAC/plumbing/landscaping, recent job posts on Indeed, no HR roles on LinkedIn" },
        { title: "10-Min Research Blitz", time: "10 min", details: "Employee count (LinkedIn), open job postings (Indeed), Glassdoor reviews, owner name, states of operation, recent news" },
        { title: "Build 1-Page Proposal", time: "15–20 min", details: "Current situation analysis → 90-day plan → pricing tier + setup fee → calendar link CTA" },
        { title: "Deliver", time: "2 min", details: "Email (Subject: 'Built this for [Company] — 2 min read'), LinkedIn DM, or FedEx for high-value targets" },
        { title: "Follow-Up Sequence", time: "Ongoing", details: "Day 3: follow-up email → Day 7: LinkedIn engagement → Day 14: final email" }
      ],
      kpis: [
        { metric: "Proposals sent/week", target: "5–10" },
        { metric: "Open rate", target: "60–80%" },
        { metric: "Response rate", target: "15–25%" },
        { metric: "Discovery calls booked", target: "2–3/week" },
        { metric: "Close rate", target: "20–30%" }
      ]
    },
    {
      id: "bni",
      name: "BNI Groups",
      icon: "🤝",
      color: "#f59e0b",
      tagline: "Train 20–40 owners to sell for you",
      description: "BNI is the highest-ROI referral channel. You're not selling to the room — you're training 20–40 business owners to be your unpaid sales force. Don't pitch. Train.",
      steps: [
        { title: "Join & Show Up", time: "Weekly", details: "Consistent attendance builds trust. Send a well-prepared substitute if you can't make it." },
        { title: "60-Sec Presentations", time: "Weekly", details: "Rotate WHO → TRIGGER → PHRASE format. Teach members to spot your ideal client, not what HR consulting is." },
        { title: "Power Team 1-to-1s", time: "2–3/week", details: "Priority partners: CPAs, employment attorneys, insurance brokers, business coaches, payroll providers, commercial bankers" },
        { title: "Distribute Cheat Sheets", time: "Monthly", details: "Printed cards: who to refer, trigger phrases to listen for, exact words to say, your phone number" },
        { title: "Givers Gain", time: "Always", details: "Give 8–12 referrals/month. The #1 predictor of receiving referrals is giving them first." }
      ],
      kpis: [
        { metric: "1-to-1s per week", target: "2–3" },
        { metric: "Referrals given/month", target: "8–12" },
        { metric: "Referrals received/month", target: "4–8" },
        { metric: "Discovery calls from BNI", target: "3–5/month" },
        { metric: "Close rate (warm)", target: "40–60%" }
      ]
    },
    {
      id: "linkedin",
      name: "LinkedIn Outreach",
      icon: "💼",
      color: "#0077b5",
      tagline: "#1 digital outreach — Austin's profile is the engine",
      description: "LinkedIn is your primary digital outreach channel. Austin's personal profile — not the company page — drives conversations. People buy from people. Post 3–5x/week and run a daily outreach rhythm.",
      steps: [
        { title: "8:00 AM — Connect", time: "20 min", details: "Send 20 targeted connection requests (5 pest control, 10 home services, 5 general SMB)" },
        { title: "8:30 AM — Engage", time: "15 min", details: "Like + comment on 10 prospect posts (genuine engagement, not generic)" },
        { title: "12:00 PM — Respond", time: "15 min", details: "Reply to all DM conversations + send 5 follow-up messages" },
        { title: "2:00 PM — Post", time: "5 min", details: "1 organic content piece: story, tip, contrarian take, behind-the-scenes, or People First Friday" },
        { title: "4:00 PM — InMail", time: "10 min", details: "5 InMails to high-value prospects who haven't accepted connection requests" }
      ],
      kpis: [
        { metric: "Connection requests/week", target: "100" },
        { metric: "Acceptance rate", target: "25–35%" },
        { metric: "DM conversations/week", target: "10–15" },
        { metric: "DM reply rate", target: "8–12%" },
        { metric: "Discovery calls/month", target: "3–5" }
      ]
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: "🎬",
      color: "#ff0000",
      tagline: "Every video is a 24/7 searchable sales pitch",
      description: "YouTube is the #2 search engine. When a small business owner searches 'do I need HR' or 'how to handle employee termination' — you want SimplyHR to be the answer. Use the 75/20/5 framework: 75% core educational, 20% adjacent trends, 5% brand/personality.",
      steps: [
        { title: "Plan Monthly Calendar", time: "30 min/month", details: "4 videos/month: compliance mistakes, what HR looks like, turnover costs, industry-specific" },
        { title: "Script (Template)", time: "30 min/video", details: "Hook (0–3s) → Authority (3–30s) → Core Content 3–5 points (30s–5min) → Recap + CTA (5–5:30)" },
        { title: "Record + Edit", time: "2–3 hrs/video", details: "Custom thumbnail: Austin's face + bold text. 250+ word description with keywords. Pinned comment with Calendly link." },
        { title: "SEO Optimize", time: "15 min", details: "Primary keyword in title, 5–8 tags, end screen to next video + subscribe, first line of description: Book a free HR Audit link" },
        { title: "Repurpose", time: "30 min", details: "Each video → 3 Shorts, 3 Instagram Reels, 1 LinkedIn post, 1 blog post, 1 email newsletter segment" }
      ],
      kpis: [
        { metric: "Videos published/month", target: "4" },
        { metric: "Avg views/video (Mo 1–3)", target: "50–200" },
        { metric: "Avg views/video (Mo 6+)", target: "500–2,000" },
        { metric: "Calendly clicks/month", target: "10–50" },
        { metric: "Watch time retention", target: "40–50%+" }
      ]
    },
    {
      id: "social",
      name: "Facebook & Instagram",
      icon: "📱",
      color: "#e1306c",
      tagline: "Trust layers — confirm you're real before they book",
      description: "Facebook and Instagram are trust layers, not primary lead-gen. Prospects who find you on LinkedIn or Google will 'stalk' your socials before booking a call. These platforms confirm: 'This is a real, credible, human team.'",
      steps: [
        { title: "Instagram Reels", time: "3/week", details: "60–90 sec educational micro-content clipped from YouTube videos" },
        { title: "Instagram Carousels", time: "2/week", details: "Swipeable frameworks, checklists, tips (5–8 slides each)" },
        { title: "Stories", time: "Daily", details: "Behind-the-scenes, polls, Q&A, client wins, day-in-the-life" },
        { title: "Facebook Groups", time: "2/week", details: "Join 5–10 local biz owner groups. Answer HR questions. Never pitch. Share blog posts when relevant." },
        { title: "Meta Retargeting Ads", time: "Always-on", details: "Ad A: Pain-led pest control ($15/day). Ad B: ROI-led SMB ($15/day). Ad C: Retargeting visitors ($10/day)." }
      ],
      kpis: [
        { metric: "IG followers growth", target: "+100/month" },
        { metric: "Reel views (avg)", target: "200–1,000" },
        { metric: "Saves per carousel", target: "10–30" },
        { metric: "Website clicks from IG", target: "20–40/month" },
        { metric: "FB retargeting bookings", target: "3–5/month" }
      ]
    },
    {
      id: "blog",
      name: "Blog & SEO",
      icon: "✍️",
      color: "#10b981",
      tagline: "24/7 inbound lead machine",
      description: "Every blog article targets a keyword your ideal client is Googling. Article provides value → builds trust → drives them to book a call. Build around 4 topic clusters: compliance, pest control/home services, fractional HR, and people ops.",
      steps: [
        { title: "Cluster 1: Compliance", time: "Ongoing", details: "Compliance issues, handbook requirements, FLSA overtime, I-9 checklist, HR law thresholds" },
        { title: "Cluster 2: Industry-Specific", time: "Ongoing", details: "Pest control HR, technician turnover, field onboarding, compensation structures, busy season prep" },
        { title: "Cluster 3: Fractional HR", time: "Ongoing", details: "What is fractional HR, vs PEO comparison, outsourced HR costs 2026, when to hire vs outsource" },
        { title: "Cluster 4: People Ops", time: "Ongoing", details: "How to fire correctly, performance management, retention strategies, turnover calculator, culture building" },
        { title: "Lead Magnets", time: "1/month", details: "Gated downloads: HR Compliance Checklist, Pest Control HR Playbook, Handbook Template, Turnover Calculator, HR Audit Scorecard" }
      ],
      kpis: [
        { metric: "Posts published/month", target: "2–4" },
        { metric: "Organic traffic growth", target: "+30–50% (Mo 1–3)" },
        { metric: "Keywords in top 10", target: "20–40 (Mo 6+)" },
        { metric: "Lead magnet downloads", target: "10–80/month" },
        { metric: "Blog → Calendly clicks", target: "5–40/month" }
      ]
    },
    {
      id: "website",
      name: "Website",
      icon: "🌐",
      color: "#3b82f6",
      tagline: "Conversion engine, not a brochure",
      description: "Every page has one job: get the visitor closer to booking a call. Key pages: homepage, /pest-control-hr, /small-business-hr, /pricing, /case-studies, /hr-audit, /blog, /resources.",
      steps: [
        { title: "Homepage Optimization", time: "Priority", details: "Hero: VP-Level HR without the salary. Plans from $595/mo. Single CTA: Book a Free HR Audit." },
        { title: "Calendly Everywhere", time: "Critical", details: "Embedded booking widget on every page — not just a link. Exit-intent popup with lead magnet offer." },
        { title: "Social Proof", time: "High", details: "Testimonials on 3+ pages. Client logos. SHRM-SCP badge. Case study snippets." },
        { title: "Meta Pixel + GA4", time: "Critical", details: "Install for Facebook retargeting. GA4 with conversion events for Calendly bookings." },
        { title: "Local SEO", time: "Ongoing", details: "Google Business Profile optimized. Consistent NAP. Client reviews mentioning 'HR' and 'compliance'." }
      ],
      kpis: [
        { metric: "Total Calendly bookings", target: "8–12/month" },
        { metric: "Conversion rate", target: "2–5%" },
        { metric: "Bounce rate", target: "<60%" },
        { metric: "Mobile traffic share", target: "60%+" },
        { metric: "Page load speed", target: "<3 seconds" }
      ]
    },
    {
      id: "cold",
      name: "Cold Calls & Email",
      icon: "📞",
      color: "#ef4444",
      tagline: "15 dials + 10 emails = pipeline fuel",
      description: "The backbone outreach system from your existing Sales Outreach Playbook. Cold calls to pest control and SMB owners, 5 email sequences, voicemail scripts, objection handlers, and gatekeeper bypass.",
      steps: [
        { title: "Monday — LinkedIn", time: "20 min", details: "20 connection requests (5 pest control, 10 home services, 5 general SMB)" },
        { title: "Tuesday — Email", time: "30 min", details: "Cold email batch — 10 new prospects (Sequence A for pest control, B for general SMB)" },
        { title: "Wednesday — Calls", time: "45 min", details: "15 cold call dials targeting pest control operators. Use Script 1 or 2. Voicemails under 30 sec." },
        { title: "Thursday — InMail", time: "15 min", details: "5 LinkedIn InMail follow-ups to connected prospects who haven't replied" },
        { title: "Friday — Follow-Up", time: "20 min", details: "Follow-up calls to 'send me info' prospects from prior week's email batch" }
      ],
      kpis: [
        { metric: "Cold call connect rate", target: "10–20%" },
        { metric: "Email open rate", target: "25–40%" },
        { metric: "Email reply rate", target: "5–10%" },
        { metric: "Discovery calls booked", target: "3–5/month" },
        { metric: "Proposal close rate", target: "30–50%" }
      ]
    }
  ],
  launchPlan: [
    { phase: "Foundation", days: "Days 1–30", weeks: [
      { week: 1, focus: "Setup", actions: "Optimize LinkedIn profile, install Meta Pixel, set up Calendly, create 1-page proposal template, join BNI chapter" },
      { week: 2, focus: "Content Launch", actions: "Publish first 2 blog posts, first YouTube video, set up Instagram/Facebook, begin daily LinkedIn posting" },
      { week: 3, focus: "Outreach Begins", actions: "Send first 5 Proposals Off the Rip, start cold call rhythm (15 dials/Wed), first cold email batch (10/Tue)" },
      { week: 4, focus: "BNI Activation", actions: "First BNI presentation, schedule 3 One-to-Ones, distribute cheat sheets to power team" }
    ]},
    { phase: "Acceleration", days: "Days 31–60", weeks: [
      { week: 5, focus: "Scale Outreach", actions: "10 proposals/week, 100 LinkedIn connections/week, 15 cold calls/week" },
      { week: 6, focus: "Content Momentum", actions: "4th blog post, 2nd YouTube video, first case study, first lead magnet" },
      { week: 7, focus: "Ads Launch", actions: "Activate Meta Ad A (pest control), set up Google Ads for top 3 keywords" },
      { week: 8, focus: "BNI Deepening", actions: "Power team fully activated, 2–3 referrals/week, first BNI-sourced discovery call" }
    ]},
    { phase: "Optimization", days: "Days 61–90", weeks: [
      { week: 9, focus: "Review & Refine", actions: "Analyze KPIs across all channels, double down on highest-ROI activities" },
      { week: 10, focus: "Content Compounding", actions: "8+ blog posts live, 4+ YouTube videos, organic traffic measurable" },
      { week: 11, focus: "Retargeting Live", actions: "Facebook retargeting Ad C active, email nurture for lead magnet subscribers" },
      { week: 12, focus: "Full System", actions: "All 8 channels active, weekly rhythm locked in, 8–12 discovery calls/month" }
    ]}
  ],
  revenueTargets: [
    { scenario: "Conservative", retainers: 5, avgRate: 1495, monthly: 7475, annual: 89700 },
    { scenario: "Target", retainers: 10, avgRate: 1995, monthly: 19950, annual: 239400 },
    { scenario: "Stretch", retainers: 15, avgRate: 2995, monthly: 44925, annual: 539100 }
  ],
  bniScripts: [
    { week: "Week 1 — Turnover", script: "I'm Austin Truman with SimplyHR. This week I'm looking for a connection to a pest control or home services owner who's lost 2 or more technicians in the last 6 months. The trigger phrase is: 'I keep losing good people.' If you hear that — just say: 'I know an HR guy who works specifically with companies like yours. Want me to connect you?' That's all I need." },
    { week: "Week 2 — Compliance", script: "Austin Truman, SimplyHR. This week I'm looking for a small business owner who recently got a letter from the DOL, OSHA, or their state labor board. Or one who's terrified they might. The trigger: 'I'm not sure we're doing this right.' If you hear that, say: 'I know someone who does HR audits for small businesses — want an intro?'" },
    { week: "Week 3 — Growth", script: "Austin from SimplyHR. This week, think about a business owner you know who's hiring fast — 5, 10, 15 people this year — but doesn't have anyone doing HR. The trigger: 'We're growing but everything feels chaotic.' Your line: 'My HR guy works with companies going through exactly this. Let me text him your number.'" },
    { week: "Week 4 — Burnout", script: "Hey everyone — Austin, SimplyHR. I'm looking for an owner who is personally handling all the people stuff — firing, hiring, complaints, write-ups — and they're exhausted. The trigger: 'I spend half my time dealing with employee problems.' Say: 'There's a fractional HR team I know — fraction of the cost of a full-time hire. Want to meet them?'" }
  ]
};

let activeChannel = "proposals";

function initPlaybook() {
  document.getElementById("tab-playbook").addEventListener("click", () => switchTab("playbook"));
  renderPlaybookTab();
}

function renderPlaybookTab() {
  renderPricingSection();
  renderChannelNav();
  renderChannelDetail(activeChannel);
  renderLaunchPlan();
  renderRevenueChart();
  renderBNIScripts();
  renderAddons();
}

// ── Pricing Section ──
function renderPricingSection() {
  const grid = document.getElementById("pb-pricing-grid");
  grid.innerHTML = "";
  PLAYBOOK_DATA.pricing.tiers.forEach(tier => {
    const card = document.createElement("div");
    card.className = "pb-pricing-card" + (tier.popular ? " pb-popular" : "");
    card.style.setProperty("--tier-color", tier.color);
    const rateKeys = Object.keys(tier.rates);
    card.innerHTML = `
      ${tier.popular ? '<div class="pb-popular-badge">MOST POPULAR — 60–70% choose this</div>' : ''}
      <h3 style="color:${tier.color}">${tier.name}</h3>
      <p class="pb-tier-tagline">${tier.tagline}</p>
      <div class="pb-rate-display">
        <span class="pb-rate-from">from</span>
        <span class="pb-rate-amount" style="color:${tier.color}">$${tier.rates["1-9"].toLocaleString()}</span>
        <span class="pb-rate-period">/month</span>
      </div>
      <div class="pb-rate-range">$${tier.rates["1-9"].toLocaleString()} – $${tier.rates["100-200"].toLocaleString()}/mo by headcount</div>
      <ul class="pb-feature-list">
        ${tier.features.map(f => `<li>${f}</li>`).join("")}
      </ul>
    `;
    grid.appendChild(card);
  });

  // Key stats
  const statsGrid = document.getElementById("pb-stats-grid");
  statsGrid.innerHTML = "";
  PLAYBOOK_DATA.pricing.keyStats.forEach(stat => {
    statsGrid.innerHTML += `
      <div class="pb-stat-card">
        <div class="pb-stat-icon">${stat.icon}</div>
        <div class="pb-stat-value">${stat.value}</div>
        <div class="pb-stat-label">${stat.label}</div>
      </div>
    `;
  });

  // Pricing matrix
  renderPricingMatrix();
}

function renderPricingMatrix() {
  const tbody = document.getElementById("pb-matrix-tbody");
  tbody.innerHTML = "";
  const sizes = ["1-9", "10-19", "20-34", "35-49", "50-99", "100-200"];
  PLAYBOOK_DATA.pricing.tiers.forEach(tier => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="pb-matrix-tier" style="color:${tier.color};font-weight:700">${tier.name}${tier.popular ? ' ⭐' : ''}</td>` +
      sizes.map(s => `<td>$${tier.rates[s].toLocaleString()}</td>`).join("");
    tbody.appendChild(tr);
  });
  // Setup row
  const setupRow = document.createElement("tr");
  setupRow.className = "pb-matrix-setup";
  const tier0 = PLAYBOOK_DATA.pricing.tiers[0];
  setupRow.innerHTML = `<td style="font-weight:700;color:var(--text-muted)">Setup Fee</td>` +
    sizes.map(s => `<td>${typeof tier0.setup[s] === 'number' ? '$' + tier0.setup[s].toLocaleString() : tier0.setup[s]}</td>`).join("");
  tbody.appendChild(setupRow);
}

// ── Channel Navigation ──
function renderChannelNav() {
  const nav = document.getElementById("pb-channel-nav");
  nav.innerHTML = "";
  PLAYBOOK_DATA.channels.forEach(ch => {
    const btn = document.createElement("button");
    btn.className = "pb-ch-btn" + (ch.id === activeChannel ? " active" : "");
    btn.style.setProperty("--ch-color", ch.color);
    btn.innerHTML = `<span class="pb-ch-icon">${ch.icon}</span><span class="pb-ch-name">${ch.name}</span>`;
    btn.onclick = () => {
      activeChannel = ch.id;
      document.querySelectorAll(".pb-ch-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderChannelDetail(ch.id);
    };
    nav.appendChild(btn);
  });
}

// ── Channel Detail ──
function renderChannelDetail(id) {
  const ch = PLAYBOOK_DATA.channels.find(c => c.id === id);
  if (!ch) return;
  const container = document.getElementById("pb-channel-detail");
  container.style.setProperty("--ch-color", ch.color);
  container.innerHTML = `
    <div class="pb-ch-header">
      <div class="pb-ch-header-icon" style="background:${ch.color}20;color:${ch.color}">${ch.icon}</div>
      <div>
        <h3>${ch.name}</h3>
        <p class="pb-ch-tagline">${ch.tagline}</p>
      </div>
    </div>
    <p class="pb-ch-desc">${ch.description}</p>
    <div class="pb-ch-content">
      <div class="pb-ch-steps">
        <h4>Execution Steps</h4>
        <div class="pb-steps-list">
          ${ch.steps.map((s, i) => `
            <div class="pb-step">
              <div class="pb-step-num" style="background:${ch.color}">${i + 1}</div>
              <div class="pb-step-body">
                <div class="pb-step-title">${s.title} <span class="pb-step-time">${s.time}</span></div>
                <div class="pb-step-details">${s.details}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="pb-ch-kpis">
        <h4>KPIs & Targets</h4>
        <div class="pb-kpi-list">
          ${ch.kpis.map(k => `
            <div class="pb-kpi-row">
              <span class="pb-kpi-metric">${k.metric}</span>
              <span class="pb-kpi-target" style="color:${ch.color}">${k.target}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

// ── 90-Day Launch Plan ──
function renderLaunchPlan() {
  const container = document.getElementById("pb-launch-plan");
  container.innerHTML = "";
  const phaseColors = ["#10b981", "#6366f1", "#f59e0b"];
  PLAYBOOK_DATA.launchPlan.forEach((phase, pi) => {
    const section = document.createElement("div");
    section.className = "pb-phase";
    section.style.setProperty("--phase-color", phaseColors[pi]);
    section.innerHTML = `
      <div class="pb-phase-header">
        <span class="pb-phase-num">Phase ${pi + 1}</span>
        <span class="pb-phase-name">${phase.phase}</span>
        <span class="pb-phase-days">${phase.days}</span>
      </div>
      <div class="pb-phase-weeks">
        ${phase.weeks.map(w => `
          <div class="pb-week">
            <div class="pb-week-num">Week ${w.week}</div>
            <div class="pb-week-focus">${w.focus}</div>
            <div class="pb-week-actions">${w.actions}</div>
          </div>
        `).join("")}
      </div>
    `;
    container.appendChild(section);
  });
}

// ── Revenue Chart (Canvas) ──
function renderRevenueChart() {
  const canvas = document.getElementById("pb-revenue-canvas");
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.parentElement.getBoundingClientRect().width || 600;
  const h = 300;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const pad = { top: 30, right: 30, bottom: 60, left: 80 };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;

  ctx.fillStyle = "rgba(255,255,255,0.02)";
  ctx.fillRect(0, 0, w, h);

  const data = PLAYBOOK_DATA.revenueTargets;
  const maxVal = data[2].annual;
  const barW = cw / (data.length * 2 + 1);
  const colors = ["#10b981", "#6366f1", "#f59e0b"];

  // Grid lines
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const yp = pad.top + (ch / 4) * i;
    ctx.beginPath(); ctx.moveTo(pad.left, yp); ctx.lineTo(pad.left + cw, yp); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "600 11px Inter, sans-serif";
    ctx.textAlign = "right";
    const val = maxVal - (maxVal / 4) * i;
    ctx.fillText("$" + Math.round(val / 1000) + "K", pad.left - 10, yp + 4);
  }

  data.forEach((d, i) => {
    const x = pad.left + barW + i * barW * 2;
    const barH = (d.annual / maxVal) * ch;
    const y = pad.top + ch - barH;

    // Bar gradient
    const grd = ctx.createLinearGradient(x, y, x, y + barH);
    grd.addColorStop(0, colors[i]);
    grd.addColorStop(1, colors[i] + "60");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.roundRect(x, y, barW * 1.5, barH, [6, 6, 0, 0]);
    ctx.fill();

    // Value on top
    ctx.fillStyle = colors[i];
    ctx.font = "700 13px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("$" + Math.round(d.annual / 1000) + "K/yr", x + barW * 0.75, y - 8);

    // Label below
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "600 11px Inter, sans-serif";
    ctx.fillText(d.scenario, x + barW * 0.75, pad.top + ch + 18);
    ctx.font = "500 10px Inter, sans-serif";
    ctx.fillText(d.retainers + " retainers @ $" + d.avgRate.toLocaleString() + "/mo", x + barW * 0.75, pad.top + ch + 34);
  });
}

// ── BNI Scripts ──
function renderBNIScripts() {
  const container = document.getElementById("pb-bni-scripts");
  container.innerHTML = "";
  PLAYBOOK_DATA.bniScripts.forEach(s => {
    const card = document.createElement("div");
    card.className = "pb-bni-card";
    card.innerHTML = `
      <div class="pb-bni-week">${s.week}</div>
      <div class="pb-bni-script">"${s.script}"</div>
    `;
    container.appendChild(card);
  });
}

// ── Add-ons ──
function renderAddons() {
  const grid = document.getElementById("pb-addons-grid");
  grid.innerHTML = "";
  PLAYBOOK_DATA.pricing.addons.forEach(a => {
    grid.innerHTML += `
      <div class="pb-addon-card">
        <div class="pb-addon-name">${a.name}</div>
        <div class="pb-addon-price">${a.price}</div>
        <div class="pb-addon-desc">${a.desc}</div>
      </div>
    `;
  });
}

// ── Wire into tab system ──
const _origSwitchTabPB = window.switchTab;
window.switchTab = function(tab) {
  _origSwitchTabPB(tab);
  document.getElementById("tab-playbook").classList.toggle("active", tab === "playbook");
  document.getElementById("content-playbook").classList.toggle("active", tab === "playbook");

  const sidebar = document.querySelector(".sidebar");
  if (sidebar) sidebar.style.display = (tab === "competitors" || tab === "playbook") ? "none" : "";
  const layout = document.querySelector(".layout");
  if (layout) layout.style.gridTemplateColumns = (tab === "competitors" || tab === "playbook") ? "1fr" : "";

  if (tab === "playbook") setTimeout(renderRevenueChart, 50);
};

window.addEventListener("resize", () => {
  if (document.getElementById("content-playbook")?.classList.contains("active")) renderRevenueChart();
});

document.addEventListener("DOMContentLoaded", () => setTimeout(initPlaybook, 250));
