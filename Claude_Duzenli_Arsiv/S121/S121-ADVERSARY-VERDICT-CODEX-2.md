# S121 · ADVERSARY VERDICT — CODEX-2

Target: `S121-OPEN-MEASUREMENT-v2.md`

Repository used: local clone whose remote is `https://github.com/maymun207/cwf_yaprak.git`; `git ls-remote origin refs/heads/master` returned `cd8261ef53509efb9f6f7d985c0ce235e0695393`. Repository file checks below use that commit explicitly.

Standard: attack only claims whose falsity would change a conclusion. Missing hashes, raw logs, and exit codes are ignored unless their absence changes the conclusion.

---

## Load-Bearing Attacks

### 1. SOTA justification for the whole path

Claim attacked, lines 227-229:

> "the criterion advanced is `mcp-honestbench`, named in `cwf-sota-definition-v1_5` §5 and carried in its §10 status table as one of the sixteen unmeasured external criteria — the only queued item that moves the external scoreboard."

Why it matters: this is the SOTA-1 license for doing honestbench rulings instead of factory work. If false, the chosen path loses its stated authority.

Check that settles what the public repo can settle:

`git grep -n "cwf-sota-definition.*not in this repo\|mcp-honestbench\|cwf-sota-definition-v1_5" cd8261ef -- .agents docs scripts shared api`

Result: RAN. The public repo contains many references to `mcp-honestbench`, but also states in `.agents/CHANGELOG.md:179` that `cwf-sota-definition` is owner-held and not in this repo. So the public repo does **not** settle this claim.

Additional non-repo archive check:

`nl -ba ".../Claude_Duzenli_Arsiv/CWF-SOTA - DOCUMENTS/cwf-sota-definition-v1_5.md"`

Result: RAN. Archive copy supports part of the claim: §5 lines 194-212 names `mcp-honestbench`; §9 lines 261-262 records owner ruling R2; §10 lines 274-294 includes `mcp-honestbench` as `NOT BUILT`; lines 338-341 say sixteen external criteria remain unmeasured. It does **not** independently prove "the only queued item that moves the external scoreboard."

Adversarial result: **UNSETTLED from the required public repository; partially supported by archive.** Do not treat the "only queued item" clause as repo-proven.

### 2. Four Architect rulings are really four

Claim attacked, lines 224-225:

> "S121 spends itself on the four Architect rulings (preconditions 3-6), and does not reopen the factory to do it."

Supporting claim attacked, lines 301-308 of the cited repo report:

> preconditions 3-6 are "the closed detection vocabulary", "the provenance marker's literal form", "a ruling on the `runlog.jsonl` conflict", and "which M3 governs."

Why it matters: if even one of the four is already named in code, then S121's next action should not be "four rulings"; it should either reduce the ruling list or change one item into an implementation/export check.

Check:

`git show cd8261ef:api/cwf/_lib/grounding/types.ts | nl -ba | sed -n '34,69p'`

`git show cd8261ef:api/cwf/_lib/grounding/groundingCheck.ts | nl -ba | sed -n '400,441p'`

`git show cd8261ef:api/cwf/__tests__/provenance.envelope.test.ts | nl -ba`

`git show cd8261ef:api/cwf/_lib/turn/stageTools.ts | nl -ba | sed -n '1648,1660p'`

Result: RAN. The repo names concrete provenance fields: `FactProvenance.backendId`, `tool`, `serverName` in `api/cwf/_lib/grounding/types.ts:41-48`; `parseToolResultMeta` stamps `{ tool, backendId, serverName }` from server config at `groundingCheck.ts:413-420`; tests assert the envelope at `provenance.envelope.test.ts:6-29`; runtime pushes the meta at `stageTools.ts:1656-1660`.

Counter-check:

`git show cd8261ef:api/cwf/_lib/turn/stageStream.ts | nl -ba | sed -n '859,868p'`

