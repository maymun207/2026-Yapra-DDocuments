# Stage S2f — Phase filter + summary cards on both Architecture tabs

> **stage_id:** S2f
> **stage_type:** Phase 1 · UX restoration · content repo
>   (`agbuilder-platform/revolutionize@main`)
> **author:** Claude (architect · single-author rule)
> **date:** 2026-06-04
> **model_recommended:** Claude Sonnet 4.6, thinking mode
> **model_used_actual:** [AG fills in `lessons.md`]
> **estimated_size:** L — AG 90–120 min · human review 45 min
> **merge_mode:** operator-gated — AG opens PR, AG reports, stops. Operator
>   spot-checks the filter behaviour in standalone browser + Vercel preview,
>   signals. AG merges.
> **predecessor:** S6-S7 ✅ (migration complete — SSoT is the deliverable)
> **successor:** S2e (progress tracker — separate workstream, late M0)

---

## 1. Goal

Restore the v5 Architecture-tab phase filter UX, which was the most useful
"narrow-down-the-noise" feature for developers asking *"what do I focus on
for THIS phase?"* The original v6 + the React tabs both missed it. Now
that the migration is complete and the SSoT is the deliverable, the filter
lives in one place and propagates to every tab in TheBluePrint23.

**Four sub-deliverables, bundled into one PR:**

1. **Per-component phase data** — re-extract from v5 SSoT (EAIP side) and
   author from architect intent (Rev side).
2. **EAIP Arch phase filter** — 7 phase chips (+ External + Turn All Off
   master) above the layer rows. Hours shown per chip (from EPLAN).
3. **Rev Arch phase filter** — 8 phase chips (Phase 1–8) + Turn All Off
   master. Month ranges shown per chip (from RGANTT).
4. **Phase summary cards** — a row of cards between each filter and the
   architecture grid below, showing each phase's month range, name, and
   one-line summary (from EPLAN.out_en for EAIP; from RPH.oe + composed
   Phase 1 entry for Rev).

Filter behavior matches v5:
- Default state: all phases on → no dimming
- Some phases off: matching chips at opacity 1, scale 1.02; non-matching
  at opacity 0.18, normal scale
- Turn All Off → all chips dimmed
- Toggle text flips: "Turn All Off" ↔ "Turn All On"
- Filter state independent of language toggle; labels re-render in
  current `lang`
- Cookbook click-to-detail (S2/S2c/S2d.1/S2d.2) preserved on dimmed and
  highlighted chips alike

---

## 2. File in scope

**One file:**
`docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html`

Read the live file from GitHub before any edit. **Also requires read
access** to `ARDICTECH_Platform_v5_SSoT.html` (same path, content repo) —
data source for EAIP component-level `phase` extraction.

---

## 3. Step 0 — Verify ground truth

Report each, stop on any mismatch.

**3a.** All cookbook symbols present in script:
`COMPDATA`, `OWNER_COLOR`, `showEarchDetail`, `openComp`, `_cbDeploy`,
`_cbConfig`, `_cbSample`, `_cbOps`, `_cbErrors`. If missing, stop.

**3b.** Naming-conflict grep — all expected **0 hits**:
`COMPDATA_PHASE`, `RCOMP_PHASE`, `activeEarchPhases`, `activeRarchPhases`,
`toggleEarchPhase`, `toggleRarchPhase`, `toggleAllEarchPhases`,
`toggleAllRarchPhases`, `applyEarchFilter`, `applyRarchFilter`,
`renderEarchFilter`, `renderRarchFilter`, `renderEarchCards`,
`renderRarchCards`, `_phaseHours`, `pf-chip`, `pf-cards`, `pf-card`,
`pf-master`, `pf-dot`, `data-phase`.

**3c.** Verify COMPDATA has exactly 67 entries; none currently have a
`phase` field (this stage adds it). Report counts of:
- `COMPDATA[name].phase` defined (expected: 0)
- COMPS total (expected: 67)

**3d.** Verify v5 SSoT presence and component count: `grep -cE "^\{id:'[^']+',name:'[^']+'"` must return 67.

