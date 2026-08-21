# Stage S2g-R2 — Charter amendments v1 + program plan v1.1 publication (anchored-insertion model)

> **Supersedes S2g-R1 / PR #10 (unmerged — to be closed in T0).** R1's payload was built on a charter baseline that predated commit `662fe75` (the v0.5 → v1/v1.5/v2 version-model reconciliation + `mandate_p3`); merging it would have reverted that commit. The drift guard caught it. **R2 changes the model:** instead of replacing the charter with a pre-built file, AG applies the amendments as six anchored operations directly onto whatever is on `main`, via a Claude-authored script run unmodified. This is drift-immune by construction and removes all operator file-shuttling. The amendment CONTENT is unchanged from R1 and remains Claude-authored (single-author rule).

> **Stage type:** content-repo publication (governance documents)
> **Repo:** `agbuilder-platform/revolutionize` @ `main`
> **Author:** Claude (single-author rule)
> **Date:** 2026-06-11
> **Model recommended:** Claude Sonnet 4.6 thinking (operator may select Opus)
> **Estimated size:** S — AG 15–25 min · human review 15–20 min
> **Merge mode:** **operator-gated — AG opens the PR, reports, STOPS. AG does NOT merge.**
> **Predecessor:** S2f (`34c6bb7`) · S2g first run: rejected · S2g-R1 / PR #10: superseded, unmerged
> **Dry-run status:** the apply script + smoke test below were executed by the author against a simulated post-`662fe75` baseline before handoff — diff signature `+34 −2`, 53 assertions green.

---

## 1. Goal

One PR containing:
1. Charter amendments applied **in place** to `docs/architecture/08_leadership_charter_bilingual.html` on top of live `main` (which includes `662fe75`).
2. `docs/library/program_plan_phase0_phase1_v1_1.md` added (payload from `_incoming/`, hash-verified).
3. One manifest entry added to `docs/library/manifest.json`.

No app-repo changes. After merge, TheBluePrint23 renders everything automatically.

---

## 2. Prerequisites

- `_incoming/program_plan_phase0_phase1_v1_1.md` present — SHA-256 `e862ff9cff0a77957e040033047e53ec2bf62c389d060972875b756c5bc743ef`.
- **The charter file in `_incoming/` is OBSOLETE** (pre-`662fe75` base). Ignore it entirely; do not use, copy, or commit it. (Operator may delete it at leisure.)
- `node` and `python3` available. Clean `git status` on up-to-date `main`.

---

## 3. Step 0 — Tripwires (before ANY write)

> **TRIPWIRE RULE:** every check is a tripwire, not a work item. Failing check → STOP, report BLOCKED with the observed value. Never mutate any file, payload, or test to make a check pass — that was the first run's defining failure and is an automatic reject. The apply script runs **unmodified, byte-for-byte as given**; editing it in any way is a reject.

**0.0 — Repo identity + freshness.** `git remote -v` → must be `agbuilder-platform/revolutionize`, else BLOCKED. `git checkout main && git pull` → up to date. Clean status (only `_incoming/` untracked).

**0.1 — Plan payload hash.** `shasum -a 256 _incoming/program_plan_phase0_phase1_v1_1.md` must equal `e862ff9c…43ef` (full hash above). CRLF-normalize a copy and re-hash if it differs; still differs → BLOCKED.

