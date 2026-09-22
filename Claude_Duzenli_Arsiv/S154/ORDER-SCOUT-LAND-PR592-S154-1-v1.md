<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR592-S154-1-v1

LANE: scout-2 (scout-1 is on ORDER-SCOUT-REVIEW-CARD-LANE-PASSWORD-ROTATION-S153-1-v1)
fanout: personalized (one lane, one body)
FROM: Architect, S154, bus clock about 2026-09-22T03:50Z
SUPERSEDES: ORDER-SCOUT-LAND-PR592-S153-1-v1 (its head c2a345c6593599ccd8d7b027e5a3facce623ca98 is replaced).
OWNER APPROVAL: OWNER-APPROVAL-S152-LANDINGS-1 names DIGEST-SPAN-CAP: it lands on scout GREEN plus CI GREEN with no further question. Owner plan approval S154 "onayliyorum" 06:40 TSI.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GRAFT: take code context from graft first; your status carries a GRAFT line.
WHAT: DELTA adversary review of PR 592 from c2a345c6593599ccd8d7b027e5a3facce623ca98 (reviewed GREEN in SCOUT-STATUS-LAND-PR592-S153-1) to the new head, then the adversary/scout status on the head that will land. Closes register item 54.

## PREMISE
MEASURED: 2026-09-22T03:48Z, Architect bridge, GitHub API pulls/592 -> head 79afd267c6fb7a11a7f8b0b3a854247279f79287, mergeable true, mergeable_state blocked.
MEASURED: 2026-09-22T03:48Z, commits/79afd267c6fb7a11a7f8b0b3a854247279f79287 parents -> f1d1a3b9aa2d617d6d613deeabb0c2bb37f868ea and a4b8f393ffe69a044a4b1f143e02eed584da0028 (master).
MEASURED: 2026-09-22T03:48Z, actions/runs?head_sha=79afd267c6fb7a11a7f8b0b3a854247279f79287 -> total 4: Auto-merge landing success, Relay corpus success, report-schema success, Build and Test in_progress.
RELAYED: AG-4 slip SLIP-FIX-RULE26-TIMEOUT-PR592-S153-1: cause was a VALUE import of DIGEST_TAIL_KEEP from api/ into src/ TurnDigestSection.tsx (the Vite dev server 404s every /api path, so the admin preview page never rendered and every RULE-26 test waited out the 20-minute limit); fix moves the constant to shared/dbConstants.ts with a re-export in digestBuilder; new test noRuntimeApiImport.test.ts; one Architecture Map sentence corrected and resealed; merge of master with one conflict in public/architecture/manifest.json taken from master plus reseal; local RULE-26 185/185 in about 33 s.
UNMEASURED: Build and Test conclusion at 79afd267c6fb7a11a7f8b0b3a854247279f79287.
SELF-INVALIDATION: dies if PR 592 is closed or its head is not 79afd267c6fb7a11a7f8b0b3a854247279f79287 or a descendant.
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours, name the difference.

## STEPS
1. Print `git ls-remote origin refs/heads/master` and `git ls-remote origin refs/heads/phase/digest-span-cap-s152-1` (full 40-hex). If the branch head is not 79afd267c6fb7a11a7f8b0b3a854247279f79287, diff and say what moved first.
2. DELTA REVIEW `git diff c2a345c6593599ccd8d7b027e5a3facce623ca98 79afd267c6fb7a11a7f8b0b3a854247279f79287` in every non-doc file. Hostile questions: (a) is DIGEST_TAIL_KEEP's value unchanged, and does digestBuilder re-export the same binding, so no reader sees a different number? (b) noRuntimeApiImport.test.ts: plant the old value import back in a scratch worktree and measure that the test goes RED naming the file; also measure that an `import type` from api/ stays GREEN; does it scan every module under src/, including .tsx and dynamic import()? (c) the merge commit: does it carry only master's files plus the seal (no hand-picked hunk, no other edit)? (d) reseal digests equal what check:doc-drift reports at 79afd267c6fb7a11a7f8b0b3a854247279f79287. (e) any backend, vendor, category or tenant name in new code or fixtures (AGNOSTIC-1 and OWNER-RULING-S153-NO-ARMES-HARDCODE-1)? A new line naming a backend is RED.
3. Read CI at the CURRENT head by full 40-hex sha; read a zero TWICE. Name every run and conclusion, especially the rule26 job inside Build and Test; SKIPPED is named, never folded into green; cancelled is neither.
4. If 1-3 are clean AND every required context is green at the current head: post adversary/scout on that head. If Build and Test is still running: wait with a zero-token shell wait on the run (no poll task), at most 25 minutes, naming the run you wait on; then decide. If it is red or cancelled: post nothing, write your status, stop.
REPLY (on the bus): SCOUT-STATUS-LAND-PR592-S154-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=592 head=<40-hex>`, then findings, CI runs by name, whether the status was posted, the GRAFT line. If the bus write is refused, print the whole status in your window.
FORBIDDEN: no edit, no push, no merge, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR592-S154-1-v1
