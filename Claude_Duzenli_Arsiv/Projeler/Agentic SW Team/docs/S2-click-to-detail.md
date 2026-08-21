# Stage S2 — Click-to-detail panels: EAIP Arch + Rev Arch

> **stage_id:** S2  
> **stage_type:** Phase 1 · Enhancement · content repo (`agbuilder-platform/revolutionize@main`)  
> **author:** Claude (architect · single-author rule)  
> **date:** 2026-06-03  
> **model_recommended:** Claude Sonnet 4.6, thinking mode  
> **model_used_actual:** [AG fills in `lessons.md`]  
> **estimated_size:** M — AG 25–40 min · human review 30 min  
> **merge_mode:** operator-gated — AG opens PR, reports, stops. Operator verifies standalone file in browser, signals. AG merges.  
> **predecessor:** S1 ✅ (mapping locked, commit `662fe75`)  
> **successor:** S3 (timeline reconciliation in SSoT)  

---

## 1. Goal

Add click-to-detail panels to two sections of
`docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html`:

- **EAIP Arch (`sec-earch`)** — each component chip becomes clickable.
  Clicking opens a right-side panel showing that component's inbound +
  outbound connections drawn from `ECONN[]`.
- **Rev Arch (`sec-rarch`)** — each system pcard becomes clickable.
  Clicking opens the panel showing that system's inbound + outbound
  connections drawn from `RCONN[]`.

The panel is bilingual (uses the existing `lang` variable), closes on
Escape or click-outside, and closes automatically when `setLang()` is
called. All edits are within the single self-contained SSoT file.

**Out of scope:** embed mode (hiding the SSoT's own nav when framed by
the app) — that is app-side work, handled in S6.

---

## 2. File in scope

**One file only:**
`docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html`  
Repo: `agbuilder-platform/revolutionize`, branch `main`.  
Read the live file from GitHub before making any edit. Do not edit from
memory or from a cached copy.

---

## 3. Step 0 — Verify ground truth before writing any code

Read the live file and confirm the following. **Report all findings
before proceeding to Step 1.**

**3a. COMPS → ECONN name match**  
`COMPS` (≈ line 266) is `[name, layerID, tag][]`.  
`ECONN` (≈ line 295) is `[from, to, type, proto, pur_en, pur_tr, phase][]`.  
Confirm that the `from`/`to` strings in ECONN exactly match `name`
values in COMPS. Report: how many distinct COMPS names appear in ECONN
as either from or to? (Expected: ≈ 25–30 of 67.)

**3b. RSYS → RCONN system names**  
`RSYS` (≈ line 469) has 5 entries with English name `s.ne`:
"Vision engine", "Execution swarm", "Verification mesh", "Reality loop",
"Meta-cognition".  
`RCONN` (≈ line 494) is `[from, to, type, proto, pur_en, pur_tr, group][]`.  
List which RSYS `.ne` values appear verbatim in RCONN `x[0]`/`x[1]`,
and note any combined form (e.g. "Vision engine + Meta-cognition").

**3c. RCONN granularity**  
Confirm RCONN contains NO individual agent names (e.g. "Founder agent",
"Engineering manager") — only system-level and infrastructure names.
Report yes/no.

**3d. TR name safety check**  
Check `RSYS[2].nt` (Verification mesh, TR). Report whether it uses
`\u2019` (curly right-quote, safe) or ASCII `'` (would break onclick
string args). Note: the implementation below uses integer index
arguments (`showRarchDetail(sIdx)`) so this is informational only.

**3e. Confirm exact line numbers in the live file:**
- Line of `</style>` (style block close)
- Line of `<footer id="footer"></footer>`
- Line of `<script>` (script block open)
- Line of `function setLang(l){`
- Line of `function buildNav(){`
- Line of `setLang('en');` (the invocation at end of script)

Stop after reporting. Proceed to Step 1 only once findings are written.

---

## 4. Step 1 — CSS additions

Insert the following CSS block **immediately before `</style>`**:

