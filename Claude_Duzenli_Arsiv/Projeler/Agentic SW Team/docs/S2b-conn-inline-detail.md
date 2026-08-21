# Stage S2b — Inline connection detail rows: EAIP Conn + Rev Conn

> **stage_id:** S2b
> **stage_type:** Phase 1 · Enhancement · content repo (`agbuilder-platform/revolutionize@main`)
> **author:** Claude (architect · single-author rule)
> **date:** 2026-06-03
> **model_recommended:** Claude Sonnet 4.6, thinking mode
> **model_used_actual:** [AG fills in `lessons.md`]
> **estimated_size:** M — AG 20–30 min · human review 20 min
> **merge_mode:** operator-gated — AG opens PR, reports, stops. Operator opens file standalone in browser, runs manual check, signals. AG merges.
> **predecessor:** S2 ✅ (must be merged before this stage runs)
> **successor:** S3-S5

---

## 1. Goal

Add **inline row expansion** to both connectivity tables in
`docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html`.

- **EAIP Conn (`sec-econn`)** — clicking any row in the filterable ECONN
  table expands a detail panel **immediately below that row** (a hidden
  `<tr class="cdr">` becomes visible). The panel shows: connection type
  badge + its full bilingual description (from `CTYPES`), protocol string,
  full purpose (EN or TR per current `lang`), and phase badge.
- **Rev Conn (`sec-rconn`)** — same treatment for the RCONN table, using
  `RCTYPES` for type description and `RGROUPS` for the group label.

**Inline only — no drawer, no overlay, no right-side panel.** The S2
`dpanel`/`dpoverlay` mechanism handles Architecture tabs; this stage is
entirely separate and must not touch S2's code.

Only one detail row is open at a time per table. Clicking the same row
again collapses it. Clicking a different row collapses the previous and
opens the new one. Filter changes and language switches automatically
collapse all detail rows (because the entire tbody is re-rendered).
Escape key closes any open detail row on either table.

---

## 2. File in scope

**One file only:**
`docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html`
Repo: `agbuilder-platform/revolutionize`, branch `main`.
Read the live file from GitHub before any edit. Do not use a cached copy.

---

## 3. Step 0 — Verify ground truth before writing any code

Read the live file and report **all** of the following before proceeding.

**3a. S2 merge check**
Confirm `showEarchDetail` exists in the script block. If absent, **stop** —
S2 must be merged first.

**3b. Confirm no naming conflicts**
- `grep 'openEconnRow\|openRconnRow\|CDL\|_ecdRow\|_rcdRow\|toggleEconn\|toggleRconn\|closeEconn\|closeRconn\|cdr\b\|ctr-active\|cdata'`
  across the full file. Report count. All expected to be **0 hits**.

**3c. Confirm exact text of `renderEconnTable`**
Expected (6 lines, unchanged since S2):
```
function renderEconnTable(){var e=T[lang].econn,pu=lang==='en'?4:5;
 var q=(document.getElementById('eq')||{}).value||'';q=q.toLowerCase();
 var ty=(document.getElementById('ety')||{}).value||'';var ph=(document.getElementById('eph')||{}).value||'';
 var rows=ECONN.filter(function(r){return (!ty||r[2]===ty)&&(!ph||r[6]===ph)&&(!q||(r[0]+r[1]+r[2]+r[3]+r[4]).toLowerCase().indexOf(q)>=0);});
 document.getElementById('etb').innerHTML=rows.map(function(r){var c=CTYPES[r[2]][0],p=EPH[r[6]];
  return '<tr><td class="cfrom">'+r[0]+'</td><td class="carr">→</td><td class="cto">'+r[1]+'</td><td><span class="cty" style="background:'+c+'22;color:'+c+';border:1px solid '+c+'55">'+r[2]+'</span></td><td class="cproto">'+r[3]+'</td><td class="cpu">'+r[pu]+'</td><td><span class="cph" style="background:'+p[0]+'22;color:'+p[0]+';border:1px solid '+p[0]+'55">'+p[lang==='en'?1:2]+'</span></td></tr>';}).join('');
 document.getElementById('ecnt').textContent=rows.length+' / '+ECONN.length+' '+e.cnt;}
```
Report: does the live file match exactly? If it differs, show the diff and stop.

