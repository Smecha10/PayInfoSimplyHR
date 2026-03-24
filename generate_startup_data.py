import json, os

OUT_FILE = r"C:\Users\Smech\OneDrive\Desktop\Businesses\SimplyHR\Pay Info\pest_control_startup_data.json"

FEDERAL_THRESHOLDS = [
    {
        "threshold": 1,
        "laws": [
            {"title": "Fair Labor Standards Act (FLSA)", "desc": "Minimum wage, overtime pay, record-keeping, youth employment standards.", "risk": "HIGH"},
            {"title": "Occupational Safety & Health Act (OSH Act)", "desc": "Safety standards, chemical handling, PPE, general duty clause.", "risk": "HIGH"},
            {"title": "Form I-9 & E-Verify", "desc": "Verification of employment eligibility for all hires.", "risk": "MODERATE"},
            {"title": "Equal Pay Act (EPA)", "desc": "Requires equal pay for equal work regardless of gender.", "risk": "HIGH"},
            {"title": "Uniformed Services Employment and Reemployment Rights Act (USERRA)", "desc": "Protects job rights for military service members.", "risk": "MODERATE"},
            {"title": "PUMPA / Break Time for Nursing Mothers", "desc": "Reasonable break time and private location for nursing mothers (under 50 employees may claim undue hardship in rare cases).", "risk": "MODERATE"}
        ]
    },
    {
        "threshold": 15,
        "laws": [
            {"title": "Title VII of the Civil Rights Act", "desc": "Prohibits discrimination based on race, color, religion, sex, or national origin.", "risk": "VERY HIGH"},
            {"title": "Americans with Disabilities Act (ADA)", "desc": "Prohibits disability discrimination, requires reasonable accommodations.", "risk": "VERY HIGH"},
            {"title": "Genetic Information Nondiscrimination Act (GINA)", "desc": "Prohibits discrimination based on genetic information.", "risk": "MODERATE"},
            {"title": "Pregnancy Discrimination Act (PDA)", "desc": "Prohibits discrimination on the basis of pregnancy/childbirth.", "risk": "HIGH"}
        ]
    },
    {
        "threshold": 20,
        "laws": [
            {"title": "Age Discrimination in Employment Act (ADEA)", "desc": "Protects individuals 40+ from age discrimination.", "risk": "HIGH"},
            {"title": "COBRA (Federal)", "desc": "Requires offering temporary extension of group health coverage.", "risk": "HIGH"}
        ]
    },
    {
        "threshold": 50,
        "laws": [
            {"title": "Family and Medical Leave Act (FMLA)", "desc": "Up to 12 weeks of unpaid, job-protected leave. (Must have 50 employees within 75 miles).", "risk": "HIGH"},
            {"title": "Affordable Care Act (ACA) Employer Mandate", "desc": "Requires offering affordable minimum essential health coverage to full-time employees.", "risk": "VERY HIGH"},
            {"title": "EEO-1 Reporting (Federal Contractors)", "desc": "If operating as a federal contractor with $50k+ in contracts, EEO-1 reporting begins at 50 rather than 100.", "risk": "MODERATE"}
        ]
    },
    {
        "threshold": 100,
        "laws": [
            {"title": "Worker Adjustment and Retraining Notification (WARN) Act", "desc": "60-day advance notice for mass layoffs or plant closings.", "risk": "HIGH"},
            {"title": "EEO-1 Reporting (General)", "desc": "Annual submission of demographic workforce data to EEOC.", "risk": "MODERATE"}
        ]
    }
]

STATE_OVERRIDES = {
    "NY": [
        { "threshold": 1, "laws": [{"title": "NY Paid Sick Leave (0-4 emp)", "desc": "Provide up to 40 hours UNPAID sick leave (unless net income >$1M, then PAID).", "risk": "HIGH"}] },
        { "threshold": 5, "laws": [{"title": "NY Paid Sick Leave Expansion", "desc": "Must provide up to 40 hours of PAID sick leave.", "risk": "HIGH"}] },
        { "threshold": 10, "laws": [{"title": "NY Retail Worker Safety Act", "desc": "Requires written workplace violence prevention policy and training (Effective Mar 2025).", "risk": "MODERATE"}] },
        { "threshold": 50, "laws": [{"title": "NY Mini-WARN Act", "desc": "90-day notice for mass layoffs (lower threshold and longer notice than federal).", "risk": "HIGH"}] },
        { "threshold": 100, "laws": [{"title": "NY Paid Sick Leave Max Expansion", "desc": "Must provide up to 56 hours of PAID sick leave.", "risk": "HIGH"}] }
    ],
    "CA": [
        { "threshold": 5, "laws": [{"title": "CA CFRA & PDL", "desc": "California Family Rights Act and Pregnancy Disability Leave protections kick in.", "risk": "VERY HIGH"}] },
        { "threshold": 75, "laws": [{"title": "CA Mini-WARN Act", "desc": "60-day advance notice for mass layoffs/closures applied at 75+ employees.", "risk": "HIGH"}] }
    ],
    "WA": [
        { "threshold": 15, "laws": [{"title": "WA PFML Job Protection (2027)", "desc": "Job protection for workers taking Paid Family Medical Leave (drops to 15 in 2027, 25 currently in 2026).", "risk": "HIGH"}] },
        { "threshold": 50, "laws": [{"title": "WA Mini-WARN Act", "desc": "60-day advance notice for business closings or mass layoffs (doesn't require a specific percentage of workforce to trigger).", "risk": "HIGH"}] }
    ],
    "IL": [
        { "threshold": 75, "laws": [{"title": "IL WARN Act", "desc": "Applies WARN protections to employers with 75+ employees.", "risk": "HIGH"}] }
    ],
    "FL": [
        { "threshold": 15, "laws": [{"title": "FL Civil Rights Act", "desc": "Mirrors federal Title VII but includes additional state remedies.", "risk": "HIGH"}] },
        { "threshold": 50, "laws": [{"title": "FL Domestic Violence Leave", "desc": "Up to 3 working days of unpaid leave for victims of domestic/sexual violence.", "risk": "MODERATE"}] }
    ]
}

data = {
    "federal": FEDERAL_THRESHOLDS,
    "state_overrides": STATE_OVERRIDES
}

with open(OUT_FILE, "w") as f:
    json.dump(data, f, indent=2)

print(f"Done: generated startup threshold data with {len(FEDERAL_THRESHOLDS)} federal threshold tiers and overrides for {len(STATE_OVERRIDES)} states.")