```css
/* === detail panel === */
.dpoverlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:199;display:none}
.dpoverlay.vis{display:block}
.dpanel{position:fixed;top:0;right:0;bottom:0;width:420px;max-width:100vw;background:var(--bg2);border-left:1px solid var(--border2);z-index:200;display:none;overflow-y:auto;box-shadow:-8px 0 24px rgba(0,0,0,.5)}
.dpanel.vis{display:flex;flex-direction:column}
.dphdr{padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:var(--bg3);position:sticky;top:0;z-index:1}
.dptitle{font-size:13px;font-weight:600;color:var(--text);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dpsub{font-family:var(--mono);font-size:10px;color:var(--text3);font-weight:400;margin-left:8px;white-space:nowrap}
.dpclose{background:none;border:1px solid var(--border2);color:var(--text2);border-radius:6px;width:28px;height:28px;cursor:pointer;font-size:16px;line-height:1;flex-shrink:0}
.dpclose:hover{border-color:var(--text2);color:var(--text)}
.dpsec{padding:14px 16px}
.dpsec+.dpsec{padding-top:0}
.dpsec-title{font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--text3);margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid var(--border)}
.dprow{background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:8px 10px;margin-bottom:6px;display:grid;grid-template-columns:auto auto;gap:4px 8px;align-items:start}
.dpcomp{font-size:12px;font-weight:500;color:var(--text)}
.dpctype{font-family:var(--mono);font-size:10px;font-weight:700;border-radius:3px;padding:1px 5px;justify-self:end}
.dpproto{font-family:var(--mono);font-size:10.5px;color:var(--blue);grid-column:1/-1}
.dppur{font-size:11px;color:var(--text2);grid-column:1/-1;line-height:1.4}
.dpempty{font-size:12px;color:var(--text3);font-family:var(--mono);padding:6px 0}
@media(max-width:760px){.dpanel{width:100vw;border-left:none;top:auto;height:60vh}}
```

---

## 5. Step 2 — Panel HTML elements

Insert the two lines below **between `<footer id="footer"></footer>` and
`<script>`** — they must appear before the script block so the DOM
elements exist when `setLang('en')` executes.

```html
<div class="dpoverlay" id="dp-overlay" onclick="closeDetail()"></div>
<aside class="dpanel" id="dp-panel"></aside>
```

---

## 6. Step 3 — New JS functions

Insert the following block **immediately before `function buildNav(){`**
(confirmed line from Step 0). Do not alter any existing function.

```javascript
/* --- detail panel --- */
var DL={
 en:{inb:'Inbound connections',outb:'Outbound connections',
     none:'No connections in reference data',layer:'Layer'},
 tr:{inb:'Gelen bağlantılar',outb:'Giden bağlantılar',
     none:'Referans verisinde bağlantı yok',layer:'Katman'}
};
function _dpRow(r,ctypes){
 var pu=lang==='en'?4:5;var c=ctypes[r[2]];var col=c?c[0]:'#6E7681';
 return '<div class="dprow">'
  +'<span class="dpcomp">'+r[0]+' → '+r[1]+'</span>'
  +'<span class="dpctype" style="background:'+col+'22;color:'+col
  +';border:1px solid '+col+'55">'+r[2]+'</span>'
  +'<span class="dpproto">'+r[3]+'</span>'
  +'<span class="dppur">'+r[pu]+'</span></div>';}
function _dpSec(title,rows,ctypes){
 return '<div class="dpsec"><div class="dpsec-title">'+title+'</div>'
  +(rows.length
    ?rows.map(function(r){return _dpRow(r,ctypes);}).join('')
    :'<div class="dpempty">'+DL[lang].none+'</div>')
  +'</div>';}
function showEarchDetail(cIdx){
 var c=COMPS[cIdx],name=c[0],layer=c[1];
 var d=DL[lang];
 var inb=ECONN.filter(function(r){return r[1]===name;});
 var outb=ECONN.filter(function(r){return r[0]===name;});
 var html='<div class="dphdr">'
  +'<span class="dptitle">'+name
  +'<span class="dpsub">'+d.layer+' '+layer+'</span></span>'
  +'<button class="dpclose" onclick="closeDetail()">×</button></div>'
  +_dpSec(d.outb,outb,CTYPES)+_dpSec(d.inb,inb,CTYPES);
 var p=document.getElementById('dp-panel');
 p.innerHTML=html;p.classList.add('vis');
 document.getElementById('dp-overlay').classList.add('vis');}
function showRarchDetail(sIdx){
 var s=RSYS[sIdx];var sysNe=s.ne;
 var d=DL[lang];var title=lang==='en'?s.ne:s.nt;
 var inb=RCONN.filter(function(x){return x[1]===sysNe||x[1].indexOf(sysNe)>=0;});
 var outb=RCONN.filter(function(x){return x[0]===sysNe||x[0].indexOf(sysNe)>=0;});
 var html='<div class="dphdr">'
  +'<span class="dptitle">'+title+'</span>'
  +'<button class="dpclose" onclick="closeDetail()">×</button></div>'
  +_dpSec(d.outb,outb,RCTYPES)+_dpSec(d.inb,inb,RCTYPES);
 var p=document.getElementById('dp-panel');
 p.innerHTML=html;p.classList.add('vis');
 document.getElementById('dp-overlay').classList.add('vis');}
function closeDetail(){
 var p=document.getElementById('dp-panel');
 var o=document.getElementById('dp-overlay');
 if(p)p.classList.remove('vis');if(o)o.classList.remove('vis');}
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeDetail();});
```