**3d. Confirm exact text of `renderRconnTable`**
Expected (6 lines, unchanged since S2):
```
function renderRconnTable(){var r=T[lang].rconn,pu=lang==='en'?4:5;
 var q=(document.getElementById('rq')||{}).value||'';q=q.toLowerCase();
 var ty=(document.getElementById('rty')||{}).value||'';var gr=(document.getElementById('rgr')||{}).value||'';
 var rows=RCONN.filter(function(x){return (!ty||x[2]===ty)&&(!gr||x[6]===gr)&&(!q||(x[0]+x[1]+x[2]+x[3]+x[4]).toLowerCase().indexOf(q)>=0);});
 document.getElementById('rtb').innerHTML=rows.map(function(x){var c=RCTYPES[x[2]][0];
  return '<tr><td class="cfrom">'+x[0]+'</td><td class="carr">→</td><td class="cto">'+x[1]+'</td><td><span class="cty" style="background:'+c+'22;color:'+c+';border:1px solid '+c+'55">'+x[2]+'</span></td><td class="cproto" style="color:var(--purple)">'+x[3]+'</td><td class="cpu">'+x[pu]+'</td><td><span class="cgrp">'+RGROUPS[x[6]][lang==='en'?0:1]+'</span></td></tr>';}).join('');
 document.getElementById('rcnt').textContent=rows.length+' / '+RCONN.length+' '+r.cnt;}
```
Report: exact match or diff + stop.

**3e. Confirm exact text of Escape keydown listener (added by S2)**
Expected single line:
```
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeDetail();});
```
Report the line number and exact text found.

**3f. Spot-check data indices**
Verify these by inspection — report each:
- `CTYPES.REST` → index 0 = `'#388BFD'`, index 1 starts `'Synchronous'`, index 2 starts `'Eşzamanlı'`
- `RCTYPES['IN-PROC']` → index 0 = `'#A371F7'`, index 1 starts `'In-process'`, index 2 starts `'Süreç-içi'`
- `EPH.core` → index 0 = `'#58A6FF'`, index 1 = `'Platform Core'`, index 2 = `'Çekirdek Platform'`
- `RGROUPS.gw` → index 0 = `'LLM gateway'`, index 1 = `'LLM ağ geçidi'`
- `ECONN[0][2]` (type of first ECONN row) = `'WEBHOOK'`
- `RCONN[0][2]` (type of first RCONN row) = `'IN-PROC'`

**Stop after reporting all findings. Proceed to Step 1 only once verified.**

---

## 4. Step 1 — CSS additions

**str_replace** — append immediately before `</style>`. The anchor is the
last line of the S2 CSS block + `</style>`:

**Old** (confirm exact from live file — the last S2 CSS line):
```
@media(max-width:760px){.dpanel{width:100vw;border-left:none;top:auto;height:60vh}}
</style>
```

**New:**
```
@media(max-width:760px){.dpanel{width:100vw;border-left:none;top:auto;height:60vh}}
/* === inline connection detail rows === */
.cdata{cursor:pointer}
.cdata:hover td{background:rgba(255,255,255,.025)}
.ctr-active td{background:var(--bg3);border-bottom:none}
.cdr{display:none}
.cdr.vis{display:table-row;background:var(--bg3)}
.cdr td{padding:14px 16px;border-bottom:2px solid var(--border2);border-top:1px solid var(--border)}
.cdr-inner{display:grid;grid-template-columns:1fr 1fr;gap:10px 24px}
.cdr-label{font-family:var(--mono);font-size:9.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--text3);margin-bottom:5px}
.cdr-tdesc{font-size:11.5px;color:var(--text2);line-height:1.5}
.cdr-proto{font-family:var(--mono);font-size:11.5px;color:var(--blue);line-height:1.4}
.cdr-value{font-size:12px;color:var(--text2);line-height:1.55}
@media(max-width:760px){.cdr-inner{grid-template-columns:1fr}}
</style>
```

