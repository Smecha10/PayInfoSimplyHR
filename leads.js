// ── Leads tab (added 2026-10-12): pest-control prospect list from prospects.db ──
let LEADS = null;          // full array
let leadsShown = 0;        // progressive render marker
const LEADS_PAGE = 200;
const LEAD_STATE = { q: "", st: "", src: "", contactOnly: false, webOnly: false };

async function initLeads() {
  document.getElementById("tab-leads").addEventListener("click", () => switchTabLeads("leads"));
  try {
    const res = await fetch("leads_data.enc");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const buf = new Uint8Array(await res.arrayBuffer());
    if (buf.length < 35 || buf[0] !== 0x50 || buf[1] !== 0x44 || buf[2] !== 0x31)
      throw new Error("Not an encrypted leads file");
    const salt = buf.slice(3, 19);
    const iv = buf.slice(19, 31);
    const body = buf.slice(31);
    const gatePin = sessionStorage.getItem("payinfo-pin");
    if (!gatePin) { throw new Error("Access code not stored - unlock via gate first"); }
    const encKey = await crypto.subtle.importKey("raw", new TextEncoder().encode(gatePin), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: salt, iterations: 150000 }, encKey, 256);
    const aesKey = await crypto.subtle.importKey("raw", bits, "AES-GCM", false, ["decrypt"]);
    const gzBuf = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, aesKey, body);
    const stream = new Response(gzBuf).body.pipeThrough(new DecompressionStream("gzip"));
    const text = await new Response(stream).text();
    LEADS = JSON.parse(text).leads;
  } catch (e) {
    document.getElementById("leads-body").innerHTML =
      `<div class="card" style="color:#f87171">Could not load leads: ${e.message}</div>`;
    return;
  }
  buildLeadStateSelect();
  buildLeadSourceSelect();
  document.getElementById("leads-search").addEventListener("input", e => { LEAD_STATE.q = e.target.value.toLowerCase(); leadsShown = 0; renderLeads(); });
  document.getElementById("leads-state").addEventListener("change", e => { LEAD_STATE.st = e.target.value; leadsShown = 0; renderLeads(); });
  document.getElementById("leads-source").addEventListener("change", e => { LEAD_STATE.src = e.target.value; leadsShown = 0; renderLeads(); });
  document.getElementById("leads-contact-toggle").addEventListener("click", e => { LEAD_STATE.contactOnly = !LEAD_STATE.contactOnly; e.currentTarget.classList.toggle("active", LEAD_STATE.contactOnly); leadsShown = 0; renderLeads(); });
  document.getElementById("leads-web-toggle").addEventListener("click", e => { LEAD_STATE.webOnly = !LEAD_STATE.webOnly; e.currentTarget.classList.toggle("active", LEAD_STATE.webOnly); leadsShown = 0; renderLeads(); });
  document.getElementById("leads-csv").addEventListener("click", exportLeadsCsv);
  renderLeads();
}

function leadFiltered() {
  return LEADS.filter(l => {
    if (LEAD_STATE.st && l.state !== LEAD_STATE.st) return false;
    if (LEAD_STATE.src && l.source !== LEAD_STATE.src) return false;
    if (LEAD_STATE.contactOnly && !(l.phone || l.email)) return false;
    if (LEAD_STATE.webOnly && !l.website) return false;
    if (LEAD_STATE.q) {
      const hay = (l.name + " " + l.city + " " + l.state + " " + (l.owner||"")).toLowerCase();
      if (!hay.includes(LEAD_STATE.q)) return false;
    }
    return true;
  });
}

const leadEsc = s => (s == null ? "" : String(s)).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));