**3e.** Spot-check v5 phase field on three components by dumping their
records:
- `Channel Gateway` → expect `phase:'core'`
- `ARMES MES` → expect `phase:'cwf1'`
- `Kubernetes` → expect `phase:'core'` (per v5's deploy/core grouping)

If v5 schema differs from expectation, stop and report.

**3f.** Pattern #16 reminder. Author note: this stage's data block contains
no `</script>` sequences (verified). AG should still grep the inserted
content before merge as a hygiene check.

---

## 4. Step 1 — Extract `phase` from v5 into COMPDATA

Use the vm-sandbox pattern from S2c. One-off script
`scripts/_extract_phase.js`:

1. Read v5 SSoT, extract its rich component array (the one matching
   `^\{id:'[^']+',name:'[^']+'`).
2. For each v5 entry, output a `{ <v6-name>: <phase> }` mapping. Use the
   §3f V5↔V6 name reconciliation table from S2c (the same five
   substantive renames apply here — `SMB Crawler (NiFi)` →
   `NiFi SMB crawler`, `Exchange / Graph API` → `Exchange / Graph`,
   `SAP BW/S4/BPC` → `SAP`, `Loki + OTel Collector` → `Loki + OTel`,
   plus 14 case-normalisations).
3. For each v5 entry where `phase` is null, undefined, empty, or
   `'ext'` → map to `'ext'` (External category).
4. Emit final result as `COMPDATA_PHASE = { ... }` — a flat object with
   exactly 67 keys, every value drawn from
   `{'core','wa','gu','cwf1','ins','cwf2','fin','ext'}`.

Validation: report the distribution. Expected rough shape (v5 was the
authoritative grouping):
- `core` ≈ 30-35 (Platform Core + L9 infra)
- `wa` ≈ 4
- `gu` ≈ 4
- `cwf1` ≈ 8
- `ins` ≈ 5
- `cwf2` ≈ 6
- `fin` ≈ 7
- `ext` ≈ 4-8

Stop and report distribution. Move to Step 2.

---

## 5. Step 2 — Merge `phase` into COMPDATA

Same merge pattern as S2c/S2d.1/S2d.2. Node script reads existing
`COMPDATA` + this stage's `COMPDATA_PHASE`, adds `phase` field to each
entry, re-emits `COMPDATA` literal, deletes staging variable.

Assertion: every COMPDATA entry must now have `phase` set; any value
must be one of `{'core','wa','gu','cwf1','ins','cwf2','fin','ext'}`.

Report final state: 67 entries, all phased.

---

## 6. Step 3 — Author Rev component phase mapping

Insert this verbatim immediately after `COMPDATA` (after Step 2's merge
finishes). This is the architect's mapping of every Rev agent to its
primary build phase. Phase keys correspond to RGANTT row indices `'p1'`
through `'p8'`.

```javascript
/* --- Rev agent → primary build phase (architect's mapping) ---
   The phase a Rev agent is FIRST built in. Many agents continue running
   across later phases; this records introduction. Phase 4 is deliberately
   empty — it's calendar-bound shadow validation of Phase 3's cells. */
var RCOMP_PHASE={
 /* Vision engine — Phase 2 (Vision engine + Empathy stand up) */
 'Founder agent':'p2',
 'Empathy engine · OASIS':'p2',
 'Market sensor':'p2',
 'Intent synthesiser':'p2',

 /* Execution swarm v1 — Phase 1 (foundation specialised agents) */
 'Engineering manager':'p1',
 'Solution architect':'p1',
 'Frontend agent':'p1',
 'Backend agent':'p1',
 'Database agent':'p1',
 'DevOps agent':'p1',

 /* Execution swarm v2 — Phase 3 (Speculation introduces cellular) */
 'Speculation orchestrator':'p3',
 'Engineering cells':'p3',
 'Capability composer':'p3',
 'Tournament selector':'p3',
 'Cell pool manager':'p3',

 /* Verification mesh — split: basics in Phase 1, formal in Phase 5 */
 'Code reviewer · 6-dim':'p1',
 'Test generator':'p1',
 'Security agent':'p1',
 'Performance agent':'p1',
 'Spec author · TLA+/Alloy':'p5',
 'Verifier · formal':'p5',
 'Red team agent':'p5',
 'Taste evaluator':'p5',

 /* Reality loop — observer in Phase 2, production-side in Phase 6 */
 'Reality observer':'p2',
 'Support synthesiser':'p6',
 'Experiment runner':'p6',
 'Incident responder':'p6',

 /* Meta-cognition — Phase 7 (self-improvement) + Phase 8 (observation) */
 'Prompt evolver · DSPy':'p7',
 'Parameter tuner':'p7',
 'System observer':'p8',
 'Bottleneck detector':'p8',
 'Architecture proposer':'p8',
 'Decision auditor':'p8'
};
```

**Count assertion:** exactly **33** entries. AG must `Object.keys(RCOMP_PHASE).length === 33`.

**Coverage assertion:** every agent name in RSYS (i.e., every `c[i][0]`
where `c[i][0] !== '#'`) must have an entry in RCOMP_PHASE. Conversely,
every key in RCOMP_PHASE must match an RSYS agent name exactly. AG runs
a set-equality check and stops on diff.

---

## 7. Step 4 — Rev phase metadata (`RPHM`)

The Rev side needs phase chip labels, colours, and month ranges. Phase 1
is missing from RPH (RPH starts at Phase 2 because Phase 1 lives in
RGRP_P1). We synthesise a unified `RPHM` lookup.

Insert immediately after `RCOMP_PHASE`:

```javascript
/* --- Rev phase metadata for filter chips + summary cards ---
   Synthesised from RGANTT (month ranges) + RPH (phase 2–8 descriptions)
   + RGRP_P1 (Phase 1 composite). Single source for the filter UI. */
var RPHM={
 p1:{color:'#58A6FF',name_e:'Foundation',name_t:'Temel',mo:'~M1–M2',
     sub_e:'substrate · gateway · MCP · v1 swarm',sub_t:'altyapı · ağ geçidi · MCP · v1 sürüsü',
     oe:'Telemetry + LLM gateway + MCP tools live; v1 specialised agents writing code under verification.',
     ot:'Telemetri + LLM ağ geçidi + MCP araçları canlı; v1 özelleşmiş ajanlar doğrulama altında kod yazıyor.'},
 p2:{color:'#79C0FF',name_e:'Measure + Vision',name_t:'Ölçüm + Vizyon',mo:'~M2–M4',
     sub_e:'Vision engine + telemetry maturity',sub_t:'Vizyon motoru + telemetri olgunluğu',
     oe:'Prioritised intents flow from OKRs + production + personas; quality scoring is live. 12-month telemetry clock for Meta-cognition starts.',
     ot:'Önceliklendirilmiş niyetler OKR + üretim + personalardan akar; kalite puanlama canlı. Meta-biliş için 12-aylık telemetri sayacı başlar.'},
 p3:{color:'#BC8CFF',name_e:'Speculation',name_t:'Spekülasyon',mo:'~M4–M7',
     sub_e:'N parallel cells per intent · tournament selection',sub_t:'niyet başına N paralel hücre · turnuva seçimi',
     oe:'Speculative parallel execution validated in shadow against v1 baselines before any promotion.',
     ot:'Spekülatif paralel yürütme, herhangi bir terfiden önce gölgede v1 referanslarına karşı doğrulanır.'},
 p4:{color:'#A371F7',name_e:'Cells in shadow',name_t:'Gölgede hücreler',mo:'~M5–M8',
     sub_e:'shadow validation · no new agents · calendar-bound',sub_t:'gölge doğrulama · yeni ajan yok · takvim-bağlı',
     oe:'Cell quality demonstrably matches or exceeds v1 on shadow comparison over a real validation window.',
     ot:'Hücre kalitesi, gerçek bir doğrulama penceresinde gölge karşılaştırmasında v1\u2019e eşit veya üstün olduğunu kanıtlar.'},
 p5:{color:'#3FB950',name_e:'Formal verification',name_t:'Biçimsel doğrulama',mo:'~M6–M9',
     sub_e:'TLA+/Alloy on critical paths · property-based tests elsewhere',sub_t:'kritik yollarda TLA+/Alloy · diğerlerinde özellik-tabanlı test',
     oe:'Critical paths mathematically verified; standard paths pass multi-dimensional review.',
     ot:'Kritik yollar matematiksel olarak doğrulanır; standart yollar çok-boyutlu incelemeden geçer.'},
 p6:{color:'#56D364',name_e:'Cells in production',name_t:'Üretimde hücreler',mo:'~M8–M11',
     sub_e:'canary rollout · validated cells own intents end-to-end',sub_t:'kanarya dağıtımı · doğrulanmış hücreler niyetleri uçtan uca sahiplenir',
     oe:'Cells produce production code under the same verification gates as v1, with canary rollout.',
     ot:'Hücreler, kanarya dağıtımıyla, v1 ile aynı doğrulama kapıları altında üretim kodu üretir.'},
 p7:{color:'#E3B341',name_e:'Self-improvement',name_t:'Kendini iyileştirme',mo:'~M10–M14',
     sub_e:'DSPy prompt evolution · parameter tuning',sub_t:'DSPy prompt evrimi · parametre ayarlama',
     oe:'Prompts and parameters self-optimise from real outcomes, monthly per-agent.',
     ot:'Prompt\u2019lar ve parametreler gerçek sonuçlardan, ajan başına aylık olarak kendini optimize eder.'},
 p8:{color:'#F85149',name_e:'Meta-cognition',name_t:'Meta-biliş',mo:'~M12–M15',
     sub_e:'system observes itself · proposes its own improvements',sub_t:'sistem kendini gözlemler · kendi iyileştirmelerini önerir',
     oe:'System proposes its own structural improvements (human-gated). Needs 12+ months of telemetry to be reliable.',
     ot:'Sistem kendi yapısal iyileştirmelerini önerir (insan-kapılı). Güvenilir olması için 12+ aylık telemetri gerekir.'}
};
```

---

## 8. Step 5 — CSS additions

**str_replace** — append before `</style>`. Anchor on the last cookbook
CSS line:

**Old:**
```
.cli:hover{color:var(--blue);border-bottom-color:var(--blue)}
</style>
```

**New:**
```
.cli:hover{color:var(--blue);border-bottom-color:var(--blue)}
/* === phase filter toolbar === */
.pf-bar{display:flex;flex-wrap:wrap;gap:7px;align-items:center;margin:8px 0 18px;padding:10px 12px;background:var(--bg2);border:1px solid var(--border);border-radius:10px}
.pf-chip{display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:11px;font-weight:600;padding:6px 11px;border-radius:14px;border:1px solid var(--border);background:var(--bg);color:var(--text3);cursor:pointer;transition:opacity .15s,background .15s,color .15s,border-color .15s;letter-spacing:.02em}
.pf-chip:hover{background:var(--bg3)}
.pf-chip.on{color:var(--text);border-color:var(--border2);background:var(--bg3)}
.pf-chip.on .pf-dot{opacity:1}
.pf-dot{display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--text3);opacity:.35;transition:opacity .15s}
.pf-chip small{font-family:var(--mono);font-size:10px;color:var(--text3);font-weight:500}
.pf-chip.on small{color:var(--text2)}
.pf-master{margin-left:auto;border-style:dashed}
/* === phase summary cards === */
.pf-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin:0 0 20px}
.pf-card{background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:10px 12px;border-left:3px solid var(--text3);transition:opacity .2s,transform .2s}
.pf-card.dim{opacity:.35}
.pf-card-mo{font-family:var(--mono);font-size:9.5px;font-weight:700;letter-spacing:.08em;color:var(--text3);text-transform:uppercase}
.pf-card-name{font-size:13px;font-weight:600;color:var(--text);margin-top:3px}
.pf-card-sub{font-size:11px;color:var(--text2);line-height:1.45;margin-top:5px}
/* === component dim/highlight under filter === */
.chip,.cnode{transition:opacity .2s,transform .2s}
.chip.pf-dim,.cnode.pf-dim{opacity:.18}
.chip.pf-active,.cnode.pf-active{transform:scale(1.02)}
@media(max-width:760px){.pf-cards{grid-template-columns:1fr 1fr}.pf-master{margin-left:0}}
</style>
```

---

## 9. Step 6 — Filter state + helpers (new functions)

**str_replace** — insert immediately before `_cbDeploy` (alongside
`openComp` from S2d.2):

**Old** (confirm exact from live file — S2d.2 left this as the line
immediately above `_cbDeploy`):
```
function _cbDeploy(d){
```

**New** — insert state + helpers + new render fragments before `_cbDeploy`:
```
/* --- phase filter state (default: all phases on) --- */
var EARCH_PHASES=['core','wa','gu','cwf1','ins','cwf2','fin','ext'];
var RARCH_PHASES=['p1','p2','p3','p4','p5','p6','p7','p8'];
var activeEarchPhases=new Set(EARCH_PHASES);
var activeRarchPhases=new Set(RARCH_PHASES);

function _phaseHours(pid){
 if(pid==='ext')return 0;
 var row=EPLAN.filter(function(p){return p.id===pid;})[0];
 return row?row.hrs:0;
}
function _ephLabel(pid){
 if(pid==='ext')return lang==='en'?'External':'Harici';
 var p=EPH[pid];return p?(lang==='en'?p[1]:p[2]):pid;
}
function _ephColor(pid){
 if(pid==='ext')return '#6E7681';
 var p=EPH[pid];return p?p[0]:'#6E7681';
}

function renderEarchFilter(){
 var chips=EARCH_PHASES.map(function(pid){
  var on=activeEarchPhases.has(pid),col=_ephColor(pid),lbl=_ephLabel(pid);
  var hrs=_phaseHours(pid),hStr=pid==='ext'?'':' <small>'+hrs.toLocaleString()+'h</small>';
  return '<button class="pf-chip'+(on?' on':'')+'" onclick="toggleEarchPhase(\''+pid+'\')">'
   +'<span class="pf-dot" style="background:'+col+'"></span>'+lbl+hStr+'</button>';
 }).join('');
 var anyOn=activeEarchPhases.size>0;
 chips+='<button class="pf-chip pf-master" onclick="toggleAllEarchPhases()">'
  +(anyOn?(lang==='en'?'◯ Turn All Off':'◯ Tümünü Kapat'):(lang==='en'?'● Turn All On':'● Tümünü Aç'))+'</button>';
 return '<div class="pf-bar">'+chips+'</div>';
}
function renderEarchCards(){
 var cards=EPLAN.map(function(p){
  var col=EPH[p.id]?EPH[p.id][0]:'#6E7681',name=EPH[p.id]?(lang==='en'?EPH[p.id][1]:EPH[p.id][2]):p.id;
  var on=activeEarchPhases.has(p.id)||activeEarchPhases.size===EARCH_PHASES.length;
  var sub=lang==='en'?p.out_en:p.out_tr;
  /* strip leading "<b>Exit gate:</b> " from out_en/out_tr for compactness */
  sub=sub.replace(/^<b>[^<]+<\/b>\s*/,'');
  if(sub.length>140)sub=sub.substring(0,138)+'…';
  return '<div class="pf-card'+(on?'':' dim')+'" style="border-left-color:'+col+'">'
   +'<div class="pf-card-mo">'+p.mo+' · '+p.hrs.toLocaleString()+'h</div>'
   +'<div class="pf-card-name">'+name+'</div>'
   +'<div class="pf-card-sub">'+sub+'</div></div>';
 }).join('');
 return '<div class="pf-cards">'+cards+'</div>';
}
function toggleEarchPhase(pid){
 if(activeEarchPhases.has(pid))activeEarchPhases.delete(pid);else activeEarchPhases.add(pid);
 applyEarchFilter();
}
function toggleAllEarchPhases(){
 if(activeEarchPhases.size>0)activeEarchPhases.clear();
 else activeEarchPhases=new Set(EARCH_PHASES);
 applyEarchFilter();
}
function applyEarchFilter(){
 /* re-render bar + cards to reflect state changes */
 var bar=document.querySelector('#sec-earch .pf-bar');
 var cards=document.querySelector('#sec-earch .pf-cards');
 if(bar){
  var tmp=document.createElement('div');tmp.innerHTML=renderEarchFilter();
  bar.replaceWith(tmp.firstChild);
 }
 if(cards){
  var tmp2=document.createElement('div');tmp2.innerHTML=renderEarchCards();
  cards.replaceWith(tmp2.firstChild);
 }
 var allOn=activeEarchPhases.size===EARCH_PHASES.length;
 document.querySelectorAll('#sec-earch .chip').forEach(function(chip){
  var ph=chip.getAttribute('data-phase')||'ext';
  chip.classList.remove('pf-dim');chip.classList.remove('pf-active');
  if(!allOn){
   if(activeEarchPhases.has(ph))chip.classList.add('pf-active');
   else chip.classList.add('pf-dim');
  }
 });
}

function renderRarchFilter(){
 var chips=RARCH_PHASES.map(function(pid){
  var on=activeRarchPhases.has(pid),m=RPHM[pid];
  return '<button class="pf-chip'+(on?' on':'')+'" onclick="toggleRarchPhase(\''+pid+'\')">'
   +'<span class="pf-dot" style="background:'+m.color+'"></span>'
   +(lang==='en'?m.name_e:m.name_t)+' <small>'+m.mo+'</small></button>';
 }).join('');
 var anyOn=activeRarchPhases.size>0;
 chips+='<button class="pf-chip pf-master" onclick="toggleAllRarchPhases()">'
  +(anyOn?(lang==='en'?'◯ Turn All Off':'◯ Tümünü Kapat'):(lang==='en'?'● Turn All On':'● Tümünü Aç'))+'</button>';
 return '<div class="pf-bar">'+chips+'</div>';
}
function renderRarchCards(){
 var cards=RARCH_PHASES.map(function(pid){
  var m=RPHM[pid];var on=activeRarchPhases.has(pid)||activeRarchPhases.size===RARCH_PHASES.length;
  return '<div class="pf-card'+(on?'':' dim')+'" style="border-left-color:'+m.color+'">'
   +'<div class="pf-card-mo">'+pid.toUpperCase()+' · '+m.mo+'</div>'
   +'<div class="pf-card-name">'+(lang==='en'?m.name_e:m.name_t)+'</div>'
   +'<div class="pf-card-sub">'+(lang==='en'?m.sub_e:m.sub_t)+'</div></div>';
 }).join('');
 return '<div class="pf-cards">'+cards+'</div>';
}
function toggleRarchPhase(pid){
 if(activeRarchPhases.has(pid))activeRarchPhases.delete(pid);else activeRarchPhases.add(pid);
 applyRarchFilter();
}
function toggleAllRarchPhases(){
 if(activeRarchPhases.size>0)activeRarchPhases.clear();
 else activeRarchPhases=new Set(RARCH_PHASES);
 applyRarchFilter();
}
function applyRarchFilter(){
 var bar=document.querySelector('#sec-rarch .pf-bar');
 var cards=document.querySelector('#sec-rarch .pf-cards');
 if(bar){var tmp=document.createElement('div');tmp.innerHTML=renderRarchFilter();bar.replaceWith(tmp.firstChild);}
 if(cards){var tmp2=document.createElement('div');tmp2.innerHTML=renderRarchCards();cards.replaceWith(tmp2.firstChild);}
 var allOn=activeRarchPhases.size===RARCH_PHASES.length;
 document.querySelectorAll('#sec-rarch .cnode').forEach(function(node){
  var ph=node.getAttribute('data-phase')||'';
  node.classList.remove('pf-dim');node.classList.remove('pf-active');
  if(!allOn){
   if(ph&&activeRarchPhases.has(ph))node.classList.add('pf-active');
   else node.classList.add('pf-dim');
  }
 });
}
function _cbDeploy(d){
```

---

## 10. Step 7 — Wire chips with `data-phase` + prepend filter UI

### 10a. EAIP Arch — add `data-phase` to component chips

**str_replace** in `renderEarch` — the chip-render line (S2 modified this
to add `onclick`; we now add `data-phase`).

**Old** (confirm from live file — last S2/S2c state):
```
  var chips=comps.map(function(c){var hl=c[2]!=='';var cIdx=COMPS.indexOf(c);return '<span class="chip'+(hl?' hl':'')+'" onclick="showEarchDetail('+cIdx+')" style="cursor:pointer">'+c[0]+(c[2]?' <small style="color:inherit">'+c[2]+'</small>':'')+'</span>';}).join('');
```

**New** (adds `data-phase`):
```
  var chips=comps.map(function(c){var hl=c[2]!=='';var cIdx=COMPS.indexOf(c);var ph=(COMPDATA[c[0]]&&COMPDATA[c[0]].phase)||'ext';return '<span class="chip'+(hl?' hl':'')+'" data-phase="'+ph+'" onclick="showEarchDetail('+cIdx+')" style="cursor:pointer">'+c[0]+(c[2]?' <small style="color:inherit">'+c[2]+'</small>':'')+'</span>';}).join('');
```

### 10b. EAIP Arch — prepend filter bar + summary cards before layer rows

**str_replace** — find the `renderEarch` line that sets
`document.getElementById('sec-earch').innerHTML = ...` and prepend the
filter UI.

**Old** (confirm exact, the last line of renderEarch that assembles
`sec-earch` innerHTML; existing pattern is `'<div class="sect">...</div><div class="lede">...</div>'+rows`):

The current concatenation is roughly:
```
 document.getElementById('sec-earch').innerHTML='<div class="sect">'+e.t1+'</div><div class="lede">'+e.l1+'</div>'+rows;
```

**New** (insert filter+cards between lede and rows):
```
 document.getElementById('sec-earch').innerHTML='<div class="sect">'+e.t1+'</div><div class="lede">'+e.l1+'</div>'+renderEarchFilter()+renderEarchCards()+rows;
```

AG confirms the exact pre-edit line first (it may differ slightly in
whitespace). The semantic edit is: between `lede` and `rows`, insert
two calls.

### 10c. Rev Arch — add `data-phase` to system agents (`.cnode`)

Rev's `renderRarch` builds 5 pcards, each containing agent rows rendered
as `<div class="cnode">`. Each `.cnode` needs `data-phase` based on
RCOMP_PHASE lookup.

**str_replace** in `renderRarch` — locate the line that builds the agent
list inside each system pcard. The current pattern (from v6) renders
each agent as a `.cnode`. AG must find this exact line and modify it to
include `data-phase` from `RCOMP_PHASE[agentName]`.

**Pre-edit verification:** AG dumps the existing `renderRarch` body and
identifies the `.cnode` construction. The modification adds:
```
data-phase="'+(RCOMP_PHASE[<agentName>]||'')+'"
```
to the `.cnode` element. For header rows (where the agent entry starts
with `'#'`), no data-phase — they're section labels.

Report the original line, the proposed replacement, await internal
verification, then apply.

### 10d. Rev Arch — prepend filter bar + summary cards

Same pattern as 10b. Find `renderRarch`'s `document.getElementById('sec-rarch').innerHTML` assignment, insert `renderRarchFilter()+renderRarchCards()` between lede and the system pcards.

---

## 11. Step 8 — Initial-render trigger

The filter and cards should render the moment the user switches to the
tab. `renderEarch()` and `renderRarch()` already run at page boot; their
output now includes the filter bar and cards (via the §10 changes). No
additional wiring needed for initial render.

**But:** when language is toggled, `setLang` calls `renderEarch()` and
`renderRarch()` which re-emit the full innerHTML. Filter state (which
chips are on) is held in `activeEarchPhases` / `activeRarchPhases`
JavaScript Sets — preserved across re-renders. After re-render, however,
the new chips don't have `.pf-dim` / `.pf-active` classes applied.

**Fix:** at the very end of `renderEarch()` and `renderRarch()`, call
`applyEarchFilter()` / `applyRarchFilter()` respectively. This re-applies
the current filter state to the freshly rendered DOM.

**str_replace** in `renderEarch` — append `applyEarchFilter();` as the
last statement before the function's closing brace.
**str_replace** in `renderRarch` — append `applyRarchFilter();` likewise.

---

## 12. Acceptance criteria

**Structural (grep on edited file):**
- [ ] `COMPDATA_PHASE` does not appear (staging var removed)
- [ ] All 67 COMPDATA entries have `phase` field; values in
  `{core,wa,gu,cwf1,ins,cwf2,fin,ext}` only
- [ ] `RCOMP_PHASE` defined; exactly 33 keys; values in `{p1..p8}`
- [ ] `RPHM` defined; exactly 8 keys (`p1..p8`)
- [ ] All 8 new state variables and 16 new functions present:
  `EARCH_PHASES, RARCH_PHASES, activeEarchPhases, activeRarchPhases,
  _phaseHours, _ephLabel, _ephColor, renderEarchFilter, renderEarchCards,
  toggleEarchPhase, toggleAllEarchPhases, applyEarchFilter,
  renderRarchFilter, renderRarchCards, toggleRarchPhase,
  toggleAllRarchPhases, applyRarchFilter`
- [ ] CSS contains: `.pf-bar, .pf-chip, .pf-chip.on, .pf-dot, .pf-master,
  .pf-cards, .pf-card, .pf-card.dim, .pf-card-mo, .pf-card-name,
  .pf-card-sub, .chip.pf-dim, .chip.pf-active, .cnode.pf-dim,
  .cnode.pf-active`
- [ ] `renderEarch` chips now carry `data-phase` attribute
- [ ] `renderRarch` cnodes (non-header) carry `data-phase` attribute
- [ ] `applyEarchFilter()` called at end of `renderEarch`
- [ ] `applyRarchFilter()` called at end of `renderRarch`
- [ ] All cookbook symbols still present (regression check): `_cbDeploy,
  _cbConfig, _cbSample, _cbOps, _cbErrors, openComp, showEarchDetail,
  toggleEconn, toggleRconn`

**Functional — Node.js smoke test (`smoke-s2f.js`):**
```javascript
const fs=require('fs');
const html=fs.readFileSync('path/to/SSoT.html','utf8');
if(html.includes('COMPDATA_PHASE')) throw new Error('staging var not cleaned up');

// Pattern #16 guard
const sb=html.substring(html.indexOf('<script>')+8,html.lastIndexOf('</script>'));
if(sb.indexOf('</script>')>=0) throw new Error('Pattern #16 violation: literal </script> in script body');

const m=html.match(/<script>([\s\S]*?)<\/script>/);
const els={};
global.document={
 getElementById:id=>{if(!els[id])els[id]={innerHTML:'',value:'',textContent:'',classList:{add:()=>{},remove:()=>{},toggle:()=>{}},querySelectorAll:()=>[]};return els[id];},
 querySelector:()=>null,querySelectorAll:()=>[],documentElement:{lang:''},addEventListener:()=>{},
 createElement:()=>({innerHTML:'',firstChild:{replaceWith:()=>{}}})
};
eval(m[1]);

// EAIP phase coverage
const keys=Object.keys(COMPDATA);
if(keys.length!==67) throw new Error('expected 67 entries, got '+keys.length);
keys.forEach(k=>{
 const ph=COMPDATA[k].phase;
 if(!ph) throw new Error(k+' missing phase');
 if(!['core','wa','gu','cwf1','ins','cwf2','fin','ext'].includes(ph)) throw new Error(k+' bad phase: '+ph);
});

// Rev phase coverage
if(typeof RCOMP_PHASE!=='object') throw new Error('RCOMP_PHASE missing');
if(Object.keys(RCOMP_PHASE).length!==33) throw new Error('expected 33 RCOMP_PHASE entries, got '+Object.keys(RCOMP_PHASE).length);

// Set-equality: every RSYS agent has RCOMP_PHASE entry
const rsysAgents=[];
RSYS.forEach(s=>s.c.forEach(c=>{if(c[0]!=='#')rsysAgents.push(c[0]);}));
const rcompKeys=new Set(Object.keys(RCOMP_PHASE));
const missing=rsysAgents.filter(a=>!rcompKeys.has(a));
if(missing.length) throw new Error('RCOMP_PHASE missing: '+missing.join(', '));
const extra=[...rcompKeys].filter(k=>!rsysAgents.includes(k));
if(extra.length) throw new Error('RCOMP_PHASE has unmapped agents: '+extra.join(', '));

// RPHM shape
if(Object.keys(RPHM).length!==8) throw new Error('RPHM must have 8 phases');
['p1','p2','p3','p4','p5','p6','p7','p8'].forEach(pid=>{
 const m=RPHM[pid];if(!m) throw new Error('RPHM missing '+pid);
 ['color','name_e','name_t','mo','sub_e','sub_t','oe','ot'].forEach(f=>{
  if(!m[f]) throw new Error('RPHM '+pid+' missing '+f);
 });
});

// Filter state defaults
if(activeEarchPhases.size!==8) throw new Error('activeEarchPhases default wrong: '+activeEarchPhases.size);
if(activeRarchPhases.size!==8) throw new Error('activeRarchPhases default wrong: '+activeRarchPhases.size);

// Render helpers don't throw
const eFilter=renderEarchFilter();
if(!eFilter.includes('pf-chip')) throw new Error('renderEarchFilter output missing pf-chip');
if(!eFilter.includes('Platform Core')) throw new Error('renderEarchFilter missing EAIP phase name');
const eCards=renderEarchCards();
if(!eCards.includes('pf-card')) throw new Error('renderEarchCards output missing pf-card');
const rFilter=renderRarchFilter();
if(!rFilter.includes('Foundation')) throw new Error('renderRarchFilter missing Rev Phase 1');
if(!rFilter.includes('Meta-cognition')) throw new Error('renderRarchFilter missing Rev Phase 8');

// Toggle behaviour
const before=activeEarchPhases.size;
toggleEarchPhase('core');
if(activeEarchPhases.has('core')) throw new Error('toggle did not remove');
if(activeEarchPhases.size!==before-1) throw new Error('size wrong after toggle');
toggleEarchPhase('core');
if(!activeEarchPhases.has('core')) throw new Error('toggle did not re-add');
toggleAllEarchPhases();
if(activeEarchPhases.size!==0) throw new Error('Turn All Off failed');
toggleAllEarchPhases();
if(activeEarchPhases.size!==8) throw new Error('Turn All On failed');

// Sample phase distributions (rough sanity)
const dist={};
Object.values(COMPDATA).forEach(c=>{dist[c.phase]=(dist[c.phase]||0)+1;});
if(!dist.core||dist.core<10) throw new Error('suspiciously few core: '+dist.core);

console.log('SMOKE PASS · EAIP: '+Object.keys(dist).map(k=>k+':'+dist[k]).join(' · '));
```

Smoke must report the EAIP phase distribution (e.g. `core:32 · wa:4 · gu:4 ...`) so AG and operator can sanity-check the extraction.

---

## 13. Operator manual verification (standalone browser + Vercel preview)

### 13.1 EAIP Arch — initial render

1. Open file (`file://` or via theblueprint23.dev EAIP Arch tab). Below
   the section title "EAIP architecture" and before the layer rows, see:
   - A filter bar with 8 chips: Platform Core (with hour count), Web
     Asistan, Galip Usta v1, CWF v1, Insurance v0.8→v1, CWF v2, Final /
     Astra, External + a dashed "◯ Turn All Off" master.
   - Below the bar: 7 summary cards in a grid (one per EPLAN phase),
     each showing `M-range · hours`, phase name, and exit-gate summary.
   - All 8 chips active (filled-in style); cards full opacity; layer
     rows underneath at normal opacity.

### 13.2 EAIP Arch — single-phase filter

2. Click the **Web Asistan** chip → it visually toggles off (becomes
   dimmer). All chips not matching Web Asistan should now be dimmed in
   the layer rows below. Only Web Asistan components stay full
   opacity + slight scale-up. Cards: Web Asistan card dims.
   *Wait — careful semantics: clicking a chip toggles it OFF. The user's
   intent in v5 was "click a chip to ISOLATE that phase" which works by
   default-all-on → click-to-turn-off-others.*

**Correction in 13.2 phrasing:**
Click `Web Asistan` chip → it goes from "on" to "off". Now 7 phases are
active. Components matching the 7 active phases stay normal; Web Asistan
components dim. Summary cards: Web Asistan card dims.

To **isolate** Web Asistan visually: click Turn All Off, then click
Web Asistan only. Now only Web Asistan components and card are full
opacity; everything else dimmed.

3. Click "Turn All Off" → all chips dim, all components in layer rows
   dim, all summary cards dim. Master toggle text becomes "● Turn All On".
4. Click "Turn All On" → reverse; all phases active, no dimming.

### 13.3 EAIP Arch — cookbook still works

5. Click any chip (e.g. `Channel gateway`) — cookbook panel opens with
   all S2/S2c/S2d.1/S2d.2 content visible. Filter does not interfere.

### 13.4 EAIP Arch — language toggle

6. Switch to TR. Filter chip labels translate ("Çekirdek Platform",
   etc.); summary card titles + descriptions translate; filter state
   preserved (whichever phases were on stay on). Re-applying filter
   classes works after re-render.

### 13.5 Rev Arch — initial render

7. Open Rev Arch tab. Same structure: filter bar with 8 phase chips
   (Phase 1 Foundation, Phase 2 Measure + Vision, … Phase 8
   Meta-cognition), each showing the month range (e.g. `~M1–M2`). +
   "Turn All Off" master. Below: 8 summary cards.

### 13.6 Rev Arch — Phase 4 sanity

8. Click "Turn All Off", then click only **Phase 4** chip. Result: no
   `.cnode` highlighted. Phase 4 is deliberately empty — it's a
   calendar-bound shadow-validation phase, no new agents introduced.
   Card for Phase 4 highlighted (it's the only active phase).
   Confirm summary text reads "shadow validation · no new agents".

### 13.7 Rev Arch — single-phase isolation

9. Click Turn All Off, then click Phase 1. Result: only v1 swarm agents
   + verification basics highlighted (~10 cnodes across multiple system
   pcards: Engineering manager, Solution architect, FE/BE/DB/DevOps,
   Code reviewer · 6-dim, Test generator, Security agent, Performance
   agent).
10. Same flow for Phase 8 → highlights ~4 cnodes (System observer,
    Bottleneck detector, Architecture proposer, Decision auditor).

### 13.8 Cross-feature regressions

11. EAIP Conn tab → inline detail still works; FROM/TO cross-link still
    opens cookbook panel.
12. Rev Conn tab → inline detail still works.
13. EAIP Plan + Rev Plan + Big Picture + Bridge → all render normally.
14. Console: no errors at any step.

---

## 14. PR and merge gate

PR title: `S2f: phase filter + summary cards on both Architecture tabs`

PR body must include:
- Step 0 findings (cookbook symbols present, no naming conflicts, COMPDATA at 67 with no phase, v5 present, v5 spot-check)
- Step 1 extraction result (67 entries phased + distribution counts)
- Step 2 merge confirmation (COMPDATA_PHASE removed; all entries phased)
- Step 3 RCOMP_PHASE coverage (set-equality with RSYS agents)
- Step 4 RPHM 8-phase metadata inserted
- Smoke test full output including phase distribution
- Structural acceptance items (all checked)
- One screenshot suggestion: EAIP Arch with `CWF v1` isolated (only CWF v1 components highlighted)
- One screenshot suggestion: Rev Arch with `Phase 1` isolated (v1 swarm + verification basics highlighted)

**AG stops after opening the PR.** Operator runs §13. AG merges only after
operator signals approval.

---

## 15. Lessons.md

```
## S2f — Phase filter + summary cards on both Architecture tabs
### AG delivery summary
Model: [model] · Lines changed: +[N] · PR: [#N] · Merge SHA: [sha]
Step 0: cookbook symbols ✅ · conflicts 0 · COMPDATA at 67 (no prior phase) · v5 present ✅
Step 1: extraction produced 67 entries · distribution: core:[N] wa:[N] gu:[N] cwf1:[N] ins:[N] cwf2:[N] fin:[N] ext:[N]
Step 2: merge complete · all 67 phased · COMPDATA_PHASE removed ✅
Step 3: RCOMP_PHASE inserted (33 entries) · set-equality with RSYS ✅
Step 4: RPHM inserted (8 phases)
Step 5: CSS additions (~16 classes) ✅
Step 6: 17 new functions/state vars defined ✅
Step 7: data-phase wired into renderEarch chips and renderRarch cnodes ✅
Step 8: applyEarchFilter/applyRarchFilter wired into renderEarch/renderRarch end ✅
Smoke: SMOKE PASS · all assertions ✅ · Pattern #16 guard ✅
### Operator review
[Maymun fills in §13 14-point check outcome]
### Prompt-author retrospective
[Claude fills in next session]
```

---

## 16. What S2f does NOT touch

- S2's `dpanel`, `dpoverlay`, `_dpRow`, `_dpSec`, `closeDetail`, `DL` — preserved
- S2b's inline row machinery (`toggleEconn`, `toggleRconn`, `_ecdRow`,
  `_rcdRow`, `.cdr`, `.cdata`, `.ctr-active`, `.cli`) — preserved
- S2c/S2d.1/S2d.2 cookbook helpers (`_cbDeploy`, `_cbConfig`, `_cbSample`,
  `_cbOps`, `_cbErrors`, `openComp`, `showEarchDetail`) — preserved
- `renderEconnTable`, `renderRconnTable` — connectivity tables unchanged
- `renderEconn`, `renderRconn`, `renderBig`, `renderEplan`, `renderRplan` —
  only Architecture renders touched
- Rev component cookbook depth — still deferred (Rev gets `phase` only;
  no description/deploy/ops/errors). Rev cookbook is a future stage.
- `COMPS, ECONN, RCONN, RSYS, CTYPES, RCTYPES, EPH, RGROUPS, LAYERS, T,
  EROLE, OWNER_COLOR, GANTT, RGANTT, EPLAN, RPH, RGRP_P1, ROPENS` — all
  data arrays read-only, never mutated
- `08_leadership_charter_bilingual.html` — untouched
- App repo (`maymun207/TheBluePrint23`) — untouched. The migration is
  complete; this stage modifies only the SSoT and propagates through the
  frame automatically
- TR translations of the new filter UI ARE included (filter chips, master
  toggle text, card text) since the SSoT is bilingual by contract
- Progress tracker (S2e) — separate workstream

---

## 17. Author's note on the Phase 4 emptiness

Phase 4 ("Cells in shadow") has zero `RCOMP_PHASE` assignments. This is
intentional: Phase 4 is **calendar-bound shadow validation** of the v2
cells introduced in Phase 3. No new agents are designed in Phase 4 —
the agents already exist; they just run shadowed against v1 for a real
validation window.

The filter UX exposes this honestly: clicking only Phase 4 dims
everything in the architecture grid. A user seeing that should read it
as "Phase 4 is a waiting game, not a building one." The summary card for
Phase 4 reinforces with text: *"shadow validation · no new agents ·
calendar-bound."*

If a future architectural decision adds new agents to Phase 4 (e.g., a
dedicated shadow-comparison agent), update `RCOMP_PHASE` accordingly and
the filter behaviour follows automatically.

---

## 18. Author's note on what this stage completes

After S2f merges, the Architecture-tab UX achieves parity with v5:

- Restored: phase filter toolbar + per-phase hour/month chips
- Restored: phase summary cards above architecture grid
- Restored: dim/highlight visual feedback on component chips
- New (beyond v5): bilingual filter labels, applied symmetrically to Rev

Combined with S2b–S2d.2, the cookbook is now feature-complete on the
Architecture-side. The remaining workstream is **S2e** (Supabase progress
overlay), which Phase 1 unblocks in late M0 / early M1.