---

## 5. Step 2 — New JS state + helpers (insert before `function buildNav()`)

**str_replace** — the exact Escape listener line + `function buildNav(){`.
This replaces the S2 Escape handler (single-line close) with an extended
version that also closes inline rows, and inserts all new functions.

**Old** (exact — confirmed in Step 0e):
```
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeDetail();});
function buildNav(){
```

**New:**
```
document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeDetail();closeEconn();closeRconn();}});
/* --- inline connection detail rows --- */
var openEconnRow=-1,openRconnRow=-1;
var CDL={
 en:{type:'Connection type',proto:'Protocol',purpose:'Purpose',phase:'Phase',group:'Group'},
 tr:{type:'Bağlantı türü',proto:'Protokol',purpose:'Amaç',phase:'Faz',group:'Grup'}
};
function _ecdRow(r){
 var ct=CTYPES[r[2]],col=ct?ct[0]:'#6E7681',desc=ct?(lang==='en'?ct[1]:ct[2]):'';
 var p=EPH[r[6]],phCol=p?p[0]:'#6E7681',phLbl=p?(lang==='en'?p[1]:p[2]):r[6];
 var pur=lang==='en'?r[4]:r[5],d=CDL[lang];
 return '<tr class="cdr"><td colspan="7"><div class="cdr-inner">'
  +'<div><div class="cdr-label">'+d.type+'</div>'
  +'<div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:10px">'
  +'<span class="cty" style="background:'+col+'22;color:'+col+';border:1px solid '+col+'55;flex-shrink:0">'+r[2]+'</span>'
  +'<span class="cdr-tdesc">'+desc+'</span></div>'
  +'<div class="cdr-label">'+d.proto+'</div>'
  +'<div class="cdr-proto">'+r[3]+'</div></div>'
  +'<div><div class="cdr-label">'+d.purpose+'</div>'
  +'<div class="cdr-value" style="margin-bottom:10px">'+pur+'</div>'
  +'<div class="cdr-label">'+d.phase+'</div>'
  +'<span class="cph" style="background:'+phCol+'22;color:'+phCol+';border:1px solid '+phCol+'55">'+phLbl+'</span>'
  +'</div></div></td></tr>';}
function _rcdRow(x){
 var ct=RCTYPES[x[2]],col=ct?ct[0]:'#6E7681',desc=ct?(lang==='en'?ct[1]:ct[2]):'';
 var grp=RGROUPS[x[6]],grpLbl=grp?(lang==='en'?grp[0]:grp[1]):x[6];
 var pur=lang==='en'?x[4]:x[5],d=CDL[lang];
 return '<tr class="cdr"><td colspan="7"><div class="cdr-inner">'
  +'<div><div class="cdr-label">'+d.type+'</div>'
  +'<div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:10px">'
  +'<span class="cty" style="background:'+col+'22;color:'+col+';border:1px solid '+col+'55;flex-shrink:0">'+x[2]+'</span>'
  +'<span class="cdr-tdesc">'+desc+'</span></div>'
  +'<div class="cdr-label">'+d.proto+'</div>'
  +'<div class="cdr-proto" style="color:var(--purple)">'+x[3]+'</div></div>'
  +'<div><div class="cdr-label">'+d.purpose+'</div>'
  +'<div class="cdr-value" style="margin-bottom:10px">'+pur+'</div>'
  +'<div class="cdr-label">'+d.group+'</div>'
  +'<span class="cgrp">'+grpLbl+'</span>'
  +'</div></div></td></tr>';}
function toggleEconn(i){
 var dr=document.querySelectorAll('#etb .cdr'),cr=document.querySelectorAll('#etb .cdata');
 if(openEconnRow===i){
  if(dr[i])dr[i].classList.remove('vis');if(cr[i])cr[i].classList.remove('ctr-active');openEconnRow=-1;
 } else {
  if(openEconnRow>=0){if(dr[openEconnRow])dr[openEconnRow].classList.remove('vis');if(cr[openEconnRow])cr[openEconnRow].classList.remove('ctr-active');}
  if(dr[i])dr[i].classList.add('vis');if(cr[i])cr[i].classList.add('ctr-active');openEconnRow=i;}}
function toggleRconn(i){
 var dr=document.querySelectorAll('#rtb .cdr'),cr=document.querySelectorAll('#rtb .cdata');
 if(openRconnRow===i){
  if(dr[i])dr[i].classList.remove('vis');if(cr[i])cr[i].classList.remove('ctr-active');openRconnRow=-1;
 } else {
  if(openRconnRow>=0){if(dr[openRconnRow])dr[openRconnRow].classList.remove('vis');if(cr[openRconnRow])cr[openRconnRow].classList.remove('ctr-active');}
  if(dr[i])dr[i].classList.add('vis');if(cr[i])cr[i].classList.add('ctr-active');openRconnRow=i;}}
function closeEconn(){if(openEconnRow>=0)toggleEconn(openEconnRow);}
function closeRconn(){if(openRconnRow>=0)toggleRconn(openRconnRow);}
function buildNav(){
```

