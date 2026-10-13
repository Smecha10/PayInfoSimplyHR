// ── Access gate (added 2026-10-13) ──
// Hashes are salted SHA-256; comparison only - the data stays hash-protected, not encryption-grade.
(function () {
  var GATE_HASH = "84e577a4aa7a813904bcac112dd96681bb350a812aeca86b70cb3b6de0daaa8a";
  var KEY = "payinfo-unlocked";
  function unlocked() {
    try { return sessionStorage.getItem(KEY) === GATE_HASH; } catch (e) { return false; }
  }
  function lockPage() {
    var overlay = document.createElement("div");
    overlay.id = "gate-overlay";
    overlay.innerHTML = '' +
      "<div class=\"gate-wrap\">" +
      "<div class=\"gate-card\">" +
      "<div class=\"gate-logo\">SIMPLY<span><b>HR</b></span></div>" +
      "<div class=\"gate-sub\">Restricted access</div>" +
      "<div class=\"gate-label\">Enter access code</div>" +
      "<div class=\"gate-row\">" +
      "<input id=\"gate-pin\" type=\"password\" inputmode=\"numeric\" autocomplete=\"off\" placeholder=\"\u2022\u2022\u2022\u2022\u2022\u2022\" />" +
      "<button id=\"gate-go\">Unlock</button>" +
      "</div>" +
      "<div id=\"gate-err\" class=\"gate-err\"></div>" +
      "</div></div>";
    document.body.appendChild(overlay);
    async function attempt() {
      var v = (document.getElementById("gate-pin").value || "").trim();
      var enc = new TextEncoder().encode("PayInfoSimplyHR:" + v);
      var buf = await crypto.subtle.digest("SHA-256", enc);
      var h = Array.prototype.map.call(new Uint8Array(buf), function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
      if (h === GATE_HASH) {
        try { sessionStorage.setItem(KEY, h); sessionStorage.setItem("payinfo-pin", v); } catch (e) {}
        var o = document.getElementById("gate-overlay");
        if (o) o.remove();
      } else {
        var err = document.getElementById("gate-err");
        if (err) { err.textContent = "Incorrect code."; setTimeout(function () { err.textContent = ""; }, 1800); }
        var inp = document.getElementById("gate-pin");
        if (inp) { inp.value = ""; inp.focus(); }
      }
    }
    var go = document.getElementById("gate-go");
    if (go) go.addEventListener("click", attempt);
    var pin = document.getElementById("gate-pin");
    if (pin) pin.addEventListener("keydown", function (e) { if (e.key === "Enter") attempt(); });
    setTimeout(function () { var p = document.getElementById("gate-pin"); if (p) p.focus(); }, 60);
  }
  if (!unlocked()) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", lockPage);
    } else { lockPage(); }
  }
})();
