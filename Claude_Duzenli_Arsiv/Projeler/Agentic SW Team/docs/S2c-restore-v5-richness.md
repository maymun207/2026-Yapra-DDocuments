# Stage S2c — Restore v5 component richness into v6 SSoT

> **stage_id:** S2c
> **stage_type:** Phase 1 · Data restoration + render enhancement · content repo
>   (`agbuilder-platform/revolutionize@main`)
> **author:** Claude (architect · single-author rule)
> **date:** 2026-06-03
> **model_recommended:** Claude Sonnet 4.6, thinking mode
> **model_used_actual:** [AG fills in `lessons.md`]
> **estimated_size:** L — AG 60–90 min · human review 45 min
> **merge_mode:** operator-gated — AG opens PR, reports, stops. Operator runs
>   manual browser check, signals. AG merges.
> **predecessor:** S2b ✅
> **successor:** S2d (ops + sample + errors authoring)

---

## 1. Goal

Restore the rich per-component data that lived in `v5_SSoT` (and was dropped
in the v5→v6 transition) into the v6 SSoT's script block, then expand the S2
right-side panel to render the cookbook view a developer actually needs:

- **Subtitle** — one-line role (`sub`)
- **Owner badge** — engineer role (links to EROLE colours in v6)
- **Description** — what the component does
- **Deployment** — image · install command · note
- **Configuration keys** — env vars + intended values + purpose
- **Connections** — inbound + outbound (already in S2; preserve)
- **Implementation notes** — operational gotchas, compliance ties
- **Repo footer** — link to source repo (where applicable; many third-party)

All English-only for component-side prose. Connection-side stays bilingual
(unchanged). Owner field is mandatory; repo is nullable.

S2d will then layer `ops · sample · errors` on top of this foundation for
the ~43 internal components. This stage (S2c) is foundation only.

---

## 2. File in scope

**One file:**
`docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html`

Read the live file from GitHub before any edit.
**Also requires read access** to:
`docs/architecture/ARDICTECH_Platform_v5_SSoT.html` (data source)

If `v5_SSoT.html` is not present in the repo at that path, **stop** and
ask the operator to upload it before continuing. Do not attempt to fetch
from external sources.

---

## 3. Step 0 — Verify ground truth

Report each, stop on any mismatch.

**3a. S2 + S2b merge check** — `showEarchDetail`, `_dpRow`, `_dpSec`, `DL`,
`toggleEconn`, `_ecdRow` must all be present in the script. If missing,
stop.

**3b. Naming-conflict grep** — every new identifier this stage introduces.
All expected to return **0 hits** in the live file:
`COMPDATA`, `OWNER_COLOR`, `_cbDeploy`, `_cbConfig`, `_cbSect`, `cb-sub`,
`cb-owner`, `cb-desc`, `cb-deploy`, `cb-config`, `cb-notes`, `cb-repo`,
`cb-sect`.

**3c. v5 source presence** — confirm `v5_SSoT.html` exists in the repo;
report its size and the line range containing the `var COMPS=[` block (v5
naming — this is the v5 *components* array, distinct from v6's flat
`var COMPS=[...]`).

**3d. v5 schema confirmation** — extract one v5 component (Channel
Gateway) and dump its full object. Confirm it has these eight fields:
`id, name, layer, lname, phase, badge, sub, desc, deploy{image,install,note}, config[{k,v,n}], notes`.
If schema differs, stop.

**3e. v5 component count** — count v5 entries via
`grep -cE "^\{id:'[^']+',name:'[^']+'"`. Must equal **67**. v6 also has 67.

**3f. v5↔v6 name reconciliation** — for each v5 component, locate its
counterpart in v6 COMPS. Use this **authoritative mapping table** —
do not guess:

