<!-- relay-audit: v1 kind=notice -->
# S130-DISPATCH-RECORD-8 — PR #490 landed (master de47d9b1…); the owner's re-ordered queue item 1 closed; item 2 (hardening cards) dispatched

Architect's block record, S130, block 8. Covers 2026-09-05 06:20Z → 10:08Z (09:20 → 13:08 TSİ). All times UTC unless marked TSİ. Every sha below is measured from the bus, Vercel, or a lane report quoted verbatim; the source is named per line.

## WHAT LANDED

PR #490 `phase/authority-matrix-ruled-1` — the authority matrix ruled under OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1, lifted for this PR alone by OWNER-RULING-S130-LAND-490-1.

```evidence:landing
master before:  0e5022902381d04702a4598235a2ef45bbb04eda   (PR #492 merge)
PR head landed: 23ef9cee0231c5f2a03235dec4894e65a74bf1c4   (trunk-synced merge commit; parents fe7085cf… + 0e502290…)
master after:   de47d9b1fd867bd8c86d76566002da56d53583af   (foreman ls-remote read-back; Vercel meta githubCommitSha agrees)
landed tree:    79ee2696063dd14d51553aaff8bb24a90f6e55c5   (= merge-tree rehearsal, foreman step 6)
merged at:      2026-09-05T09:40:12Z
Vercel prod:    dpl_7M8rxywqwL6Ce7QiAZWYvcA4kuFd READY, target production, ref master (Architect read, 10:0xZ)
paths:          8 authored — authorityMatrix.test.ts · authority-conformance.latest.md · authority-live.snapshot.json ·
                docs/relay/AUTHORITY-MATRIX-RULED-1-AG-4-report.md · authorityMatrix.d.mts · authorityMatrix.mjs ·
                authoritySnapshot.mjs · supabase/migrations/20260904073800_relay_inbox_reply_authority_drift.sql
migration:      LANDED AS A FILE, NOT APPLIED — Operator's, under its own approval
```

## THE CHAIN, AS RUN (bus rows by artifact_name; ids in the transcript fence)

1. CARD-TRUNK-SYNC-AUTHORITY-MATRIX-RULED-1-v1 → AG-4 (06:20:32Z). AG-4 merged master into the branch (no conflict, not even in the generated files; reseal 0 tabs changed, breadcrumb churn reverted), pushed 06:26:06Z (Vercel branch sensor dpl_JDpWxhsjgWZy176fqswjhziXHUyE CANCELED-by-ignored-build-step). CI at 23ef9cee…: build (24.x) SUCCESS 15m57s · rule26 SUCCESS 6m28s (fourth measurement of the 20-min bound; install at the floor a fifth time — headroom still unexercised) · four short contexts success · eval-canary SKIPPED. AG-4's report arrived only at 09:36:22Z because its window was SUSPENDED 06:42:10Z–09:32:48Z (owner's machine asleep; the same interval the device bridge was down). Every value re-read after waking, not carried.
2. CARD-SCOUT-REVIEW-AUTHORITY-MATRIX-RULED-1-v2 → scout (06:23:23Z). Verdict 06:35:02Z: GREEN (content) · RESOLVER AUTHOR-SUBJECT/AG-4, landable-by AG-5 · HEAD 23ef9cee… SYNCED yes · seven rulings each with implementing line + planted-fault test · migration text ≡ relayed live constraint · C1/secrets/empty≠zero pass · CI explicitly NOT certified (in progress). Three findings, none blocking (below).
3. OWNER-APPROVAL-S130-MASTER-PUSH-PR-490-1 → AG-5 box (06:53:01Z), bound to 23ef9cee…; scout verdict copied to AG-5 box (06:53:07Z).
4. CARD-LANDING-AUTHORITY-MATRIX-RULED-1-v1 → AG-5 (07:05:58Z). Cut WITHOUT AG-4's CI table (absent at 07:02Z): the foreman's own check-run read made the CI referee (S37-2), AG-4's report demoted to optional corroboration. AG-4 report copied into the AG-5 box at 09:36:45Z once it appeared.
5. Owner typed the foreman read line (window has no poller). Foreman read all four rows by artifact_name with plain `--once` at 09:44Z (latencies 9917s / 9911s / 9140s / 93s — the poller gap, measured), CI re-read at the forty hex (7/7 completed, eval-canary skipped named, Vercel status success "Canceled by Ignored Build Step"), `ADF_LANE_ROLE=AG-5 npm run land -- 490`: gate CURRENT, lock acquired, resolver AUTHOR-SUBJECT/AG-4 vs lander AG-5 → PASS (no self-land; report-only exception not needed, 8 paths), merge-tree rehearsal 79ee2696…, merged 09:40:12Z, landed tree = rehearsal, lock released. Report LANDING-AUTHORITY-MATRIX-RULED-1-AG-5-report 09:43:53Z.
6. Architect verified via Vercel: production deploy READY for de47d9b1…, commit message = land.ts's landing block for PR #490.

