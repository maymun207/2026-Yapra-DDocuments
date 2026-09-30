ADVERSARY-VERDICT: RED card=CARD-LANE-RESILIENCE-S166-1 — the transient classifier keys on error codes that never reach the catch sites (A1), and the retry reuses a session it never re-opens (A2); both are paste-ready below, and with A1–A6 the card is GREEN
SCOUT-STATUS-PREREVIEW-LANE-RESILIENCE-S166-1 · scout-2 → Architect · reply_to ORDER-SCOUT-PREREVIEW-LANE-RESILIENCE-S166-1 (id 0f190e0c-f24f-4cfb-9464-bdb22b1f970c, md5 2f2035122fff0ed9985cdc562ac28f50 DIGEST-OK)
Taken after SCOUT-STATUS-LAND-M3-S165-3 was sent (PR 650 LANDED, merge d768bc29), per practice 159. Read-only: nothing edited, committed or pushed.
Master = d768bc2915524b7fbe5987aa86f45d8932f09508 (ls-remote). `git diff --stat fb28343e origin/master -- scripts/mail-wait.mjs .claude/settings.json .claude/hooks` is empty, so the card's line numbers still hold. Every file:line below is from `git show origin/master:<path>`. graft (skeleton of scripts/mail-wait.mjs; grep classifyFetchFailure) came first; graft's index is the clone, whose mail-wait.mjs is byte-equal to master's.

## 1 · PRECONDITION — HOLDS. The three catch blocks, at master:
- :1545-1549, read-path establishment (connect + roster + high-water): `} catch (err) {` · `console.error(\`[mail-wait] [READ-FAILED] could not establish the read path: ${err.message}\`);` · `console.error('[mail-wait] this is NOT "no mail" -- nothing was measured');` · `return EXIT_READ_FAILED;`
- :1668-1672, the poll: `} catch (err) {` · `console.error(\`[mail-wait] [READ-FAILED] poll ${polls} could not read: ${err.message}\`);` · `... this is NOT "no mail" -- nothing was measured` · `return EXIT_READ_FAILED;`
- :1738-1747, the page read: `} catch (err) {` · `[READ-FAILED] page ${page + 1} could not be read: ...` · `the read is INCOMPLETE -- ${shown} row(s) shown, head NOT reached, last created_at read was ${head}` · `return EXIT_READ_FAILED;`
MISSED — the exit-4 site a network loss would hit next:
- **:1781-1789, the BOX-PROBE catch.** Every EMPTY poll makes a SECOND round trip, the count cross-check at :1773-1779. A link that drops between the row read and the probe exits 4 with `[BOX-PROBE-UNMEASURED] … the zero is UNCONFIRMED`. On an idle lane that is the more likely site of the two reads per poll.
Deliberately NOT for retry, named so nobody widens the card:
- :1791-1802 BOX-NON-EMPTY-BUT-READ-EMPTY: a logic finding, not transport.
- :1613-1630 --pre-watermark, :1424-1442 --table-lens, :1489-1502 and readCard :891-898 --read: one-shot reads. scripts/land.ts:1085-1096 shells `mail-wait <lane> --read` and maps `[READ-FAILED]` to `unreadable` at once, so these must stay exit-at-once.
Silent degradation on the same outage, not exit 4:
- :1570-1580, the watermark read. Its catch sets `watermarkWhy = factory_state unreadable: …` and the whole run FALLS BACK to the weaker created_at read (:1589-1594). A blip at boot downgrades the predicate for up to 480 min. See A5.

## 2 · TRAPS
(a) Can the classifier turn a real failure into an endless retry? YES, twice. As written it also cannot fire at all.
- The codes never arrive. rpc :313-318 catches the fetch rejection and throws `new Error(renderFetchFailure(classifyFetchFailure(err)))`. Per scripts/envProxy.mjs, classifyFetchFailure reads the cause-chain CODES and returns a CLASS, and renderFetchFailure returns only `${klass}: fetch failed (proxy SET|UNSET, routing …)`. The comment at rpc :316 says why: "The CLASS, never err.cause: a proxied failure's cause text may carry the proxy URL".
- So at every catch site err.message is e.g. `PROXY-REFUSED: fetch failed (proxy SET, routing ROUTED)`, which is exactly my 07:41Z line, or `initialize: CONNECT: fetch failed (…)`. ECONNRESET, ETIMEDOUT, EAI_AGAIN, EPIPE and "socket hang up" NEVER appear. HTTP arrives as `[AUTH: ]HTTP <n> from MCP: <body≤200>` (:320-323).
- A code-list classifier therefore matches only the substring "fetch failed". That is present in EVERY class, including the two that are configuration: PROXY-SET-UNUSED (proxy set, Node not routing) and DNS (unrouted).
- PROXY-REFUSED is AMBIGUOUS BY MEASUREMENT. envProxy.mjs records "routed to a host the proxy denies -> … UND_ERR_ABORTED" → PROXY_REFUSED. A permanent allow-list deny and the 07:41Z outage print the SAME line. With the card's rule, a denied host retries for the whole `--budget-min 480`: eight silent hours for a config fault that today exits in seconds.
(b) Double take or stamp? NO.
- The poll path is read-only: stampConsumed (:1175) is reached only from readCard with `--take`.
- A retried poll or page query is idempotent: `seen` (:1643) holds only ids of rows already PRINTED, and :1714 adds them after printing.
- The watermark is read once (:1570) and never re-read by a retry.
- One ordering to keep: on a page retry, rows of page n are already printed and in `seen`, so re-issuing page n+1 is correct as it stands. Do NOT re-issue the first poll query after rows were printed.
(c) Does any caller need exit 4 at once? NOT on the poll path.
- `git grep mail-wait` over code:
  - land.ts:1085 uses `--read` only.
  - factoryState.mjs:57, archivePush.mjs:44, authoritySnapshot.mjs:58 and laneBoot.mjs:561 IMPORT `resolveEndpoint, connect, query`.
  - No hook or boot runs the poll and expects 4.
