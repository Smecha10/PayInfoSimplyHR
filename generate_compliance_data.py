import json, os

BASE = r"c:\Users\Smech\OneDrive\Desktop\Businesses\SimplyHR\Pay Info"
OUT = os.path.join(BASE, "pest_control_compliance_data.json")

# ABC Test states (very strict IC classification - hardest to use 1099)
ABC_STATES = {"CA","MA","NJ","IL","CT","DE","GA","HI","IN","KS","LA","ME","MD","MN","NE","NV","NM","OR","VT","WA","WV","WI"}
# States with moderately strict IC rules (multi-factor test leaning employee)
STRICT_IC = {"NY","CO","TX","FL","PA","OH","MI","VA","NC","AZ","MO"}
# Paid sick leave mandate states (2025)
PSL_STATES = {"AK","AZ","CA","CO","CT","IL","ME","MD","MA","MI","MN","MO","NE","NV","NJ","NM","NY","OR","RI","VT","WA"}
# States with daily OT (in addition to weekly)
DAILY_OT = {"CA","NV","CO"}
# States with no state income tax
NO_STATE_TAX = {"AK","FL","NV","NH","SD","TN","TX","WA","WY"}
# Min wage overrides (where > $7.25 federal, as of 2025)
MIN_WAGE = {
  "AK":11.91,"AZ":14.70,"CA":16.50,"CO":14.81,"CT":16.35,"DE":15.00,"FL":14.00,
  "HI":14.00,"IL":15.00,"ME":14.65,"MD":15.00,"MA":15.00,"MI":10.56,"MN":11.13,
  "MO":13.75,"MT":10.55,"NE":13.50,"NV":12.00,"NJ":15.49,"NM":12.00,"NY":16.50,
  "OH":10.70,"OR":14.70,"RI":14.00,"VT":14.01,"VA":12.41,"WA":16.66,"WI":7.25,
  "DC":17.50
}

STATES = [
  ("Alabama","AL"),("Alaska","AK"),("Arizona","AZ"),("Arkansas","AR"),("California","CA"),
  ("Colorado","CO"),("Connecticut","CT"),("Delaware","DE"),("Florida","FL"),("Georgia","GA"),
  ("Hawaii","HI"),("Idaho","ID"),("Illinois","IL"),("Indiana","IN"),("Iowa","IA"),
  ("Kansas","KS"),("Kentucky","KY"),("Louisiana","LA"),("Maine","ME"),("Maryland","MD"),
  ("Massachusetts","MA"),("Michigan","MI"),("Minnesota","MN"),("Mississippi","MS"),("Missouri","MO"),
  ("Montana","MT"),("Nebraska","NE"),("Nevada","NV"),("New Hampshire","NH"),("New Jersey","NJ"),
  ("New Mexico","NM"),("New York","NY"),("North Carolina","NC"),("North Dakota","ND"),("Ohio","OH"),
  ("Oklahoma","OK"),("Oregon","OR"),("Pennsylvania","PA"),("Rhode Island","RI"),("South Carolina","SC"),
  ("South Dakota","SD"),("Tennessee","TN"),("Texas","TX"),("Utah","UT"),("Vermont","VT"),
  ("Virginia","VA"),("Washington","WA"),("West Virginia","WV"),("Wisconsin","WI"),("Wyoming","WY"),
]

