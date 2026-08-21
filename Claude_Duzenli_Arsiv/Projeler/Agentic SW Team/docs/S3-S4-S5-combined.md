# Stage S3–S5 (combined) — Timeline · Prerequisites · Verify

> **stage_id:** S3-S5  
> **stage_type:** Phase 1 · Content reconciliation + verification · content repo  
> **author:** Claude (architect · single-author rule)  
> **date:** 2026-06-03  
> **model_recommended:** Claude Sonnet 4.6  
> **model_used_actual:** [AG fills in `lessons.md`]  
> **estimated_size:** S — AG 15–20 min · human review 15 min  
> **merge_mode:** operator-gated — AG opens PR, reports, stops. Operator opens file standalone in browser, signals. AG merges.  
> **predecessor:** S2 ✅ (must be merged before this stage runs)  
> **successor:** S6-S7 (combined — the tab flip, Phase 2)  

---

## 1. Goal

Apply three content corrections to the single SSoT file, prove consistency,
and open one PR. Stages S3, S4, and S5 are collapsed here because they
are all small edits to the same file with no conflict risk, and S5
(consistency check) is logically just the acceptance criteria for S3+S4.

**S3 — Timeline:** add the M1=June 2026 calendar anchor and the
programme-vs-roadmap split so readers never see "7 months" and
"13 months" without the bridge between them.

**S4 — Prerequisites:** mark ④ as RESOLVED; reword ⑤ from
"expertise gaps" to "required capabilities (human or agentic)"; update
the section header to reflect 4 open, 1 resolved.

**S5 — Verify (folded into acceptance criteria):** no separate stage;
confirmed clean by the acceptance checks below.

---

## 2. File in scope

**One file only:**
`docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html`  
Repo: `agbuilder-platform/revolutionize`, branch `main`.  
Read the live file from GitHub before any edit. The line numbers below
are from the pre-S2 file — confirm exact text before replacing.

---

## 3. Step 0 — Confirm file state before editing

Check the live file and report:

- Confirm S2 is already merged: `showEarchDetail` function exists in the
  script block. If absent, **stop** — S2 must merge first.
- Report current line count of the file.
- Confirm `T.en.eplan.t1` contains `'Timeline — phases across 13 months'`
  (no calendar anchor yet).
- Confirm `ROPENS[3][1]` is `'Relation to ARDICTECH platform'`
  (not yet resolved).
- Confirm `ROPENS[4][1]` is `'Biggest expertise gaps'`
  (not yet reworded).

Report findings, then proceed to edits.

---

## 4. S3 edits — Timeline strings

Apply these six str_replace operations. Confirm exact text from the live
file before each replace. EN and TR both updated in every edit.

---

### 4a — EAIP Sched section title (add calendar anchor)

**Old EN:**
```
t1:'Timeline — phases across 13 months',
```
**New EN:**
```
t1:'Timeline — phases across 13 months  (M1 = June 2026 · M7 = Dec 2026 · M13 = June 2027)',
```

**Old TR:**
```
t1:'Zaman çizelgesi — 13 ay boyunca fazlar',
```
**New TR:**
```
t1:'Zaman çizelgesi — 13 ay boyunca fazlar  (A1 = Haziran 2026 · A7 = Aralık 2026 · A13 = Haziran 2027)',
```

---

### 4b — EAIP Sched lede (add programme/roadmap split)

**Old EN:**
```
l1:'Phases overlap deliberately: Web Asistan and Galip Usta start while Platform Core is still finishing; CWF v1 (the Kale delivery) runs M3–M5; Insurance triage for Türk Re overlaps it. Astra is the long enterprise tail.',
```
**New EN:**
```
l1:'Programme (M1–M7 · June–Dec 2026): Platform Core, Web Asistan, Galip Usta, CWF v1 (Kale — build M3–M5, production cutover M7), Insurance v0.8. Roadmap (M8–M13 · 2027): CWF v2, Astra. Phases overlap deliberately — Web Asistan and Galip Usta start while Platform Core is still finishing; Insurance triage overlaps CWF v1.',
```