---

## 6. Step 3 — Modify `renderEconnTable`

**str_replace** — replace the entire function. Confirm exact match against
Step 0c before replacing.

**Old** (6 lines — exact from Step 0c):
```
function renderEconnTable(){var e=T[lang].econn,pu=lang==='en'?4:5;
 var q=(document.getElementById('eq')||{}).value||'';q=q.toLowerCase();
 var ty=(document.getElementById('ety')||{}).value||'';var ph=(document.getElementById('eph')||{}).value||'';
 var rows=ECONN.filter(function(r){return (!ty||r[2]===ty)&&(!ph||r[6]===ph)&&(!q||(r[0]+r[1]+r[2]+r[3]+r[4]).toLowerCase().indexOf(q)>=0);});
 document.getElementById('etb').innerHTML=rows.map(function(r){var c=CTYPES[r[2]][0],p=EPH[r[6]];
  return '<tr><td class="cfrom">'+r[0]+'</td><td class="carr">→</td><td class="cto">'+r[1]+'</td><td><span class="cty" style="background:'+c+'22;color:'+c+';border:1px solid '+c+'55">'+r[2]+'</span></td><td class="cproto">'+r[3]+'</td><td class="cpu">'+r[pu]+'</td><td><span class="cph" style="background:'+p[0]+'22;color:'+p[0]+';border:1px solid '+p[0]+'55">'+p[lang==='en'?1:2]+'</span></td></tr>';}).join('');
 document.getElementById('ecnt').textContent=rows.length+' / '+ECONN.length+' '+e.cnt;}
```

**New** (7 lines — two changes: `openEconnRow=-1;` added at top; `.map(function(r)` → `.map(function(r,i)` and return now emits data row + `_ecdRow(r)` pair; `<tr>` → `<tr class="cdata" onclick="toggleEconn('+i+')">`):
```
function renderEconnTable(){var e=T[lang].econn,pu=lang==='en'?4:5;
 openEconnRow=-1;
 var q=(document.getElementById('eq')||{}).value||'';q=q.toLowerCase();
 var ty=(document.getElementById('ety')||{}).value||'';var ph=(document.getElementById('eph')||{}).value||'';
 var rows=ECONN.filter(function(r){return (!ty||r[2]===ty)&&(!ph||r[6]===ph)&&(!q||(r[0]+r[1]+r[2]+r[3]+r[4]).toLowerCase().indexOf(q)>=0);});
 document.getElementById('etb').innerHTML=rows.map(function(r,i){var c=CTYPES[r[2]][0],p=EPH[r[6]];
  return '<tr class="cdata" onclick="toggleEconn('+i+')"><td class="cfrom">'+r[0]+'</td><td class="carr">→</td><td class="cto">'+r[1]+'</td><td><span class="cty" style="background:'+c+'22;color:'+c+';border:1px solid '+c+'55">'+r[2]+'</span></td><td class="cproto">'+r[3]+'</td><td class="cpu">'+r[pu]+'</td><td><span class="cph" style="background:'+p[0]+'22;color:'+p[0]+';border:1px solid '+p[0]+'55">'+p[lang==='en'?1:2]+'</span></td></tr>'
  +_ecdRow(r);}).join('');
 document.getElementById('ecnt').textContent=rows.length+' / '+ECONN.length+' '+e.cnt;}
```