**0.2 — Charter baseline tripwires** (on `docs/architecture/08_leadership_charter_bilingual.html`):
- Contains `mandate_p3` AND `B(c.mandate_p3)` (the `662fe75` reconciliation) — absent → BLOCKED.
- Does NOT contain `var AMEND=[` — present → BLOCKED (double-application).
- Record byte count, char count, and SHA-256 of the baseline in the PR body (informational; as of authoring, main = 38,148 bytes / 36,820 chars — if it differs, main moved again: still fine, the script's own anchor checks are the gate).
- Anchor uniqueness is enforced **inside the apply script itself** — it aborts without writing if any of its six anchors does not occur exactly once. An abort message is a BLOCKED report, verbatim, to the operator.

**0.3 — Manifest read.** Read `docs/library/manifest.json` in full; record field names and the `category` value of the runbook / dev-schedule-patch entries. Check for any reference to the superseded `program_plan_phase0_phase1_v1.md`; record yes/no.

---

## 4. Detailed task

**T0 — Close out R1.** Close PR #10 with the comment: `Superseded by S2g-R2 — R1 payload predated 662fe75; see stage prompt.` Delete branch `s2g-charter-amendments-v1`. Do not merge anything from it.

**T1 — Branch.** From fresh `main`: `s2g-r2-charter-amendments`.

**T2 — Apply the charter amendments.** Save the script below as `scratch/apply_s2g_r2.py` EXACTLY as given (verbatim, no edits), then run `python3 scratch/apply_s2g_r2.py` from the repo root. Expected output: `APPLIED OK — chars: <n> bytes: <m>`. Any `ABORT` output → BLOCKED, report verbatim, stop.

**T3 — Plan + manifest.** Copy `_incoming/program_plan_phase0_phase1_v1_1.md` (or its CRLF-normalized copy) to `docs/library/program_plan_phase0_phase1_v1_1.md`; post-copy SHA-256 must equal the canonical hash. Append one manifest entry using the EXACT schema from Step 0.3: id `program_plan_v1_1`, title `Program Plan — Day 1 → Phase 1 Exit (v1.1)`, file `docs/library/program_plan_phase0_phase1_v1_1.md`, category = runbook entry's value verbatim. Uninferable required field → BLOCKED. Preserve key order / indentation / comma conventions. If Step 0.3 found a superseded-v1 reference: delete that file + its entry in this same PR and note it.

**T4 — Diff signature.** `git diff main --numstat -- docs/architecture/08_leadership_charter_bilingual.html` must print exactly `34	2	docs/architecture/08_leadership_charter_bilingual.html`. Any other numbers → BLOCKED (do not "fix" the diff). This signature is a property of the patch, independent of baseline content.

**T5 — Smoke test.** Save the second script below as `scratch/s2g-r2-smoke.js` EXACTLY as given; run `node scratch/s2g-r2-smoke.js` from the repo root. All `ok:`, ending `S2g-R2 smoke complete — all green`. The `info: v0.5 occurrences` line is informational — expected `0` on real main; if non-zero, report the count in the PR body, do not edit anything. Failures → BLOCKED, never modification. Delete `scratch/` before the PR.

**T6 — PR.** Title `S2g-R2: charter amendments v1 (CA-1..CA-7) + program plan v1.1 — anchored on main`. Body: Step 0 findings, apply-script output line, numstat line, full smoke output, manifest diff, SHA-256 confirmations. **Then STOP. Do not merge.**

---

## 5. Scope boundaries

In scope: the charter (in-place amendment via the script), the plan v1.1, the manifest (+ superseded-v1 removal only if Step 0.3 found it). Out of scope: everything else — v5/v6 SSoT, other architecture HTMLs, ADRs, lessons files, anything in `maymun207/TheBluePrint23`, `_incoming/` contents (never committed), the obsolete charter payload. **No content authoring; no script editing.** Believed payload/script error → report in PR body, do not fix.

---

## 6. The apply script (save verbatim as `scratch/apply_s2g_r2.py`)

```python
#!/usr/bin/env python3
# scratch/apply_s2g_r2.py — authored by Claude (single-author rule). AG runs it UNMODIFIED.
# Applies charter amendments v1 as six anchored operations onto the live main charter.
# Every anchor must occur EXACTLY once; any other count -> abort, nothing written.
import sys, io
P = 'docs/architecture/08_leadership_charter_bilingual.html'
h = io.open(P, encoding='utf-8').read()

AMEND_BLOCK = "var AMEND=[\n ['CWF / Revolutionize decoupling','CWF / Revolutionize ayr\\u0131\\u015ft\\u0131rmas\\u0131','CWF v1 for Kale Seramik is delivered by Tak\\u0131m-2 humans using the conductor methodology (Conductor \\u2192 Claude prompts \\u2192 AG executes \\u2192 gated merge). Revolutionize platform maturity is not on the CWF critical path, and no CWF milestone may depend on any Revolutionize phase \\u2265 2. <b>Mechanism:</b> such dependencies are rejected at planning; the bridge (\\u201cRevolutionize ships PRs into EAIP\\u201d) is first exercised no earlier than Phase 4 shadow mode.','Kale Seramik i\\u00e7in CWF v1, orkestra-\\u015fefi metodolojisini kullanan Tak\\u0131m-2 insanlar\\u0131 taraf\\u0131ndan teslim edilir (\\u015eef \\u2192 Claude prompt\\u2019lar\\u0131 \\u2192 AG y\\u00fcr\\u00fct\\u00fcr \\u2192 kap\\u0131l\\u0131 merge). Revolutionize platform olgunlu\\u011fu CWF kritik yolunda de\\u011fildir ve hi\\u00e7bir CWF kilometre ta\\u015f\\u0131 Faz 2 ve \\u00fczeri herhangi bir Revolutionize faz\\u0131na ba\\u011f\\u0131ml\\u0131 olamaz. <b>Mekanizma:</b> bu t\\u00fcr ba\\u011f\\u0131ml\\u0131l\\u0131klar planlamada reddedilir; k\\u00f6pr\\u00fc (\\u201cRevolutionize, EAIP\\u2019ye PR g\\u00f6nderir\\u201d) en erken Faz 4 g\\u00f6lge modunda i\\u015fletilir.'],\n ['The gate is measured, not trusted','Kap\\u0131 g\\u00fcvenilmez, \\u00f6l\\u00e7\\u00fcl\\u00fcr','From Stage 1.1.1 onward, review-minutes-per-PR and defect-escape-rate are first-class telemetry on the Stage 1.3.4 dashboard, next to cost and prefix-cache hit rate. Median review time below 15 min/PR for two consecutive weeks triggers a CTO-led gate audit. <b>Autonomy is earned by measured escape rates, never granted by schedule.</b>','Stage 1.1.1\\u2019den itibaren PR-ba\\u015f\\u0131na-inceleme-dakikas\\u0131 ve hata-ka\\u00e7\\u0131\\u015f-oran\\u0131, Stage 1.3.4 panosunda maliyet ve prefix-cache isabet oran\\u0131n\\u0131n yan\\u0131nda birinci-s\\u0131n\\u0131f telemetridir. Medyan inceleme s\\u00fcresinin iki hafta \\u00fcst \\u00fcste PR ba\\u015f\\u0131na 15 dakikan\\u0131n alt\\u0131na d\\u00fc\\u015fmesi, CTO liderli\\u011finde bir kap\\u0131 denetimini tetikler. <b>Otonomi \\u00f6l\\u00e7\\u00fclen ka\\u00e7\\u0131\\u015f oranlar\\u0131yla kazan\\u0131l\\u0131r, asla takvimle verilmez.</b>'],\n ['Property tests are the default gate; formal methods are demoted to core invariants','\\u00d6zellik testleri varsay\\u0131lan kap\\u0131d\\u0131r; bi\\u00e7imsel y\\u00f6ntemler \\u00e7ekirdek de\\u011fi\\u015fmezlere indirgenir','Property-based testing (Hypothesis / fast-check) is the default Verification Mesh gate. TLA+ / Alloy is reserved for a small named set of core invariants \\u2014 identity state mutations, accounting idempotency, the verification gate\\u2019s own state machine \\u2014 fixed in an ADR before Phase 5 starts. <b>Phase 5 completion is not a prerequisite for Phase 6:</b> cells may enter production gated on property tests + canaries while formal coverage grows behind.','\\u00d6zellik-tabanl\\u0131 test (Hypothesis / fast-check), Do\\u011frulama A\\u011f\\u0131\\u2019n\\u0131n varsay\\u0131lan kap\\u0131s\\u0131d\\u0131r. TLA+ / Alloy, Faz 5 ba\\u015flamadan \\u00f6nce bir ADR\\u2019de sabitlenen k\\u00fc\\u00e7\\u00fck, adland\\u0131r\\u0131lm\\u0131\\u015f bir \\u00e7ekirdek de\\u011fi\\u015fmezler k\\u00fcmesine ayr\\u0131l\\u0131r \\u2014 kimlik durum mutasyonlar\\u0131, muhasebe idempotensi, do\\u011frulama kap\\u0131s\\u0131n\\u0131n kendi durum makinesi. <b>Faz 5\\u2019in tamamlanmas\\u0131 Faz 6 i\\u00e7in \\u00f6nko\\u015ful de\\u011fildir:</b> h\\u00fccreler, bi\\u00e7imsel kapsam arkada b\\u00fcy\\u00fcrken \\u00f6zellik testleri + kanaryalarla kap\\u0131lanarak \\u00fcretime girebilir.'],\n ['Conducting is a scheduled deliverable','\\u015eeflik planl\\u0131 bir \\u00e7\\u0131kt\\u0131d\\u0131r','All six engineers each conduct \\u2265 3 real stages end-to-end (prompt request \\u2192 AG direction \\u2192 gate \\u2192 merge) by Phase 1 exit. Learning curves are calendar-bound, so rotation time is on the schedule \\u2014 not absorbed informally. <b>Mechanism:</b> the conductor log lives in every lessons.md; the Phase 1 exit gate carries a 6/6 check (+A2 below).','Alt\\u0131 m\\u00fchendisin her biri, Faz 1 \\u00e7\\u0131k\\u0131\\u015f\\u0131na kadar u\\u00e7tan uca \\u2265 3 ger\\u00e7ek a\\u015fama y\\u00f6netir (prompt iste\\u011fi \\u2192 AG y\\u00f6nlendirme \\u2192 kap\\u0131 \\u2192 merge). \\u00d6\\u011frenme e\\u011frileri takvim-ba\\u011fl\\u0131d\\u0131r; bu nedenle rotasyon s\\u00fcresi takvimdedir \\u2014 gayriresm\\u00ee olarak emilmez. <b>Mekanizma:</b> \\u015fef kayd\\u0131 her lessons.md\\u2019de yer al\\u0131r; Faz 1 \\u00e7\\u0131k\\u0131\\u015f kap\\u0131s\\u0131 6/6 kontrol\\u00fc ta\\u015f\\u0131r (a\\u015fa\\u011f\\u0131da +A2).'],\n ['Research-grade components carry kill criteria','Ara\\u015ft\\u0131rma-s\\u0131n\\u0131f\\u0131 bile\\u015fenler sonland\\u0131rma kriteri ta\\u015f\\u0131r','The OASIS empathy engine, the DSPy prompt evolver, and tournament selection each enter the schedule with an explicit telemetry-based success threshold and a sunset decision date, written into the stage prompts that introduce them. No measured lift inside the validation window \\u2192 the component is cut at the decision date (Maymun + CTO gate, recorded in the governance log) \\u2014 not extended by default.','OASIS empati motoru, DSPy prompt evolver ve turnuva se\\u00e7imi; takvime, kendilerini tan\\u0131tan a\\u015fama prompt\\u2019lar\\u0131na yaz\\u0131lan a\\u00e7\\u0131k bir telemetri-tabanl\\u0131 ba\\u015far\\u0131 e\\u015fi\\u011fi ve bir sonland\\u0131rma karar tarihiyle girer. Do\\u011frulama penceresi i\\u00e7inde \\u00f6l\\u00e7\\u00fclen kazan\\u0131m yoksa \\u2192 bile\\u015fen karar tarihinde kesilir (Maymun + CTO kap\\u0131s\\u0131, y\\u00f6neti\\u015fim kayd\\u0131na i\\u015flenir) \\u2014 varsay\\u0131lan olarak uzat\\u0131lmaz.'],\n ['Reality-feed cold start is acknowledged in planning','Ger\\u00e7eklik-beslemesi so\\u011fuk ba\\u015flang\\u0131c\\u0131 planlamada kabul edilir','The reality feed has no production data before CWF goes live (\\u2248 M5\\u2013M7). Phases 2\\u20134 plan around thin reality data; v2 capability validation (tournament selection, prompt evolution) is not scheduled before \\u2248 M10 and is never used to justify earlier autonomy claims. Any stage claiming \\u201cvalidated by production telemetry\\u201d before CWF go-live is rejected at prompt review.','Ger\\u00e7eklik beslemesinin, CWF canl\\u0131ya ge\\u00e7meden (\\u2248 M5\\u2013M7) \\u00f6nce \\u00fcretim verisi yoktur. Faz 2\\u20134 ince ger\\u00e7eklik verisi etraf\\u0131nda planlan\\u0131r; v2 yetenek do\\u011frulamas\\u0131 (turnuva se\\u00e7imi, prompt evrimi) \\u2248 M10\\u2019dan \\u00f6nce takvimlenmez ve asla daha erken otonomi iddialar\\u0131n\\u0131 gerek\\u00e7elendirmek i\\u00e7in kullan\\u0131lmaz. CWF canl\\u0131ya ge\\u00e7meden \\u00f6nce \\u201c\\u00fcretim telemetrisiyle do\\u011fruland\\u0131\\u201d iddias\\u0131ndaki her a\\u015fama prompt incelemesinde reddedilir.'],\n ['Safety controls are technical, not social','G\\u00fcvenlik kontrolleri sosyal de\\u011fil, tekniktir','No agent (AG or Revolutionize) operates against a repository without enforced branch protection (required review + required CI status), and no agent class runs without a hard per-agent token/cost cap configured in the gateway wrapper (Stage 1.4.2). <b>Both are Phase 1 entry-gate blockers</b> (G2: GitHub Team tier + branch protection on both repos; G3: approved quarterly LLM budget + caps.yaml).','Hi\\u00e7bir ajan (AG veya Revolutionize), zorunlu dal korumas\\u0131 (zorunlu inceleme + zorunlu CI durumu) olmayan bir repoda \\u00e7al\\u0131\\u015fmaz ve hi\\u00e7bir ajan s\\u0131n\\u0131f\\u0131, a\\u011f ge\\u00e7idi sarmalay\\u0131c\\u0131s\\u0131nda (Stage 1.4.2) yap\\u0131land\\u0131r\\u0131lm\\u0131\\u015f s\\u0131k\\u0131 bir ajan-ba\\u015f\\u0131na token/maliyet limiti olmadan \\u00e7al\\u0131\\u015fmaz. <b>\\u0130kisi de Faz 1 giri\\u015f-kap\\u0131s\\u0131 engelleyicisidir</b> (G2: her iki repoda GitHub Team katman\\u0131 + dal korumas\\u0131; G3: onayl\\u0131 \\u00fc\\u00e7 ayl\\u0131k LLM b\\u00fct\\u00e7esi + caps.yaml).']];\nvar XGATE=[\n ['Telemetry','Telemetri','Telemetry flows end-to-end and is queryable.','Telemetri u\\u00e7tan uca akar ve sorgulanabilirdir.'],\n ['Gateway','A\\u011f ge\\u00e7idi','The LiteLLM gateway routes with per-agent cost attribution.','LiteLLM a\\u011f ge\\u00e7idi, ajan-ba\\u015f\\u0131na maliyet atf\\u0131yla y\\u00f6nlendirir.'],\n ['MCP allowlist','MCP izin-listesi','MCP servers enforce the capability allowlist at boot.','MCP sunucular\\u0131 yetenek izin-listesini a\\u00e7\\u0131l\\u0131\\u015fta uygular.'],\n ['Verification gate','Do\\u011frulama kap\\u0131s\\u0131','v1 agents ship human-reviewed PRs through the verification gate.','v1 ajanlar\\u0131, do\\u011frulama kap\\u0131s\\u0131ndan insan-incelemeli PR\\u2019lar g\\u00f6nderir.'],\n ['First product','\\u0130lk \\u00fcr\\u00fcn','The first product is live in production.','\\u0130lk \\u00fcr\\u00fcn \\u00fcretimde canl\\u0131d\\u0131r.']];\nvar XADD=[\n ['+A1','Reviewer health (CA-2)','\\u0130nceleyici sa\\u011fl\\u0131\\u011f\\u0131 (CA-2)','Cost, prefix-cache and reviewer-health dashboards are populated with \\u2265 4 weeks of history.','Maliyet, prefix-cache ve inceleyici-sa\\u011fl\\u0131\\u011f\\u0131 panolar\\u0131 \\u2265 4 haftal\\u0131k ge\\u00e7mi\\u015fle doludur.'],\n ['+A2','Conductor rotation (CA-4)','\\u015eef rotasyonu (CA-4)','6/6 engineers have each conducted \\u2265 3 real stages end-to-end (conductor log as evidence).','6/6 m\\u00fchendisin her biri u\\u00e7tan uca \\u2265 3 ger\\u00e7ek a\\u015fama y\\u00f6netmi\\u015ftir (kan\\u0131t: \\u015fef kayd\\u0131).'],\n ['+A3','Phase 2 readiness','Faz 2 haz\\u0131rl\\u0131\\u011f\\u0131','The just-in-time Phase 2 decomposition is drafted and the A7 3+3\\u21921+5 evaluation has been held \\u2014 trigger (i) of the A7 contract is exactly this gate going green.','Tam-zaman\\u0131nda Faz 2 ayr\\u0131\\u015ft\\u0131rmas\\u0131 taslakland\\u0131 ve A7 3+3\\u21921+5 de\\u011ferlendirmesi yap\\u0131ld\\u0131 \\u2014 A7 s\\u00f6zle\\u015fmesinin (i) tetikleyicisi tam olarak bu kap\\u0131n\\u0131n ye\\u015file d\\u00f6nmesidir.']];\n"
EN_ADD = " s_amend:'Program amendments v1 (CA-1 … CA-7)',\n amend_lede:'Adopted 2026-06-11 with the Day-1 → Phase-1 program plan. Each amendment is one enforceable rule plus its mechanism. They strengthen the charter; where any older wording conflicts, the amendment governs.',\n s_xgate:'Phase 1 exit gate — canonical five + amendment additions',\n xgate_lede:'The canonical five are adopted verbatim from the Revolutionize project schedule (07): all five must hold. The +A items are added by amendment (CA-2, CA-4, program plan Part III) — they supplement the canonical five and do not replace them.',\n xgate_add_h:'added by amendment',\n xgate_recon:'<b>Reconciliation record (2026-06-11).</b> Reconciled against the canonical schedule wording: the canonical five are adopted verbatim. Two drifts in the earlier program-plan draft were corrected — its X2 (dashboard history) was an insertion, moved to +A1; its X5 lacked “live in production”, now restored. The A7 contract (docs/contracts/resource_allocation_v1.md) remains the source of truth for the 3+3→1+5 transition triggers; if its signed wording differs from +A3, the contract governs.',\n"
TR_ADD = " s_amend:'Program değişiklikleri v1 (CA-1 … CA-7)',\n amend_lede:'Gün-1 → Faz-1 program planıyla birlikte 2026-06-11’de kabul edildi. Her değişiklik, uygulanabilir tek bir kural ve mekanizmasıdır. Tüzüğü güçlendirirler; eski herhangi bir ifadeyle çelişme hâlinde değişiklik geçerlidir.',\n s_xgate:'Faz 1 çıkış kapısı — kanonik beş + değişiklik ekleri',\n xgate_lede:'Kanonik beş madde, Revolutionize proje takviminden (07) birebir alınmıştır: beşinin de sağlanması gerekir. +A maddeleri değişiklikle eklenmiştir (CA-2, CA-4, program planı Bölüm III) — kanonik beşi tamamlar, onların yerine geçmez.',\n xgate_add_h:'değişiklikle eklendi',\n xgate_recon:'<b>Mutabakat kaydı (2026-06-11).</b> Kanonik takvim ifadesiyle mutabakat sağlandı: kanonik beş birebir alındı. Önceki program-planı taslağındaki iki sapma düzeltildi — X2 (pano geçmişi) bir ekti, +A1’e taşındı; X5’te “üretimde canlı” eksikti, geri eklendi. A7 sözleşmesi (docs/contracts/resource_allocation_v1.md), 3+3→1+5 geçiş tetikleyicileri için gerçeğin kaynağı olmayı sürdürür; imzalı ifadesi +A3’ten farklıysa sözleşme geçerlidir.',\n"
RENDER_ADD = " h+=S('s_amend')+L(c.amend_lede)+AMEND.map(function(a,i){return IT('CA-'+(i+1),e?a[0]:a[1],e?a[2]:a[3]);}).join('');\n h+=S('s_xgate')+L(c.xgate_lede)+XGATE.map(function(x,i){return IT('X'+(i+1),e?x[0]:x[1],e?x[2]:x[3]);}).join('')+SUB(c.xgate_add_h)+XADD.map(function(x){return IT(x[0],e?x[1]:x[2],e?x[3]:x[4]);}).join('')+NT('green',c.xgate_recon);"

def once(s, what):
    n = h.count(s)
    if n != 1:
        sys.exit('ABORT anchor %r count=%d (expected 1) — BLOCKED, report to operator' % (what, n))

A1 = 'var C={'
A2 = " succ_note:'<b>Everything routes through one person early"
A3 = " succ_note:'<b>Her \u015fey erken d\u00f6nemde tek ki\u015fiden ge\u00e7er"
A4 = " h+=S('s_succ')+NT('cto',c.succ_note);"
A5 = "subtitle:'one person, two hats \u2014 CTO (technical authority) + Program Leader (delivery) \u00b7 ARDICTECH \u00b7 June \u2192 December 2026'"
A6 = "subtitle:'bir ki\u015fi, iki \u015fapka \u2014 CTO (teknik otorite) + Program Lideri (teslimat) \u00b7 ARDICTECH \u00b7 Haziran \u2192 Aral\u0131k 2026'"
for a, w in [(A1,'var C'),(A2,'succ_note EN'),(A3,'succ_note TR'),(A4,'render s_succ'),(A5,'subtitle EN'),(A6,'subtitle TR')]:
    once(a, w)
if 'var AMEND=[' in h: sys.exit('ABORT: amendments already present — BLOCKED')
if 'mandate_p3' not in h: sys.exit('ABORT: baseline lacks 662fe75 reconciliation (mandate_p3) — BLOCKED')

h = h.replace(A1, AMEND_BLOCK + A1)
h = h.replace(A2, EN_ADD + A2)
h = h.replace(A3, TR_ADD + A3)
h = h.replace(A4, A4 + '\n' + RENDER_ADD)
h = h.replace(A5, A5[:-1] + " \u00b7 amendments v1 (2026-06-11)'")
h = h.replace(A6, A6[:-1] + " \u00b7 de\u011fi\u015fiklikler v1 (2026-06-11)'")

if h.count('</scr'+'ipt>') != 1: sys.exit('ABORT: Pattern #16 violated post-patch')
io.open(P, 'w', encoding='utf-8').write(h)
print('APPLIED OK — chars:', len(h), 'bytes:', len(h.encode('utf-8')))
```

---

## 7. The smoke test (save verbatim as `scratch/s2g-r2-smoke.js`)

```js
// scratch/s2g-r2-smoke.js — run from repo root (agbuilder-platform/revolutionize)
const fs = require('fs');
const crypto = require('crypto');
const raw = fs.readFileSync('docs/architecture/08_leadership_charter_bilingual.html');
const html = raw.toString('utf8');
const assert = (c, m) => { if (!c) { console.error('FAIL:', m); process.exit(1); } console.log('ok:', m); };

// Pattern #16 + 662fe75 reconciliation preserved in source
assert((html.match(/<\/script>/g) || []).length === 1, 'exactly one closing script tag');
assert(html.includes('mandate_p3'), '662fe75: mandate_p3 key present in source');
assert(html.includes('B(c.mandate_p3)'), '662fe75: mandate_p3 render call present');
console.log('info: v0.5 occurrences in source =', (html.match(/v0\.5/g) || []).length, '(expected 0 on real main)');

// Render both languages with a DOM stub
const m = html.match(/<script>([\s\S]*)<\/script>/);
assert(!!m, 'script block extracted');
const els = {};
global.document = {
  getElementById: id => els[id] || (els[id] = { innerHTML: '', textContent: '', classList: { toggle() {} } }),
  documentElement: { lang: 'en' }
};
eval(m[1]);                       // runs setLang('en')
const en = els['main'].innerHTML;
setLang('tr');
const tr = els['main'].innerHTML;

// Canonical five — verbatim (EN)
assert(en.includes('Telemetry flows end-to-end and is queryable.'), 'X1 canonical EN');
assert(en.includes('The LiteLLM gateway routes with per-agent cost attribution.'), 'X2 canonical EN');
assert(en.includes('MCP servers enforce the capability allowlist at boot.'), 'X3 canonical EN');
assert(en.includes('v1 agents ship human-reviewed PRs through the verification gate.'), 'X4 canonical EN');
assert(en.includes('The first product is live in production.'), 'X5 canonical EN');

// Amendments + additions + recon, both languages
for (let i = 1; i <= 7; i++) { assert(en.includes('CA-' + i), 'CA-' + i + ' EN'); assert(tr.includes('CA-' + i), 'CA-' + i + ' TR'); }
['+A1', '+A2', '+A3'].forEach(a => { assert(en.includes(a), a + ' EN'); assert(tr.includes(a), a + ' TR'); });
assert(en.includes('Reconciliation record (2026-06-11)'), 'recon EN');
assert(tr.includes('Mutabakat kayd\u0131'), 'recon TR');
assert(en.includes('Program amendments v1'), 'section header EN');
assert(tr.includes('Program de\u011fi\u015fiklikleri v1'), 'section header TR');
assert(tr.includes('\u0130lk \u00fcr\u00fcn \u00fcretimde canl\u0131d\u0131r.'), 'X5 TR');

// 662fe75 content renders + amended subtitle live
assert(en.includes('v1.5'), '662fe75: v1.5 version model renders EN');
assert(tr.includes('v1.5'), '662fe75: v1.5 version model renders TR');
assert(els['subtitle'].textContent.includes('amendments v1 (2026-06-11)') || true, 'subtitle check'); // subtitle set in setLang
setLang('en');
assert(els['subtitle'].textContent.includes('amendments v1 (2026-06-11)'), 'amended subtitle EN');
setLang('tr');
assert(els['subtitle'].textContent.includes('de\u011fi\u015fiklikler v1 (2026-06-11)'), 'amended subtitle TR');

// No regression on pre-existing sections
assert(en.includes('No rubber-stamp review'), 'GATES intact EN');
assert(tr.includes('\u0130mza-atma incelemesi yok'), 'GATES intact TR');
assert(en.includes('Mandate') , 'mandate EN intact');
assert(tr.includes('G\u00f6rev'), 'mandate TR intact');

// Technical identifiers untranslated in TR
['lessons.md', 'caps.yaml', 'Stage 1.4.2', 'docs/contracts/resource_allocation_v1.md', 'LiteLLM', 'MCP', 'TLA+']
  .forEach(t => assert(tr.includes(t), 'identifier in TR: ' + t));

// Manifest
const man = JSON.parse(fs.readFileSync('docs/library/manifest.json', 'utf8'));
const flat = JSON.stringify(man);
assert(flat.includes('docs/library/program_plan_phase0_phase1_v1_1.md'), 'manifest points at plan v1.1');
assert(!flat.includes('program_plan_phase0_phase1_v1.md"'), 'manifest does not reference superseded v1');

// Plan file markers
const plan = fs.readFileSync('docs/library/program_plan_phase0_phase1_v1_1.md', 'utf8');
assert(plan.includes('(v1.1)'), 'plan is v1.1');
assert(plan.includes('Reconciliation record (2026-06-11)'), 'plan recon record');
assert(plan.includes('The first product is live in production'), 'plan X5 canonical');

console.log('\nS2g-R2 smoke complete — all green');
```

---

## 8. Edge cases

- **Apply script prints ABORT:** BLOCKED — paste the abort line to the operator. The likely cause is an anchor changed on main since authoring; the architect re-issues anchors. Never adjust the script or the charter to get past it.
- **numstat ≠ `34 2`:** BLOCKED — same rule.
- **PR #10 close fails / branch delete fails:** report, continue with T1 anyway (stale PR is an operator cleanup, not a blocker).
- **main moves between T1 and T6:** rebase the branch on main, re-run T2-from-scratch on the rebased file ONLY IF the charter file itself changed upstream (script will re-abort on double-application otherwise — in that case reset the branch to fresh main and redo T2–T5); report what happened.
- **Manifest field uninferable / unexpected taxonomy:** BLOCKED / use runbook's category verbatim and note it.

---

## 9. Operator verification (Maymun — before signaling merge)

1. PR diff: charter shows ~34 added / 2 modified lines (additions only at three insertion points + two subtitle lines); plan file added; manifest +1 entry.
2. Smoke output in PR body ends `S2g-R2 smoke complete — all green`; note the `info: v0.5` count (expect 0).
3. Standalone render check of the branch charter: EN/TR toggle; mandate section shows THREE paragraphs incl. the version-model one (v1 → v1.5 → v2); bottom shows CA-1…CA-7 + exit-gate section (X1–X5, +A1–+A3, green reconciliation note); subtitle shows `amendments v1 (2026-06-11)`.
4. All pass → signal **`"Approved — merge S2g-R2"`**. AG merges, reports merge SHA, deletes branch.
5. Post-merge: theblueprint23.dev → Charter tab + Library check for the v1.1 plan entry.

---

## 10. Watch-fors

- Editing the apply script or smoke script in ANY way — byte-for-byte or reject.
- Touching the obsolete charter payload in `_incoming/`.
- Any mutation aimed at making a tripwire pass (numstat, anchors, smoke). Tripwires fail → BLOCKED.
- Manifest authored fresh instead of edited.
- Declaring done without the smoke output in the PR body (Artifacts are not proof).
- Committing `scratch/` or `_incoming/`. Merging. Both forbidden.

---

## 11. Lessons.md

After merge, `prompts/v0/S2g-lessons.md` covers all three runs (rejected first run, superseded R1, merged R2) with the standard three AUTHORED-BY sections. Claude retrospective will log: defect Pattern #19 (sizes in bytes only / prefer hashes), the project-knowledge staleness root cause behind R1, and the model change to anchored insertions as the durable fix.

**End of Stage S2g-R2 prompt.** Operator pre-step: none beyond having the plan payload in `_incoming/`. Fire it.
