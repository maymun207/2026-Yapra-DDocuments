SLIP-CARD-POST-LANDING-1-S164-1

card: CARD-POST-LANDING-1-S164-1
branch: phase/post-landing-1-s164-1
head: f145e48e8d192291267b81c6f48c275877b74478
parent: 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 (master, ls-remote read twice before the branch and once before the push, unmoved; the merge of PR 641)
report: docs/relay/POST-LANDING-1-S164-1-AG4-report.md
ci: UNMEASURED no PR by order; check-runs by the full head sha total_count=0
status: PUSHED
pr: NONE (by order: the slot is M2's, then K41's)

## Receipt
mail-wait --read --take: DIGEST-OK, SEAL admitted (ack 3e8bf097-2186-4138-9283-0b92836cd4e9), [STAMPED].
The card grammar refused the card (CP-1, CP-3, CP-4, CP-10) under CARD_GATE=REPORT: REPORTED, not acted on.

## Producer (order 2)
package.json:20 `"authority:snapshot": "node scripts/authoritySnapshot.mjs"`, which writes SNAPSHOT_PATH (scripts/authoritySnapshot.mjs:65).
It ran over the mail-wait read transport with no refusal: liveRoster / liveReplyAuthorityDef / adversaryGate all MEASURED, written at 2026-09-30T04:12:16Z against 41450c98.

## Snapshot diff (order 3)
- liveRoster: "operator","scout" → + "scout-1","scout-2"   (the lens the card asked about: PRESENT)
- liveReplyAuthorityDef: ARRAY['operator','scout'] → ARRAY['operator','scout','scout-1','scout-2','AG-1'..'AG-5']
- adversaryGate.enabled: "absent" → "O"; exemptedSince: [] → 49 named EXEMPT cards (2026-09-13 … 2026-09-30)
The last two are live changes since the 2026-09-11 reading. They are recorded as measured, not ruled on.

## Widening (order 4)
Byte-identical to commit a4d21a7a8a9f0411c1380b708d1cb02fdc702aeb:
- scripts/authorityMatrix.mjs: RULED_NONCLAIMING_AUTHORS = ['operator','scout','scout-1','scout-2'] (+ its three-line comment)
- authorityMatrix.test.ts: the pin toEqual(['operator','scout','scout-1','scout-2'])
No assertion weakened: the expected set gains two members and loses none.

## Beyond the card, named
docs/ground/authority-conformance.latest.md is in the commit. authorityMatrix.test.ts renders it from the snapshot, and omitting it would commit a document that contradicts the committed snapshot. Its one disagreement changed from ADVERSARY-GATE-ABSENT to ADVERSARY-GATE-EXEMPTIONS; the verdict is still REPORTED (not gated).
The report's first relay-audit run flagged R-DIFF (no ## DIFF section). It was added before the commit.

## Gates (order 5)
- npm run build → exit 0; `[check:ground] GREEN`; `[check:doc-drift] [OK] no drift -- all 7 narrative tabs synced` (no reseal needed)
- npm run typecheck:api → exit 0, no output
- check:rule24 → `[OK] no literal NUL in 2393 tracked source files`
- check:tenant-zero → `[OK] ZERO gated-vocabulary hits in scope — 2346 files scanned`
- check:backend-names → `[OK] every (id, class) count equals data/gates/backend-names-baseline.json.`
- relay corpus (relayAuditGate.test.ts over docs/relay/) → 37/37
- report:check → `[OK] 30 report(s) conform to docs/ground/REPORT-SCHEMA-v1.json`
- authorityMatrix.test.ts + mailWaitBoxLens.test.ts → 2 files, 57/57

## Diff (5 files)
api/cwf/__tests__/authorityMatrix.test.ts · docs/ground/authority-conformance.latest.md · docs/ground/authority-live.snapshot.json · docs/relay/POST-LANDING-1-S164-1-AG4-report.md · scripts/authorityMatrix.mjs

Not done: hand edits to the snapshot, any migration, a PR, a force push, a cron task, printing an environment value.

read relay_inbox at 2026-09-30T04:15:33Z, box empty