function renderLeads() {
  const list = leadFiltered();
  // summary chips
  const withPhone = list.filter(l => l.phone).length;
  const withEmail = list.filter(l => l.email).length;
  const withWeb = list.filter(l => l.website).length;
  const states = new Set(list.filter(l => l.state).map(l => l.state)).size;
  document.getElementById("leads-summary").innerHTML =
    `<span class="lead-chip"><b>${list.length.toLocaleString()}</b> leads</span>` +
    `<span class="lead-chip"><b>${states}</b> states</span>` +
    `<span class="lead-chip"><b>${withPhone.toLocaleString()}</b> w/ phone</span>` +
    `<span class="lead-chip"><b>${withEmail.toLocaleString()}</b> w/ email</span>` +
    `<span class="lead-chip"><b>${withWeb.toLocaleString()}</b> w/ website</span>`;

  const tbody = document.getElementById("leads-rows");
  const slice = list.slice(0, Math.max(leadsShown, LEADS_PAGE));
  tbody.innerHTML = slice.map(l => {
    const loc = (l.city || l.state) ? `${leadEsc(l.city)}${l.city && l.state ? ", " : ""}${leadEsc(l.state)}` : "-";
    const web = l.website
      ? `<a href="${leadEsc(l.website)}" target="_blank" rel="noopener" class="lead-web">${leadEsc(l.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "").slice(0, 38))}</a>`
      : `<span class="lead-none">-</span>`;
    return `<tr>
      <td class="lead-name">${leadEsc(l.name)}</td>
      <td class="lead-loc">${loc}</td>
      <td class="lead-phone">${l.phone ? `<a href="tel:${leadEsc(l.phone.replace(/[^+\d]/g,""))}">${leadEsc(l.phone)}</a>` : `<span class="lead-none">-</span>`}</td>
      <td class="lead-email">${l.email ? `<a href="mailto:${leadEsc(l.email)}">${leadEsc(l.email.length > 26 ? l.email.slice(0,24)+"…" : l.email)}</a>` : `<span class="lead-none">-</span>`}</td>
      <td class="lead-website">${web}</td>
      <td><span class="lead-src">${leadEsc(l.source || "-")}</span></td>
    </tr>`;
  }).join("");
  leadsShown = slice.length;

  const more = document.getElementById("leads-more");
  if (list.length > leadsShown) {
    more.style.display = "";
    more.textContent = `Show more (${(list.length - leadsShown).toLocaleString()} remaining)`;
  } else { more.style.display = "none"; }

  document.getElementById("leads-count").textContent =
    `Showing ${slice.length.toLocaleString()} of ${list.length.toLocaleString()}`;
}

function buildLeadStateSelect() {
  const sel = document.getElementById("leads-state");
  const states = [...new Set(LEADS.map(l => l.state).filter(Boolean))].sort();
  sel.innerHTML = `<option value="">All states</option>` + states.map(s => `<option value="${leadEsc(s)}">${leadEsc(s)}</option>`).join("");
}
function buildLeadSourceSelect() {
  const sel = document.getElementById("leads-source");
  const srcs = [...new Set(LEADS.map(l => l.source).filter(Boolean))].sort();
  sel.innerHTML = `<option value="">All sources</option>` + srcs.map(s => `<option value="${leadEsc(s)}">${leadEsc(s)}</option>`).join("");
}

document.getElementById("leads-more").addEventListener("click", () => { leadsShown += LEADS_PAGE; renderLeads(); });

// ── Excel export of the filtered view (SheetJS, local file; no upload) ──
function leadExportRows() {
  return leadFiltered().map(l => ({
    "Name": l.name || "", "City": l.city || "", "State": l.state || "",
    "Phone": l.phone || "", "Email": l.email || "", "Website": l.website || "",
    "Owner": l.owner || "", "Owner Title": l.owner_title || "",
    "Source": l.source || "", "Status": l.status || ""
  }));
}
function exportLeadsCsv() {
  var rows = leadExportRows();
  if (!rows.length) return;
  var ws = XLSX.utils.json_to_sheet(rows);
  ws["!cols"] = [{wch:34},{wch:16},{wch:6},{wch:16},{wch:30},{wch:36},{wch:20},{wch:18},{wch:14},{wch:8}];
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Leads");
  XLSX.writeFile(wb, "simplyhr-leads-" + new Date().toISOString().slice(0,10) + ".xlsx");
}
// ── Tab wiring (wraps the site-wide switchTab like the other modules) ──
function switchTabLeads(tab) {
  const _o = window.switchTab;
  _o(tab);
  document.getElementById("tab-leads").classList.toggle("active", tab === "leads");
  document.getElementById("content-leads").classList.toggle("active", tab === "leads");
  // hide the pay-data state sidebar on this tab
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) sidebar.style.display = tab === "leads" ? "none" : "";
  const layout = document.querySelector(".layout");
  if (layout) layout.style.gridTemplateColumns = tab === "leads" ? "1fr" : "";
}

document.addEventListener("DOMContentLoaded", () => setTimeout(initLeads, 350));