---

## 7. Step 4 — Modify `renderRconnTable`

**str_replace** — replace the entire function. Confirm exact match against
Step 0d before replacing.

**Old** (6 lines — exact from Step 0d):
```
function renderRconnTable(){var r=T[lang].rconn,pu=lang==='en'?4:5;
 var q=(document.getElementById('rq')||{}).value||'';q=q.toLowerCase();
 var ty=(document.getElementById('rty')||{}).value||'';var gr=(document.getElementById('rgr')||{}).value||'';
 var rows=RCONN.filter(function(x){return (!ty||x[2]===ty)&&(!gr||x[6]===gr)&&(!q||(x[0]+x[1]+x[2]+x[3]+x[4]).toLowerCase().indexOf(q)>=0);});
 document.getElementById('rtb').innerHTML=rows.map(function(x){var c=RCTYPES[x[2]][0];
  return '<tr><td class="cfrom">'+x[0]+'</td><td class="carr">→</td><td class="cto">'+x[1]+'</td><td><span class="cty" style="background:'+c+'22;color:'+c+';border:1px solid '+c+'55">'+x[2]+'</span></td><td class="cproto" style="color:var(--purple)">'+x[3]+'</td><td class="cpu">'+x[pu]+'</td><td><span class="cgrp">'+RGROUPS[x[6]][lang==='en'?0:1]+'</span></td></tr>';}).join('');
 document.getElementById('rcnt').textContent=rows.length+' / '+RCONN.length+' '+r.cnt;}
```

**New** (7 lines — same two-change pattern as ECONN):
```
function renderRconnTable(){var r=T[lang].rconn,pu=lang==='en'?4:5;
 openRconnRow=-1;
 var q=(document.getElementById('rq')||{}).value||'';q=q.toLowerCase();
 var ty=(document.getElementById('rty')||{}).value||'';var gr=(document.getElementById('rgr')||{}).value||'';
 var rows=RCONN.filter(function(x){return (!ty||x[2]===ty)&&(!gr||x[6]===gr)&&(!q||(x[0]+x[1]+x[2]+x[3]+x[4]).toLowerCase().indexOf(q)>=0);});
 document.getElementById('rtb').innerHTML=rows.map(function(x,i){var c=RCTYPES[x[2]][0];
  return '<tr class="cdata" onclick="toggleRconn('+i+')"><td class="cfrom">'+x[0]+'</td><td class="carr">→</td><td class="cto">'+x[1]+'</td><td><span class="cty" style="background:'+c+'22;color:'+c+';border:1px solid '+c+'55">'+x[2]+'</span></td><td class="cproto" style="color:var(--purple)">'+x[3]+'</td><td class="cpu">'+x[pu]+'</td><td><span class="cgrp">'+RGROUPS[x[6]][lang==='en'?0:1]+'</span></td></tr>'
  +_rcdRow(x);}).join('');
 document.getElementById('rcnt').textContent=rows.length+' / '+RCONN.length+' '+r.cnt;}
```

---

## 8. Acceptance criteria

AG confirms each item before opening the PR. Report pass/fail for each.

**Structural (grep on the edited file):**
- [ ] CSS block contains all new class names: `.cdata`, `.ctr-active`, `.cdr`,
  `.cdr-inner`, `.cdr-label`, `.cdr-tdesc`, `.cdr-proto`, `.cdr-value`
- [ ] `var openEconnRow=-1,openRconnRow=-1` present in script
- [ ] `var CDL=` present in script
- [ ] All eight symbols defined: `_ecdRow`, `_rcdRow`, `toggleEconn`, `toggleRconn`,
  `closeEconn`, `closeRconn`, `CDL`, `openEconnRow`
