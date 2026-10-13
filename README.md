# PayInfoSimplyHR

## Leads tab (2026-10-13)
- New 'Leads' tab: 5,644 pest-control prospects (from prospects.db) with search / state + source filters / has-phone-email + has-website toggles, 200-row progressive table, Excel (.xlsx) export of any filtered view, and CSV via the same button's data source.
- Access gate: `gate.js` prompts for an access code before the UI loads (salted SHA-256 check, sessionStorage unlock per tab session). Code is Spencer's; hash committed, not the code.
- Data: `leads_data.json.gz` (~167 KB) fetched + decompressed in-browser via DecompressionStream.