# State-specific HR notes for pest control
STATE_NOTES = {
  "CA": {
    "general": "California has the most complex employment laws in the nation. Pest control employers face strict meal/rest break requirements, PAGA exposure, and the ABC test for contractor classification.",
    "technician": "Technicians must receive 30-min unpaid meal break after 5 hrs and 10-min paid rest per 4 hrs worked. No rounding of time. Daily OT kicks in after 8 hrs.",
    "sales_inspector": "Sales reps are almost impossible to classify as 1099 under AB5/ABC test unless they run their own independent pest control sales business. DLSE audits are common.",
    "branch_manager": "Branch managers must meet CA's higher exempt salary threshold ($66,560/yr as of 1/1/2025). Misclassification as exempt when non-exempt is a major PAGA risk.",
    "route_manager": "Route managers directing field work are likely non-exempt and entitled to daily OT. Ensure meal period waivers are documented for shifts under 6 hrs.",
  },
  "FL": {
    "general": "Florida law explicitly prohibits pest control ID cardholders from being classified as independent contractors unless they own their own equipment/vehicle and operate independently.",
    "technician": "FL statute 482.161 requires ID card holders to be W-2 employees under direct supervision of the licensee. 1099 technicians are a licensing violation.",
    "sales_inspector": "Outside sales exemption may apply under FLSA if rep's primary duty is making sales away from employer's place of business and regularly works away from office.",
    "branch_manager": "FL follows federal FLSA exempt rules; no state-specific salary threshold above federal. No state income tax benefits effective compensation.",
  },
  "TX": {
    "general": "Texas is employer-friendly with no state income tax and generally follows federal FLSA rules without additional state mandates.",
    "technician": "No state paid sick leave mandate (Austin/Dallas local ordinances were preempted by 2021 law). FLSA non-exempt — 1.5x OT after 40 hrs/week.",
    "sales_inspector": "Outside sales exemption applies to bona fide outside sales reps. Must primarily make sales away from office. No special state test — follows IRS common law + DOL economic realities.",
    "branch_manager": "Follows federal $58,656/yr exempt threshold. No Texas-specific additions.",
  },
  "NY": {
    "general": "New York has aggressive wage enforcement via the Department of Labor. Spread of hours pay, call-in pay, and wage theft laws are strictly enforced.",
    "technician": "NY requires 1 day of rest per 7 if working in any industry. Spread-of-hours: employees must receive 1 hr minimum wage for shifts exceeding 10 hrs total spread.",
    "sales_inspector": "NY ABC-like multi-factor test. Commission-only sales reps must receive written commission agreements. NY Labor Law §191(c) requires timely commission payment.",
    "branch_manager": "NY exempt salary threshold: $1,237.50/wk ($64,350/yr) in NYC/Nassau/Suffolk/Westchester; $1,161.65/wk ($60,405.80/yr) elsewhere (2025).",
  },
  "WA": {
    "general": "Washington has some of the strongest worker protections in the nation, including mandatory paid sick leave, PFML, and strict IC classification.",
    "technician": "WA Paid Sick Leave: 1 hr per 40 hrs worked, no cap on accrual. WA PFML applies to all employers with 1+ employees.",
    "sales_inspector": "WA uses multi-factor 'economic dependence' test. Commission-paid reps are presumed employees. If directing their own schedule fully and not core to business, 1099 may be possible.",
    "branch_manager": "WA exempt threshold: $1,302.40/wk ($67,724.80/yr) as of 1/1/2025. Must perform primarily executive/admin duties.",
  },
  "IL": {
    "general": "Illinois uses ABC test for UI purposes and has broad worker protections including Biometric Information Privacy Act (BIPA) — relevant for time-tracking fingerprint systems.",
    "technician": "IL Paid Leave Act (2024): 40 hrs/yr paid leave for any reason for all employers. One I-Day rest in 7 required.",
    "sales_inspector": "IL Department of Employment Security uses ABC test for UI. 1099 sales reps face high reclassification risk if working exclusively for one pest control company.",
  },
  "MA": {
    "general": "Massachusetts has the most aggressive ABC test in the country — the 'B' prong (outside usual course of business) is nearly impossible for pest control sales reps to meet.",
    "technician": "MA requires Sunday premium pay for retail (pest control is not retail; general OT rules apply). Earned Sick Time: 40 hrs/yr.",
    "sales_inspector": "Classifying a pest control sales rep as 1099 in MA is extremely high risk. AG's office actively prosecutes misclassification. Must be W-2.",
    "branch_manager": "MA Blue Laws (Sunday/holiday requirements) do not typically apply to pest control. Federal exempt threshold applies.",
  },
  "NJ": {
    "general": "New Jersey has a 'substantially all' ABC test that closely mirrors California's approach and is among the toughest in the nation.",
    "technician": "NJ EARN Sick Leave: 40 hrs/yr. NJ requires 1 week advance notice of schedule changes for some industries — confirm if applicable to your operation size.",
    "sales_inspector": "NJ Sales Reps Act requires written commission contracts for reps who solicit orders within NJ. Final commission must be paid within 30 days of termination. 1099 classification is very high risk.",
    "branch_manager": "NJ follows federal exempt salary threshold. NJ WARN Act applies to mass layoffs (100+ employees).",
  },
}

