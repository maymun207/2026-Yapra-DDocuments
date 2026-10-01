[scout-1]
ADVERSARY-VERDICT: RED pr=661 head=f8688f2d6bb31a0dcc47467cd9bc38bb63beabce · NOT-LANDED: relay corpus (grammar v1) FAILED at the head; adversary/scout failure posted (status id 55330570001, 2026-10-01T04:15:55Z)
GRAFT: graft callers renderConformanceDocument (one caller: authorityMatrix.test.ts:73). The diff was read with `git diff 8d452df3...f8688f2d` after `git fetch origin pull/661/head`.
PROMPTS: none.

SCOUT-STATUS-LAND-661-S169-1 · reply to ORDER-SCOUT1-LAND-661-S169-1 (id 3927669b-f29f-4ce8-90c7-5678627a5a1e, md5 501ebe39…, DIGEST-OK)
Head = f8688f2d6bb31a0dcc47467cd9bc38bb63beabce (unchanged from the card), base 8d452df354e8ed98c479f6f1cdecfbc61c7ed34b. 3 commits, 3 files.

## Code review: GREEN
- A1: test :575 `measuredAt: new Date().toISOString()…` is unchanged and still the real clock.
- A2: scripts/authorityMatrix.mjs +934-958 `export function canonicalConformanceDocument(doc)` is pure (string in, string out). It filters `measuredAt:` only among the lines between the first `---` and the next `---`; a doc without front matter is returned unchanged. The test reads the disk file (catch → null), then writes only if `onDisk === null || canonical(onDisk) !== canonical(doc)`. The write still precedes `expect(verdict.ok …)`, and the read-only catch with console.warn is kept.
- A4: the unit test "canonical content ignores the front-matter measuredAt and nothing else" asserts four things: a≠b with canonical equal (which also proves the rendered doc really opens with `---`, so the guard is not a silent no-op); a new snapshot stamp → canonical differs, which is the "live half:" line; a body `measuredAt:` line is kept.
- A6: renderConformanceDocument (:907-933) has no diff hunk; the diff only appends after :933. The key set and order are unchanged.
- FILE-FENCE (report) = the 3 paths of `git diff --name-only` = PR files. The CLAIMS match the diff.
- Noted, not blocking: the test imports through a namespace cast because the .d.mts was fenced out (the report names this as dark).

## CI at f8688f2d6bb31a0dcc47467cd9bc38bb63beabce (full sha), read 04:15Z
- relay corpus (grammar v1): FAILURE. Annotation, api/cwf/__tests__/relayAuditGate.test.ts:335: "these relay artifacts carry no grammar v1 header and are not in the FROZEN exemption list … give the file a `<!-- relay-audit: v1 kind=... -->` header", Received `["docs/relay/TEST-CLEAN-TREE-S169-1-AG4-report.md"]`. The report at head opens with `# TEST-CLEAN-TREE-S169-1 · AG-4 report`, with no header line.
- changes: success · report-schema: success · arm auto-merge: success · Vercel Preview Comments: success.
- build (24.x): in_progress at read time (not counted).
- SKIPPED (named, not green): rule26, eval-canary.

## Defect for AG-4 (paste-ready)
"Add `<!-- relay-audit: v1 kind=report -->` as line 1 of docs/relay/TEST-CLEAN-TREE-S169-1-AG4-report.md (relayAuditGate.test.ts:335; do NOT add it to RELAY-AUDIT-EXEMPT-HISTORY-v1.txt). Push. The scout re-reviews the new head; the failure on f8688f2d does not carry over."

## Landing
NOT LANDED. `adversary/scout` = failure on f8688f2d; master is unchanged by this PR.
