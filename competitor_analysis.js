// ── HR Companies Competitor Analysis (Tab 4) Logic ──

const COMPETITOR_DATA = {
  market: {
    size_2025: "$79B",
    size_2026: "$84B",
    smb_cagr: "9.25%",
    cagr_period: "through 2031",
    benchmarks: {
      cac: "$1,500 – $3,000",
      ltv_cac_ratio: "3:1+",
      retention_rate: "73% – 84%",
      utilization_rate: "70% – 80%",
      gross_margin: "88%+"
    }
  },
  competitors: [
    {
      name: "Insperity",
      tier: "leader",
      tagline: "The Gold Standard PEO",
      model: "Full-service PEO (co-employment)",
      pricing: "$150–$210/employee/month",
      target: "5–5,000 employees",
      revenue: "$6.8B (2025)",
      employees: "~4,200 corporate / 303K WSEEs",
      marketCap: "$0.94B – $1.24B",
      rating: 4.5,
      strengths: [
        "Dedicated specialist teams per client (HR, payroll, safety)",
        "Fortune 500-level benefits for SMBs via co-employment scale",
        "Proactive compliance monitoring & regulatory alerts",
        "Thousands of training & development courses included",
        "IRS-certified, ESAC-accredited — high trust signals"
      ],
      weaknesses: [
        "Premium pricing — can be cost-prohibitive for micro businesses",
        "Opaque fee structure — must contact sales for quotes",
        "Minimum 5 employees required for PEO services",
        "Homegrown tech platform not as modern as newer entrants"
      ],
      keyLesson: "The relationship IS the product. Clients pay premium because they feel protected by real humans.",
      color: "#10b981"
    },
    {
      name: "Bambee",
      tier: "leader",
      tagline: "Budget-Friendly Disruptor",
      model: "Flat-fee HR outsourcing",
      pricing: "$99–$1,200/mo + setup fee",
      target: "1–500 employees",
      revenue: "$17.8M ARR",
      employees: "~70–80 employees",
      marketCap: "~$363M (private)",
      rating: 3.8,
      strengths: [
        "Radically simple flat-fee pricing — instant clarity",
        "Dedicated HR Manager — one human contact per client",
        "Compliance-first positioning — 'Are you compliant?' resonates",
        "Training library with hundreds of compliance courses",
        "Clean, intuitive web dashboard"
      ],
      weaknesses: [
        "Inconsistent HR manager quality due to staff turnover",
        "Setup fees ($500–$2K) alienate price-sensitive prospects",
        "Not a full HRIS — limited customization capabilities",
        "No mobile app — web-only access",
        "Slow response times on complex issues reported by users"
      ],
      keyLesson: "Simplicity and transparency in pricing wins small businesses. But inconsistency kills trust.",
      color: "#f59e0b"
    },
    {
      name: "TriNet",
      tier: "cautionary",
      tagline: "Premium Price, Inconsistent Delivery",
      model: "Full-service PEO",
      pricing: "Custom (premium tier)",
      target: "5–1,000+ employees",
      revenue: "$5.0B (2025)",
      employees: "~3,400 corporate / 300K WSEEs",
      marketCap: "$1.64B – $1.97B",
      rating: 2.9,
      strengths: [
        "Comprehensive all-in-one HR solution",
        "Industry-specific service bundles",
        "Strong benefits packages through scale",
        "Cloud-based HR management platform"
      ],
      weaknesses: [
        "Customer support — users bounced between departments",
        "Serious payroll/tax filing errors causing IRS penalties",
        "Opaque premium pricing with poor transparency",
        "Platform UI described as 'clunky' and 'disconnected'",
        "Sales promises don't match implementation reality",
        "Rigid requirements alienate growing SMBs"
      ],
      keyLesson: "The gap between the 'white glove' sales pitch and actual service destroys trust. Never overpromise.",
      color: "#ef4444"
    },
    {
      name: "Helios HR",
      tier: "boutique",
      tagline: "The Embedded Strategic Partner",
      model: "Fractional HR leadership",
      pricing: "Retainer-based (custom)",
      target: "Scaling companies & nonprofits",
      revenue: "Private",
      employees: "Boutique team",
      marketCap: "Private",
      rating: 4.6,
      strengths: [
        "Deep specialization in fractional HR for scaling orgs",
        "Leadership development as a core differentiator",
        "Knowledge base / blog driving organic SEO traffic",
        "Embedded partnership model — extension of client team",
        "SHRM-certified consultants with executive credibility",
        "Website is a lead-generation machine with clear CTAs"
      ],
      weaknesses: [
        "Limited geographic reach compared to national firms",
        "Custom pricing may deter price-comparison shoppers",
        "Smaller team limits capacity for simultaneous engagements"
      ],
      keyLesson: "Niche expertise + thought leadership content + embedded partnership = premium positioning.",
      color: "#8b5cf6"
    },
    {
      name: "Red Clover HR",
      tier: "boutique",
      tagline: "The Culture Architect",
      model: "Fractional HR consulting",
      pricing: "Project & retainer-based",
      target: "Tech, marketing, construction SMBs",
      revenue: "Private",
      employees: "Boutique team",
      marketCap: "Private",
      rating: 4.4,
      strengths: [
        "Niche positioning around employee satisfaction & change mgmt",
        "Proprietary culture transformation frameworks",
        "Strong case study approach with before/after results",
        "Diverse sector expertise with unified methodology",
        "Focus on measurable business outcomes, not just HR admin"
      ],
      weaknesses: [
        "Smaller brand awareness outside core markets",
        "Capacity constraints typical of boutique firms",
        "No tech platform — relies on partner tools"
      ],
      keyLesson: "Own a methodology. Proprietary frameworks become your brand and command premium pricing.",
      color: "#ec4899"
    },
    {
      name: "Gusto",
      tier: "platform",
      tagline: "User-Friendly Automation",
      model: "HR/Payroll SaaS platform",
      pricing: "Transparent tiers ($40+/mo base)",
      target: "1–100 employees (startups & small biz)",
      revenue: "Private (est. $500M+)",
      employees: "~2,000",
      marketCap: "Private (~$9.5B)",
      rating: 4.3,
      strengths: [
        "Extremely intuitive and modern UI/UX",
        "Transparent, predictable pricing tiers",
        "All-in-one payroll, benefits, onboarding, PTO",
        "Strong contractor management (1099 plan)",
        "Excellent integration ecosystem"
      ],
      weaknesses: [
        "Limited for complex/enterprise compliance needs",
        "Advanced support reserved for highest tier only",
        "Per-person costs scale up with headcount",
        "Not a true HR consulting partner — software only"
      ],
      keyLesson: "Modern UI and transparent pricing create massive trust. But software can't replace human guidance.",
      color: "#f97316"
    },
    {
      name: "Paychex",
      tier: "platform",
      tagline: "Traditional Payroll Powerhouse",
      model: "HR/Payroll platform + PEO",
      pricing: "Custom quotes (premium)",
      target: "1–1,000+ employees",
      revenue: "$5.3B+ (FY2025)",
      employees: "~16,000",
      marketCap: "$44B+",
      rating: 3.7,
      strengths: [
        "Highly scalable — handles complex multi-state payroll",
        "24/7 support with dedicated HR professionals",
        "Robust mobile app for admins and employees",
        "Extensive add-ons and PEO services available",
        "Deep compliance expertise across industries"
      ],
      weaknesses: [
        "Opaque pricing with add-on 'price creep'",
        "Steep learning curve — feature-heavy interface",
        "Generally higher cost than modern alternatives",
        "Traditional UX feels dated vs. newer competitors"
      ],
      keyLesson: "Scale and 24/7 support matter for growing businesses. But pricing transparency is non-negotiable.",
      color: "#0ea5e9"
    },
    {
      name: "DianaHR",
      tier: "emerging",
      tagline: "AI-First HR Newcomer",
      model: "AI + fractional HR hybrid",
      pricing: "Competitive flat rates",
      target: "Startups & remote-first teams",
      revenue: "Early-stage",
      employees: "Small team",
      marketCap: "Private",
      rating: 4.0,
      strengths: [
        "Hybrid AI + human model automates admin tasks",
        "Built for remote-first / distributed team culture",
        "Fast onboarding and cost-effective delivery",
        "Riding the AI wave — 'future of HR' positioning",
        "Lean operations = aggressive pricing"
      ],
      weaknesses: [
        "Limited track record and brand awareness",
        "AI can't handle nuanced employee relations issues",
        "Scaling quality while maintaining AI accuracy",
        "Less proven in complex compliance scenarios"
      ],
      keyLesson: "AI integration is the future but human judgment remains essential for sensitive HR matters.",
      color: "#14b8a6"
    }
  ],
  failurePatterns: {
    strategic: [
      "No clear niche or specialization — 'we do everything for everyone'",
      "Competing on price instead of demonstrating value",
      "Poor target market research — chasing any client",
      "Misalignment between HR advice and client business goals"
    ],
    operational: [
      "Vague project outcomes — clients don't see impact",
      "Can't manage expectations on timelines and deliverables",
      "Outdated compliance knowledge — dangerous legal exposure",
      "Delegating critical work (terminations, PIPs) to juniors"
    ],
    financial: [
      "Feast-or-famine cash flow — no retainer revenue",
      "Pricing too low signals low quality and kills margins",
      "Over-reliance on 1–2 major clients — catastrophic if lost"
    ],
    professional: [
      "Imposter syndrome and fear of failure stall growth",
      "Confusing administrative work with strategic value",
      "Neglecting own internal operations, hiring, and development"
    ]
  },
  deadlySins: [
    { sin: "No Positioning", looks: "\"We do everything for everyone\"", cost: "Invisible in market; compete on price only" },
    { sin: "Overpromising", looks: "Grand sales pitch → mediocre delivery", cost: "Client churn, bad reviews, reputation damage" },
    { sin: "Reactive Only", looks: "Wait for clients to call with problems", cost: "Clients feel unprotected; leave for proactive firms" },
    { sin: "Opaque Pricing", looks: "\"Contact us for a quote\" — no ballpark", cost: "Prospects bounce to transparent competitors" },
    { sin: "No Digital Presence", looks: "No blog, LinkedIn, SEO, or content", cost: "Zero inbound leads; 100% word-of-mouth reliant" },
    { sin: "One-Size-Fits-All", looks: "Corporate templates for 10-person teams", cost: "Clients feel misunderstood; solutions don't fit" }
  ],
  recommendations: [
    {
      title: "Sharpen Your Positioning",
      icon: "🎯",
      items: [
        "Pick a lane — fractional HR for trades/service businesses? Startups? 5–50 employee companies?",
        "Lead with a pain point: 'Simplified compliance for growing teams' — not 'we offer HR services'",
        "Develop a signature framework (e.g., 'The SimplyHR Launchpad') that becomes your brand"
      ]
    },
    {
      title: "Fix Your Pricing Strategy",
      icon: "💰",
      items: [
        "Post transparent tiered pricing or clear starting ranges on your website",
        "Offer a low-friction entry point: fixed-price HR audit ($500–$1,500) before retainer commitment",
        "Bundle compliance + strategy to justify premium over DIY platforms"
      ]
    },
    {
      title: "Turn Your Website Into a Lead Machine",
      icon: "🌐",
      items: [
        "Hero section: Clear value prop + single CTA ('Book a Free HR Assessment')",
        "Blog/Resources: Minimum 2 articles/month targeting long-tail SEO keywords",
        "Gated content: Downloadable lead magnets (checklists, templates) to capture emails",
        "Social proof: Testimonials, case studies, and certifications prominently displayed"
      ]
    },
    {
      title: "Build a Referral Engine",
      icon: "🤝",
      items: [
        "Identify 3–5 strategic partners: accountants, payroll providers, employment lawyers",
        "Create a formal referral program with reciprocal benefits",
        "After every win, ask for a specific introduction — not 'let me know if you know someone'"
      ]
    },
    {
      title: "Own LinkedIn",
      icon: "📱",
      items: [
        "Personal brand > company page — founder insights outperform generic posts",
        "Engage daily in conversations with target prospects and referral partners",
        "Post 3–5x/week: tips, stories, industry commentary, client wins (anonymized)"
      ]
    },
    {
      title: "Differentiate on Service Quality",
      icon: "⭐",
      items: [
        "Never rotate client contacts — this is Bambee/TriNet's biggest weakness",
        "Be proactive — send compliance updates before clients ask",
        "Document your onboarding process so the experience matches the sales promise",
        "Set and honor a response time SLA — commit to X hours and deliver"
      ]
    }
  ],
  actionItems: [
    "Define your ICP (Ideal Client Profile): industry, size, geography, pain points",
    "Write a positioning statement that fits in one sentence",
    "Create one lead magnet (e.g., '2026 HR Compliance Checklist')",
    "Add a booking widget (Calendly) to your website",
    "Identify 3 referral partners and schedule intro meetings",
    "Publish 2 blog posts targeting long-tail SEO keywords",
    "Post on LinkedIn 3x/week from a personal founder account",
    "Add 3 testimonials or case studies to your website",
    "Publish transparent pricing (even 'starting at $X/month')",
    "Set up Google Business Profile for local SEO visibility"
  ]
};