**Design notes for AG:**
- `showEarchDetail(cIdx)` — `COMPS.indexOf(c)` in the chip map gives the
  global index; `.filter()` preserves sub-array object references, so
  this is correct by reference equality.
- `showRarchDetail(sIdx)` — uses substring match
  (`x[1].indexOf(sysNe)>=0`) to catch the combined RCONN entry
  "Vision engine + Meta-cognition".
- `DL` is a standalone i18n dict; the existing `T` object is not touched.

---

## 7. Step 4 — Wire onclick into `renderEarch` chips

**str_replace** — the chip-map line inside `renderEarch`. Confirm the
exact text from the live file, then replace:

**Old** (exact):
```
  var chips=comps.map(function(c){var hl=c[2]!=='';return '<span class="chip'+(hl?' hl':'')+'">'+c[0]+(c[2]?' <small style="color:inherit">'+c[2]+'</small>':'')+'</span>';}).join('');
```

**New**:
```
  var chips=comps.map(function(c){var hl=c[2]!=='';var cIdx=COMPS.indexOf(c);return '<span class="chip'+(hl?' hl':'')+'" onclick="showEarchDetail('+cIdx+')" style="cursor:pointer">'+c[0]+(c[2]?' <small style="color:inherit">'+c[2]+'</small>':'')+'</span>';}).join('');
```

Only two additions: `var cIdx=COMPS.indexOf(c);` and the `onclick` +
`style` attributes on the `<span>`. All other content unchanged.

---

## 8. Step 5 — Wire onclick into `renderRarch` pcards

**str_replace** — the RSYS.map block inside `renderRarch`. Confirm the
exact text from the live file, then replace:

**Old** (exact, 3 lines):
```
 var sys=RSYS.map(function(s){
  var chips=s.c.map(function(c){if(c[0]==='#'){return '<span class="grp">'+(lang==='en'?c[1]:c[2])+'</span>';}var mt=c[1]?'<span class="mtag '+MT[c[1]]+'" style="margin-left:5px">'+c[1]+'</span>':'';return '<span class="chip">'+c[0]+mt+'</span>';}).join('');
  return '<div class="pcard"><div class="phead"><span class="pname">'+(lang==='en'?s.ne:s.nt)+'</span><span class="pmeta">'+(lang==='en'?s.te:s.tt)+'</span></div><div class="chips" style="padding:12px 16px">'+chips+'</div></div>';}).join('');
```

