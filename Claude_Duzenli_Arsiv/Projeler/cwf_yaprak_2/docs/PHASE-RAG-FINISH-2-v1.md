# PHASE-RAG-FINISH-2 · v1
<!-- PHASE-RAG-FINISH-2-v1 · 2026-08-01 · S75 · Architect → AG. Owner mandate:
     S74-1 to the bottom — ONE branch, ONE review, ONE merge; the RAG problem
     is never returned to. Coverage map ratified in-session (6 owner items).
     Anchors off master ba0ad443. -->

## FINISH DEFINITION (S74-1, user-eye — ALL must hold)
(a) **W-G · Gemini witness:** the SAME knowledge questions answered via RAG
    tool calls with `provider=google` — the filtered rail serves the 5 tools.
(b) **W-S · Mixed-scope witness:** the Granit/Granit-Deneme mixed question,
    re-asked verbatim, gets its in-scope half answered (no total refusal).
(c) **W-ID:** no short-code-in-id-field stumble in fresh lookup turns (log).
(d) **W-CHIP:** a failed tool call is never counted in the Kanıt/Evidence
    chip (excluded or explicitly marked failed) — proven by test.
(e) **W-STAGE:** the Stages "Bilgi / RAG" card reflects knowledge-tool
    activity for a turn that used mkb tools (no more "opened no spans" on a
    RAG-answering turn), within observability floor invariants.

## G0 · PRE-FLIGHT (STOP on mismatch)
Fresh clone; `git rev-parse origin/master` MUST be
`ba0ad443827da1ff9d6dac27cedbf93109817fef`. Commands package.json-verified.
Live reads: mkb mirror still 5/active; b1_scope published rule `54cdfb1d`
(v3 teaching-label) is the base for the v4 job.

## BINDING CONSTRAINTS
All standing (gate unbypassable · ADR-007 · R-RUNID · consent S54-4/S74-2 ·
MCP-WARM-STALE TTL · genericity · empty≠zero · RULE-28 one turn id ·
observability floor invariants). THE GATE LAW, quoted because G2 touches its
neighborhood: "no gate change" = engine + stage order + interpreter
byte-identical; **additive per-backend dispatch is legitimate.** Your report
must PROVE byte-identity of untouched gate parts (AST/comment-stripped
compare per S34-1/S35-1 where comment-only, byte-pin diffs elsewhere).

## G1 · [code] IDFIELD line (owner P1)
`pack.ts` PROTOCOL_PREAMBLE, append ONE sentence to the KİMLİK ŞEKLİ bullet:
`Ad alanları yeterliyse opsiyonel id alanlarını HİÇ doldurma.`
Re-pin the test token. Nothing else in the pack changes.

## G2 · [code] CATEGORY-RAIL generalization (owner item 5)
Goal: the category rail becomes per-backend so EVERY provider's filtered
path can serve any backend's tools. Three seams, all additive:
1. Kind registration: `machine-knowledge-base.tool_category` joins the code
   kind registry (structure→code is the sanctioned home for kind SHAPES;
   instances stay governed data). Prefer the generalization that makes
   `<backendId>.tool_category` a suffix FAMILY (like tool_doc) if the
   registry supports it — report which shape you chose and why.
2. `resolveToolCategories` widens from `['armes']` to every enabled
   registry backend, per-backend rows, union semantics unchanged for armes
   (zero behavior change for existing backends — prove by test).
3. Eval-gate referential stage: additive per-backend dispatch — a
   `<backend>.tool_category` row's tools check against THAT backend's
   mirror. Do NOT extend the armes-specific `tool_annotation` prerequisite
   to other backends unless the check's own code demands it — if it does,
   STOP and report the exact line; that is an Architect decision, not a
   silent extension.
Tests: per-backend resolution, armes-unchanged proof, gate dispatch, plus
the routing filter serving mkb tools when categories exist.

## G3 · [jobs] Two publish jobs (run post-merge, per-job consent)
1. `scripts/jobs/rag-tool-categories-v1.json` — revive the preserved
   scratchpad bytes, RE-DERIVE against the live mirror (RULE: categories
   from mirror bytes, per-tool one-line rationale in the report). Golden
   expected structurally N/A (rule-instance job); the publish-internal eval
   gate is the check. Zero tokens.
