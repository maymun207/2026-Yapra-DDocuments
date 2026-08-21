# CWF — Session Graph KB · v44

<!-- CWF-SESSION-GRAPH-KB-v44 · rev 44 · 2026-07-15 · Supersedes v43.
     S45 story ("the seam-and-faces day"). Ledger of record: register v47
     (carry-diff inside). Earlier sessions: KB v43 and back-pointers. -->

## S45 in one paragraph
Four merges in one day — VIZ-BIND-2 (`86a2333`), OBS-LEGIBILITY-1 (`cd97aa7`),
SCOPE-HONEST-1 (`90cc884`), PUBLISH-SEAM-1 (`fe1fc3e`, rev 92, 2513 tests) — plus
three governed edit sets authored and STAGED (19 drafts) with the golden batch
running at close. The day's shape: every blocker became a shipped capability
within hours, and twice the process itself caught a live mine before it blew.

## The chain, with the why
1 · **F111 specimen first.** The Operator read recovered the REAL ForZones shape
(`{zoneUuid:[records]}`, args carry `zoneIds[]`) — and it CORRECTED the KB's
diagnosis: findRecords already resolved naive dicts; the live honest panel came
from strict `argsContainMatch` (`match.zoneId` vs `zoneIds[]` array). Worse, a
match-less directive would have SILENTLY picked the largest zone — an intra-result
last-write-wins lie waiting to fire. VIZ-BIND-2 killed both: group derivation +
match-value group slicing + honest group panel + F107 markdown residue.
2 · **OBS-LEGIBILITY-1: the turn got a face on both planes.** Design v1 → owner
review widened it to v1_2 (Sessions→Turns→Events tiers, date range, keyword
search, stage-NUMBERED span names so the Langfuse waterfall self-labels, Langfuse
Sessions alignment — conversationId was ALREADY the sessionId; only the undefined
I/O kept it dark). Live verification closed on owner screenshots the same
morning; the ≤5s A3 north star passed on first try. The old noon TRUNCATED
incident now sits honestly in a "pre-legibility" bucket — the badge system's
first day caught its own history.
3 · **SCOPE-HONEST-1 shipped the deterministic half of F83.1** before any prompt
loosening: procedureRulesRetrieved counted off the SAME knowledgeCapture the
fingerprint hashes (no re-read, no LLM judge), stamped on span+ledger+SSE, chip
on live turns, F83.2-proof proven by fixture.
4 · **EXEC v1 stopped — and the stop was the system working.** AG refused three
bad paths (no session, chat-pasted bearer = ADR-007, owner-as-clicker = BREACH
class) and flagged the repo's missing ADR-006 amendment. PLATINUM's queue-jump
clause fired: PUBLISH-SEAM-1 built the reconcile-pattern headless seam
(plan/stage/golden/publish, consent-flag-never-default, quota-honest, audit
byte-mirror) and committed ADR-006 rev 2. One false claim corrected on the way:
prompt-golden ALWAYS took a draft SET — one golden run covers all segments.
5 · **AG's CREATE flag caught mine #2.** Plan said CREATE×4; investigation
revealed (a) benign — plan checks DRAFT existence, not published rows; env proven
right by goldenSet=20 + ceiling=12M — but (b) composeSuperset's `pick()` is
per-kind ALL-OR-NOTHING: the v1 job's partial superset rows would have silently
unserved the floor's other five rules and two steps. Job v2 carries COMPLETE sets
(3 steps + 14 rules, byte-fidelity-checked floor extraction) — and thereby
executes the long-deferred Superset DB-first activation in the same stroke.
Rules minted: **S45-1** (one relay-ready block; owner never assembles) and
**S45-2** (all-or-nothing kinds take complete sets only).

## Standing lessons S46 must not relearn
- Plan's CREATE = "no pending draft of yours", NOT "no published row".
- `underpowered` is a decision for the owner, never auto-resolved (fabb123b).
- `baseline:absent` on the first post-publish push-canary = documented-green.
- Trust an agent's BLOCKAGE reports the way you trust its success reports:
  verify from code — S45 found one true, one true, one false in a single dialog.
- The three probe texts + expected outcomes live in register v47 §2 verbatim.

<!-- END · CWF-SESSION-GRAPH-KB-v44 · rev 44 · 2026-07-15 -->