# Role-specific compliance that applies broadly
ROLE_COMPLIANCE = {
  "pest_control_technician": {
    "classification": "W-2 Employee (Required in nearly all states)",
    "flsa_status": "Non-Exempt",
    "overtime_rule": "1.5x after 40 hrs/week (federal). CA/CO/NV also have daily OT.",
    "key_federal_laws": ["FLSA (overtime/min wage)","OSHA (chemical safety/PPE)","FIFRA (pesticide applicator)","FMLA (50+ employees)","ADA","Title VII"],
    "key_risks": [
      "1099 misclassification — technicians under direct supervision cannot be independent contractors",
      "Pesticide applicator license must be current; expired licenses create liability",
      "Off-the-clock work (drive time, pre/post shift vehicle inspection) must be compensated",
      "Personal Protective Equipment (PPE) must be employer-provided at no cost to employee",
    ],
    "practical_notes": "Route technicians directed by the company as to what, where, and how to perform work are employees under all known tests. Do not use 1099 for technicians.",
  },
  "route_manager": {
    "classification": "W-2 Employee",
    "flsa_status": "Depends — must meet duties test AND salary threshold ($58,656/yr as of 1/1/2025) to be exempt",
    "overtime_rule": "If non-exempt: 1.5x after 40 hrs/wk. If exempt: no OT — but must genuinely manage 2+ employees and have authority to hire/fire.",
    "key_federal_laws": ["FLSA","NLRA (organizing rights)","FMLA","ADA","Title VII","OSHA"],
    "key_risks": [
      "Route managers who spend majority of time doing technician work (not managing) may be misclassified as exempt",
      "Must document supervisory duties to support executive exemption",
      "Salary must not be docked for partial-day absences (salaried exempt rule)",
    ],
    "practical_notes": "Ensure route managers truly manage a team. Having 'manager' in the title alone does not create an exemption.",
  },
  "sales_inspector": {
    "classification": "W-2 OR 1099 — HIGHLY STATE DEPENDENT (See W-2 vs 1099 Analysis below)",
    "flsa_status": "May qualify for Outside Sales Exemption if: (1) primary duty is making sales, (2) customarily and regularly works away from employer's premises",
    "overtime_rule": "If outside sales exempt: no OT requirement. If inside sales/non-exempt: OT applies.",
    "key_federal_laws": ["FLSA (outside sales exemption)","IRS Publication 15-A (contractor tests)","DOL Economic Realities Test","State ABC Tests"],
    "key_risks": [
      "States using ABC test make 1099 classification for sales reps extremely risky",
      "FL law explicitly restricts 1099 for licensed pest control work",
      "Commission-only W-2 reps must still meet minimum wage in each workweek",
      "Written commission agreements required in NY, NJ, and many other states",
      "Non-compete and non-solicitation agreements have varying enforceability by state",
    ],
    "practical_notes": "If your sales rep works exclusively for you, follows your process/scripts, and sells YOUR pest control services — they are almost certainly a W-2 in any ABC test state.",
  },
  "branch_manager": {
    "classification": "W-2 Employee",
    "flsa_status": "Typically Exempt (Executive or Administrative exemption) — must meet federal $58,656/yr threshold AND duties test",
    "overtime_rule": "Exempt — no OT. But some states have higher salary thresholds (NY, CA, WA).",
    "key_federal_laws": ["FLSA (executive exemption)","NLRA","FMLA","ADA","Title VII","EEOC","WARN Act (100+ employees)"],
    "key_risks": [
      "Branch managers who are 'working managers' spending most time on technician tasks may not qualify for executive exemption",
      "Must have genuine authority: real ability to hire, fire, or recommend personnel actions",
      "State salary thresholds may be higher than federal (NY: $64,350; CA: $66,560; WA: $67,724)",
    ],
    "practical_notes": "Document all management decisions. Maintain records showing supervisory responsibilities to support exempt status.",
  },
  "office_admin": {
    "classification": "W-2 Employee",
    "flsa_status": "Typically Non-Exempt unless Administrative exemption applies",
    "overtime_rule": "1.5x after 40 hrs/week. Admin exemption requires: primary duty of office/non-manual work directly related to management + exercises discretion/independent judgment on significant matters.",
    "key_federal_laws": ["FLSA","ADA","Title VII","FMLA","NLRA","State paid sick leave laws"],
    "key_risks": [
      "Office admins with routine duties almost never qualify for administrative exemption",
      "Must be paid for all hours worked including overtime — no comp time in private sector",
      "Paid sick leave requirements vary widely by state and accrual rules must be tracked",
    ],
    "practical_notes": "Customer service reps, schedulers, and dispatchers are virtually always non-exempt. Ensure timekeeping captures all hours including breaks properly.",
  },
}