```
bus row ids (transcript):
  sync card            1104886e-d7b8-41c4-abb1-6375e1597ea9
  scout card v2        d6b75f6a-aa32-47dd-a201-d93586aa05f5
  scout verdict        72fe8818-cb36-4aa6-84cc-d93fd0583617   copy in AG-5 box 14758cfd-9a30-4461-b1f1-57cf1ffe9d25
  owner approval       b7d33c90-5061-4086-a9f9-5590bce75d26
  landing card         987e7497-aaa1-4f54-8e54-082fa1a73fcb
  AG-4 sync report     173ce730-eda3-4286-9f96-e852b0e95bd5   copy in AG-5 box b4b71e2d-393b-4e19-b764-2d396ae776f0
  AG-5 landing report  8813305c-c609-47ff-a9c5-d516dfa75b7e
  harden organ card    a31b4899-4666-4d46-939d-ce06a17e2562   (to AG-4, 10:04:14Z)
  harden provenance    f3a3e72a-fa72-4097-bcee-98d20a3bf840   (to AG-4, 10:07:25Z)
```

## FINDINGS THIS BLOCK

F-S130-GM-1-BLOCKS-CONSTRAINT-READ-FOR-SCOUT-1 (scout, 06:35Z): the scout card ordered a read-only `pg_get_constraintdef` over the scout's read path; guard-mcp GM-1 blocks `execute_sql` on the last name segment for every server, read-only ones included, and `list_tables` exposes no CHECK definitions. The scout relayed AG-4's snapshot and said so. The FOREMAN then closed the live half by script over `CWF_LANE_DATABASE_URL` (09:42Z): live `relay_inbox_reply_authority` = `CHECK ((direction = 'to_lane') OR (lane_addr = ANY (ARRAY['operator','scout'])))`, byte-identical to the snapshot; the migration's `IN ('operator','scout')` is the same predicate; the migration `drop constraint if exists` + re-add, so idempotent against the constraint that already exists live. Disposition: the fence governs a TOOL a model calls, not a script on a declared read path — a lane with a read-named verb can do what the scout cannot. Card class note: a scout card must not order a read the scout's fence forbids; name the snapshot as the source or route the read to a lane that has the path.

F-S130-GM-2-ESTATE-LACKS-VERCEL-1 — SECOND OCCURRENCE (foreman, 09:41Z, re-attempted rather than carried from 04:48Z). GM-2's governed estate holds only the Supabase id; the repo's own Vercel project id classifies as FOREIGN, so ORDER D's deploy line is UNREAD from the foreman address on every landing. Foreman's words: "a field that is always UNREAD is uninformative rather than merely absent." Owed to the Architect: either add the Vercel project to the estate or strike the deploy line from the foreman's ORDER D (the Architect reads Vercel itself). Carried to the close artefacts as a decision item.

F-S130-SCOUT-OVERFLOW-PERSIST-OUTSIDE-REPO-1 (scout finding 2): a 39.6 KB `git show` was persisted by the harness under `~/.claude/projects/...` and its read-back refused by guard-secrets GS-4 — the overflow path and the secrets fence disagree; `git grep` is the working route. Owed: a persist location inside the repo, or a narrower GS-4.

F-S130-SCOUT-BOOT-TEACHES-REFUSED-CALL-1 (scout finding 3): free.md tells a scout to pass an explicit `--since` predating the backlog; scout HAS a measured watermark, so `sinceVerdict` REFUSES and the read exits 2. The refusal is loud (the repair working) but the boot should teach the plain read. Owed: one line in free.md (AG-4, next boot-doc card).

MEASURED, NOT A BUG: every from_lane row since 2026-09-04 carries lane_addr `operator` (21) or `scout` (20) — none `AG-n`. That is the live `reply_authority` constraint doing exactly what the #490 migration now codifies in the tree: AG lanes post reports under the operator address. Recorded so the next Architect does not read "AG-4 report from operator" as an impersonation.

A-REC-S130-16 — the Architect cut the landing card with AG-4's report as PRECONDITION 3, then had to re-cut it as optional when the report did not arrive; the first draft coupled the foreman to a window that turned out to be asleep. The corrected design (foreman's own CI read is the referee; peer reports corroborate) is the right one and should be the default: a landing's referee is the check-run read at the forty hex by the lander, never a peer's table.

A-REC-S130-17 — the Architect's device bridge and the AG-4/foreman windows were all down 06:42Z–09:32Z (owner's machine asleep). The Architect correctly declared the archive gap in the turn it occurred and did not describe files as saved; the archive writes for the approval and landing card landed at 09:xxZ once the bridge returned (measured: written). No silent assumption; recorded because the class (capability absent, declared) is one the owner asked to see named every time.

## WHAT IS ON THE BUS NOW (10:08Z)

AG-4: CARD-HARDEN-CONTEXT-RETRIEVAL-ORGAN-1-v1 (organ A1–A5, five planted-fault tests, branch `phase/harden-context-retrieval-organ-1`, PR, no landing) and CARD-HARDEN-PROVENANCE-EXPORT-1-v1 (provenance A1–A3, branch `phase/harden-provenance-export-1`, PR, no landing) — the owner's queue item 2. Both are PRODUCT scope under OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1; neither pushes master; each will need a scout review and a foreman landing with its own named approval when its CI is green.

## NEXT

Owner's queue item 3: CWF-S130-SESSION-CLOSE-v1 and CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v131 (§11). Hygiene stages 2–3 (fifteen open PRs; three holds) → next session, resume point SCOUT-OPEN-PR-TRIAGE-1-v1 (05:32Z). Operator card for the reply_authority migration apply → next session, own approval.

TAIL ANCHOR: S130-DISPATCH-RECORD-8 ends here.