**New**:
```
 var sys=RSYS.map(function(s,sIdx){
  var chips=s.c.map(function(c){if(c[0]==='#'){return '<span class="grp">'+(lang==='en'?c[1]:c[2])+'</span>';}var mt=c[1]?'<span class="mtag '+MT[c[1]]+'" style="margin-left:5px">'+c[1]+'</span>':'';return '<span class="chip">'+c[0]+mt+'</span>';}).join('');
  return '<div class="pcard" onclick="showRarchDetail('+sIdx+')" style="cursor:pointer"><div class="phead"><span class="pname">'+(lang==='en'?s.ne:s.nt)+'</span><span class="pmeta">'+(lang==='en'?s.te:s.tt)+'</span></div><div class="chips" style="padding:12px 16px">'+chips+'</div></div>';}).join('');
```

Changes: `function(s)` → `function(s,sIdx)` and `<div class="pcard"` →
`<div class="pcard" onclick="showRarchDetail('+sIdx+')" style="cursor:pointer"`.
The chips map, phead content, and everything else is unchanged.

---

## 9. Step 6 — Close panel on lang switch

**str_replace** the first line of `setLang`. Confirm exact text from the
live file, then:

**Old**:
```
function setLang(l){lang=l;document.getElementById('btn-en').classList.toggle('on',l==='en');document.getElementById('btn-tr').classList.toggle('on',l==='tr');document.documentElement.lang=l;
```

**New**:
```
function setLang(l){closeDetail();lang=l;document.getElementById('btn-en').classList.toggle('on',l==='en');document.getElementById('btn-tr').classList.toggle('on',l==='tr');document.documentElement.lang=l;
```

Only addition: `closeDetail();` prepended inside the function body.

---

## 10. Acceptance criteria

AG confirms each item before opening the PR. Report pass/fail.

**Structural (grep / AST checks on the edited file):**
- [ ] `</style>` block contains all new class names: `.dpoverlay`, `.dpanel`,
  `.dphdr`, `.dptitle`, `.dpsub`, `.dpclose`, `.dpsec`, `.dpsec-title`,
  `.dprow`, `.dpcomp`, `.dpctype`, `.dpproto`, `.dppur`, `.dpempty`
- [ ] `id="dp-overlay"` and `id="dp-panel"` exist in the HTML body,
  **before** the `<script>` opening tag
- [ ] All six new symbols are defined in the script: `DL`, `_dpRow`,
  `_dpSec`, `showEarchDetail`, `showRarchDetail`, `closeDetail`
- [ ] `renderEarch` chip map line contains `COMPS.indexOf(c)` and
  `showEarchDetail`
- [ ] `renderRarch` RSYS map signature contains `,sIdx)` and pcard div
  contains `showRarchDetail`
- [ ] `setLang` body starts with `closeDetail();`
- [ ] `addEventListener('keydown'` appears exactly once in the script

**Functional (Node.js DOM-stub smoke test):**

Run the following minimal test:

```javascript
// smoke.js
const fs = require('fs');
const html = fs.readFileSync('path/to/SSoT.html', 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) throw new Error('No script block found');

// Minimal DOM stub
const els = {};
global.document = {
  getElementById: (id) => {
    if (!els[id]) els[id] = {innerHTML:'',classList:{add:()=>{},remove:()=>{},toggle:()=>{}}};
    return els[id];
  },
  querySelectorAll: () => [],
  documentElement: {lang:''},
  addEventListener: () => {}
};

eval(scriptMatch[1]);

// Verify functions exist
['showEarchDetail','showRarchDetail','closeDetail','DL','_dpRow','_dpSec']
  .forEach(fn => { if (typeof eval(fn) === 'undefined') throw new Error('Missing: '+fn); });

// Exercise each function
setLang('en');           // must not throw
showEarchDetail(14);     // LangGraph (verify actual index in Step 0)
showRarchDetail(0);      // Vision engine
closeDetail();
setLang('tr');
showRarchDetail(2);      // Verification mesh
closeDetail();
console.log('SMOKE PASS');
```

AG must verify the actual COMPS index of "LangGraph" in Step 0 and use
it in the test. Report the index found and the smoke-test outcome.

---

## 11. PR and merge gate