2. `scripts/jobs/rag-b1-scope-v4.json` — base = LIVE published v3 text,
   ONE Architect-authored delta, verbatim, inserted after the
   SCOPE-SELF-VOCAB bullet:
```
- KARMA SORULARDA: bir sorunun bir kısmı kapsam-içi bir kısmı kapsam-dışıysa, kapsam-içi kısmı NORMAL şekilde yanıtla; yalnızca kapsam-dışı kısmı tek cümleyle reddet. Kapsam-içi çekirdeği olan bir soruyu ASLA topyekûn reddetme.
```
   Golden REAL (reps=3, ~2.5M class) — owner consent line at its gate.

## G4 · [code] EVIDENCE-CHIP failed-call fix (owner item from triage)
The Kanıt/Evidence chip must not count a tool call whose execution FAILED
(e.g. the 17:15Z knowledge_count 400). Exclude failed calls or render them
explicitly as failed — choose the smaller diff, show it. Test with a
failed+succeeded pair.

## G5 · [code] STAGE-RAG-VIS-1 (owner item 4)
Diagnosis on record: the "Bilgi / RAG" stage card tracks governed knowledge
slices; mkb has zero published rules, so RAG-tool turns read "opened no
spans" — honest at data level, misleading at product level. Fix minimally:
knowledge-family tool activity (mkb backend tool calls) surfaces on that
stage card (a span or an activity line), WITHOUT minting any second turn id
(RULE-28) and without touching the telemetry ledger's schema. If the
minimal fix requires more than you can do additively, STOP and report the
seam — do not improvise observability surgery.

## RITUAL
ONE branch `phase/rag-finish-2` → PR → CI → STOP-FOR-REVIEW report (diff,
new preamble bytes, gate byte-identity proof, all tests, CI link).
Architect RULE-25 + GO + verbatim merge message. Post-merge: prod READY
(Architect read) → G3 jobs one at a time (consents) → witnesses W-G/W-S
(owner hand; W-G requires selecting Gemini Flash in the model dropdown) →
W-ID/W-STAGE (Architect log/screen) → phase CLOSED.

## FINDINGS LEDGER (exhaustive — carry verbatim in your report, update statuses)
IN-PHASE: RAG-IDFIELD-STUMBLE-1 (G1) · CATEGORY-RAIL-ARMES-ONLY-1 (G2+G3,
pulled from v1.1 by owner mandate) · SCOPE-MIXED-QUERY-1 (G3.2) ·
EVIDENCE-CHIP-FAILED-CALL-1 (G4) · STAGE-RAG-VIS-1 (G5).
CLOSED THIS SESSION: RAG-ATTR-1 (both halves witnessed: record-level +
document-level "Kaynak: SOP-CNC-001, Rev. 03") · RAG-PACK-IDSHAPE-1 (FIX-1).
TEAM-SIDE (relayed, wait-contracted, NOT ours to fix): RAG-SVC-INIT-RACE-1
(400 init + 60s connect timeouts under parallel calls; our retry machinery
is the current mitigation — after the team ships a fix, one parallel-call
re-run verifies) · KB-TEST-RESIDUE-1 (structural test entities + foreign-
domain doc corpus; real-doc load plan owed by team).
WATCH (named, register-bound, no deterministic fix): KB-CLAIM-CONTRA-1
(self-contradicting count claim — collect recurrences).
BOUND-BY-NAME, POST-TAG (board law, acceptance test recorded):
BACKEND-LIFECYCLE-AFFORDANCE-1 — "new backend join = ZERO repo commits;
delete = one gated action, cascaded cleanup, audit preserved" — same block
as FLOOR-TENANT-SPLIT. RAG-ROUTE-STARVE-1 CLOSES when W-G passes.
Register note: publish seam actor = ksadmin@ardictech.com (gmail is not an
auth.users row).

## SELF-VERIFY (literal evidence per line) + tail anchor
□ G0 hash+reads □ G1 bytes □ G2 byte-identity proof + armes-unchanged test
□ G4/G5 diffs+tests □ full vitest recount □ CI link (in_progress ≠ pass)
□ ledger statuses updated □ nothing silently fixed
End with `END-OF-RAGFINISH2-REPORT-v1`.

<!-- END · PHASE-RAG-FINISH-2-v1 -->