W2_VS_1099 = {
  "federal_framework": {
    "irs_test": "IRS Common Law: Behavioral control, Financial control, Type of relationship",
    "dol_test": "DOL Economic Realities Test (2025): Degree of control, profit/loss opportunity, investment, permanence, skill, integral to business",
    "current_status": "As of May 2025, DOL reverted to pre-2024 framework — slightly more employer-friendly at federal level, but state laws still apply.",
  },
  "state_classification": {
    "abc_test_strict": {
      "states": sorted(list(ABC_STATES)),
      "risk_level": "VERY HIGH",
      "description": "Uses ABC test. Worker is an EMPLOYEE unless employer proves all 3: (A) free from control, (B) work is outside usual course of business, (C) independently established business. Because selling pest control IS the company's business, B prong is nearly impossible to meet for sales reps.",
      "recommendation": "Use W-2. Do not attempt 1099 for sales reps in these states.",
    },
    "multi_factor_strict": {
      "states": sorted(list(STRICT_IC)),
      "risk_level": "HIGH",
      "description": "Uses multi-factor economic realities or common law test but enforcement is aggressive. Several factors must strongly favor independence.",
      "recommendation": "W-2 strongly preferred. 1099 only if rep truly operates independently, has multiple clients, provides own leads, sets own prices.",
    },
    "federal_standard": {
      "states": [s[1] for s in STATES if s[1] not in ABC_STATES and s[1] not in STRICT_IC],
      "risk_level": "MODERATE",
      "description": "Follows federal IRS/DOL standards without additional state laws. 1099 is more defensible IF the rep controls their method, sets own hours, works for multiple companies, and isn't economically dependent on one employer.",
      "recommendation": "Can consider 1099 with proper independent contractor agreement and documented independence. Consult legal counsel.",
    },
  },
  "sales_rep_checklist": [
    {"factor": "Sets own schedule", "w2_indicator": "Employer dictates hours/days", "1099_indicator": "Rep sets own schedule entirely"},
    {"factor": "Works for multiple companies", "w2_indicator": "Exclusively for your company", "1099_indicator": "Has other pest control clients"},
    {"factor": "Provides own leads", "w2_indicator": "Company provides leads/territory", "1099_indicator": "Generates own leads independently"},
    {"factor": "Sets own prices", "w2_indicator": "Must follow company pricing", "1099_indicator": "Negotiates own deal terms"},
    {"factor": "Provides own equipment", "w2_indicator": "Company provides vehicle/phone/tablet", "1099_indicator": "Uses own car, phone, tools"},
    {"factor": "Training required", "w2_indicator": "Required to attend company training", "1099_indicator": "Uses own methods/expertise only"},
    {"factor": "Non-compete/exclusivity", "w2_indicator": "Restricted from working elsewhere", "1099_indicator": "Free to work for competitors"},
    {"factor": "Ongoing relationship", "w2_indicator": "Indefinite continuous engagement", "1099_indicator": "Project-based or defined term"},
  ],
  "penalties_for_misclassification": [
    "Back payroll taxes (FICA) — employer AND employee share",
    "Unpaid overtime for all misclassified workers",
    "State unemployment insurance contributions",
    "Workers' comp exposure for job injuries",
    "Penalties: up to $1,000/worker federal; state penalties vary (CA: up to $25,000/violation)",
    "PAGA lawsuits in California — private attorneys general",
    "Loss of pesticide license in FL if contractor found to be employee",
  ],
}

