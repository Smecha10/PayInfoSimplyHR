# How to Update the Pest Control Pay Dashboard

## Overview
All pay data lives in **`pest_control_pay_data.json`**. The dashboard reads this file directly — no build step needed.

You can ask **Antigravity** to update this file at any time using the prompts below.

---

## Update Prompts

### Update a specific state + role
> "Antigravity, update the pest control pay data for Texas, role: Branch Manager. New median annual: $82,000, range low: $65,000, range high: $110,000. Source: Salary.com March 2026."

### Add a note to a specific state
> "Antigravity, add a note to Florida → Pest Control Technician: WDO/termite license holders earn 15-20% above base."

### Update the last_updated date
> "Antigravity, update all roles in California with last_updated = 'June 2026'."

### Add a brand new role to all 50 states
> "Antigravity, add a new role called 'Operations Manager' to all 50 states in the pay dashboard. Use a national median of $68,000 with the same state multipliers as branch manager."

### Full data refresh
> "Antigravity, refresh the pest control pay data for all 50 states using the latest BLS OEWS data and FieldRoutes salary report. Keep the current structure."

---

## File Structure Reference

```json
{
  "meta": {
    "last_updated": "March 2025",
    "national_baselines": { ... },
    "sources": [ { "label": "...", "url": "..." } ]
  },
  "states": {
    "TX": {
      "name": "Texas",
      "abbr": "TX",
      "licensing": {
        "body": "Texas Dept of Agriculture",
        "license_required": true,
        "continuing_education": "15 hrs/yr",
        "reciprocity": "None",
        "regulatory_url": "https://www.texasagriculture.gov/"
      },
      "roles": {
        "pest_control_technician": {
          "label": "Pest Control Technician",
          "median_annual": 45200,
          "range_low": 32800,
          "range_high": 62000,
          "median_hourly": 21.73,
          "notes": "No state income tax increases effective take-home pay.",
          "source": "BLS OEWS May 2024 + FieldRoutes/Payscale 2025",
          "source_urls": ["..."],
          "last_updated": "March 2025"
        },
        ...
      }
    }
  }
}
```

---

## Roles in the Dashboard

| Key | Display Label |
|-----|--------------|
| `pest_control_technician` | Pest Control Technician |
| `route_manager` | Route Manager |
| `sales_inspector` | Sales Inspector / Sales Rep |
| `branch_manager` | Branch Manager |
| `office_admin` | Office / Customer Service Admin |

---

## Adding Custom Notes
Notes appear as a highlighted "State-Specific Insights" card on the dashboard. Use them for:
- Market-specific factors (e.g., high demand cities, seasonal variation)
- Licensing nuances that affect pay
- Industry dynamics (union presence, large employers, etc.)

If a role/state has no note, the card is hidden automatically.