| v5 name | v6 name |
|---|---|
| WhatsApp | WhatsApp |
| Whisper STT | Whisper STT |
| Embed Widget | Embed widget |
| Outlook / Graph | Outlook / Graph |
| Web Chat | Web chat |
| Teams Bot | Teams bot |
| Min. Dashboard | Min. dashboard |
| Channel Gateway | Channel gateway |
| Kong | Kong |
| FastAPI | FastAPI |
| Keycloak | Keycloak |
| Entra Federation | Entra federation |
| OPA | OPA |
| Tenant Provisioning | Tenant provisioning |
| LangGraph | LangGraph |
| Hybrid Decision Engine | Hybrid decision engine |
| n8n | n8n |
| Temporal | Temporal |
| vLLM | vLLM |
| LiteLLM | LiteLLM |
| Ollama | Ollama |
| MLflow | MLflow |
| Prompt Store | Prompt store |
| Langfuse | Langfuse |
| Guardrails AI | Guardrails AI |
| LlamaIndex | LlamaIndex |
| Qdrant / pgvector | Qdrant / pgvector |
| Memori | Memori |
| LightRAG | LightRAG |
| Graphiti + FalkorDB | Graphiti + FalkorDB |
| Soda Core | Soda Core |
| dbt Core | dbt Core |
| OpenMetadata | OpenMetadata |
| Audit / SPC PDF | Audit / SPC PDF |
| LLM Enrichment | LLM enrichment |
| PostgreSQL | PostgreSQL |
| Redis | Redis |
| MinIO | MinIO |
| Qdrant | Qdrant |
| TimescaleDB | TimescaleDB |
| ClickHouse | ClickHouse |
| Iceberg | Iceberg |
| MariaDB | MariaDB |
| Airflow | Airflow |
| File Upload | File upload |
| **SMB Crawler (NiFi)** | **NiFi SMB crawler** |
| Airbyte | Airbyte |
| Debezium + Redpanda | Debezium + Redpanda |
| IoT-Ignite | IoT-Ignite |
| ARMES MES | ARMES MES |
| **Exchange / Graph API** | **Exchange / Graph** |
| ARU / KARU | ARU / KARU |
| SMB Shares | SMB shares |
| **SAP BW/S4/BPC** | **SAP** |
| SharePoint | SharePoint |
| Salesforce | Salesforce |
| Kubernetes | Kubernetes |
| ArgoCD | ArgoCD |
| OpenTofu | OpenTofu |
| CI Pipeline | CI pipeline |
| Container Registry | Container registry |
| Grafana + Prometheus | Grafana + Prometheus |
| **Loki + OTel Collector** | **Loki + OTel** |
| Vault | Vault |
| Cert Mgr + Wireguard | Cert mgr + Wireguard |
| Evidently AI | Evidently AI |
| Netaş / OSB Cloud | Netaş / OSB cloud |

**Bold rows are substantive renames** (not just case). All 67 v5 components
map to exactly one v6 component. If extraction finds a v5 entry not in this
table, stop.

---

## 4. Step 1 — Extract v5 into COMPDATA

Use the Node.js `vm`-module sandbox pattern established in D0.3a.2.

**4a.** Write a one-off extractor script (`scripts/_extract_compdata.js`,
delete after use):

1. Read `docs/architecture/ARDICTECH_Platform_v5_SSoT.html`
2. Extract the JS block containing `var COMPS=[`. v5 uses this name for its
   rich component array. Capture from `var COMPS=[` to the matching `];`
3. Wrap in a vm sandbox, evaluate, get the resulting array
4. For each v5 entry, build a record keyed by **v6 name** (apply §3f mapping):
   ```js
   {
     sub:    v5.sub,
     desc:   v5.desc,
     deploy: { image: v5.deploy.image, install: v5.deploy.install, note: v5.deploy.note },
     config: v5.config.map(c => ({ k: c.k, v: c.v, n: c.n })),
     notes:  v5.notes
   }
   ```
5. Write the result as a single JS literal assigned to `COMPDATA`. Use
   `JSON.stringify` to handle quoting and escaping; the output is valid
   JS object syntax.