def build_state_compliance(name, abbr):
  min_w = MIN_WAGE.get(abbr, 7.25)
  ic_risk = "VERY HIGH" if abbr in ABC_STATES else ("HIGH" if abbr in STRICT_IC else "MODERATE")
  ic_test = "ABC Test" if abbr in ABC_STATES else ("Multi-Factor Strict" if abbr in STRICT_IC else "Federal Standard (IRS/DOL)")
  psl = abbr in PSL_STATES
  daily_ot = abbr in DAILY_OT
  no_tax = abbr in NO_STATE_TAX
  sn = STATE_NOTES.get(abbr, {})

  return {
    "name": name,
    "abbr": abbr,
    "at_a_glance": {
      "min_wage": min_w,
      "paid_sick_leave_mandate": psl,
      "daily_overtime": daily_ot,
      "no_state_income_tax": no_tax,
      "contractor_risk_level": ic_risk,
      "contractor_test": ic_test,
    },
    "general_notes": sn.get("general", f"{name} follows federal FLSA standards without significant additional state-level pest control HR mandates. Standard federal rules apply for OT, minimum wage, and worker classification."),
    "role_notes": {
      "pest_control_technician": sn.get("technician", "Standard FLSA non-exempt rules apply. All technicians must be W-2. OT at 1.5x after 40 hrs/week."),
      "route_manager": sn.get("route_manager", "Must pass FLSA duties test and $58,656/yr salary threshold to be classified as exempt. Otherwise non-exempt with OT."),
      "sales_inspector": sn.get("sales_inspector", f"Contractor risk: {ic_risk} — uses {ic_test}. Outside sales exemption may apply for W-2 reps. Commission agreements should be in writing."),
      "branch_manager": sn.get("branch_manager", "Executive exemption typically applies if managing 2+ employees and salary meets federal threshold ($58,656/yr). Confirm state-specific threshold."),
      "office_admin": sn.get("office_admin", "Almost always non-exempt. Entitled to OT after 40 hrs/week. Must track all hours carefully."),
    },
    "paid_sick_leave": {
      "required": psl,
      "details": {
        "AK": "1 hr/40 hrs worked. Effective July 1, 2025. Up to 56 hrs/yr for employers 15+.",
        "AZ": "1 hr/30 hrs worked. Up to 40 hrs/yr (employers <15) or 40 hrs (15+).",
        "CA": "1 hr/30 hrs worked. 40 hrs/yr minimum guaranteed. 5 days usable.",
        "CO": "1 hr/30 hrs worked. Up to 48 hrs/yr.",
        "CT": "1 hr/40 hrs worked (expanded 2025 to all employers). Up to 40 hrs/yr.",
        "IL": "IL Paid Leave for All Workers Act: 40 hrs/yr for any reason. 1/1/2024.",
        "ME": "1 hr/40 hrs worked. Up to 40 hrs/yr. Can be used for any reason.",
        "MD": "1 hr/30 hrs worked. Up to 64 hrs/yr.",
        "MA": "1 hr/30 hrs worked. Up to 40 hrs/yr.",
        "MI": "1 hr/35 hrs worked. Up to 72 hrs/yr (effective Feb 2025).",
        "MN": "1 hr/30 hrs worked. Up to 48 hrs/yr.",
        "MO": "1 hr/30 hrs worked. Up to 56 hrs/yr. Effective May 1, 2025.",
        "NE": "1 hr/30 hrs worked. Up to 40 hrs/yr. Effective Oct 1, 2025.",
        "NV": "0.01923 hrs/hr worked. Up to 40 hrs/yr.",
        "NJ": "1 hr/30 hrs worked. Up to 40 hrs/yr.",
        "NM": "1 hr/30 hrs worked. Up to 64 hrs/yr.",
        "NY": "1 hr/30 hrs worked. Up to 56 hrs/yr (employers 100+) or 40 hrs.",
        "OR": "1 hr/30 hrs worked. Up to 40 hrs/yr.",
        "RI": "1 hr/35 hrs worked. Up to 40 hrs/yr.",
        "VT": "1 hr/52 hrs worked. Up to 48 hrs/yr.",
        "WA": "1 hr/40 hrs worked. No cap on accrual. Must allow 40+ hrs/yr.",
      }.get(abbr, "Paid sick leave required. Check state DOL for current accrual rates and caps.") if psl else "No state paid sick leave mandate. Federal FMLA (unpaid) applies for eligible employees of 50+ employee companies.",
    },
    "overtime": {
      "federal_rule": "1.5x pay after 40 hrs/week (FLSA)",
      "state_additions": {
        "CA": "Daily OT: 1.5x after 8 hrs/day; 2x after 12 hrs/day. 2x on 7th consecutive day after 8 hrs.",
        "CO": "Daily OT: 1.5x after 12 hrs/day or 12 hrs in a shift. Weekly 40-hr rule also applies.",
        "NV": "Daily OT: 1.5x after 8 hrs/day if employee earns less than 1.5x NV minimum wage.",
        "AK": "Daily OT: 1.5x after 8 hrs/day.",
      }.get(abbr, "Follows federal FLSA — 1.5x after 40 hrs/week only."),
    },
    "contractor_classification": {
      "risk_level": ic_risk,
      "test_used": ic_test,
      "sales_rep_1099_viable": abbr not in ABC_STATES and abbr not in {"FL"},
      "technician_1099_viable": False,
      "state_specific_notes": {
        "FL": "FL statute 482.161: pest control ID card holders MUST be W-2 employees. 1099 technicians are a licensing violation.",
        "CA": "AB5 (2019) + ABC test. Sales reps and technicians must be W-2. Penalties up to $25,000/violation + PAGA exposure.",
        "MA": "Strongest ABC test in nation. B-prong (outside usual course of business) makes 1099 sales reps nearly impossible.",
        "NJ": "NJ ABC test + NJ Sales Reps Act requires written commission contracts and timely payment.",
        "NY": "NY enforces multi-factor test aggressively. Labor Law §191(c) governs commission payments.",
        "WA": "WA uses economic dependence test. Commission reps working exclusively for one employer are presumed employees.",
        "IL": "IL ABC test for UI purposes. BIPA: biometric time clocks require written consent policy.",
        "TX": "Employer-friendly. Follows federal standards. 1099 more viable if rep is truly independent.",
        "GA": "ABC test but less aggressive enforcement than CA/MA. 1099 possible with strong independent contractor agreement.",
      }.get(abbr, f"{name} follows {'ABC test' if abbr in ABC_STATES else 'federal IRS/DOL standards'} for worker classification. {'1099 for sales reps is high risk.' if abbr in ABC_STATES else 'Consult legal counsel before using 1099 for pest control sales reps.'}"),
    },
    "key_compliance_deadlines": [
      "I-9 completion: Day 1 of work (Section 1) + within 3 business days (Section 2)",
      "New hire reporting: Most states require within 20 days of hire",
      "W-2 distribution: January 31 of following year",
      "1099-NEC filing: January 31 of following year (if using contractors)",
      f"{'Paid sick leave accrual begins: Day 1 of employment (most states)' if psl else 'State FMLA/leave: Check state law for state-specific family leave programs'}",
    ],
    "last_updated": "March 2025",
  }

