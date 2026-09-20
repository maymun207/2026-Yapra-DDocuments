CWF-SESSION-GRAPH-KB-v143

Edges S143 learned, each tagged [S143]. APPEND to v142 (which stands in full, by name; present in the _9 box).
Form: SUBJECT —relation→ OBJECT · evidence.

## PRODUCT

- a2a/runTask.ts —runs→ the chat turn pipeline —therefore renders→ the chat system prompt (identity,
  safety.b1_scope: Kale-only) [S143] · code read, runTask.ts:121, :146-153
- a2a/runTask.ts `language: 'en'` —is→ a language-detector tie-break only, not a prompt switch [S143] · its own comment
- resolvePromptSegments.ts —resolves each segment→ draft (lab) > rollout > published > floor [S143] · :201-226
- promptRevFrom —hashes→ every id in the closed SEGMENT_IDS list —feeds→ configFingerprint and the rolloutGuardrail
  ledger per promptRev [S143] · :95, :228; scout v2 RED
- adding an id to SEGMENT_IDS —rotates→ every chat turn's promptRev and guardrail baseline [S143] · scout v2 RED
- a per-arm overlay AFTER the chain and BEFORE promptRevFrom —leaves→ the chat promptRev byte-identical [S143] · card v3 design (unreviewed; frozen)
- stageClarify.ts —imports→ diagnoseFrom (⑤) and decideTurn (⑥) → both WIRED [S143] · :78-79
- GraphKbReader —has no caller outside its own dir [S143] · git grep (CALLER-ABSENT, §12.6)
- bm25 —imported only by→ vectorLane/encoder.ts and scripts/pbFullMeasure.ts, not the turn [S143] · git grep
- entityDiagnosis.ts —declares→ τ and β are governed agent.param rows, NOT defined in code; none published [S143] · :88, domain_rules
- code "L5" —means→ progressive delivery, NOT the entity/retrieval miss ledger (name collision) [S143] · git grep ×2
- api/admin/bench-reset.ts refusal —was caused by→ catalogue drift; persistence_class_catalog() now 60 tables, zero drift [S143] · G9
- Path B closed + vector unreachable —MAY explain→ MKB questions routed to ARMES [S143] · HYPOTHESIS, unmeasured (item 28)

## FACTORY

- GitHub plan state —can change between two reads 88 minutes apart; a reading describes its instant [S143] · scout 17:56Z 403 vs 19:24Z 200
- branches/master/protection 404 "Branch not protected" —is normal when→ the gate is a ruleset, not classic protection [S143] · scout
- `lane:boot --confirm-takeover` —can leave→ a row on a dead nonce (FW001) —repaired by→ factory_reclaim via scripts/factoryState.mjs [S143]
- a message to AG-n —needs→ first line `<!-- relay-audit: v1 kind=… -->`; a non-card sent as card —fails→ AG001 [S143]
- exempt kinds (notice, report) —must be→ ≤8192 chars and carry no `## ORDERS` [S143]
- the lane's doc-repo push —lands (ls-remote)— but cannot lock refs/remotes/origin/main (sandbox) [S143]
- tsx —cannot bind IPC in lane/scout windows (EPERM); plain node + resolver hook runs cardPreflight [S143]
- the repo's card gate (CP-4) —can false-positive→ a present decay trigger [S143] · scout v2
- the owner —ended→ 2-minute pollers; delivery is "kartını oku" + Architect 3-minute bus timer; 10-turn sessions [S143]

## PROCESS

- a carried OPEN item naming a live switch —must be re-read before it is repeated [S143] · containment was already done
- a truncated query —is not→ an absence (G6 v1) [S143]
- an estimated timestamp —is not→ a measurement; stamp with date -u [S143]
- the owner's pasted table —exposed→ a register with no product axis [S143] · §12.14

END · CWF-SESSION-GRAPH-KB-v143