**Old TR:**
```
l1:'Fazlar bilinçli olarak örtüşür: Web Asistan ve Galip Usta, Çekirdek Platform henüz bitmeden başlar; CWF v1 (Kale teslimatı) M3–M5\'te çalışır; Türk Re için Sigorta triyajı onunla örtüşür. Astra uzun kurumsal kuyruktur.',
```
**New TR:**
```
l1:'Program (M1–M7 · Haziran–Aralık 2026): Çekirdek Platform, Web Asistan, Galip Usta, CWF v1 (Kale — inşa M3–M5, üretim geçişi M7), Sigorta v0.8. Yol haritası (M8–M13 · 2027): CWF v2, Astra. Fazlar bilinçli olarak örtüşür — Web Asistan ve Galip Usta Çekirdek Platform bitmeden başlar; Sigorta triyajı CWF v1 ile örtüşür.',
```

---

### 4c — EAIP Sched total line (add programme/roadmap note)

**Old EN:**
```
totalu:'engineer-hours across 7 phases · M1–M13',
```
**New EN:**
```
totalu:'engineer-hours across 7 phases · M1–M13 (programme M1–M7 · roadmap M8–M13 / 2027)',
```

**Old TR:**
```
totalu:'mühendis-saat · 7 faz · M1–M13',
```
**New TR:**
```
totalu:'mühendis-saat · 7 faz · M1–M13 (program M1–M7 · yol haritası M8–M13 / 2027)',
```

---

### 4d — Big Picture EAIP card body (add programme/roadmap split)

**Old EN:**
```
cardbp:'The customer-facing platform built and operated through that loop. Multi-tenant, sovereign-hosted, delivered in phases A–G (Platform Core → Web Asistan → Galip Usta → CWF → Insurance → Astra) over M1–M13.',
```
**New EN:**
```
cardbp:'The customer-facing platform built and operated through that loop. Multi-tenant, sovereign-hosted, delivered in phases A–G over M1–M13. Programme (M1–M7 · June–Dec 2026): Platform Core, Web Asistan, Galip Usta, CWF v1, Insurance v0.8. Roadmap (M8–M13 · 2027): CWF v2, Astra.',
```

**Old TR:**
```
cardbp:'Bu döngü aracılığıyla inşa edilen ve işletilen müşteriye dönük platform. Çok kiracılı, egemen sunuculu, A–G fazları halinde (Çekirdek Platform → Web Asistan → Galip Usta → CWF → Sigorta → Astra) M1–M13 boyunca teslim edilir.',
```
**New TR:**
```
cardbp:'Bu döngü aracılığıyla inşa edilen ve işletilen müşteriye dönük platform. Çok kiracılı, egemen sunuculu, A–G fazları halinde M1–M13 boyunca teslim edilir. Program (M1–M7 · Haziran–Aralık 2026): Çekirdek Platform, Web Asistan, Galip Usta, CWF v1, Sigorta v0.8. Yol haritası (M8–M13 · 2027): CWF v2, Astra.',
```

---

### 4e — Insurance phase label (add v0.8)

**Old:**
```
ins:['#F85149','Insurance','Sigorta'],
```
**New:**
```
ins:['#F85149','Insurance v0.8','Sigorta v0.8'],
```

This propagates to the GANTT bar label and the phase card header
automatically (both read from `EPH`).

---

## 5. S4 edits — Prerequisites

---

### 5a — ROPENS ④: mark as RESOLVED

