<!-- relay-audit: v1 kind=notice -->
NOTICE-MERGE-MASTER-BEFORE-LANDING-RESOLVED-ENTITY-S141-1-v1

LANE: AG-4

Reads WITH CARD-RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-v1 and its AMENDMENT-1 (row named in `raw-tokens`, unconsumed in your box at the time of this notice). MEASURED at 2026-09-17T04:39:56Z over the shared clone: your branch `phase/resolved-entity-binds-tool-argument-s141-1` is at the head in `raw-tokens`, ONE commit over a merge-base of `47402e33faec80c45254668d917cb6f58625a916` — the master BEFORE PR 576 landed. Master is now `695492664c8a2c13b58c3b21a1f5bee4c8525075` (PR 576, 04:17:05Z), and both trees reseal `public/architecture/manifest.json` and touch stageClarify.ts and types.ts.

WHAT THIS MEANS, by CLAUDE.md §5 and F-S140-CONCURRENT-RESEALS-CONFLICT-ON-MANIFEST-1: a pull request whose branch conflicts with master on the seal reads `mergeable_state: dirty`, and GitHub fires NO pull_request run at a dirty head — the landing would find no CI to certify. The remedy is yours and it is the one you used on PR 572: `git merge origin/master` into the branch (never a rebase, never --force, not one byte of any file edited by hand), `npm run reseal` in the SAME commit, verify the re-derived digests match the ones the gate reports and `git status` shows the seal as the only other change, push. If the merge conflicts on anything BUT the seal, STOP and report the file — the other lane's content is in play.

Then: the report (follows the code, never gates it), the slip with the forty-hex MERGED head, CI at that head as you read it. The scout reads CI at the newest head; the landing card is cut on its read. The Operator applies your migration after the landing (ADR-005) — say so in the report's first lines, and print the tool's `input_schema` description for `zoneIds` from `backend_tools` there (AMENDMENT-1 A4).

```evidence:raw-tokens
your head            40ca6f7db8bdb30d8dababee09e6a6f20c017bab   (04:37:00Z, pushed)
merge-base           47402e33faec80c45254668d917cb6f58625a916
master NOW           695492664c8a2c13b58c3b21a1f5bee4c8525075
amendment row        c768be1c-4c98-4d14-b623-e64d18d824c0
```