data = {
  "meta": {
    "last_updated": "March 2025",
    "disclaimer": "This information is for strategic HR reference purposes only and does not constitute legal advice. Consult a licensed employment attorney for compliance decisions.",
    "sources": [
      {"label": "DOL FLSA Overtime Rule 2025", "url": "https://www.dol.gov/agencies/whd/flsa"},
      {"label": "IRS Worker Classification Publication 15-A", "url": "https://www.irs.gov/publications/p15a"},
      {"label": "FL Statute 482.161 — Pest Control Employee Requirement", "url": "https://www.flsenate.gov/Laws/Statutes/2023/482.161"},
      {"label": "CA AB5 Independent Contractor Law", "url": "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201920200AB5"},
      {"label": "DOL State Paid Sick Leave Laws", "url": "https://www.dol.gov/agencies/whd/sick-leave"},
      {"label": "World Population Review — ABC Test States 2025", "url": "https://worldpopulationreview.com/state-rankings/states-that-use-abc-test-for-independent-contractors"},
      {"label": "NPMA HR Compliance Resources", "url": "https://www.pestworld.org/"},
    ],
  },
  "role_compliance": ROLE_COMPLIANCE,
  "w2_vs_1099": W2_VS_1099,
  "states": {},
}

for name, abbr in STATES:
  data["states"][abbr] = build_state_compliance(name, abbr)

with open(OUT, "w") as f:
  json.dump(data, f, indent=2)
print(f"Done: {OUT} — {len(data['states'])} states")