**Old:**
```
 ['④','Relation to ARDICTECH platform','ARDICTECH platformuyla ilişki','Extensions vs independent products. The bridge implies Revolutionize builds EAIP — confirm the boundary.','Uzantılar mı bağımsız ürünler mi. Köprü, Revolutionize\u2019ın EAIP\u2019yi inşa ettiğini ima eder — sınırı onaylayın.'],
```
**New:**
```
 ['④','Relation to ARDICTECH platform  ✓ RESOLVED','ARDICTECH platformuyla ilişki  ✓ ÇÖZÜLDÜ','RESOLVED: Revolutionize builds and ships verified PRs into EAIP; EAIP production telemetry flows back as the reality feed. The boundary is the bridge — confirmed by the programme architecture.','ÇÖZÜLDÜ: Revolutionize, EAIP\u2019ye do\u011frulanm\u0131\u015f PR\u2019lar in\u015fa edip g\u00f6nderir; EAIP \u00fcretim telemetrisi ger\u00e7eklik beslemesi olarak geri d\u00f6ner. S\u0131n\u0131r k\u00f6pr\u00fcd\u00fcr \u2014 program mimarisince onaylanm\u0131\u015ft\u0131r.'],
```

---

### 5b — ROPENS ⑤: reword to "Required capabilities"

**Old:**
```
 ['⑤','Biggest expertise gaps','En büyük uzmanlık boşlukları','Likely formal methods (TLA+/Alloy), agent orchestration, multi-tenant security — drives the Phase 5 risk and reading week.','Muhtemelen biçimsel yöntemler (TLA+/Alloy), ajan orkestrasyonu, çok-kiracılı güvenlik — Faz 5 riskini ve okuma haftasını belirler.']];
```
**New:**
```
 ['⑤','Required capabilities','Gerekli yetenekler','Formal methods (TLA+/Alloy), agent orchestration, multi-tenant security — each may be embodied as a human (hire/upskill) or a purpose-built agent. Drives Phase 5 risk and the reading week.','Biçimsel y\u00f6ntemler (TLA+/Alloy), ajan orkestrasyonu, \u00e7ok-kira\u015fl\u0131 g\u00fcvenlik \u2014 her biri insan (i\u015fe al\u0131m/e\u011fitim) veya amaca \u00f6zel ajan olarak somutla\u015fabilir. Faz 5 riskini ve okuma haftas\u0131n\u0131 belirler.']};
```

Note the closing `]};` — this is the end of the `ROPENS` array and the
enclosing object. Confirm exact surrounding context before replacing.

---

### 5c — Prerequisites section header (4 open · 1 resolved)

**Old EN:**
```
t4:'Open prerequisites — resolve before / during Phase 1',l4:'These five were unresolved at last review and remain marked OPEN here rather than assumed. Two are effectively answered by the bridge (Revolutionize builds EAIP), but still need an explicit decision.',
```
**New EN:**
```
t4:'Open prerequisites (4 open · 1 resolved) — resolve before / during Phase 1',l4:'Five strategic prerequisites. ④ is resolved — the programme architecture confirms Revolutionize builds EAIP and EAIP telemetry feeds Revolutionize. The remaining four (①②③⑤) are open: answer them before Phase 1 gates close.',
```

**Old TR:**
```
t4:'Açık ön koşullar — Faz 1 öncesi / sırasında çözülmeli',l4:'Bu beşi son incelemede çözülmemişti ve varsayılmak yerine burada AÇIK olarak işaretlendi. İkisi köprü tarafından (Revolutionize EAIP\'yi inşa eder) fiilen yanıtlanıyor, ancak yine de açık bir karar gerekiyor.',
```
**New TR:**
```
t4:'Açık ön koşullar (4 açık · 1 çözüldü) — Faz 1 öncesi / sırasında çözülmeli',l4:'Beş stratejik ön koşul. ④ çözüldü — program mimarisi, Revolutionize\'ın EAIP\'yi inşa ettiğini ve EAIP telemetrisinin Revolutionize\'a beslendiğini doğrular. Kalan dört (①②③⑤) açıktır: Faz 1 kapıları kapanmadan önce yanıtlayın.',
```