- [ ] `renderEconnTable` now contains `openEconnRow=-1` and `toggleEconn`
- [ ] `renderRconnTable` now contains `openRconnRow=-1` and `toggleRconn`
- [ ] Escape handler now reads `closeDetail();closeEconn();closeRconn();`
  (single `addEventListener('keydown'` — not duplicated)
- [ ] `showEarchDetail` still present (S2 work untouched)
- [ ] `dpoverlay`, `dpanel` elements still present in HTML body (S2 work untouched)

**Functional — Node.js smoke test:**

```javascript
// smoke-s2b.js
const fs = require('fs');
const html = fs.readFileSync('path/to/SSoT.html', 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) throw new Error('No script block');

const els = {};
global.document = {
  getElementById: id => {
    if (!els[id]) els[id] = {
      innerHTML:'', value:'', textContent:'',
      classList:{add:()=>{},remove:()=>{},toggle:()=>{}},
      querySelectorAll:()=>[]
    };
    return els[id];
  },
  querySelectorAll: () => [],
  documentElement: {lang:''},
  addEventListener: () => {}
};

eval(scriptMatch[1]);

// New symbols exist
['CDL','_ecdRow','_rcdRow','toggleEconn','toggleRconn',
 'closeEconn','closeRconn','openEconnRow','openRconnRow']
  .forEach(fn => {
    if (typeof eval(fn) === 'undefined') throw new Error('Missing: ' + fn);
  });

// State variables initialised to -1
if (openEconnRow !== -1) throw new Error('openEconnRow must start at -1');
if (openRconnRow !== -1) throw new Error('openRconnRow must start at -1');

// S2 symbols untouched
['showEarchDetail','showRarchDetail','closeDetail','DL']
  .forEach(fn => {
    if (typeof eval(fn) === 'undefined') throw new Error('S2 symbol missing: ' + fn);
  });

// _ecdRow output for first ECONN row
setLang('en');
var out = _ecdRow(ECONN[0]);
if (!out.includes('class="cdr"')) throw new Error('_ecdRow missing .cdr class');
if (!out.includes('WEBHOOK'))     throw new Error('_ecdRow missing type badge');
if (!out.includes('Connection type')) throw new Error('_ecdRow missing EN label');

// _rcdRow output for first RCONN row
var rout = _rcdRow(RCONN[0]);
if (!rout.includes('class="cdr"')) throw new Error('_rcdRow missing .cdr class');
if (!rout.includes('IN-PROC'))     throw new Error('_rcdRow missing type badge');

// Lang switch — TR labels appear
setLang('tr');
var outr = _ecdRow(ECONN[0]);
if (!outr.includes('Bağlantı türü')) throw new Error('_ecdRow missing TR label');
if (openEconnRow !== -1) throw new Error('openEconnRow not reset by setLang→renderEconnTable');

// toggleEconn with empty DOM (must not throw, even with no real rows)
setLang('en');
openEconnRow = -1;
toggleEconn(0); // dr[0] undefined → guarded by if(dr[i])
toggleEconn(0); // same — toggle off path

console.log('SMOKE PASS');
```

AG runs the test, reports the outcome and any failures.

---

## 9. PR and merge gate

PR title: `S2b: inline connection detail rows — EAIP Conn + Rev Conn`

PR body must include:
- Step 0 findings (naming conflict grep count, exact-match confirmations for
  both render functions, Escape handler line number, data index spot-check)
- Smoke test outcome (SMOKE PASS or failure with output)
- Structural acceptance items (all checked)

**AG stops after opening the PR.**
Operator opens the SSoT file directly in a browser (`file://`) and runs
the 10-point manual check below. AG merges only after operator signals
approval.

---

## 10. Operator manual verification (standalone browser, pre-merge)

Open the file directly (`file://` or local HTTP). Run all 10:

1. **EAIP Conn row click** — Click "EAIP · CONN" tab → click any row →
   a detail panel expands **inline below** that row (not a sidebar, not a
   modal). Panel shows: type badge in colour + type description sentence,
   protocol string in monospace blue, full purpose text, phase badge.