`git show cd8261ef:api/cwf/_lib/replay/taskFn.ts | nl -ba | sed -n '230,241p'`

Result: RAN. The exported/client raw results lack backend fields (`stageStream.ts:859-864`), and replay rebuilds metadata without server config (`taskFn.ts:230-241`), so persisted replay artifacts may still lack the envelope authority.

Adversarial result: **PARTLY REFUTED.** The literal runtime marker is not "not stated"; it is stated as `provenance.backendId/tool/serverName`. What remains unresolved is whether the scorer's exported artifact carries it. That changes the work: precondition 4 is not purely an Architect naming ruling; it may be an artifact-export/persistence gap.

### 3. Preconditions 3-6 gate scoring, not running

Claim attacked, lines 212-215 and 217-218:

> "items 3-6 gate *scoring*, not *running*"

> "this table is read from a landed report; it has not been re-derived against the scorer code and the frozen text by this seat."

Why it matters: if items 3-6 do not gate scoring, S121 should build/run the scorer before writing rulings. If they gate running too, S121's "no factory/no window" route is incomplete.

Check:

`git ls-tree -r --name-only cd8261ef | rg -i 'honestbench|scorer|score'`

`git show cd8261ef:docs/relay/PHASE-HONESTBENCH-SCORER-DESIGN-2-AG3-report.md | nl -ba | sed -n '296,321p'`

Result: RAN. The commit contains the design reports and generic replay scorers, but no implemented honestbench scorer. The cited report itself states the precondition table at lines 301-310 and explicitly labels the critical-path statement as a "design opinion" at lines 318-321.

Adversarial result: **UNSETTLED.** The repo can verify that the statement is reported; it cannot verify the critical path because the scorer does not exist to test. The document should not let "design opinion" harden into "the one path" without the re-derivation it admits is missing.

### 4. Harness exists; deterministic scorer does not

Claim attacked, lines 119-121:

> "of *harness · fixture · scorer*, the harness and its three files exist and are landed. The one that does not exist is the **deterministic scorer**."

Why it matters: if false, S121 should build the missing harness/fixture or stop treating the bootstrap as stale.

Check:

`git show cd8261ef:docs/honestbench-harness-0-report.md | nl -ba`

`git ls-tree -r --name-only cd8261ef | rg -i 'honestbench|scorer|score'`

Result: RAN. `docs/honestbench-harness-0-report.md:7` says the instrument is built and proven but the scored run did not happen; lines 118-150 describe the instrument, five dials, and three files; lines 203-214 show all modes `NOT RUN`; lines 216-225 name blockers. The tree search finds reports and generic replay scorers, not an honestbench scorer implementation.

Adversarial result: **NOT REFUTED by the repo.** This load-bearing claim survives the public commit check.

### 5. Factory is open in the live DB, so do not reopen it here

Claim attacked, lines 125-141:

> "The bootstrap and the session close both state the factory is shut down. **The database does not know it.**"

> "No `DRAINING`, no `SHUTDOWN`, and no `CLOSED` lane row was ever written."

Why it matters: this supports "not reopening the factory" and "not writing the database half of the death certificate."

Check:

Live DB query required against `public.factory_state`.

Result: **UNRUN.** No Supabase MCP/database tool is available in this session. The public repo can verify the table and state vocabulary exist, but not the live rows at 2026-08-27 08:35Z.

Repo-side supporting check:

`git grep -n "DRAINING or SHUTDOWN" cd8261ef -- .claude/boot/producer.md`

Result: RAN. `.claude/boot/producer.md:105-109` supports the rule that a producer should not claim on `DRAINING` or `SHUTDOWN`. It does not prove the live mode was `READY`.

Adversarial result: **UNSETTLED.** If the live DB state is wrong, the "do not reopen / do not write death certificate yet" conclusion changes immediately.

### 6. Factory reclaim remedy is deployed and reachable, but behavior is unmeasured

Claim attacked, lines 153-169:

> "That phase landed... deployed body vs reviewed migration... ACL... lane role..."

> "The correct sentence is: **the remedy is deployed and reachable; whether it works is untested.**"

Why it matters: if the remedy is not deployed/reachable, S121 may need factory recovery work before any safe future window. If behavior was already proven, the remaining risk is smaller.

Check:

`git show cd8261ef:supabase/migrations/20260825153000_factory_recovery.sql | nl -ba`

Result: RAN. Repo migration defines `public.factory_reclaim` at lines 89-144, uses `security definer` at lines 91-93, updates `factory_state` and writes `UNCORROBORATED-TAKEOVER` at lines 126-142, revokes execute from public/anon/authenticated and grants to `cwf_lane` at lines 153-154.

Live checks required:

`select prosrc, prosecdef, proacl from pg_proc...`; `has_function_privilege('cwf_lane', ..., 'EXECUTE')`; behavioral execution of `factory_reclaim`.

Result: **UNRUN** for live deployment and behavior. No database tool is available, and behavioral execution would mutate the coordination plane.

Adversarial result: **PARTLY CHECKED, NOT SETTLED.** The public repo proves the reviewed migration's intended body and ACL, but not deployment or reachability. The document's own "behavior unmeasured" bound is correct.

### 7. Public endpoint is retired as blocker

Claim attacked, lines 203 and 269-270:

> "instrument reachable on public HTTPS | reported YES"

> "If the instrument's public endpoint is not live, precondition 1 is not retired, and the nearest blocker is a host and a spend — the owner's, not the Architect's."

Why it matters: if the endpoint is not live, S121 should measure/host/spend before writing scoring rulings.

Check:

A live HTTP probe of the instrument's public health path.

Result: **UNRUN.** The v2 document does not give the endpoint URL. The public repo at `cd8261ef` contains `docs/honestbench-harness-0-report.md:21-23`, where the instrument repo was still private at that earlier report; the later scorer report only says the endpoint was measured in a previous card, not what URL to probe.

Adversarial result: **UNSETTLED and load-bearing.** The document itself says this is cheap and unrun at lines 272-273; without the URL, this reviewer cannot settle it.

### 8. Frozen branches are deliberately not the next work

Claim attacked, lines 245-248:

> "Not landing the twenty frozen branches. Fourteen carry only reports. `context-retrieval-1` + `-organ` (26 commits, 40 code files per `S120-HANDOVER-CENSUS-v1`) stay frozen as a decision..."

Why it matters: if those branches carry code that should land before honestbench rulings, S121's next action changes.

Check:

`git ls-remote --heads origin`

`git ls-remote --heads origin '*context-retrieval*' '*organ*'`

Result: RAN. The remote does have many phase branches, and the two named context-retrieval branches exist:

`refs/heads/phase/context-retrieval-1`

`refs/heads/phase/context-retrieval-1-organ`

The counts "twenty frozen branches", "fourteen report-only", "26 commits", and "40 code files" were not rederived here.

Adversarial result: **PARTLY CHECKED, NOT SETTLED.** Existence of the named branches is proven; the classification and counts remain carried from the census.

---

## Direct Answer

The single claim that would most change what S121 should do next is lines 227-229:

> "the criterion advanced is `mcp-honestbench`, named in `cwf-sota-definition-v1_5` §5 and carried in its §10 status table as one of the sixteen unmeasured external criteria — the only queued item that moves the external scoreboard."

If that is false, the SOTA-1 justification collapses. S121 should not spend itself on honestbench rulings; it should first establish what SOTA criterion, if any, the work advances, or withdraw the path under the document's own falsifier at lines 267-268.

Second most dangerous, but narrower: the "four Architect rulings" claim. The repo already names runtime provenance fields, so precondition 4 is not cleanly a naming ruling; the next action may be to determine whether those fields are present in the scorer artifact, not to ask the Architect to invent a marker.