// ── Positioning chart data (Canvas-based) ──
const CHART_COMPETITORS = [
  { name: "Insperity", x: 0.65, y: 0.85, color: "#10b981", r: 14 },
  { name: "TriNet", x: 0.35, y: 0.80, color: "#ef4444", r: 14 },
  { name: "Bambee", x: 0.45, y: 0.40, color: "#f59e0b", r: 12 },
  { name: "Helios HR", x: 0.82, y: 0.70, color: "#8b5cf6", r: 11 },
  { name: "Red Clover", x: 0.88, y: 0.55, color: "#ec4899", r: 11 },
  { name: "DianaHR", x: 0.50, y: 0.45, color: "#14b8a6", r: 10 },
  { name: "Gusto", x: 0.42, y: 0.50, color: "#f97316", r: 12 },
  { name: "Paychex", x: 0.38, y: 0.70, color: "#0ea5e9", r: 13 },
  { name: "SimplyHR\n(Current)", x: 0.75, y: 0.35, color: "#6366f1", r: 10 },
  { name: "SimplyHR\n(Target)", x: 0.85, y: 0.65, color: "#22d3ee", r: 12 },
];

function initCompetitorAnalysis() {
  document.getElementById("tab-competitors").addEventListener("click", () => switchTab("competitors"));
  renderCompetitorTab();
}

