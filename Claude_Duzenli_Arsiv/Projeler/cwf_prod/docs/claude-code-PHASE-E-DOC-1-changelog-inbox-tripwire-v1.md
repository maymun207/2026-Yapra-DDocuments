# PHASE E-DOC-1 — E.1/E.2 changelog + operator-inbox seam + dirty-tree tripwire · v1

<!-- claude-code-PHASE-E-DOC-1-changelog-inbox-tripwire-v1 · rev 1 · 2026-07-12 · Session 38.
     Lane: AG (Author). CEREMONY PROFILE: HOTFIX — `.agents/**` + `.gitignore` only; no
     api/** · shared/** · src/** · supabase/** · package.json · security surface. -->

## 0 · HARD PRE-FLIGHT (gate)

```bash
git fetch origin && git rev-parse origin/master   # MUST print cefe52e9ddf7e5034ca9c82d0711d4fe6ba02377
git status --porcelain                             # MUST be EMPTY. Any dirty TRACKED file you did
                                                   # not create = STOP + report (the new tripwire,
                                                   # which §2·C below also codifies).
git switch -c e-doc-1 origin/master
npm run check:doc-drift                            # [OK]
```

## 1 · BINDING CONSTRAINTS
- **C-1 scope:** the diff touches ONLY `.agents/CHANGELOG.md`, `.agents/AGENTS.md`,
  `.agents/operator-inbox/README.md` (new), and `.gitignore`. Nothing else.
- **C-2 no reseal:** none of these match a sealed tab's `codeAreas`; docVersion stays rev 69;
  `check:doc-drift` must stay `[OK]` after your diff.
- **S37-2 flow:** push branch → open a PR to master (that is what fires CI) → CI green →
  Architect RULE-25 → merge only with the Architect's verbatim message.

## 2 · THE WORK

### A — `.agents/CHANGELOG.md`: ONE entry, `## [2026-07-12] STREAM E · E.1+E.2 — Superset
connection consolidation step 1 + live verification (OPERATOR-APPLIED + OWNER-PUBLISHED RULE;
no repo code change)`. Newest-first, What/How/Verify format. It must record, verified against
this prompt (the DB/log evidence lives with the Architect; cite trace ids, don't invent):
- **What:** E.0 diagnosis (see `cwf-E0-superset-diagnosis-findings-v1`, project-side) found the
  personal `supersetArmes` `mcp_settings` element lacked `backend_id` → misclassified as a
  flat/armes tool source, winning name collisions (F-E0-2 provenance mislabel: reporting-mirror
  data executable under system_of_record attribution). Governed Superset rules were ALREADY
  seeded (48/31 published) — the register's seedRules step was stale.
- **How (all config/data lane — zero repo code):** E.1 Operator disabled the personal
  `supersetArmes` element (`enabled=false`, array-aware UPDATE, idempotence-probed) — applied
  TWICE: the first application was silently undone when an MCP-Settings UI save rewrote the
  `servers` array and reset the flag (**registered defect MCP-UI-REWRITE-1**). E.2 verification:
  gateway chain live (`search_tools`→`call_tool`, 45 datasets, trace `e7002f22`/`810763db`);
  the OWNER authored + published his first governed rule via the admin UI —
  `superset.gateway_rule/call-tool-request-wrapper` (running v1, gate SCHEMA→REFERENTIAL→
  BEHAVIORAL green) — and the next fresh-session turn (trace `93d277b7`) showed the first
  `call_tool` succeed in ONE attempt with the `{"request":{}}` wrapper (was 3 calls with a
  failed first attempt). Also live-caught: an ARMES token-expiry outage (resolved by owner);
  duplicate `armesMes` server NAMES make `[MCP Discover]` errors unattributable (E.3 input).
- **Verify:** docs-only entry; the behavioral evidence is the cited production traces; repo
  code byte-untouched.

### B — `.agents/operator-inbox/` — the coordination mailbox (S38-1 tooth 2, owner-approved)
1. Create `.agents/operator-inbox/README.md` (committed) stating the protocol in ~8 lines:
   *This directory is the OPERATOR lane's ONLY writable path in the repo workspace. The
   Operator (Gemini) may drop reports/proposed doc text here as scratch files. Nothing in this
   directory is ever committed (gitignored below); the AUTHOR lane (AG) is the sole mover of
   inbox content into committed docs. Every other repo path is read-only to the Operator.
   Rationale: ADR-006 — no mode holds repo-write and DB-write together; coordination flows
   through this explicit single-writer seam, not through shared file editing.*
2. `.gitignore`: append
   ```
   .agents/operator-inbox/*
   !.agents/operator-inbox/README.md
   ```

### C — `.agents/AGENTS.md`: add a short standing rule (place near the RULE-25/verification
material; match the file's voice):
- **Dirty-tree tripwire:** at every phase pre-flight, `git status --porcelain` must be clean.
  A dirty TRACKED file the Author did not create = STOP, report to the Architect, never fold
  or discard silently (the 2026-07-12 E.1-entry incident: an Operator-authored changelog edit
  was found uncommitted in the shared tree; correct handling = path-scoped stash, merge clean,
  restore, report).
- **Operator mailbox:** the Operator writes only under `.agents/operator-inbox/` (gitignored);
  AG folds. Reference §B's README.

## 3 · SELF-VERIFY (evidence, literal)
- `git diff --stat origin/master..HEAD` pasted — exactly the four files of C-1.
- `check:doc-drift` `[OK]`; `tsc -b` untouched-clean (no src change, but run it — cheap).
- `git status --porcelain` clean post-commit; `.gitignore` proof: `touch
  .agents/operator-inbox/scratch.txt && git status --porcelain` shows NOTHING, then delete it.
- Push `e-doc-1`, open the PR, report branch head + CI run result. **Do not merge** until the
  Architect's verbatim message arrives.

<!-- END · claude-code-PHASE-E-DOC-1-changelog-inbox-tripwire-v1 · rev 1 · 2026-07-12 -->