6. **Validate**: emitted COMPDATA must have exactly 67 keys, all matching
   v6 COMPS names from §3f's right column. Report the diff if not.

**4b. Resulting object shape** (paste this verbatim before the `var EPH=`
declaration in v6 SSoT, with the 67 entries filled in by the extractor):

```javascript
/* --- per-component cookbook data (restored from v5 SSoT) --- */
var COMPDATA={
 'Channel gateway':{
  sub:'one brain → many surfaces',
  desc:'Central normalisation and routing service. Receives messages from all channels (WhatsApp, Widget, Outlook, Teams, Web Chat), normalises them to a standard MessageEnvelope format, and dispatches to LangGraph. One brain, many mouths.',
  deploy:{image:'custom Python FastAPI service',install:'pip install fastapi uvicorn redis',note:'Exposes channel-specific webhook endpoints. Stateless: session context loaded from Redis.'},
  config:[{k:'LANGGRAPH_URL',v:'http://langgraph:8001',n:'LangGraph agent service'},{k:'REDIS_URL',v:'redis://redis:6379',n:'Session state store'},{k:'WHISPER_URL',v:'http://whisper:9000',n:'Voice transcription service'}],
  notes:'This is the single entry point for ALL user interactions. It enforces tenant isolation at the boundary, rate-limits per channel, and adds metadata (tenant, channel, session) to every message envelope before routing.',
  owner:'Backend',
  repo:'agbuilder-platform/channel-gateway'
 },
 /* ... 66 more ... */
};
```

`owner` and `repo` are added in Step 2 and 3 — Step 1 produces COMPDATA
**without** those two fields, and Steps 2/3 overlay them.

---

## 5. Step 2 — Owner overlay (authoritative)

Use this mapping verbatim. Each v6 name → exactly one EROLE role. AG injects
`owner` into each COMPDATA entry:

```
WhatsApp · Backend                 LlamaIndex · AI Eng
Whisper STT · AI Eng               Qdrant / pgvector · AI Eng
Embed widget · Frontend            Memori · AI Eng
Outlook / Graph · Backend          LightRAG · AI Eng
Web chat · Frontend                Graphiti + FalkorDB · AI Eng
Teams bot · Backend                Soda Core · Data Eng
Min. dashboard · Frontend          dbt Core · Data Eng
Channel gateway · Backend          OpenMetadata · Data Eng
Kong · DevOps                      Audit / SPC PDF · Backend
FastAPI · Backend                  LLM enrichment · AI Eng
Keycloak · Backend                 PostgreSQL · DevOps
OPA · Backend                      Redis · DevOps
Tenant provisioning · Backend      MinIO · DevOps
Entra federation · Backend         Qdrant · DevOps
LangGraph · AI Eng                 ClickHouse · Data Eng
Hybrid decision engine · AI Eng    TimescaleDB · Data Eng
n8n · Backend                      Iceberg · Data Eng
Temporal · Backend                 MariaDB · DevOps
vLLM · AI Eng                      Airflow · Data Eng
LiteLLM · AI Eng                   File upload · Backend
Ollama · AI Eng                    NiFi SMB crawler · Data Eng
MLflow · AI Eng                    Airbyte · Data Eng
Prompt store · AI Eng              Debezium + Redpanda · Data Eng
Langfuse · AI Eng                  IoT-Ignite · Backend
Guardrails AI · AI Eng             ARMES MES · AI Eng
Exchange / Graph · Backend         Container registry · DevOps
ARU / KARU · Backend               Grafana + Prometheus · DevOps
SMB shares · DevOps                Loki + OTel · DevOps
SAP · AI Eng                       Vault · DevOps
SharePoint · AI Eng                Cert mgr + Wireguard · DevOps
Salesforce · AI Eng                Evidently AI · AI Eng
Kubernetes · DevOps                Netaş / OSB cloud · DevOps
ArgoCD · DevOps                    CI pipeline · DevOps
OpenTofu · DevOps
```