function renderCompetitorTab() {
  // Render all sections
  renderMarketOverview();
  renderCompetitorCards();
  renderPositioningChart();
  renderFailurePatterns();
  renderDeadlySins();
  renderWinnersVsLosers();
  renderRecommendations();
  renderActionItems();
  renderPricingComparison();
  renderIndustryBenchmarks();
}

// ── Market Overview ──
function renderMarketOverview() {
  const m = COMPETITOR_DATA.market;
  document.getElementById("ca-market-size-2025").textContent = m.size_2025;
  document.getElementById("ca-market-size-2026").textContent = m.size_2026;
  document.getElementById("ca-smb-cagr").textContent = m.smb_cagr;
}

// ── Competitor Cards ──
function renderCompetitorCards() {
  const grid = document.getElementById("ca-competitors-grid");
  grid.innerHTML = "";

  COMPETITOR_DATA.competitors.forEach(comp => {
    const tierClass = `ca-tier-${comp.tier}`;
    const tierLabel = { leader: "MARKET LEADER", cautionary: "CAUTIONARY TALE", boutique: "BOUTIQUE WINNER", platform: "TECH PLATFORM", emerging: "EMERGING" }[comp.tier];
    
    const stars = renderStars(comp.rating);
    
    const card = document.createElement("div");
    card.className = `ca-competitor-card ${tierClass}`;
    card.style.setProperty("--comp-color", comp.color);
    
    card.innerHTML = `
      <div class="ca-card-header">
        <div class="ca-card-title-wrap">
          <h3 class="ca-card-name">${comp.name}</h3>
          <span class="ca-card-tagline">${comp.tagline}</span>
        </div>
        <span class="ca-tier-badge ${tierClass}">${tierLabel}</span>
      </div>
      <div class="ca-card-meta">
        <div class="ca-meta-item"><span class="ca-meta-label">Model</span><span class="ca-meta-value">${comp.model}</span></div>
        <div class="ca-meta-item"><span class="ca-meta-label">Pricing</span><span class="ca-meta-value">${comp.pricing}</span></div>
        <div class="ca-meta-item"><span class="ca-meta-label">Target</span><span class="ca-meta-value">${comp.target}</span></div>
        <div class="ca-meta-item"><span class="ca-meta-label">Revenue</span><span class="ca-meta-value">${comp.revenue}</span></div>
        <div class="ca-meta-item"><span class="ca-meta-label">Rating</span><span class="ca-meta-value">${stars} ${comp.rating}/5</span></div>
      </div>
      <div class="ca-card-columns">
        <div class="ca-col-strengths">
          <div class="ca-col-title ca-col-title-good">✅ Strengths</div>
          <ul class="ca-list ca-list-good">${comp.strengths.map(s => `<li>${s}</li>`).join("")}</ul>
        </div>
        <div class="ca-col-weaknesses">
          <div class="ca-col-title ca-col-title-bad">⚠️ Weaknesses</div>
          <ul class="ca-list ca-list-bad">${comp.weaknesses.map(w => `<li>${w}</li>`).join("")}</ul>
        </div>
      </div>
      <div class="ca-lesson">
        <span class="ca-lesson-icon">💡</span>
        <span>${comp.keyLesson}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

// ── Positioning Chart (Canvas) ──
function renderPositioningChart() {
  const canvas = document.getElementById("ca-positioning-canvas");
  if (!canvas) return;
  
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  const w = rect.width || 700;
  const h = 460;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  
  const pad = { top: 40, right: 30, bottom: 50, left: 50 };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;
  
  // Background
  ctx.fillStyle = "rgba(255,255,255,0.02)";
  ctx.fillRect(0, 0, w, h);
  
  // Grid
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const xp = pad.left + (cw / 4) * i;
    const yp = pad.top + (ch / 4) * i;
    ctx.beginPath(); ctx.moveTo(xp, pad.top); ctx.lineTo(xp, pad.top + ch); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad.left, yp); ctx.lineTo(pad.left + cw, yp); ctx.stroke();
  }
  
  // Quadrant labels
  ctx.font = "600 11px Inter, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.textAlign = "center";
  ctx.fillText("FULL-SERVICE PLATFORMS", pad.left + cw * 0.25, pad.top + 20);
  ctx.fillText("PREMIUM PARTNERS", pad.left + cw * 0.75, pad.top + 20);
  ctx.fillText("BASIC PROVIDERS", pad.left + cw * 0.25, pad.top + ch - 10);
  ctx.fillText("BOUTIQUE SPECIALISTS", pad.left + cw * 0.75, pad.top + ch - 10);
  
  // Midline separators
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(pad.left + cw / 2, pad.top); ctx.lineTo(pad.left + cw / 2, pad.top + ch); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ch / 2); ctx.lineTo(pad.left + cw, pad.top + ch / 2); ctx.stroke();
  ctx.setLineDash([]);
  
  // Axis labels
  ctx.font = "600 12px Inter, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.textAlign = "center";
  ctx.fillText("Low Personalization ← → High Personalization", pad.left + cw / 2, h - 8);
  ctx.save();
  ctx.translate(14, pad.top + ch / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Low Comprehensiveness ← → High Comprehensiveness", 0, 0);
  ctx.restore();

  // Arrow from current to target SimplyHR
  const currComp = CHART_COMPETITORS.find(c => c.name.includes("Current"));
  const targComp = CHART_COMPETITORS.find(c => c.name.includes("Target"));
  if (currComp && targComp) {
    const cx1 = pad.left + currComp.x * cw;
    const cy1 = pad.top + (1 - currComp.y) * ch;
    const cx2 = pad.left + targComp.x * cw;
    const cy2 = pad.top + (1 - targComp.y) * ch;
    ctx.strokeStyle = "rgba(99, 102, 241, 0.5)";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(cx1, cy1); ctx.lineTo(cx2, cy2); ctx.stroke();
    ctx.setLineDash([]);
    // Arrowhead
    const angle = Math.atan2(cy2 - cy1, cx2 - cx1);
    ctx.fillStyle = "rgba(99, 102, 241, 0.7)";
    ctx.beginPath();
    ctx.moveTo(cx2, cy2);
    ctx.lineTo(cx2 - 10 * Math.cos(angle - 0.4), cy2 - 10 * Math.sin(angle - 0.4));
    ctx.lineTo(cx2 - 10 * Math.cos(angle + 0.4), cy2 - 10 * Math.sin(angle + 0.4));
    ctx.closePath();
    ctx.fill();
  }
  
  // Points
  CHART_COMPETITORS.forEach(comp => {
    const cx = pad.left + comp.x * cw;
    const cy = pad.top + (1 - comp.y) * ch;
    
    // Glow
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, comp.r * 2.5);
    grd.addColorStop(0, comp.color + "40");
    grd.addColorStop(1, comp.color + "00");
    ctx.fillStyle = grd;
    ctx.beginPath(); ctx.arc(cx, cy, comp.r * 2.5, 0, Math.PI * 2); ctx.fill();
    
    // Circle
    ctx.fillStyle = comp.color;
    ctx.beginPath(); ctx.arc(cx, cy, comp.r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = comp.color + "80";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, comp.r + 3, 0, Math.PI * 2); ctx.stroke();
    
    // Label
    ctx.font = "600 10px Inter, sans-serif";
    ctx.fillStyle = "#f1f5f9";
    ctx.textAlign = "center";
    const lines = comp.name.split("\n");
    lines.forEach((line, i) => {
      ctx.fillText(line, cx, cy + comp.r + 14 + i * 12);
    });
  });
}

// ── Failure Patterns ──
function renderFailurePatterns() {
  const container = document.getElementById("ca-failure-patterns");
  container.innerHTML = "";
  
  const categories = [
    { key: "strategic", label: "Strategic Failures", icon: "🎯", color: "#ef4444" },
    { key: "operational", label: "Operational Failures", icon: "⚙️", color: "#f59e0b" },
    { key: "financial", label: "Financial Failures", icon: "💸", color: "#ec4899" },
    { key: "professional", label: "Professional Failures", icon: "🧠", color: "#8b5cf6" }
  ];
  
  categories.forEach(cat => {
    const items = COMPETITOR_DATA.failurePatterns[cat.key];
    const section = document.createElement("div");
    section.className = "ca-failure-category";
    section.style.setProperty("--cat-color", cat.color);
    section.innerHTML = `
      <div class="ca-fail-header">
        <span class="ca-fail-icon">${cat.icon}</span>
        <h4>${cat.label}</h4>
      </div>
      <ul class="ca-fail-list">
        ${items.map(item => `<li>${item}</li>`).join("")}
      </ul>
    `;
    container.appendChild(section);
  });
}

// ── Deadly Sins ──
function renderDeadlySins() {
  const tbody = document.getElementById("ca-sins-tbody");
  tbody.innerHTML = "";
  COMPETITOR_DATA.deadlySins.forEach((sin, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="ca-sin-num">${i + 1}</td>
      <td class="ca-sin-name">${sin.sin}</td>
      <td class="ca-sin-looks">${sin.looks}</td>
      <td class="ca-sin-cost">${sin.cost}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ── Winners vs Losers ──
function renderWinnersVsLosers() {
  const winData = [
    ["Positioning", "Narrow niche, clear ideal client profile"],
    ["Pricing", "Transparent, tiered, value-based; no hidden fees"],
    ["Service", "Dedicated human contact; proactive outreach"],
    ["Website", "Lead-gen machine: CTAs, blog, booking calendar"],
    ["Trust", "Case studies with measurable outcomes"],
    ["Content", "Thought leadership + LinkedIn + downloads"],
    ["Partnerships", "Strategic referral networks"],
    ["Technology", "Clean, modern platform with AI automation"],
    ["Compliance", "Proactive monitoring + client alerts"],
    ["Onboarding", "Documented process matching sales promise"]
  ];
  const loseData = [
    ["Positioning", "Vague 'we do HR' messaging; no differentiation"],
    ["Pricing", "Opaque, confusing; surprise fees; race to bottom"],
    ["Service", "Rotating contacts, automated support, slow response"],
    ["Website", "Digital brochure with no conversion strategy"],
    ["Trust", "No case studies, reviews, or certifications"],
    ["Content", "No blog, no resources, no LinkedIn activity"],
    ["Partnerships", "Zero referral system; 100% cold outreach"],
    ["Technology", "Clunky, dated platforms; no self-service"],
    ["Compliance", "Reactive; waits for clients to ask"],
    ["Onboarding", "Chaotic, differs from what was promised"]
  ];

  const winBody = document.getElementById("ca-winners-tbody");
  winBody.innerHTML = winData.map(([cat, desc]) => `<tr><td class="ca-wl-cat">${cat}</td><td>${desc}</td></tr>`).join("");
  
  const loseBody = document.getElementById("ca-losers-tbody");
  loseBody.innerHTML = loseData.map(([cat, desc]) => `<tr><td class="ca-wl-cat">${cat}</td><td>${desc}</td></tr>`).join("");
}

// ── Recommendations ──
function renderRecommendations() {
  const grid = document.getElementById("ca-recommendations-grid");
  grid.innerHTML = "";
  
  COMPETITOR_DATA.recommendations.forEach((rec, i) => {
    const card = document.createElement("div");
    card.className = "ca-rec-card";
    card.innerHTML = `
      <div class="ca-rec-header">
        <span class="ca-rec-num">${i + 1}</span>
        <span class="ca-rec-icon">${rec.icon}</span>
        <h4>${rec.title}</h4>
      </div>
      <ul class="ca-rec-list">
        ${rec.items.map(item => `<li>${item}</li>`).join("")}
      </ul>
    `;
    grid.appendChild(card);
  });
}

// ── Action Items ──
function renderActionItems() {
  const list = document.getElementById("ca-action-items");
  list.innerHTML = "";
  COMPETITOR_DATA.actionItems.forEach((item, i) => {
    const li = document.createElement("li");
    li.className = "ca-action-item";
    li.innerHTML = `<span class="ca-action-num">${i + 1}</span><span>${item}</span>`;
    list.appendChild(li);
  });
}

// ── Pricing Comparison ──
function renderPricingComparison() {
  const tbody = document.getElementById("ca-pricing-tbody");
  tbody.innerHTML = "";
  
  const pricingData = [
    { name: "Insperity", pricing: "$150–$210/emp/mo", model: "PEO co-employment", transparency: "❌ Custom quotes", entry: "5+ employees" },
    { name: "Bambee", pricing: "$99–$1,200/mo", model: "Flat-fee subscription", transparency: "✅ Published tiers", entry: "$99/mo + setup fee" },
    { name: "TriNet", pricing: "Premium (custom)", model: "PEO co-employment", transparency: "❌ Opaque", entry: "5+ employees" },
    { name: "Gusto", pricing: "$40+/mo base + $/person", model: "SaaS platform", transparency: "✅ Clear tiers", entry: "$40/mo" },
    { name: "Paychex", pricing: "Custom quotes", model: "Platform + PEO", transparency: "❌ Custom quotes", entry: "Contact sales" },
    { name: "Helios HR", pricing: "Retainer-based", model: "Fractional HR", transparency: "⚠️ Custom", entry: "Discovery call" },
    { name: "Red Clover", pricing: "Project/retainer", model: "Fractional HR", transparency: "⚠️ Custom", entry: "Discovery call" },
    { name: "Fractional CHRO", pricing: "$2.5K–$12K+/mo", model: "Executive advisory", transparency: "⚠️ Range given", entry: "$2,500/mo" },
  ];
  
  pricingData.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="ca-pricing-name">${row.name}</td>
      <td>${row.pricing}</td>
      <td>${row.model}</td>
      <td>${row.transparency}</td>
      <td>${row.entry}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ── Industry Benchmarks ──
function renderIndustryBenchmarks() {
  const bm = COMPETITOR_DATA.market.benchmarks;
  document.getElementById("ca-bm-cac").textContent = bm.cac;
  document.getElementById("ca-bm-ltv").textContent = bm.ltv_cac_ratio;
  document.getElementById("ca-bm-retention").textContent = bm.retention_rate;
  document.getElementById("ca-bm-utilization").textContent = bm.utilization_rate;
  document.getElementById("ca-bm-margin").textContent = bm.gross_margin;
}

// ── Wire into existing tab system ──
const _origSwitchTabCA = window.switchTab;
window.switchTab = function(tab) {
  _origSwitchTabCA(tab);
  
  document.getElementById("tab-competitors").classList.toggle("active", tab === "competitors");
  document.getElementById("content-competitors").classList.toggle("active", tab === "competitors");
  
  // Hide sidebar for this tab — it doesn't use state data
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    sidebar.style.display = tab === "competitors" ? "none" : "";
  }
  const layout = document.querySelector(".layout");
  if (layout) {
    layout.style.gridTemplateColumns = tab === "competitors" ? "1fr" : "";
  }
  
  if (tab === "competitors") {
    // Re-render chart on tab switch (in case of resize)
    setTimeout(renderPositioningChart, 50);
  }
};

// Resize handler for chart
window.addEventListener("resize", () => {
  if (document.getElementById("content-competitors").classList.contains("active")) {
    renderPositioningChart();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initCompetitorAnalysis, 200);
});