AG opens a PR against `main` of `agbuilder-platform/revolutionize`.  
PR title: `S2: click-to-detail panels — EAIP Arch + Rev Arch`  
PR body must include:
- Step 0 findings (COMPS→ECONN count, RCONN granularity, RSYS[2].nt
  finding, key line numbers)
- Smoke-test result (pass/fail, LangGraph index)
- Structural acceptance items (all checked)

**AG stops after opening the PR.**  
Operator opens the SSoT file **directly in a browser** (no server
required) and runs the 10-point manual check below before signalling
approval. AG merges only after operator approval.

---

## 12. Operator manual verification (standalone browser, pre-merge)

Open the SSoT file directly (`file://` or local HTTP). Run all 10:

1. **EAIP chip click** — Click "EAIP · ARCH" tab → click chip "LangGraph"
   → panel opens on the right; header shows "LangGraph" + "Layer L2";
   outbound section lists ≥ 5 connections (LiteLLM, LlamaIndex, Memori,
   Langfuse, Guardrails AI, Hybrid decision engine, PostgreSQL…).
   Inbound section shows at minimum "FastAPI → LangGraph".

2. **Escape closes** — Press Escape → panel closes.

3. **Lang switch closes** — Click any chip, then click TR toggle →
   panel closes immediately. Click a chip in TR mode → panel opens with
   Turkish purpose strings (`pur_tr`, column index 5 of ECONN).

4. **Click-outside closes** — Open any chip detail → click the dark
   overlay behind the panel → panel closes.

5. **Close button** — Open any chip detail → click × button → panel
   closes.

6. **EAIP no-connection chip** — Click a chip that has no ECONN entries
   (e.g. "Ollama", "n8n", "Temporal", or any L9 infra chip) → panel
   opens; both outbound and inbound sections show the graceful empty
   state message ("No connections in reference data" / "Referans
   verisinde bağlantı yok").

7. **Rev Arch system click** — Click "REVOLUTIONIZE · ARCH" tab → click
   the "Vision engine" system card → panel opens; outbound section
   shows ≥ 1 RCONN connection for "Vision engine".

8. **Meta-cognition empty outbound** — Click "Meta-cognition" system
   card → panel opens; outbound section shows 0 direct connections
   (graceful empty state); inbound section shows the "Vision engine +
   Meta-cognition → reality feed" combined entry (because substring
   match catches "Meta-cognition" inside that RCONN from-string).

9. **Unaffected tabs** — Click through Big Picture, EAIP Conn, EAIP
   Sched, Rev Conn, Rev Sched → confirm each renders exactly as before;
   no panel interference, no broken layout.

10. **SSoT nav intact** — The internal tab bar at the top of the SSoT
    (`div.tabs`) is still visible and working. S2 does not hide it.
    (That is S6.)

---

## 13. Lessons.md

After merge, AG appends to `docs/process/lessons.md` (create if absent):

```
## S2 — Click-to-detail panels: EAIP Arch + Rev Arch
### AG delivery summary
Model: [model used] · Lines changed: [N] · PR: [#N] · Merge SHA: [sha]
Step 0: [X] COMPS names in ECONN; RCONN system-level only: [yes/no];
RSYS[2].nt apostrophe type: [U+2019 / ASCII]; LangGraph COMPS index: [N].
Smoke test: showEarchDetail([N]) [✅/❌] · showRarchDetail(0) [✅/❌] · closeDetail() [✅/❌]
Structural checks: [all pass / list failures]
### Operator review
[Maymun fills in — outcome of 10-point browser check]
### Prompt-author retrospective
[Claude fills in next session]
```

---

## 14. What S2 does NOT touch

- SSoT header / nav / `.hdr` — not hidden; embed mode is S6 (app-side)
- Section entry-point (`switchTab` on load) — S6
- `T[lang]` object — not modified; `DL` is a separate panel-only dict
- `08_leadership_charter_bilingual.html` — untouched
- `app/_data/*.ts`, React components — Phase 2 (S6–S8)
- Any file other than the single SSoT HTML file