Verify: every v6 COMPS name appears exactly once. 67 entries. Owners draw
from `{'DevOps','Backend','AI Eng','Data Eng','Frontend'}` only — matching
the existing `EROLE` keys in v6.

---

## 6. Step 3 — Repo overlay (rule + overrides)

**Rule:** For each component, inspect its `deploy.image` from v5:

- If image contains any of: `custom`, `Embedded`, `embedded`, `In-process`,
  `in-process`, `ARDICTECH`, or `bundled` → component is **internal**; set
  `repo: 'agbuilder-platform/<slug>'` where `<slug>` is the v6 name
  lowercased, ` ` → `-`, ` / ` → `-`, ` + ` → `-`, `.` removed
  (e.g. `Channel gateway` → `channel-gateway`,
  `Audit / SPC PDF` → `audit-spc-pdf`,
  `Min. dashboard` → `min-dashboard`)
- Otherwise → component is **third-party**; set `repo: null`

**Explicit overrides** (rule produces wrong answer; force these):

```
LiteLLM     → 'agbuilder-platform/litellm-config'   (we own the config, not LiteLLM itself)
Prompt store→ 'agbuilder-platform/prompt-store'      (custom-built)
ARMES MES   → 'agbuilder-platform/armes-mcp'         (we built the MCP wrapper, MES itself is external)
SAP         → 'agbuilder-platform/sap-mcp'           (MCP integration is ours)
SharePoint  → 'agbuilder-platform/sharepoint-mcp'    (MCP integration is ours)
Salesforce  → 'agbuilder-platform/salesforce-mcp'    (MCP integration is ours)
```

Report the final repo count: should be roughly 15–20 internal (non-null),
remainder null.

---

## 7. Step 4 — Insert COMPDATA into v6 SSoT

**str_replace** — insert COMPDATA + helper colour map immediately before
the `var EPH=` declaration.

**Old** (confirm exact from live file):
```
['Kubernetes','L9',''],['ArgoCD','L9',''],['OpenTofu','L9',''],['CI pipeline','L9',''],['Container registry','L9',''],['Grafana + Prometheus','L9',''],['Loki + OTel','L9',''],['Vault','L9',''],['Cert mgr + Wireguard','L9',''],['Evidently AI','L9',''],['Netaş / OSB cloud','L9','']];
var CTYPES={
```

**New** (insert COMPDATA + OWNER_COLOR between COMPS close and CTYPES open):
```
['Kubernetes','L9',''],['ArgoCD','L9',''],['OpenTofu','L9',''],['CI pipeline','L9',''],['Container registry','L9',''],['Grafana + Prometheus','L9',''],['Loki + OTel','L9',''],['Vault','L9',''],['Cert mgr + Wireguard','L9',''],['Evidently AI','L9',''],['Netaş / OSB cloud','L9','']];
var COMPDATA={
 /* ... full 67-entry object emitted by Step 1 + Step 2 + Step 3 ... */
};
var OWNER_COLOR={DevOps:'#79C0FF',Backend:'#58A6FF','AI Eng':'#BC8CFF','Data Eng':'#3FB950',Frontend:'#E3B341'};
var CTYPES={
```

`OWNER_COLOR` mirrors `EROLE` in v6's plan section. We re-declare it here
because the architecture tab uses it for the owner badge and EROLE lives
in the plan section — explicit re-declaration is cleaner than a cross-tab
reference.

---

## 8. Step 5 — CSS additions

**str_replace** — append before `</style>`. Anchor on the last S2b CSS line:

**Old:**
```
@media(max-width:760px){.cdr-inner{grid-template-columns:1fr}}
</style>
```

