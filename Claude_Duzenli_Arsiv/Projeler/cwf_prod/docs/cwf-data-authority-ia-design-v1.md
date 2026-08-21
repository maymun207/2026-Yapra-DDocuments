# 1c · Veri Otoritesi (Data Authority) — legibility design note

<!-- cwf-data-authority-ia-design-v1 · rev 1 · 2026-07-20 · Architect: Claude (S54)
     Inputs: F45 (naming law — label ALREADY shipped: adminTabs.ts:57 returns
     "Veri Otoritesi / Data Authority"; tree-verified) · F38 (grounding catch
     mis-reads as an error; render site = InspectTab, tree-verified) · F42
     (the Replay arrival-strip positive pattern) · TRUST-PANEL-1 (BackendTrustPanel.tsx,
     360 lines) · stage-12 grounding · Wave-2 voice law. Target lane: LANE A.
     §5 = the critique instruction (single relay payload, S54-3). -->

## 0 · What 1c is (and is not)
The RENAME is done — this workstream is CONTENT: the panel and its
neighbors must answer, in a human's head, "hangi backend'in sözü ne kadar
geçer, ve sistem bunu nasıl savunur?" No data-model change, no grounding/trust
runtime change, no tab-id change (`?tab=trust` deep-links keep working — the
1b `routing`-id precedent).

## 1 · The three tiers, in human language (panel hero copy)
Bilingual, one sentence each + "… daha fazla" expandables (Wave-2 voice):
- **system_of_record — "Sözü senettir."** Bu backend kendi alanının asıl
  kaynağıdır; rakamları doğrudan cevaba girer.
- **reporting_mirror — "Aynadır."** Asıl kaynağın yansımasıdır; işaret eder,
  hüküm vermez — çelişkide asıl kaynak kazanır.
- **unverified — "Söyler ama otorite tanınmaz."** Verisi gösterilebilir, fakat
  sistem onu asla tek başına gerçek saymaz; 12. aşama (grounding) tam bu
  sınırı savunur.
Each tier row links its LIVE backends (from the existing panel data — no new
reads expected; §5 verifies).

## 2 · F38 — the catch is a shield, not an alarm (InspectTab)
`grounding_violation` today renders as a red ⚠ that reads like a system
ERROR. It is the opposite: the deterministic layer CAUGHT a backend trying to
present absence as zero. Change (render-layer only): shield/check-shield
iconography + calm severity color + human copy: "Sistem bir yakalama yaptı:
backend yokluğu sıfır gibi sunmaya çalıştı; cevaba girmedi. Bu bir hata
değil, korumanın çalıştığının kanıtı." (+ "… daha fazla" → empty≠zero'nun bir
cümlelik dersi + Veri Otoritesi paneline NAV-STACK bridge). The event DATA and
detection logic are untouched.

## 3 · Cross-links (the F42 pattern, both directions)
- Stages board **12 (Grounding)** card ↔ Veri Otoritesi panel: each side gets
  the one-line bridge card with arrival context strip.
- The panel's existing Replay **scope-lens** deep-link (owner-loved, F42) is
  KEPT verbatim; only its copy passes the Wave-2 voice check.
- Audit drawer: copy pass only (human sentences; no structural change).

## 4 · Not touched
`backend_authority` data + tiers, grounding/trust enforcement code, eval-gate,
tab ids, telemetry shapes, `supabase/**`. Expected surface: client copy/render
(+ possibly zero api). Profile is DECIDED AFTER §5's critique — not guessed
(the 1b lesson).

## 5 · LANE A — critique instruction (findings only, no code, no phase authoring)
Verify against current `origin/master` (note the SHA):
1. **Copy sites inventory:** BackendTrustPanel.tsx — list the actual text
   blocks/testids the §1 hero + tier rows would replace; flag anything the
   note assumes that isn't there.
2. **F38 site truth:** where exactly `grounding_violation` renders in
   InspectTab (+ the InspectTab.test assertions that pin today's ⚠ render —
   what must be rewritten); confirm the event payload carries what §2's copy
   needs (backend id, kind, turn link).
3. **Data reality:** does the panel already load per-tier backend lists, or
   would §1's "links its live backends" need a new read? Name the endpoint(s)
   it uses today.
4. **Bridge feasibility:** NAV-STACK push-context availability from InspectTab
   and from the Stages 12 card to `?tab=trust` (and back) — any missing hook?
5. **Test/RULE-26 impact:** which existing spec blocks pin today's copy/icons
   (oa10UiHome, InspectTab tests, any rule26 block) and would rewrite vs
   extend.
Deliverable: numbered findings. The Architect folds them (v1_2 if needed) →
OWNER's GO → the phase prompt follows as one file.

<!-- END · cwf-data-authority-ia-design-v1 · rev 1 · 2026-07-20 · amendments mint v1_2 -->