2. **Toggle collapse** — Click the same row again → inline panel collapses.
   The row returns to its normal appearance.

3. **One-at-a-time** — Click row A → panel open; click row B → A collapses,
   B expands. Only one detail row visible at a time.

4. **Active row highlight** — The clicked (open) data row has a distinct
   background (`--bg3`) and no bottom border, so it visually merges with
   the detail row below it.

5. **Filter resets state** — With a detail row open, type anything in the
   search box → table re-renders; no detail row is open. Click a filtered
   row → detail expands correctly for that filtered connection.

6. **Escape closes** — With any EAIP Conn detail open, press Escape →
   detail collapses. S2 right-side panel (EAIP Arch chip) also still closes
   on Escape (regression check).

7. **EN / TR toggle** — With a detail open, click the TR button → table
   re-renders; detail is closed; labels are now Turkish (`Bağlantı türü`,
   `Protokol`, `Amaç`, `Faz`). Click a row in TR mode → detail shows
   Turkish purpose text and phase label.

8. **Rev Conn row click** — Click "REV · CONN" tab → click any row → inline
   detail expands showing RCTYPES description and group label (not phase).
   Click an `IN-PROC` row → description reads
   "In-process function call. No network hop, no serialization." in EN.

9. **EAIP Arch chip click** — Switch to "EAIP · ARCH" tab → click any chip →
   S2 right-side panel opens with connection list. Confirm S2b did not
   interfere (panel still works, no JS errors in console).

10. **All other tabs** — Big Picture, EAIP Plan, Rev Arch, Rev Plan — render
    normally. No console errors. No layout regressions.

---

## 11. Lessons.md

After merge, AG appends to `docs/process/lessons.md`:

```
## S2b — Inline connection detail rows: EAIP Conn + Rev Conn
### AG delivery summary
Model: [model] · Lines changed: [N] · PR: [#N] · Merge SHA: [sha]
Step 0: S2 present: yes · naming conflicts: 0 · renderEconnTable match: [✅/❌]
renderRconnTable match: [✅/❌] · Escape handler line: [N]
Spot-checks: CTYPES.REST[0]=#388BFD [✅/❌] · RCTYPES.IN-PROC[0]=#A371F7 [✅/❌]
EPH.core[1]=Platform Core [✅/❌] · RGROUPS.gw[0]=LLM gateway [✅/❌]
Smoke: _ecdRow ✅/❌ · _rcdRow ✅/❌ · TR labels ✅/❌ · openEconnRow reset ✅/❌
Structural checks: [all pass / list failures]
### Operator review
[Maymun fills in — outcome of 10-point browser check]
### Prompt-author retrospective
[Claude fills in next session]
```

---

## 12. What S2b does NOT touch

- `showEarchDetail`, `showRarchDetail`, `closeDetail`, `DL`, `_dpRow`, `_dpSec`
  (S2 work — preserve exactly)
- `dpoverlay`, `dpanel` HTML elements and their CSS (S2 work — do not touch)
- `renderEarch`, `renderRarch` (S2 wired onclick — do not touch)
- `renderBig`, `renderEconn`, `renderRconn`, `renderEplan`, `renderRplan`
  outer functions — only the inner `renderEconnTable` / `renderRconnTable`
  sub-functions are modified
- `setLang` body — no modification needed; calling `renderEconn()` /
  `renderRconn()` triggers `renderEconnTable()` / `renderRconnTable()` which
  each reset their open-row counter as their first statement
- `switchTab`, `buildNav`, `typeKey` — untouched
- `COMPS`, `ECONN`, `RCONN`, `CTYPES`, `RCTYPES`, `EPH`, `RGROUPS` — data
  arrays, read-only, never modified
- HTML body, `<footer>`, section elements, `dp-overlay`, `dp-panel` — untouched
- `08_leadership_charter_bilingual.html` — untouched
- App repo (`maymun207/TheBluePrint23`) — Phase 2, S6–S7
