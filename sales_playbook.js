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
      ],
      recommendations: [
        { type: "template", title: "1-Page Proposal Template", content: `<pre class="pb-rec-code">SIMPLYHR CONSULTING — PROPOSAL FOR [COMPANY NAME]\nPrepared for: [First Name] [Last Name], [Title]\nDate: [Date]\n\n[First Name],\n\nBased on what I've observed about [Company Name] — [X employees,\ncurrently hiring for Y roles, operating in Z state(s)] — here's\nexactly what a partnership with SimplyHR would look like for you.\n\nYOUR CURRENT SITUATION (What I See)\n• You're hiring [X roles] — recruiting is eating someone's time\n• Operating in [State] means [specific compliance requirement]\n• At [X] employees, you're subject to [FMLA/ACA/OSHA]\n\nWHAT WE'D BUILD FOR YOU (First 90 Days)\nMonth 1: Compliance Audit + Employee Handbook\nMonth 2: Recruiting Process + Onboarding System\nMonth 3: Performance Framework + Manager Training\n\nYOUR INVESTMENT\n[Foundation/Partner/Strategic] Tier: $[X]/month\nSetup fee: $[295–1,995] one-time\nvs. Full-time HR hire: $70K–$130K/year + benefits\n\nNEXT STEP\nBook here: [Calendly link]\n\nAustin Truman | SimplyHR Consulting\nMBA / MHR / SHRM-SCP | simplyhrconsulting.com</pre>` },
        { type: "table", title: "Delivery Methods", content: `<table class="pb-rec-table"><thead><tr><th>Method</th><th>When to Use</th><th>Subject Line / Script</th></tr></thead><tbody><tr><td><strong>Email</strong> (primary)</td><td>Cold prospect, no prior contact</td><td>"Built this for [Company Name] — 2 min read"</td></tr><tr><td><strong>LinkedIn DM</strong></td><td>After they accept connection</td><td>"Put together a quick breakdown of what HR support looks like for [Company]. No obligation."</td></tr><tr><td><strong>Physical Mail</strong></td><td>High-value targets ($3K+ tier)</td><td>Branded letterhead, hand-signed, FedEx envelope (100% open rate)</td></tr></tbody></table>` },
        { type: "sequence", title: "Follow-Up Sequence", content: `<table class="pb-rec-table"><thead><tr><th>Day</th><th>Action</th><th>Script</th></tr></thead><tbody><tr><td>Day 0</td><td>Send proposal</td><td>See template above</td></tr><tr><td>Day 3</td><td>Follow-up email</td><td>"Hey [Name] — circling back on the proposal I sent for [Company]. Anything jump out?"</td></tr><tr><td>Day 7</td><td>LinkedIn engagement</td><td>Like/comment on their recent post + brief DM</td></tr><tr><td>Day 14</td><td>Final email</td><td>"Last note — if [pain point] ever moves up the list, I'm easy to reach."</td></tr></tbody></table>` },
        { type: "tip", title: "Why This Beats Traditional Outreach", content: `<div class="pb-rec-compare"><div class="pb-rec-vs"><div class="pb-rec-vs-bad"><strong>Traditional Cold Outreach</strong><ul><li>"Let me tell you what we do"</li><li>Generic capabilities deck</li><li>Asks for prospect's time first</li><li>5–8% response rate</li></ul></div><div class="pb-rec-vs-good"><strong>Proposals Off the Rip</strong><ul><li>"Here's what we'd do for <em>you</em>"</li><li>Company-specific deliverables + pricing</li><li>Gives value first, earns time second</li><li>15–25% response rate</li></ul></div></div></div>` }
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
      ],
      recommendations: [
        { type: "table", title: "Power Team — Priority 1-to-1 Partners", content: `<table class="pb-rec-table"><thead><tr><th>Partner Type</th><th>Why They Refer You</th><th>What You Refer Back</th></tr></thead><tbody><tr><td><strong>CPA / Accountant</strong></td><td>They see payroll chaos, misclassified workers, tax penalties</td><td>Clients who need tax strategy</td></tr><tr><td><strong>Employment Attorney</strong></td><td>They see clients who need proactive HR <em>before</em> lawsuits</td><td>Clients who need legal review</td></tr><tr><td><strong>Insurance Broker</strong></td><td>Workers' comp issues, benefits questions</td><td>Clients who need benefits quoting</td></tr><tr><td><strong>Business Coach</strong></td><td>They hear "I can't find good people" every week</td><td>Clients who need growth strategy</td></tr><tr><td><strong>Payroll Provider</strong></td><td>Compliance gaps, missing I-9s, wrong classifications</td><td>Clients who need payroll solutions</td></tr><tr><td><strong>Commercial Banker</strong></td><td>Growing companies that need infrastructure</td><td>Clients who need capital/lending</td></tr></tbody></table>` },
        { type: "template", title: "Printable Cheat Sheet (Give to Members)", content: `<pre class="pb-rec-code">WHO TO REFER TO AUSTIN @ SIMPLYHR\n\n✅ PERFECT FIT:\n• Business owner with 10–100 employees\n• No HR person or department\n• Pest control, HVAC, plumbing, landscaping,\n  electrical, general small business\n• Hiring fast or dealing with turnover\n• Recently had a "people problem"\n\n🎯 TRIGGER PHRASES:\n• "I can't find good people"\n• "Someone just quit / I had to fire someone"\n• "I'm handling all the HR stuff myself"\n• "I think we might not be compliant"\n• "We're growing but it's messy"\n\n📞 WHAT TO SAY:\n"I know an HR consultant who works with\ncompanies exactly your size. No full-time\nhire needed — just a quick call. Want me\nto connect you?"\n\n→ Text Austin: [Phone]\n→ Book for them: [Calendly link]</pre>` },
        { type: "tip", title: "1-to-1 Rules", content: `<ul class="pb-rec-list"><li><strong>Schedule 2–3 per week</strong> — this is where real referrals are born</li><li><strong>Bring a 1-page cheat sheet</strong> — shows them exactly who to refer and what to say</li><li><strong>Share your calendar</strong> — "I'm meeting with an HVAC company Thursday — anyone you'd want me to mention?"</li><li><strong>Always give a referral first</strong> — Givers Gain is the #1 predictor of receiving referrals</li><li><strong>Follow up within 24 hours</strong> — "Great meeting you" message + 1 referral lead</li></ul>` }
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
      ],
      recommendations: [
        { type: "template", title: "Connection Request Templates", content: `<div class="pb-rec-scripts"><div class="pb-rec-script"><strong>🎯 Pest Control Specific</strong><p>"Hey [First Name] — I work with pest control operators on the HR side. Saw you're running [Company] with [X] techs. Not pitching — just connecting with owners in the space. Cheers — Austin"</p></div><div class="pb-rec-script"><strong>🏢 General SMB</strong><p>"Hi [First Name] — I help small business owners get real HR infrastructure without hiring a full-time HR person. Connecting with [industry] leaders this week. — Austin, SimplyHR"</p></div><div class="pb-rec-script"><strong>🔗 Mutual Connection</strong><p>"Hey [First Name] — [Mutual Connection] and I were talking about [industry] businesses scaling right now. Thought it'd be worth connecting. — Austin"</p></div><div class="pb-rec-script"><strong>⚡ Insight-Led (Highest Response Rate)</strong><p>"Hi [First Name] — noticed [Company] is hiring [X roles] on Indeed. Growing fast is exciting — but it usually means HR headaches are growing too. Would love to connect. — Austin, SimplyHR"</p></div></div>` },
        { type: "sequence", title: "Post-Connection DM Sequence", content: `<table class="pb-rec-table"><thead><tr><th>Day</th><th>Action</th></tr></thead><tbody><tr><td>Day 0</td><td>Connection accepted — <strong>wait. Don't pitch immediately.</strong></td></tr><tr><td>Day 2</td><td>Like/comment on one of their posts (genuine engagement)</td></tr><tr><td>Day 4</td><td>DM: "Hey [Name] — thanks for connecting. Quick question: is HR something you're handling yourself or do you have someone in that seat? Just curious."</td></tr><tr><td>Day 7 (reply)</td><td>"Most owners are in the same boat. I put together a quick breakdown of what HR support would look like for a company your size. Want me to send it over?" → <strong>Triggers Proposal Off the Rip</strong></td></tr><tr><td>Day 7 (no reply)</td><td>Engage with another post. Don't DM again for 2 weeks.</td></tr><tr><td>Day 21</td><td>"Not trying to spam you. If HR ever becomes a priority, I'm easy to find. Enjoyed your post about [X]."</td></tr></tbody></table>` },
        { type: "table", title: "Content Calendar (Austin's Profile)", content: `<table class="pb-rec-table"><thead><tr><th>Day</th><th>Format</th><th>Example Topic</th></tr></thead><tbody><tr><td>Monday</td><td><strong>Story / Case Study</strong></td><td>"A pest control owner called me because a tech filed a complaint. Here's what we found…"</td></tr><tr><td>Tuesday</td><td><strong>Quick Tip</strong></td><td>"3 things every employee handbook needs that 90% of small businesses miss"</td></tr><tr><td>Wednesday</td><td><strong>Contrarian Take</strong></td><td>"Hot take: PEOs don't solve your HR problems. Here's why."</td></tr><tr><td>Thursday</td><td><strong>Behind the Scenes</strong></td><td>"What a typical week looks like as a fractional HR team"</td></tr><tr><td>Friday</td><td><strong>People First Friday</strong></td><td>"A small decision that changed everything for one of our clients…"</td></tr></tbody></table>` },
        { type: "template", title: "Sample Post Templates", content: `<div class="pb-rec-scripts"><div class="pb-rec-script"><strong>📊 "Did You Know" Post</strong><p>Most pest control owners don't realize this:<br><br>At 50 employees, you're subject to:<br>→ FMLA (12 weeks protected leave)<br>→ ACA (must offer health insurance)<br>→ EEO-1 reporting<br><br>At 20 employees:<br>→ COBRA obligations<br>→ ADEA (age discrimination)<br><br>At 15 employees:<br>→ Title VII (anti-discrimination)<br>→ ADA (reasonable accommodations)<br><br>Growing is exciting. But every threshold triggers new legal obligations.<br><br>That's where we come in.<br>#HR #SmallBusiness #Compliance</p></div><div class="pb-rec-script"><strong>🏆 "Client Win" Post</strong><p>Last month we started working with a 35-person landscaping company.<br><br>Their situation:<br>❌ No employee handbook<br>❌ No I-9s on file<br>❌ Firing people with zero documentation<br>❌ Owner handling every HR issue personally<br><br>90 days later:<br>✅ Compliant handbook (state-specific)<br>✅ Clean I-9 files for all employees<br>✅ Progressive discipline process<br>✅ Owner freed up 10+ hours/week<br><br>Cost: $1,995/month (Partner tier).<br>Cost of not doing it: one lawsuit away from $75K.<br><br>People problems don't fix themselves.</p></div></div>` }
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
      ],
      recommendations: [
        { type: "template", title: "Video Script Template", content: `<pre class="pb-rec-code">0:00–0:03  HOOK (Pattern Interrupt)\n"If you have more than 15 employees and no HR person…\nyou're one bad termination away from a $50,000 problem."\n\n0:03–0:30  ESTABLISH AUTHORITY\n"I'm Austin Truman — MBA, Master's in HR, SHRM-SCP\ncertified. I run SimplyHR Consulting — we're a fractional\nHR team for small businesses. Today I'm breaking down\n[topic]."\n\n0:30–5:00  CORE CONTENT (3–5 Points)\nPoint 1: [Problem + Solution]\nPoint 2: [Problem + Solution]\nPoint 3: [Problem + Solution]\n(Describe mistake → consequence → fix → how SimplyHR handles it)\n\n5:00–5:30  RECAP + CTA\n"If any of this sounds familiar — book a free 30-minute\nHR audit. Link in the description. No pitch, just answers."</pre>` },
        { type: "table", title: "Monthly Video Calendar", content: `<table class="pb-rec-table"><thead><tr><th>Week</th><th>Video Title</th><th>Type</th><th>Length</th></tr></thead><tbody><tr><td>1</td><td>"5 HR Compliance Mistakes That Cost Small Businesses $50K+"</td><td>Core</td><td>6–8 min</td></tr><tr><td>2</td><td>"What HR Actually Looks Like for a 30-Person Company"</td><td>Core</td><td>5–7 min</td></tr><tr><td>3</td><td>"The Real Cost of Employee Turnover (And How to Fix It)"</td><td>Adjacent</td><td>7–10 min</td></tr><tr><td>4</td><td>"Why Pest Control Companies Need HR More Than They Think"</td><td>Niche</td><td>5–7 min</td></tr></tbody></table>` },
        { type: "tip", title: "SEO Checklist (Every Video)", content: `<ul class="pb-rec-list"><li>✅ Title includes primary keyword (e.g., "small business HR compliance")</li><li>✅ Description has 250+ words with keywords naturally woven in</li><li>✅ First line of description: "Book a free HR Audit: [link]"</li><li>✅ 5–8 relevant tags</li><li>✅ Custom thumbnail: Austin's face + bold text + branded colors</li><li>✅ Pinned comment with CTA + Calendly link</li><li>✅ End screen pointing to next relevant video + subscribe</li></ul>` },
        { type: "tip", title: "Repurposing Engine", content: `<ul class="pb-rec-list"><li>Each long-form video creates:</li><li>→ <strong>3 YouTube Shorts</strong> (30–60 sec clips of key points)</li><li>→ <strong>3 Instagram Reels</strong> (same clips, vertical format)</li><li>→ <strong>1 LinkedIn post</strong> (text version of the video's best point)</li><li>→ <strong>1 Blog post</strong> (full transcript, cleaned up + SEO optimized)</li><li>→ <strong>1 Email newsletter</strong> segment ("This week on SimplyHR…")</li></ul>` }
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
      ],
      recommendations: [
        { type: "table", title: "Instagram Content Calendar", content: `<table class="pb-rec-table"><thead><tr><th>Week</th><th>Reel (3/wk)</th><th>Carousel (2/wk)</th><th>Story (daily)</th></tr></thead><tbody><tr><td>1</td><td>"3 signs your business needs HR"</td><td>"Employee Handbook Checklist" (5 slides)</td><td>Poll: "Do you have an employee handbook?"</td></tr><tr><td>2</td><td>"What $595/mo in HR gets you"</td><td>"W-2 vs 1099: Which One?" (7 slides)</td><td>Behind-the-scenes of an HR audit</td></tr><tr><td>3</td><td>"The #1 HR mistake I see"</td><td>"Firing Checklist" (6 slides)</td><td>Q&A: "Ask me an HR question"</td></tr><tr><td>4</td><td>"How to handle a bad employee"</td><td>"HR Compliance by Employee Count" (8 slides)</td><td>Client win story (anonymized)</td></tr></tbody></table>` },
        { type: "tip", title: "Facebook Group Strategy", content: `<ul class="pb-rec-list"><li>Join 5–10 local business owner groups (Utah small business, pest control associations, contractor networks)</li><li>Post helpful answers to HR questions — <strong>never pitch</strong></li><li>Share blog posts when relevant to discussions</li><li>After providing value for 2–3 weeks, people naturally check your profile → website</li><li>Focus on <strong>saves, shares, and website clicks</strong> over vanity metrics like likes</li></ul>` },
        { type: "table", title: "Meta Ads — 3 Ad Sets (From Your Existing Playbook)", content: `<table class="pb-rec-table"><thead><tr><th>Ad</th><th>Audience</th><th>Budget</th><th>Goal</th></tr></thead><tbody><tr><td><strong>Ad A — Pain-Led (Pest Control)</strong></td><td>Pest control owners, 5–150 employees, ages 30–55</td><td>$15/day</td><td>Discovery call bookings</td></tr><tr><td><strong>Ad B — ROI-Led (General SMB)</strong></td><td>SMB owners, searched HR consulting, 10–200 employees</td><td>$15/day</td><td>"See How It Works" clicks</td></tr><tr><td><strong>Ad C — Retargeting</strong></td><td>Website visitors (last 30 days) who did NOT book</td><td>$10/day</td><td>Book My Free Call</td></tr></tbody></table>` }
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
      ],
      recommendations: [
        { type: "template", title: "Topic Cluster Architecture", content: `<pre class="pb-rec-code">CLUSTER 1: HR Compliance for Small Businesses\n├── "5 Compliance Issues Home Service Companies Can't Ignore"\n├── "Employee Handbook Requirements by State"\n├── "FLSA Overtime Rules: What Small Businesses Get Wrong"\n├── "I-9 Compliance Checklist for Small Employers"\n└── "HR Laws That Trigger at 15, 20, 50, and 100 Employees"\n\nCLUSTER 2: HR for Pest Control / Home Services\n├── "Why Pest Control Companies Need HR More Than They Think"\n├── "How to Reduce Technician Turnover by 40%"\n├── "Building an Onboarding Process for Field Technicians"\n├── "Compensation Structures for Pest Control Companies"\n└── "Avoiding Busy Season Nightmares: A People Ops Playbook"\n\nCLUSTER 3: Fractional HR / Outsourced HR\n├── "What Is Fractional HR? A Complete Guide"\n├── "Fractional HR vs. PEO: Which Is Right for Your Business?"\n├── "How Much Does Outsourced HR Cost? 2026 Pricing Guide"\n├── "When to Hire Full-Time HR vs. Outsource"\n└── "SimplyHR vs. Hiring In-House: A Cost Comparison"\n\nCLUSTER 4: People Operations & Culture\n├── "How to Fire an Employee the Right Way"\n├── "Building a Performance Management System from Scratch"\n├── "Employee Retention Strategies for Small Businesses"\n├── "The Real Cost of Employee Turnover (Calculator)"\n└── "Creating a Culture That Retains A-Players"</pre>` },
        { type: "tip", title: "Blog Post Template (Every Article)", content: `<ul class="pb-rec-list"><li>1. <strong>SEO Title</strong> — includes primary keyword, under 60 chars</li><li>2. <strong>Meta description</strong> — under 160 chars, includes keyword + CTA</li><li>3. <strong>H1</strong> — matches SEO title</li><li>4. <strong>Hook paragraph</strong> — 2–3 sentences describing the pain</li><li>5. <strong>Authority statement</strong> — "At SimplyHR, we've helped X companies…"</li><li>6. <strong>Main content</strong> — 3–7 sections with H2/H3 headers</li><li>7. <strong>CTA box</strong> — "Book a Free HR Audit" with Calendly embed</li><li>8. <strong>Internal links</strong> — to 2–3 related posts</li><li>9. <strong>Author bio</strong> — Austin Truman, credentials, headshot</li></ul>` },
        { type: "table", title: "Lead Magnets (Gated Content)", content: `<table class="pb-rec-table"><thead><tr><th>Lead Magnet</th><th>Target Persona</th><th>Where to Gate</th></tr></thead><tbody><tr><td>"2026 HR Compliance Checklist"</td><td>All SMB owners</td><td>Pop-up on compliance blog posts</td></tr><tr><td>"The Pest Control HR Playbook" (PDF)</td><td>Home services owners</td><td>Dedicated landing page</td></tr><tr><td>"Employee Handbook Template"</td><td>Any employer</td><td>Blog sidebar + social media</td></tr><tr><td>"Turnover Cost Calculator" (interactive)</td><td>Operations-focused owners</td><td>Embedded on blog + home page</td></tr><tr><td>"10-Point HR Audit Scorecard"</td><td>Compliance-worried owners</td><td>Pop-up after 60 sec on site</td></tr></tbody></table>` }
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
      ],
      recommendations: [
        { type: "table", title: "Critical Pages to Build/Optimize", content: `<table class="pb-rec-table"><thead><tr><th>Page</th><th>Purpose</th><th>Primary CTA</th></tr></thead><tbody><tr><td><strong>/</strong> Homepage</td><td>Clear value prop + social proof</td><td>"Book a Free HR Audit"</td></tr><tr><td><strong>/pest-control-hr</strong></td><td>Industry-specific landing page</td><td>"Book a Free HR Audit"</td></tr><tr><td><strong>/small-business-hr</strong></td><td>General SMB landing page</td><td>"Book a Free HR Audit"</td></tr><tr><td><strong>/pricing</strong></td><td>Transparent tier breakdown</td><td>"See Which Tier Fits" → Calendly</td></tr><tr><td><strong>/case-studies</strong></td><td>Anonymized client results</td><td>"Get Results Like These"</td></tr><tr><td><strong>/hr-audit</strong></td><td>Free audit landing page</td><td>Calendly embed directly on page</td></tr><tr><td><strong>/blog</strong></td><td>SEO content hub</td><td>Sidebar CTAs to audit</td></tr></tbody></table>` },
        { type: "template", title: "Homepage Wireframe", content: `<pre class="pb-rec-code">┌──────────────────────────────────────────┐\n│ HERO: "VP-Level HR. No VP-Level Salary." │\n│ Plans from $595/month.                   │\n│ [Book a Free HR Audit] ← Primary CTA     │\n├──────────────────────────────────────────┤\n│ SOCIAL PROOF BAR                         │\n│ "Trusted by 20+ companies across 8 states"│\n├──────────────────────────────────────────┤\n│ 3-COLUMN VALUE PROPS                     │\n│ 📋 Compliance | 🤝 Recruiting | 📊 Strategy│\n├──────────────────────────────────────────┤\n│ HOW IT WORKS (3 Steps)                   │\n│ 1. Book audit → 2. Get plan → 3. We're HR│\n├──────────────────────────────────────────┤\n│ PRICING PREVIEW (20–34 EE shown)         │\n│ Foundation $1,295 | Partner $1,995 |      │\n│ Strategic $2,995 | [Compare Plans]        │\n├──────────────────────────────────────────┤\n│ TESTIMONIAL + FINAL CTA                  │\n│ "People Problems Don't Fix Themselves."   │\n│ [Book Your Free 30-Min HR Audit]          │\n└──────────────────────────────────────────┘</pre>` },
        { type: "tip", title: "Conversion Checklist", content: `<ul class="pb-rec-list"><li>✅ Calendly booking widget on every page (embedded, not just a link)</li><li>✅ Exit-intent popup with lead magnet offer</li><li>✅ Live chat or chatbot ("Have an HR question? Ask us.")</li><li>✅ Meta Pixel installed (for Facebook retargeting)</li><li>✅ Google Analytics 4 configured with conversion events</li><li>✅ Google Business Profile optimized ("HR Consulting" category)</li><li>✅ Client testimonials on at least 3 pages</li><li>✅ Mobile-optimized (60%+ of SMB owners browse on mobile)</li><li>✅ Page load speed under 3 seconds</li><li>✅ Clear phone number in header</li></ul>` }
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
      ],
      recommendations: [
        { type: "template", title: "Objection Handlers (Top 4)", content: `<div class="pb-rec-scripts"><div class="pb-rec-script"><strong>"We handle HR ourselves."</strong><p>"That usually means <em>you're</em> handling it — on top of everything else. My question is: do you want to be spending your time on that? We step in so you don't have to be the HR person anymore. Worth 20 minutes to see what that looks like?"</p></div><div class="pb-rec-script"><strong>"We're too small for that."</strong><p>"Small companies get hurt worst by HR mistakes. A $50K wrongful termination hits a 12-person operation hard. Our Foundation tier starts at $595/month — built for companies under 10 people. What's your biggest people risk right now?"</p></div><div class="pb-rec-script"><strong>"We can't afford it."</strong><p>"Our entry tier is $595/month. A decent HR person runs $70K–$90K minimum, and that's one person. We give you a full team. What would it mean to stop managing HR issues yourself and just focus on growth?"</p></div><div class="pb-rec-script"><strong>"Send me some info."</strong><p>"Absolutely — I just want to send the right stuff, not a generic PDF. What's eating the most time or causing the most stress on the people side right now? Then let's put 20 minutes on the calendar. What does [DAY] look like?"</p></div></div>` },
        { type: "table", title: "Email Sequences Reference", content: `<table class="pb-rec-table"><thead><tr><th>Sequence</th><th>Who It's For</th><th>Emails</th><th>Timing</th></tr></thead><tbody><tr><td><strong>A — Pest Control Cold</strong></td><td>Pest control owners (cold)</td><td>3</td><td>Day 1 → 4 → 11</td></tr><tr><td><strong>B — General SMB Cold</strong></td><td>Any small business owner (cold)</td><td>3</td><td>Day 1 → 4 → 11</td></tr><tr><td><strong>C — Warm Intro</strong></td><td>Referral or mutual connection</td><td>1</td><td>Within 24 hrs</td></tr><tr><td><strong>D — Post-Discovery</strong></td><td>After intro/discovery call</td><td>1</td><td>Same day (2 hrs)</td></tr><tr><td><strong>E — Proposal Follow-Up</strong></td><td>After sending a proposal</td><td>2</td><td>Day 3 → Day 7</td></tr></tbody></table>` },
        { type: "template", title: "Voicemail Script (Under 30 Seconds)", content: `<div class="pb-rec-scripts"><div class="pb-rec-script"><strong>🎯 Pest Control Version</strong><p>"[First Name] — Austin Truman, SimplyHR Consulting. I work with pest control owners who are tired of spending their own time on HR. We give you a full HR team without the full-time salary. Worth a 20-minute conversation. Call me at [PHONE] — or I'll try again [DAY]. Austin Truman, [PHONE]. Thanks."</p></div><div class="pb-rec-script"><strong>🏢 General SMB Version</strong><p>"[First Name] — Austin Truman, SimplyHR Consulting. I work with small businesses running without an HR department — spending their own time on people issues or flying blind on compliance. We're fractional HR — full team, fraction of the cost. Worth a 20-minute call. Reach me at [PHONE]. Austin Truman, [PHONE]. Thanks."</p></div></div>` },
        { type: "tip", title: "Quick-Reference Lines", content: `<table class="pb-rec-table"><thead><tr><th>Situation</th><th>Line to Use</th></tr></thead><tbody><tr><td>They go quiet after your pitch</td><td>"Does any of that sound familiar?"</td></tr><tr><td>They seem rushed</td><td>"I'll be quick — this is a 60-second ask."</td></tr><tr><td>They're skeptical</td><td>"I'm not here to sell you something you don't need. Let me ask a couple questions first."</td></tr><tr><td>They want to think about it</td><td>"What would help you feel more confident about the decision?"</td></tr><tr><td>They compare you to a PEO</td><td>"We're not a PEO — you keep your payroll, insurance. We're the strategy and people layer."</td></tr><tr><td>They ask about credentials</td><td>"Austin has 10+ years in HR, an MBA, MHR, and SHRM-SCP — the highest credential in the field."</td></tr></tbody></table>` }
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

  const typeIcons = { template: "📝", table: "📊", sequence: "🔄", tip: "💡" };
  const typeLabels = { template: "Template", table: "Reference", sequence: "Sequence", tip: "Recommendation" };

  const recsHTML = ch.recommendations && ch.recommendations.length ? `
    <div class="pb-ch-recs">
      <h4>📋 Sales Recommendations & Templates</h4>
      ${ch.recommendations.map(r => `
        <div class="pb-rec-card">
          <div class="pb-rec-header">
            <span class="pb-rec-badge" data-type="${r.type}">${typeIcons[r.type] || "📌"} ${typeLabels[r.type] || "Info"}</span>
            <span class="pb-rec-title">${r.title}</span>
          </div>
          <div class="pb-rec-body">${r.content}</div>
        </div>
      `).join("")}
    </div>
  ` : "";

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
    ${recsHTML}
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