---

## 6. S5 acceptance criteria (verification — no separate stage)

AG runs these checks on the edited file and reports pass/fail for each.

**Content checks:**
- [ ] `grep 'M1 = June\|M1=June\|Haziran 2026'` → matches in `t1` of `eplan`
  (EN and TR both)
- [ ] `grep 'M1–M7\|M8–M13'` → appears in `eplan.l1`, `eplan.totalu`,
  and `big.cardbp` (EN and TR both)
- [ ] `grep -i 'v0\.5'` → **0 results** across the full file
- [ ] `grep 'Insurance v0.8\|Sigorta v0.8'` → appears in `EPH.ins`
- [ ] `grep 'RESOLVED\|ÇÖZÜLDÜ'` → appears in `ROPENS[3]` (④)
- [ ] `grep 'Required capabilities\|Gerekli yetenekler'` → appears in
  `ROPENS[4]` (⑤)
- [ ] `grep '4 open\|4 açık'` → appears in the prerequisites section `t4`
- [ ] `ROPENS` array still has exactly 5 entries

**Standalone browser check (quick — operator):**
1. Open the edited SSoT file directly in a browser.
2. EAIP Sched tab → section title shows the M1/M7/M13 calendar anchor.
3. EAIP Sched tab → lede shows "Programme (M1–M7 · June–Dec 2026)" and
   "Roadmap (M8–M13 · 2027)".
4. EAIP Sched tab → GANTT Insurance bar label reads "Insurance v0.8".
5. Rev Plan tab → prerequisites section header shows
   "Open prerequisites (4 open · 1 resolved)".
6. Rev Plan tab → ④ card shows "✓ RESOLVED" in its title and
   "RESOLVED:" in its body.
7. Rev Plan tab → ⑤ card shows "Required capabilities".
8. EN/TR toggle → all updated strings appear correctly in both languages.
9. All other tabs (Big Picture, EAIP Arch, EAIP Conn, Rev Arch, Rev Conn)
   render normally — no regressions.
10. Click-to-detail panels from S2 still work on EAIP Arch and Rev Arch.

---

## 7. PR and merge gate

PR title: `S3-S5: timeline anchor + prerequisites reconciliation + verify`  
PR body includes:
- Step 0 confirmation (S2 present, current line count)
- List of all 6 str_replace operations applied (old→new summary)
- Content check results (grep outputs)

**AG stops after opening the PR.** Operator runs the 10-point standalone
browser check. AG merges only after operator signals approval.

---

## 8. Lessons.md

After merge, AG appends to `docs/process/lessons.md`:

```
## S3-S5 (combined) — Timeline · Prerequisites · Verify
### AG delivery summary
Model: [model] · Lines changed: [N] · PR: [#N] · Merge SHA: [sha]
Step 0: S2 present: [yes/no] · Pre-edit line count: [N]
Edits applied: 4a timeline t1 ✅/❌ · 4b lede ✅/❌ · 4c totalu ✅/❌ ·
4d cardbp ✅/❌ · 4e ins label ✅/❌ · 5a ④ resolved ✅/❌ ·
5b ⑤ reword ✅/❌ · 5c prereq header ✅/❌
grep sweep: v0.5=0 [✅/❌] · M1=June present [✅/❌] · RESOLVED present [✅/❌]
### Operator review
[Maymun fills in after browser check]
### Prompt-author retrospective
[Claude fills in next session]
```

---

## 9. What this stage does NOT touch

- Click-to-detail JS/CSS (S2 work — preserve exactly)
- Any data arrays (COMPS, ECONN, RSYS, RCONN, GANTT, EPLAN) — only
  string labels and prose
- `08_leadership_charter_bilingual.html` — untouched (superseded by SSoT)
- App repo (`maymun207/TheBluePrint23`) — Phase 2 work (S6-S7)
- Any file other than the single SSoT HTML file