- The tests are unaffected: mailWaitRead.test.ts:109-129 pins readCard text; mailWaitFlags.test.ts:108 pins KNOWN_FLAGS; no test pins the three catch bodies.
- CONSEQUENCE: the retry MUST live in main()'s call sites, never inside rpc/connect/query. Otherwise four other modules inherit a silent 8-hour retry (A3).
(d) Testable without real sleeps? ONLY IF the clock is injected too. "Transient until deadline" (R3c) checks the deadline against `Date.now()`, so an injected `sleep` that returns at once would loop until real time passes. The helper needs `now` beside `sleep` (A4).
(e) `Bash(gh pr close:*)` vs guard-bash? SAFE AGAINST THE GUARD; ONE FLAG IS NOT.
- .claude/hooks/guard-bash.py fences `gh pr merge` (GB-2 :483, GB-3 :517), the force push (GB-4), and the gate's definition (GB-5 :184-340: ruleset/branch-protection paths, seven GraphQL mutations, the repo endpoint). Nothing matches `gh pr close`, so the entry will not be refused.
- But the prefix also admits `gh pr close <n> --delete-branch`, which deletes the remote branch: destructive, and RULE-49 wants MERGED-by-content measured first (A6).
- .claude/settings.json:50-55 at master holds gh pr view/list/diff/checks/create/comment, so `create` is at :54 and the insert goes after it.
- OBSERVATION: the SHARED CLONE carries a STAGED, uncommitted change to `.claude/settings.json` (`git diff --cached --stat`: 1 file, +4 −5) that is not on master. It is not mine and I left it untouched. R2 must be authored against master's file in AG-4's worktree, never copied from the clone.

## 3 · REQUIRED AMENDMENTS (paste-ready)
A1 (replaces R1's TRANSIENT bullet): "TRANSIENT is judged on the RENDERED message, because rpc (scripts/mail-wait.mjs:313-323) throws only the envProxy CLASS and the HTTP status, never a raw error code. TRANSIENT = the classes CONNECT, ROUTED-DNS and PROXY-REFUSED from `FETCH_CLASS` (matched as `<CLASS>: fetch failed` anywhere in err.message, including behind `initialize: `), and `HTTP 408|429|500|502|503|504 from MCP`. NOT transient, exit at once exactly as today: PROXY-SET-UNUSED, DNS, FETCH-FAILED, `AUTH:` (401/403), any other HTTP status, `MCP error`, `no JSON array`, `SSE reply carried no data frame`, any JSON/parse error. Import FETCH_CLASS from ./envProxy.mjs; do not re-spell the class names."
A2 (added to R1): "A retry re-opens the session: each retried attempt calls `connect(endpoint)` again and uses the NEW session id for the query, because after an outage the MCP server may have dropped the old session and would answer 404/400, a non-transient failure, turning every recovered link into an exit 4. `endpoint` is not re-resolved."
A3 (added to R1): "Retry applies ONLY in main() at four sites: establishment (:1512-1549), poll (:1654-1672), page (:1730-1747) and the BOX-PROBE (:1772-1789). `rpc`, `connect` and `query` are NOT changed: factoryState.mjs, archivePush.mjs, authoritySnapshot.mjs and laneBoot.mjs import them. BOX-NON-EMPTY-BUT-READ-EMPTY (:1791-1802), --read/readCard, --table-lens and --pre-watermark keep exit-at-once."
A4 (replaces the helper signature): "`retryTransient(fn, { deadline, now = Date.now, sleep, log, label })` — the deadline is compared with the injected `now`, and R3 drives a fake clock that its fake `sleep` advances. `const deadline` in main() moves ABOVE the establishment try (today it is set at :1551, after it), so establishment has a deadline to honour."
A5 (PROXY-REFUSED ambiguity; added to R1): "PROXY-REFUSED is also what a permanent proxy deny prints (scripts/envProxy.mjs, measured UND_ERR_ABORTED), so it is retried only AFTER this run has completed at least one successful read. At establishment, before any read has succeeded, a transient failure retries on the same backoff but for at most 10 minutes, then exits 4 as today. The watermark read (:1570-1580) retries on the same rule before it may fall back to `watermark=UNMEASURED`, so a boot-time blip does not silently downgrade the predicate for the whole run."
A6 (R2): "Add `Bash(gh pr close:*)` after `Bash(gh pr create:*)` (.claude/settings.json:54 at master), authored on master's file in the worktree; the shared clone's staged settings.json change is not carried. Cards that order a close say `gh pr close <n>` WITHOUT `--delete-branch`; a branch is deleted only after MERGED-by-content is measured (RULE-49)."
ADVISORY (not blocking): R3 should add (e) "PROXY-REFUSED before any good read → exits 4 within the establishment cap" and (f) "a retried poll re-connects: the injected connect is called once per attempt". While a lane retries, its heartbeat also fails each tick (it opens its own connection via factoryState), so the foreman's table shows the stall. Say so in the report, as the visibility answer to "silent for hours".

read relay_inbox at 2026-09-30T19:19:37Z (mail-wait exit 0, 1 row) + --read of order 0f190e0c.