**New:**
```
@media(max-width:760px){.cdr-inner{grid-template-columns:1fr}}
/* === cookbook panel sections === */
.cb-sub{font-family:var(--mono);font-size:11.5px;color:var(--text2);margin:-4px 0 12px;letter-spacing:.02em}
.cb-owner{display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:10.5px;font-weight:700;padding:3px 10px;border-radius:12px;border:1px solid;margin-bottom:14px}
.cb-sect{font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--text3);margin:18px 0 8px;padding-bottom:5px;border-bottom:1px solid var(--border)}
.cb-desc{font-size:12.5px;color:var(--text2);line-height:1.6;margin-bottom:4px}
.cb-deploy{background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:11px 13px;font-size:12px;line-height:1.6}
.cb-deploy-k{display:inline-block;color:var(--blue);font-family:var(--mono);font-size:11px;width:54px}
.cb-deploy-v{font-family:var(--mono);font-size:11.5px;color:var(--text)}
.cb-deploy-note{color:var(--text2);font-size:11.5px;line-height:1.5;margin-top:7px;padding-top:7px;border-top:1px solid var(--border)}
.cb-config{width:100%;border-collapse:collapse;font-size:11.5px}
.cb-config td{padding:6px 9px;border-bottom:1px solid var(--border);vertical-align:top}
.cb-config td:first-child{font-family:var(--mono);color:var(--blue);font-weight:600;white-space:nowrap;width:38%}
.cb-config td:nth-child(2){font-family:var(--mono);color:var(--text);width:32%;word-break:break-all}
.cb-config td:last-child{color:var(--text2);font-size:11px}
.cb-notes{font-size:12.5px;color:var(--text2);line-height:1.6;background:var(--bg3);border-left:3px solid var(--purple);border-radius:0 6px 6px 0;padding:10px 13px;margin-top:6px}
.cb-repo{font-family:var(--mono);font-size:10.5px;color:var(--text3);margin-top:18px;padding-top:10px;border-top:1px solid var(--border);text-align:right}
.cb-repo a{color:var(--blue);text-decoration:none}
.cb-repo a:hover{text-decoration:underline}
</style>
```

---

## 9. Step 6 — Enhance `showEarchDetail`

**str_replace** — replace the body of `showEarchDetail`. Confirm exact
text from S2 in Step 0a before replacing.

