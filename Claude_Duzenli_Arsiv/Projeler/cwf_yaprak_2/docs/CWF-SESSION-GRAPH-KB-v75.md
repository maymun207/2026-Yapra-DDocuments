# CWF — Session Graph KB · v75
<!-- CWF-SESSION-GRAPH-KB-v75 · 2026-08-02 · records S76. Supersedes v74. -->

## S76 — "Doküman zemini indi, borçlu emeklilik infaz edildi, mühür basıldı"
One session, three arcs, ending in the v1.0.0 tag:

**Arc 1 · A7 B6-min-docs.** Bootstrap clean at `45dec96b` → PHASE-A7-B6-MIN-
DOCS-1: AG BLOCKED correctly on an un-relayed ADR-012 artifact (Architect
S54-3 violation — prompt and payload split across two relays; remedied by
embedding the body + sha256 in ONE relay). Five items + ADDENDUM-1 landed in
7 commits: ADR-012 byte-verbatim under an honest landing header (`Status:
PROPOSED` untouched, ratification recorded outside the artifact) ·
delegation-policy.md with a 17-row grep-anchored enforcement table (one
false-zero caught and corrected by AG's own discipline) · Level-3/gated-
Level-4 autonomy language · append-only layer labels on ADR-001…011 (11/11
bodies byte-identical, twice-proven) · Stage Cards join the drift gate
(seal `1f0ca2fbe1f8`, positive control proven three times by two lanes) ·
dead evalGate glob removed with a sha-identical proof it contributed nothing
(AG's "unwatched" severity honestly downgraded — coverage existed via
knowledge/**). CI taught the flake discipline: rule26 red with a NEW
signature (`:71` vs anchor's `:28`) → one ordered rerun → green; eval-canary
skipped proven the STRUCTURAL pull_request state (Architect demand amended).
Merge `6350844e`, docVersion 174.

**Arc 2 · B5 retirement (owner: "temiz bir nokta").** Owner ruled
factory_registry drops INSIDE v1. Architect census misclassified
factoryParamHint.ts as comment-only (head-truncated grep sampling); AG's §0
re-verification caught the LIVE turn-path read whose fail-open catch→[]
would have died silently and permanently on the DROP → PARAMHINT-MIRROR-
READ-1 minted and closed by design in v1_1 (three rulings: hint-read joins
the swap with a negative-control test; entity_list_tool census moves to the
post-G2 tree → arm 1, column drops in the same file; zero-grep scope splits
code-literal-zero from classified doc history). Single commit `80cf0db`,
26 files: floor + hint + lens re-point at entity_registry's FACTORY layer
(four-way empty≠zero proven branch-for-branch; the suite net caught two
grant-map refs three grep casings missed). Merge `4b55480`; docVersion 175.
Operator applied `20260802120000` with pre-read (17 rows, 0 stragglers),
idempotence, 42P01 + info-schema absence proofs AND an existence-probe
positive control; backends 4 rows intact. Prod READY, zero new error
classes.

**Arc 3 · The seal.** PHASE-A8-SEAL-1 STOPPED at G1 on the Architect's
branch census — read through a `--depth 5` SHALLOW clone, a lens that
cannot see non-default branches (46 fully-merged historical branches
existed). Ruling arm (a): prune authorized behind a zero-unmerged gate; all
46 deleted from the pasted list, post-census master-alone became the
closure record. Master run `30731940883` redded on rule26 with MATCHED
signatures (the `:71` class + a new family member: vite-error-overlay
click-intercept from a dev-server transform race on `api/admin/rules.ts?…`
parsed as JS) → one rerun → all green. Release notes landed verbatim
(sha `59743bb5…`), notes-commit-then-tag ordering honored:
**master `39590e97dbe382c4f0b5a40531ed20a51bab1831` · tag `v1.0.0` (object
`2b46d578…`) · `git describe` = v1.0.0 — Architect-verified from a fresh
FULL clone.** v1 SEALED; board A+B layers COMPLETE.

## Load-bearing lessons (new this session)
1. **One relay, one artifact (S54-3 re-learned):** a phase prompt that says
   "the owner relays X" has split the relay; embed the payload + sha in the
   prompt or the block is deserved.
2. **PR-run eval-canary skipped is CORRECT** (spend fence); the arbiter on
   pull_request = build×2 + coverage. Never demand the impossible job.
3. **Flake discipline, now standing:** new-signature red → ONE ordered
   rerun (justified on record) → green passes; matched signature passes
   with both records; anything else STOPs. Executed three times this
   session without drama. rule26 family now has two members: dev-server
   30s-timeout class and vite-error-overlay click-intercept.
4. **Sampling is not a census:** `head -N` on a grep (factoryParamHint) and
   a `--depth 5` clone (branch list) both produced confidently false
   inventories. A census read must use a lens that can SEE the whole
   population — and the §0 re-verification exists precisely to catch the
   Architect's lens errors (it fired twice, correctly, in one session).
5. **Fail-open code turns DROPs into silent feature deaths** — any
   retirement must census not just names but LIVE READS, and preserved
   fail-open postures get negative-control tests, not assumptions.
6. **Retire couples:** the entity_list_tool column's reads all lived inside
   the module being retired — the census point for a coupling decision is
   the POST-retirement tree, ruled deterministically, not at-anchor.
7. **The suite is a grep backstop:** DB_TABLES.FACTORY_REGISTRY refs in
   grantPolicy/verifyGrants survived four casing greps and fell to the
   manifest-completeness net (S68-9 vindicated).

## Cross-references
Register: cwf-open-items-register-v79 (esas). Bootstrap: v75 (boots S77).
Artifacts this session: PHASE-A7-B6-MIN-DOCS-1-v1 ·
RELAY-A7-ADR012-GATE-OPEN-v1 · GO-A7-B6-MERGE-v1 · cwf-open-items-register-
v78 · PHASE-B5-RETIRE-1-v1/v1_1 · GO-B5-RETIRE-MERGE-v1 ·
OPERATOR-APPLY-B5-RETIRE-v1 · PHASE-A8-SEAL-1-v1 (+census ruling relay) ·
docs/RELEASE-NOTES-v1.md (in-repo, sha 59743bb5…) · this file ·
register v79 · bootstrap v75.

<!-- END · CWF-SESSION-GRAPH-KB-v75 -->
