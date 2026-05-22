// ── AUSTIN'S SALES PLAYBOOK EXTENSION ──
// Data and rendering logic for the PDF playbook content

window.switchPbView = function(viewId) {
  document.getElementById("pb-btn-main").classList.toggle("active", viewId === 'main');
  document.getElementById("pb-btn-austin").classList.toggle("active", viewId === 'austin');
  document.getElementById("pb-view-main").style.display = viewId === 'main' ? "" : "none";
  document.getElementById("pb-view-austin").style.display = viewId === 'austin' ? "" : "none";
  
  if (viewId === 'austin' && !document.getElementById("ap-sidebar").innerHTML) {
    renderAustinPlaybook();
  }
};

const AP_DATA = [
  {
    id: "cold_calls",
    title: "Cold Call Scripts",
    icon: "📞",
    sections: [
      {
        title: "Script 1: Pest Control Owner",
        content: `
<div class="ap-card">
  <div class="ap-tag">Opener — Pattern Interrupt</div>
  <p>"Hey <strong>[First Name]</strong> — quick question before I let you know who this is. Are you the one handling HR for your technicians, or does that fall on someone else?"</p>
  <p class="ap-note">[PAUSE — let them answer] [If asked who's calling:] "Sorry — Austin Truman with SimplyHR Consulting. I work with pest control companies on the people side. I've got maybe 60 seconds — can I steal that?"</p>
</div>
<div class="ap-card">
  <div class="ap-tag">15-Second Value Pitch</div>
  <p>"Most pest control owners deal with the same two things: they can't find and keep good technicians, and when something goes sideways with an employee, they're figuring it out alone. SimplyHR gives you a full HR team — recruiting, compliance, strategy — without hiring a VP. Most owners save well over $150,000 a year this way."</p>
  <p class="ap-note">[PAUSE] "Does that hit close to home?"</p>
</div>
<div class="ap-card ap-card-gray">
  <h4>Discovery Questions (Pick 2-3)</h4>
  <ul class="ap-list">
    <li><strong>Turnover:</strong> "When you're losing a tech — quit or let go — what does that process look like? Who's handling it?"</li>
    <li><strong>Compliance:</strong> "Have you had situations where you weren't 100% sure you were doing things by the book — terminations, wage stuff?"</li>
    <li><strong>Time Cost:</strong> "How many hours a week do you personally spend on HR-type issues — recruiting, conflicts, paperwork?"</li>
    <li><strong>Growth:</strong> "Where are you on headcount and where do you want to be in 12 months? Problems at 30 techs differ from 15."</li>
  </ul>
</div>`
      },
      {
        title: "Script 2: General Small Business",
        content: `
<div class="ap-card">
  <div class="ap-tag">Opener — Pattern Interrupt</div>
  <p>"Hey <strong>[First Name]</strong> — quick question before I tell you why I'm calling. Is HR something you're personally handling right now, or do you have someone in that seat?"</p>
  <p class="ap-note">[PAUSE] [If asked:] "Austin Truman, SimplyHR Consulting. I work with small and mid-size businesses on people strategy. Won't take more than a minute — is now okay?"</p>
</div>
<div class="ap-card">
  <div class="ap-tag">15-Second Value Pitch</div>
  <p>"The owners I work with hit me up for one of three reasons: HR is eating their time, they've had a close call — a complaint, a messy termination — and realized they don't have a real process, or they're growing fast and know the HR stuff is about to become a bigger problem. We give small businesses VP-level HR — recruiting, compliance, the whole employee lifecycle — without the cost of a full-time hire. Most clients save $150,000 or more."</p>
  <p class="ap-note">[PAUSE] "Any of that land for you?"</p>
</div>
<div class="ap-card ap-card-yellow">
  <div class="ap-tag">Voicemail — Under 30 seconds</div>
  <p>"<strong>[First Name]</strong> — Austin Truman, SimplyHR Consulting.</p>
  <p>I work with small businesses running without an HR department — spending their own time on people issues or flying blind on compliance. We're fractional HR — full team, fraction of the cost. Worth a 20-minute call.</p>
  <p>Reach me at <strong>[PHONE]</strong>. I'll also follow up. Austin Truman, <strong>[PHONE]</strong>. Thanks."</p>
</div>`
      },
      {
        title: "Handling Objections & Gatekeepers",
        content: `
<div class="ap-grid-2">
  <div class="ap-card">
    <h4>"We handle HR ourselves."</h4>
    <p>"Usually that means making decisions on the fly, without a framework — works until it doesn't. A lawsuit or EEOC complaint gets expensive fast. We build the infrastructure so those situations don't happen. Worth 20 minutes?"</p>
  </div>
  <div class="ap-card">
    <h4>"We're too small for that."</h4>
    <p>"Small companies need this the most. No legal team, no HR dept, and one bad hire or mishandled termination costs more than a year with us. Our Foundation tier: $500/month for under 30 people."</p>
  </div>
  <div class="ap-card">
    <h4>"We can't afford it."</h4>
    <p>"Real number: $500/month ($6,000/year). A junior HR coordinator alone runs $50K–$65K before benefits. With us you get a full team. Does the $500 number change the conversation?"</p>
  </div>
  <div class="ap-card">
    <h4>Gatekeeper Bypass</h4>
    <p><strong>Opening:</strong> "Hey, this is Austin Truman calling for [Owner's First Name]. Is he/she in?"</p>
    <p><strong>If asked what it's regarding:</strong> "I work with business owners on HR strategy. [Owner] and I haven't spoken, but I'm reaching out to a handful of [industry] owners this week. It'll be a quick call — 60 seconds and he/she can decide if it's relevant."</p>
  </div>
</div>`
      }
    ]
  },
  {
    id: "emails",
    title: "Email Sequences",
    icon: "✉️",
    sections: [
      {
        title: "Sequence A: Pest Control Cold",
        content: `
<div class="ap-card">
  <div class="ap-tag">Day 1: HR headaches in pest control</div>
  <p><strong>Hi [First Name],</strong></p>
  <p>Running a pest control company means your operation lives or dies on your field techs. When one quits mid-route in July, it doesn't just hurt morale — it costs you customers. Most pest control operators deal with high turnover, no real onboarding, and HR compliance held together with a spreadsheet and good intentions.</p>
  <p>At SimplyHR, we put real HR infrastructure in place — handbooks, compliance, recruiting, performance management — at a fraction of what it costs to hire someone full-time. Most owners save $150K–$350K vs. a full-time hire.</p>
  <p>Would it make sense to spend 30 minutes seeing if we'd be a fit? Grab time here: <strong>[calendar link]</strong></p>
  <p>Austin Truman | SimplyHR | simplyhrconsulting.com | <strong>[Phone]</strong></p>
</div>
<div class="ap-card">
  <div class="ap-tag">Day 4: The turnover number pest control ignores</div>
  <p><strong>Hi [First Name],</strong></p>
  <p>The average cost to replace a field tech — recruiting time, lost routes, training, reduced productivity — runs $4,000–$8,000 per person. On 20 techs with 40% annual turnover: up to $64,000 walking out every year.</p>
  <p>The fix usually isn't pay. It's structure: clear expectations, real onboarding, consistent manager behavior, and a performance system that gives people a reason to stay. That's exactly what we build at SimplyHR.</p>
  <p>Calendar link if you haven't had a chance: <strong>[calendar link]</strong>. Thirty minutes, no pressure.</p>
</div>
<div class="ap-card">
  <div class="ap-tag">Day 11: Closing the loop</div>
  <p><strong>Hi [First Name],</strong></p>
  <p>I won't keep cluttering your inbox. I know running a pest control operation is a full-time job.</p>
  <p>If HR compliance, turnover, or building your people systems ever becomes a priority, I'd genuinely enjoy the conversation. Book a free 30-min call: <strong>[calendar link]</strong></p>
  <p>Wishing you a strong season. | Austin Truman</p>
</div>`
      },
      {
        title: "Sequence B: General SMB Cold",
        content: `
<div class="ap-card">
  <div class="ap-tag">Day 1: HR without the HR department</div>
  <p><strong>Hi [First Name],</strong></p>
  <p>Most small business owners handle HR the same way: do it yourself, or hand it to someone who has five other jobs, and hope nothing blows up. That works until it doesn't — a bad termination, a compliance gap, a key hire lost because your offer process took too long.</p>
  <p>At SimplyHR, we act as a full HR team for companies between 1 and 500 employees. Recruiting, onboarding, compliance, handbooks, performance management — everything a VP of HR handles, without the $150K–$350K salary.</p>
  <p>If that's worth solving, I'd love 30 minutes. Grab time: <strong>[calendar link]</strong></p>
</div>
<div class="ap-card">
  <div class="ap-tag">Day 4: What it actually costs to DIY HR</div>
  <p><strong>Hi [First Name],</strong> — Following up on my note from earlier this week.</p>
  <p>The cost of getting HR wrong is almost always higher than getting it right the first time. One misclassified employee, one missing I-9, one undocumented termination — any of those can run $10,000–$50,000 in fines or legal fees. That's before you count bad hiring and turnover costs.</p>
  <p>Our Foundation package: $500/month for companies under 30 employees. Less than the cost of one HR mistake.</p>
  <p>Book here: <strong>[calendar link]</strong></p>
</div>`
      },
      {
        title: "Sequence E: Proposal Follow-Up",
        content: `
<div class="ap-card">
  <div class="ap-tag">3 Days Post-Proposal</div>
  <p><strong>Subject: Following up on the proposal</strong></p>
  <p>Hi [First Name], — You should have received the proposal for [Company Name] a few days ago.</p>
  <p>Happy to walk through any of it on a quick call — sometimes faster than reading a document. If priorities shifted or scope needs adjusting, that's not a problem at all. If others need to review it, I'm happy to provide whatever they'd need.</p>
  <p>Reply here or grab 20 min: [calendar link]</p>
</div>
<div class="ap-card">
  <div class="ap-tag">7 Days Post-Proposal</div>
  <p><strong>Subject: One last check-in on the proposal</strong></p>
  <p>Hi [First Name], — I'll keep this short. Haven't heard back, which usually means timing, budget, or a busy week. All fine — I'd just rather know than leave things open-ended.</p>
  <p>If still interested, no problem. If something changed, I'd appreciate a heads-up so I can close the loop.</p>
  <p>Either way the door is open: austin@simplyhrconsulting.com or [Phone]</p>
</div>`
      }
    ]
  },
  {
    id: "linkedin",
    title: "LinkedIn & Social",
    icon: "💼",
    sections: [
      {
        title: "Connection Requests & InMails",
        content: `
<div class="ap-card ap-card-gray">
  <h4>Connection Requests (Under 300 chars)</h4>
  <ul class="ap-list">
    <li><strong>Pest Control:</strong> "Hi [Name] — noticed you're running [Company] in the pest control space. I work exclusively with home services and field service businesses on the HR side. Would love to connect and learn more about your operation."</li>
    <li><strong>Home Services:</strong> "Hi [Name] — love seeing other home services entrepreneurs on here. I help companies like yours handle the HR stuff that slows growth down — compliance, hiring, people strategy. Thought it'd be worth connecting."</li>
    <li><strong>General SMB:</strong> "Hi [Name] — I help small business owners build out their HR function without the cost of a full-time HR director. Your profile caught my attention and I'd love to connect."</li>
  </ul>
</div>
<div class="ap-card">
  <h4>InMail A — Pest Control Owner (Pain-Led)</h4>
  <p><strong>Subject: HR headaches in the pest control industry</strong></p>
  <p>Hi [Name], Running a pest control company is tough enough without HR becoming a second full-time job. Owners in home services deal with the same handful of problems: technician turnover eating into profits, compliance exposure from improper classifications, and no real performance management system.</p>
  <p>I'm Austin Truman, co-founder of SimplyHR. We act as a fractional HR department — recruiting, onboarding, compliance, and strategy — for a fraction of what a full-time HR director costs. A VP-level HR hire: $150K–$250K/year. Our Partner tier: $1,500/month with a full team, not just one person.</p>
  <p>If any of this sounds familiar, I'd love a 20-minute call. No pitch deck, no pressure — just a conversation. Would that be worth your time?</p>
</div>`
      },
      {
        title: "Organic Post Templates",
        content: `
<div class="ap-grid-2">
  <div class="ap-card">
    <div class="ap-tag">Post 1 — Founder Story</div>
    <p><strong>Hook:</strong> "A pest control owner once told me his biggest business problem wasn't leads, operations, or cash flow. It was his people."</p>
    <p><strong>Body:</strong> Opens mid-scene with a real owner's crisis. 34 techs, no HR system, no onboarding, 3 no-call-no-shows, two workers' comp incidents, one lawsuit threat. '"I built a $3M business and have no idea what I'm doing with people."' Explains the inflection point between employee 1 and 34. Introduces fractional HR as the third option.</p>
    <p><strong>CTA:</strong> 'DM me "HR" and I'll reach out.'</p>
  </div>
  <div class="ap-card">
    <div class="ap-tag">Post 2 — Insight</div>
    <p><strong>Hook:</strong> "HR is not a department you need when you're big enough. It's a function you need the moment you have your first employee."</p>
    <p><strong>Body:</strong> Lists the 4 common problems: toxic employee, compliance gaps, unexplained turnover, word-of-mouth recruiting. Reframes HR as competitive advantage: onboarding, documented policies, performance system, comp structure.</p>
    <p><strong>CTA:</strong> 'What's the HR challenge costing your business the most? Drop it in the comments.'</p>
  </div>
  <div class="ap-card">
    <div class="ap-tag">Post 3 — ROI/Value</div>
    <p><strong>Hook:</strong> "Let's talk about the math that most business owners never run."</p>
    <p><strong>Body:</strong> Full breakdown: full-time HR director = $90K–$130K base + $15K–$25K benefits + taxes + 60-90 day ramp = $150K–$200K min. SimplyHR Partner tier = $1,500/month ($18,000/year). Lists what's included: recruiting, compliance, strategy, full team.</p>
    <p><strong>CTA:</strong> 'Curious what tier makes sense for your business? Send me a DM.'</p>
  </div>
  <div class="ap-card">
    <div class="ap-tag">Post 4 — Client Win</div>
    <p><strong>Hook:</strong> "A home services company came to us 18 months ago with a 68% first-year turnover rate."</p>
    <p><strong>Body:</strong> 41 employees. Owner doing interviews on job sites. HR was a sticky note. Findings: No structured onboarding. No clear job descriptions. Below-market comp. Fix: 30-60-90 day onboarding, comp benchmarking. Result: 68% → 24% turnover. Owner: 'I feel like I actually have a team now instead of a revolving door.'</p>
    <p><strong>CTA:</strong> 'Turnover is not an industry problem. It's a people management problem. DM or visit simplyhrconsulting.com'</p>
  </div>
</div>`
      }
    ]
  },
  {
    id: "ads",
    title: "YouTube & Paid Ads",
    icon: "🎬",
    sections: [
      {
        title: "YouTube Video Scripts",
        content: `
<div class="ap-card">
  <div class="ap-tag">Video 1 — Pest Control Specific (5-7 min)</div>
  <p><strong>Title:</strong> Why Your Pest Control Company Has an HR Problem (And Doesn't Know It)</p>
  <ul class="ap-list">
    <li><strong>Hook:</strong> 'How many of your people problems could have been prevented — not by hiring better, but with the right HR infrastructure?'</li>
    <li><strong>Pain 1 — Turnover:</strong> Replacing 1 tech = $3K–$7.5K. [B-ROLL: tech suiting up, heading to truck]</li>
    <li><strong>Pain 2 — Compliance:</strong> FLSA, OSHA, EEOC exposure $20K–$50K+. [TEXT: '1 HR complaint can cost $20K–$50K+']</li>
    <li><strong>Pain 3 — Manager Malpractice:</strong> Promoted techs without HR guardrails. [B-ROLL: team huddle]</li>
    <li><strong>Pain 4 — Recruiting on Fumes:</strong> Still hiring like 2012 vs. Amazon warehouse. [B-ROLL: laptop + phone]</li>
    <li><strong>Solution:</strong> Fractional HR team. $150K–$350K savings vs. full-time hire.</li>
    <li><strong>CTA:</strong> 'Free HR Audit → link in description'</li>
  </ul>
</div>
<div class="ap-grid-2">
  <div class="ap-card ap-card-yellow">
    <div class="ap-tag">15s Pre-Roll A (Pest Control)</div>
    <p>"Pest control operators: you can't afford to lose another technician. Turnover, compliance risk, hiring chaos — it's costing you more than you know. SimplyHR gives you a full HR team starting at $500/month. Link below. Free audit. People Made Simple."</p>
  </div>
  <div class="ap-card ap-card-yellow">
    <div class="ap-tag">15s Pre-Roll B (SMB)</div>
    <p>"If you're running a business and handling HR yourself — this is what it's costing you. Turnover, legal risk, bad hires — it adds up fast. SimplyHR delivers VP-level HR strategy for growing businesses, starting at $500/month. Free audit in the link. No pitch. Just answers."</p>
  </div>
</div>`
      },
      {
        title: "Google & Meta Ads",
        content: `
<div class="ap-card ap-card-gray">
  <h4>Google Search Ads (Headlines & Descriptions)</h4>
  <p><strong>Ad Set A — Pest Control HR</strong></p>
  <ul class="ap-list">
    <li>H1: HR Built for Pest Control | H2: Stop Losing Techs to Turnover | H3: VP-Level HR. No Full-Time Cost.</li>
    <li>D1: Full HR team for pest control ops. Compliance, recruiting & retention. Starts at $500/mo.</li>
    <li>D2: Cut turnover. Avoid legal risk. Build a team that scales. Free HR audit — no obligation.</li>
  </ul>
</div>
<div class="ap-card">
  <h4>Meta Ad A — Pain-Led / Pest Control</h4>
  <p><strong>Feed Preview:</strong> "You've lost good techs. You've dealt with the drama. You've handled it yourself. There's a better way."</p>
  <p><strong>Headline:</strong> Your Pest Control Company Needs HR. We Make It Simple.</p>
  <p><strong>Full Text:</strong> You've lost good techs, dealt with the drama, had those 7am conversations before a full route. You've handled HR yourself — because who else was going to do it? Here's what that's cost you: turnover you couldn't prevent, compliance risks you didn't know existed, hours that should have gone to growth. SimplyHR gives pest control operators a full HR team — recruiting, compliance, handbooks, performance mgmt — without the $150K salary. Plans start at $500/month. Click to book a free 30-min HR audit.</p>
</div>`
      }
    ]
  },
  {
    id: "implementation",
    title: "Implementation Guide",
    icon: "⚙️",
    sections: [
      {
        title: "Weekly Outreach Rhythm & Metrics",
        content: `
<table class="ap-table">
  <thead>
    <tr><th>Day</th><th>Activity</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Monday</strong></td><td>20 LinkedIn connection requests (5 pest, 10 home services, 5 SMB)</td></tr>
    <tr><td><strong>Tuesday</strong></td><td>Cold email batch — 10 new prospects (Sequence A or B based on industry)</td></tr>
    <tr><td><strong>Wednesday</strong></td><td>Cold calls — 15 dials targeting pest control operators</td></tr>
    <tr><td><strong>Thursday</strong></td><td>LinkedIn InMail — 5 follow-ups to connected prospects who haven't replied</td></tr>
    <tr><td><strong>Friday</strong></td><td>Follow-up calls to 'send me info' prospects from prior week's email batch</td></tr>
    <tr><td><strong>Ongoing</strong></td><td>Post 1 LinkedIn organic post per week (rotate through the 6 templates)</td></tr>
  </tbody>
</table>
<div class="ap-grid-2" style="margin-top:16px;">
  <div class="ap-card ap-card-gray">
    <h4>Key Metrics Target</h4>
    <ul class="ap-list">
      <li><strong>Cold call connect rate:</strong> 10–20% of dials</li>
      <li><strong>Cold email open rate:</strong> 25–40%</li>
      <li><strong>Email reply rate:</strong> 5–10%</li>
      <li><strong>LinkedIn connect accept:</strong> 20–35%</li>
      <li><strong>Discovery booking rate:</strong> 5–15% of outreach</li>
      <li><strong>Proposal close rate:</strong> 30–50% of proposals sent</li>
    </ul>
  </div>
  <div class="ap-card">
    <h4>SuiteDash Integration</h4>
    <p>Store all client contacts and pipeline stages in SuiteDash. When a prospect books a discovery call, create their client profile. After a signed agreement, move to 'Active Retainer' stage and provision their client portal. Use SuiteDash forms to collect discovery questionnaire responses. Portal: portal.simplyhrconsulting.com</p>
  </div>
</div>`
      }
    ]
  }
];

let apCurrentTab = "cold_calls";

function renderAustinPlaybook() {
  const sidebar = document.getElementById("ap-sidebar");
  const content = document.getElementById("ap-content");
  
  // Render Sidebar
  sidebar.innerHTML = AP_DATA.map(item => `
    <button class="ap-nav-btn ${item.id === apCurrentTab ? 'active' : ''}" onclick="apSwitchTab('${item.id}')">
      <span class="ap-nav-icon">${item.icon}</span>
      <span>${item.title}</span>
    </button>
  `).join("");
  
  // Render Content
  const tabData = AP_DATA.find(d => d.id === apCurrentTab);
  if (!tabData) return;
  
  content.innerHTML = `
    <div class="ap-header">
      <h2>${tabData.icon} ${tabData.title}</h2>
    </div>
    <div class="ap-sections">
      ${tabData.sections.map(sec => `
        <div class="ap-section">
          <h3>${sec.title}</h3>
          ${sec.content}
        </div>
      `).join("")}
    </div>
  `;
}

window.apSwitchTab = function(id) {
  apCurrentTab = id;
  renderAustinPlaybook();
};