Current (S2's) function fetches the component name, computes inbound +
outbound, renders header + two `_dpSec` calls. The new function:

1. Looks up `COMPDATA[name]` (may be undefined if data wasn't authored —
   graceful degradation)
2. Adds these sections **in this order** between header and connections:
   - **Subtitle** (if `cd.sub`)
   - **Owner badge** (if `cd.owner`) — uses `OWNER_COLOR`
   - **Description** (if `cd.desc`)
   - **Deployment box** (if `cd.deploy`)
   - **Configuration keys table** (if `cd.config` non-empty)
3. Existing inbound + outbound sections — **preserve unchanged**
4. Appends after connections:
   - **Implementation notes** (if `cd.notes`)
   - **Repo footer** (if `cd.repo`)

**Replacement strategy:** Add three helper functions (`_cbSect`,
`_cbDeploy`, `_cbConfig`) immediately before `showEarchDetail`, then rewrite
`showEarchDetail` to call them.

**str_replace** — locate `function showEarchDetail(` (added by S2),
replace from there to the closing `}` of that function plus the immediately
preceding helpers. AG must view the exact range first and confirm before
substitution.

**New code** (helpers + rewritten function):

```javascript
function _cbDeploy(d){
 if(!d)return '';
 return '<div class="cb-sect">Deployment</div><div class="cb-deploy">'
  +'<div><span class="cb-deploy-k">image</span><span class="cb-deploy-v">'+d.image+'</span></div>'
  +'<div><span class="cb-deploy-k">install</span><span class="cb-deploy-v">'+d.install+'</span></div>'
  +(d.note?'<div class="cb-deploy-note">'+d.note+'</div>':'')
  +'</div>';
}
function _cbConfig(cfg){
 if(!cfg||!cfg.length)return '';
 var rows=cfg.map(function(c){return '<tr><td>'+c.k+'</td><td>'+c.v+'</td><td>'+c.n+'</td></tr>';}).join('');
 return '<div class="cb-sect">Configuration keys</div><table class="cb-config"><tbody>'+rows+'</tbody></table>';
}
function showEarchDetail(cIdx){
 var c=COMPS[cIdx];if(!c)return;
 var name=c[0],layer=c[1],tag=c[2];
 var ln=LAYERS.filter(function(l){return l[0]===layer;})[0];
 var layerLbl=ln?(lang==='en'?ln[1]:ln[2]):layer;
 var cd=COMPDATA[name]||{};
 var inbound=ECONN.filter(function(r){return r[1]===name;});
 var outbound=ECONN.filter(function(r){return r[0]===name;});
 var ownerCol=cd.owner?(OWNER_COLOR[cd.owner]||'#6E7681'):null;
 var html='<div class="dphead">'
  +'<div><div style="font-family:var(--mono);font-size:11px;color:var(--text3)">'+layer+' · '+layerLbl+(tag?' · '+tag:'')+'</div>'
  +'<div style="font-size:17px;font-weight:600;margin-top:3px">'+name+'</div></div>'
  +'<button onclick="closeDetail()" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:18px;padding:4px 8px">×</button>'
  +'</div>'
  +'<div class="dpbody">'
  +(cd.sub?'<div class="cb-sub">'+cd.sub+'</div>':'')
  +(cd.owner?'<span class="cb-owner" style="color:'+ownerCol+';border-color:'+ownerCol+';background:'+ownerCol+'18">'+cd.owner+'</span>':'')
  +(cd.desc?'<div class="cb-desc">'+cd.desc+'</div>':'')
  +_cbDeploy(cd.deploy)
  +_cbConfig(cd.config)
  +(inbound.length?'<div class="cb-sect">Inbound connections ('+inbound.length+')</div>'+inbound.map(function(r){return _dpRow(r,'in');}).join(''):'')
  +(outbound.length?'<div class="cb-sect">Outbound connections ('+outbound.length+')</div>'+outbound.map(function(r){return _dpRow(r,'out');}).join(''):'')
  +(cd.notes?'<div class="cb-sect">Implementation notes</div><div class="cb-notes">'+cd.notes+'</div>':'')
  +(cd.repo?'<div class="cb-repo">↗ <a href="https://github.com/'+cd.repo+'" target="_blank" rel="noopener">github.com/'+cd.repo+'</a></div>':'')
  +'</div>';
 document.getElementById('dpanel').innerHTML=html;
 document.getElementById('dpoverlay').classList.add('vis');
 document.getElementById('dpanel').classList.add('vis');
}
```

**Important deltas vs. S2's version:**
- Used `cb-sect` for section headers instead of `dp-sect` (new styling)
- All new sections are guarded — render only when data present (graceful
  degradation when COMPDATA[name] is missing)
- Inbound/outbound list iteration uses the **existing** `_dpRow` helper
  from S2. Confirm `_dpRow` still exists before substitution.

---

## 10. Acceptance criteria

**Structural (grep on edited file):**
- [ ] `var COMPDATA=` present in script
- [ ] Exactly 67 top-level keys in COMPDATA (count via `Object.keys(COMPDATA).length` in smoke test)
- [ ] `var OWNER_COLOR=` present
- [ ] Five distinct owner values across COMPDATA: matches EROLE keys
- [ ] All 12 new CSS classes present
- [ ] `_cbDeploy`, `_cbConfig` defined before `showEarchDetail`
- [ ] S2 helpers `_dpRow`, `_dpSec`, `closeDetail`, `DL` still present
- [ ] S2b helpers `toggleEconn`, `toggleRconn`, `_ecdRow`, `_rcdRow` still present

**Functional — Node.js smoke test (`smoke-s2c.js`):**
```javascript
const fs=require('fs');
const html=fs.readFileSync('path/to/SSoT.html','utf8');
const scriptMatch=html.match(/<script>([\s\S]*?)<\/script>/);
const els={};
global.document={
 getElementById:id=>{if(!els[id])els[id]={innerHTML:'',value:'',textContent:'',classList:{add:()=>{},remove:()=>{},toggle:()=>{}},querySelectorAll:()=>[]};return els[id];},
 querySelectorAll:()=>[],documentElement:{lang:''},addEventListener:()=>{}
};
eval(scriptMatch[1]);

// COMPDATA shape
if(typeof COMPDATA!=='object') throw new Error('COMPDATA missing');
const keys=Object.keys(COMPDATA);
if(keys.length!==67) throw new Error('Expected 67 COMPDATA entries, got '+keys.length);

// All COMPDATA keys must match v6 COMPS names
const compsNames=COMPS.map(c=>c[0]);
const missing=compsNames.filter(n=>!COMPDATA[n]);
if(missing.length) throw new Error('COMPDATA missing entries for: '+missing.join(', '));
const extra=keys.filter(k=>!compsNames.includes(k));
if(extra.length) throw new Error('COMPDATA has unmapped keys: '+extra.join(', '));

// Every entry has required fields
keys.forEach(n=>{
 const c=COMPDATA[n];
 ['sub','desc','deploy','config','notes','owner'].forEach(f=>{
  if(c[f]===undefined) throw new Error(n+' missing field: '+f);
 });
 if(!c.deploy.image||!c.deploy.install) throw new Error(n+' deploy malformed');
 if(!Array.isArray(c.config)) throw new Error(n+' config not array');
 if(!OWNER_COLOR[c.owner]) throw new Error(n+' invalid owner: '+c.owner);
});

// Render exercise — open a panel for Channel gateway, confirm rich content
const cIdx=COMPS.findIndex(c=>c[0]==='Channel gateway');
showEarchDetail(cIdx);
const out=document.getElementById('dpanel').innerHTML;
if(!out.includes('one brain → many surfaces')) throw new Error('subtitle missing in render');
if(!out.includes('cb-owner')) throw new Error('owner badge missing');
if(!out.includes('cb-deploy')) throw new Error('deploy box missing');
if(!out.includes('cb-config')) throw new Error('config table missing');
if(!out.includes('cb-notes')) throw new Error('notes block missing');
if(!out.includes('cb-repo')) throw new Error('repo footer missing');

// S2 + S2b symbols still work
['_dpRow','_dpSec','closeDetail','DL','toggleEconn','toggleRconn'].forEach(s=>{
 if(typeof eval(s)==='undefined') throw new Error('regression: '+s+' missing');
});

console.log('SMOKE PASS · '+keys.length+' components · '+
 keys.filter(k=>COMPDATA[k].repo).length+' with repo');
```

**Spot-check requirement:** smoke test must also dump 3 specific component
records to console for human inspection:
- `Channel gateway` (L0, ours, full data)
- `PostgreSQL` (L6, third-party, owner DevOps, repo null)
- `SAP` (L8, MCP override, repo `agbuilder-platform/sap-mcp`)

---

## 11. PR and merge gate

PR title: `S2c: restore v5 component richness into v6 SSoT cookbook panel`

PR body must include:
- Step 0 findings (S2/S2b symbols present, naming conflicts = 0, v5 source
  present, v5 schema verified, name reconciliation completed against §3f table)
- Step 1 extractor output (67 entries produced, all map to v6 COMPS names)
- Step 2/3 overlay summary (owner distribution count, repo count)
- Smoke test output (SMOKE PASS line + spot-check dumps)
- Structural acceptance items (all checked)
- One screenshot of the rendered Channel gateway panel (operator can request)

**AG stops after opening the PR.** Operator runs §12 in standalone browser.

---

## 12. Operator manual verification (standalone browser, pre-merge)

1. Open SSoT file directly. EAIP Arch tab visible.
2. Click `Channel gateway` chip → right panel opens with: header (L0 · Channels · Channel gateway) → subtitle "one brain → many surfaces" → blue Backend owner badge → description paragraph → Deployment box (image + install + note) → Configuration keys table (3 rows) → Inbound (4) → Outbound (3) → Implementation notes (purple-left-border block) → repo footer link to `github.com/agbuilder-platform/channel-gateway`
3. Click `PostgreSQL` chip → panel shows: third-party deploy.image (`postgres:16`-something) → DevOps owner → no repo footer (repo is null)
4. Click `SAP` chip → panel shows AI Eng owner, repo footer `agbuilder-platform/sap-mcp`
5. Click any L9 component (e.g., `Vault`) → owner = DevOps, deploy data restored, no repo
6. Close panel (× or Escape) → connections tab still works.
7. EAIP Conn tab → click any row → S2b inline detail expands. Regression-free.
8. Lang toggle (EN→TR) → cookbook panel sections stay English (expected — TR deferred). Subtitle, desc, notes are EN. Owner badge label EN. Section headers EN. Tab labels switch to TR (existing behaviour).
9. Switch back to EN. All renders normally.
10. No console errors in any of the above.

---

## 13. Lessons.md

```
## S2c — Restore v5 component richness into v6 SSoT cookbook panel
### AG delivery summary
Model: [model] · Lines changed: +[N] · PR: [#N] · Merge SHA: [sha]
Step 0: S2/S2b symbols: ✅ · naming conflicts: 0 · v5 present: ✅
v5 component count: 67 · v6 component count: 67 · reconciliation diff: 0
Step 1: extractor produced [N] COMPDATA entries · all 67 matched to v6 ✅
Step 2: owner distribution → DevOps:[N] · Backend:[N] · AI Eng:[N] · Data Eng:[N] · Frontend:[N]
Step 3: repo non-null count: [N] (expected 15–20)
Smoke: COMPDATA shape ✅ · all keys map ✅ · render contains all sections ✅ · S2/S2b regression-free ✅
### Operator review
[Maymun fills in 10-point check outcome]
### Prompt-author retrospective
[Claude fills in next session]
```

---

## 14. What S2c does NOT touch

- S2's `dpanel` / `dpoverlay` HTML elements or CSS (chrome unchanged)
- S2's `_dpRow`, `_dpSec`, `closeDetail`, `DL` helpers (preserved)
- S2b's `toggleEconn`, `toggleRconn`, `_ecdRow`, `_rcdRow`, `closeEconn`,
  `closeRconn`, `openEconnRow`, `openRconnRow`, `.cdr*`, `.cdata`,
  `.ctr-active` (entirely separate)
- `renderEarch`, `renderEconn`, `renderRarch`, `renderRconn`,
  `renderEplan`, `renderRplan`, `renderBig`, `switchTab`, `buildNav`,
  `setLang` — none touched
- Rev component panel (`showRarchDetail`) — deferred; Rev gets a
  different schema in a later stage
- `COMPS`, `ECONN`, `RCONN`, `RSYS`, `CTYPES`, `RCTYPES`, `EPH`, `RGROUPS`,
  `EPLAN`, `RPLAN`, `LAYERS`, `T`, `EROLE` — read only, never mutated
- HTML `<body>`, `<footer>`, tab elements — untouched
- `08_leadership_charter_bilingual.html` — untouched
- TR translations of cookbook fields — deferred entirely
- ops/sample/errors fields — deferred to S2d
- Progress tracker / dev notes — deferred to S2e (post-Phase-0)
- App repo (`maymun207/TheBluePrint23`) — Phase 2 (S6–S7)
- `v5_SSoT.html` — read-only; never modified by this stage

---

## 15. Author's note on graceful degradation

`showEarchDetail` is intentionally defensive: if `COMPDATA[name]` is
missing (e.g., a future component added to COMPS but not yet authored),
the panel still renders — just without the cookbook sections, falling back
to connections-only (S2 behaviour). This keeps the v6 SSoT robust to
authoring lag.

The corollary: a developer seeing a thin panel knows the component lacks
COMPDATA entry. That's the signal to author it.
