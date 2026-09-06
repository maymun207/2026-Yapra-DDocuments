<!-- relay-audit: v1 kind=card -->
# CARD-TOOL-VISIBILITY-A-1 · v2 — four active tools the model cannot see: publish them, and prove it from the trace

A live production fault, open since 2026-09-01. Four tools are `active` in `backend_tools` and sit
in NO published `armes.tool_category` row, so they never enter `offeredToolNames` and the model
cannot call them however plainly the user names one. The user's own prompt names
`getRecipeTemplatesByDate` and CWF falls to `getRecipeTemplates`, whose required `materialNumber`
is unfilled, and asks the wrong question.

**This card is the DB half and nothing else.** It publishes governed rows. It writes no repository
file, opens no pull request and spends no CI. The code half — the explicit-name pin, the
structure-layer counter, the turn id, the name collision, the stage-output payloads — is a
separate card, deliberately, so that a two-day-old production fault closes in one short round
instead of waiting behind a build. **Nothing is deferred:** both halves are ordered under
`OWNER-RULING-S129-SOTA-GAP-DISPOSITION-1`, and this split makes the criterion-advancing fix
arrive sooner rather than later.

The owner's witness question was answered: the family was opened DELIBERATELY as an improvement,
and ARMES is actively introducing more. So this card fixes today and does not fix the class; the
class is the other card's counter.

## PREMISE

MEASURED: 2026-09-02T22:0xZ, `select key, version, status, payload from domain_rules where kind_id='armes.tool_category' and status='published'` on the project fence `fjbrkimwvtpwoxhziidh` — twelve published rows, every tool array enumerated in full, and the four names in the `targets` fence appear in NONE of them. A closed count, not a failed search.
MEASURED: 2026-09-02T22:0xZ, `select kind_id, backend_id, status, count(*) from domain_rules group by 1,2,3` on the same fence — `armes.tool_category` reads `draft=12 · published=12 · archived=29`. Note the KIND IS `armes.tool_category`, not `tool_category`; a query on the shorter spelling returns zero rows and reads exactly like absence.
MEASURED: 2026-09-02T22:0xZ, `select backend_id, tool_name, status, first_seen_at from backend_tools` filtered to the family — the four rows in the `targets` fence are all `backend_id='armes'`, all `status='active'`, with the first-seen instants that fence carries. `getEmployeesByShiftAndDate` arrived 2026-08-28, FOUR DAYS BEFORE the other three; the S128 close recorded them as one arrival and that was wrong.
MEASURED: 2026-09-03T04:4xZ, `grep -rln domain_rules src scripts` in the owner's clone over the bridge — the publish surface is named in the `how` fence; `scripts/publishGatewayToolPolicy.ts` and `scripts/publishAgentParam.ts` are the standing precedents for publishing a governed kind, and `scripts/archiveWriteBearingDrafts.ts` is the precedent for archiving `armes.tool_category` rows.
DECAYS on any write to `domain_rules` from anywhere, and on any change to `backend_tools`. Re-read the twelve published rows and the four tool rows at ORDER A; if the counts have moved, the ON-DISAGREEMENT arm governs.
ON-DISAGREEMENT: if the published count is not twelve, or any of the four names already appears in a published row, or any of the four is no longer `active` — do NOT write. Print what you read and file on the fallback channel. A category row rewritten over a world the card never measured is a governed write nobody reviewed.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| twelve published `armes.tool_category` rows exist and none of them contains any of the four names | MEASURED: select over domain_rules where kind_id='armes.tool_category' and status='published' at 2026-09-02T22:0xZ, every tool array enumerated | current |
| the four names are active tools of backend `armes`, with the first-seen instants named | MEASURED: select over backend_tools filtered to the family at 2026-09-02T22:0xZ | targets |
| the intended mapping is the one in the fence, and it is the owner-approved card body's mapping unchanged | MEASURED: CWF-S128-SESSION-CLOSE-v1 section 7 part (a), read from the project box at 2026-09-02T21:3xZ | targets |
| a no-code publish path exists in the admin surface, and three publish-or-archive scripts stand as precedent | MEASURED: grep -rln domain_rules over src and scripts, plus a second grep over tool_category and a find over admin directories, all at 2026-09-03T04:4xZ and each member attributed to the command that found it | how |
| governed writes go ONLY through the role- and scope-gated admin API, which runs the eval-gate, audit and versioning server-side, and a direct table mutation is denied by RLS with 42501 | MEASURED: sed -n '1,40p' src/lib/adminService.ts and ls api/admin at 2026-09-03T04:5xZ, both re-derived by the scout on its own lens | how |
| whether the admin surface exposes a WRITE path this lane can drive without adding a repository file | NOT-READ | ORDER B settles it by trying, and a negative answer is a named finding that turns this into a script card |

```evidence:current
The twelve published keys and their sizes, read at 2026-09-02T22:0xZ:
  admin 1 · andon 3 · employee 8 · factory 2 · linestop 6 · logistics 5 ·
  machine 21 · material 19 · metrics 2 · production 23 · quality 9 · transfer 9
The rows this card supersedes are enumerated by their members in the scope fence below, not
counted.
```

```scope
- armes.tool_category key=production version=3 status=published -> archived
- armes.tool_category key=employee   version=3 status=published -> archived
- armes.tool_category key=material   version=5 status=published -> archived
```

```evidence:targets
The four active armes tools, and the category each joins:

  getRecipeTemplatesByDate    first_seen 2026-09-01 09:31:53+00   ->  production
  getOrdersByDate             first_seen 2026-09-01 09:31:53+00   ->  production
  getEmployeesByShiftAndDate  first_seen 2026-08-28 11:31:54+00   ->  employee
  getMaterialListByFactory    first_seen 2026-09-01 08:31:00+00   ->  material

Each new version carries the SUPERSEDED row's tool array plus its one or two additions, and
its keywords unchanged. Nothing else in any payload moves. The superseded rows go to archived.
```

```evidence:how
The publish surface. TWO commands produced this list and each member is attributed to the one
that found it, because v1 attributed all of them to the first and RoutingTab.tsx is not in its
output — a provenance line that overstated its own computation, which is the very class this
session keeps paying for:
  from `grep -rln domain_rules --include=*.ts --include=*.tsx --include=*.mjs src scripts`:
    src/lib/adminService.ts          — the live published tool_category rows, TOOLMATCH-IA-1 R2
  from `grep -rn tool_category ... | grep -iE 'publish|archive|insert|upsert'`:
    src/components/admin/RoutingTab.tsx — Browse and Curate modes over those rows (lines 10, 199, 538)
  from `find . -type d -name admin`:
    api/admin                        — the route tree behind them, carrying rules.ts, rules/ and tool-categories.ts
Standing precedents for publishing and archiving a governed kind, to be read before writing:
  scripts/publishGatewayToolPolicy.ts
  scripts/publishAgentParam.ts
  scripts/archiveWriteBearingDrafts.ts
```

## ORDER A — READ THE BOX FRESH, THEN RE-MEASURE BEFORE WRITING

Read your own box directly by `created_at`; a row newer than this card is a STOP until acted on.
Then re-run the three premise queries and print each beside its command: the twelve published rows
with their tool arrays, the counts by status, and the four `backend_tools` rows. Any mismatch is
the ON-DISAGREEMENT arm.

## ORDER B — PUBLISH, BY THE GOVERNED PATH, WITHOUT ADDING A REPOSITORY FILE

Create the three new versions named in the `targets` fence and archive the three they supersede,
through the role- and scope-gated admin API under `api/admin` — the path `src/lib/adminService.ts`
names as the ONLY one for governed writes, because it runs the eval-gate, audit and versioning
server-side. **NAME the exact route you used in the report.**

**Do NOT reach for a direct `domain_rules` mutation.** The source says stop, and RLS denies a
published row with `42501`; a lane that meets that code has met a FENCE, not a fault, and reporting
it as a fault would be a misreading of a correct refusal.

The open question is AUTHORIZATION, not existence: whether this window holds the admin role and
scope that route requires. **If it does not, STOP and say so.** That is a finding, not a failure —
it means the DB half cannot be driven by a lane, and the next card is either a scoped credential
question for the owner or a script with a pull request. Do not add a script to finish this card;
the whole point of the split is that this half carries no build.

Do not touch any other governed row. Do not touch `tool_category_cache`, `router_proposals`,
`routing_drafts`, or any `armes.tool_annotation` row.

## ORDER C — PROVE IT FROM THE TRACE, NOT FROM THE WRITE

Send this prompt to production, exactly as the owner sent it:

```
KB7 fabrikası için 24 Ağustos 2026 tarihli reçeteleri ver ve armes backendde getRecipeTemplatesByDate toolunu kullan
```

Then read that turn's stage 07 `register-tools` output and report three things: that
`offeredToolNames` CONTAINS `getRecipeTemplatesByDate`, the `offeredCount` beside it, and whether
stage 10 shows a `cwf.mcp.tool` call to that tool. **Enumerate the offered list; do not search it**
— a closed count is proof of absence and a failed search is not, and the S128 diagnosis turned on
exactly that distinction. A successful write is not evidence that the model can see the tool; only
the trace is.

## ORDER D — REPORT, AND FILE IT ON THE BUS

**The report is a BUS ROW AND NOTHING ELSE. Write no file, anywhere, including an uncommitted
one.** File `from_lane` with artifact name `TOOL-VISIBILITY-A-1-<your-address>-report`, carrying
the ORDER A readings, the exact route you used, the rows you wrote by key and version, and the
ORDER C trace reading in full. A named refusal closes this card as completely as a publish does.

**WHY THE REPORT HAS NO FILE, since v1 said otherwise and the difference matters.** v1 ordered an
uncommitted file in the working copy while its own SHARED SURFACES said "no repository file" —
those cannot both be true, and an untracked line is exactly what `CARD-LANE-POSSESSION-1-v1`'s
ON-DISAGREEMENT arm treats as a STOP. Two cards over one shared clone, and this card's deliverable
would have disarmed the other one on a file it had no way to recognise as innocent. Removing the
file removes the contradiction and the collision together.

## FALSIFIER

This card is wrong if the published count is not twelve, if any of the four names is already
published, if any of the four is not `active`, or if — after the publish — `offeredToolNames`
still does not contain `getRecipeTemplatesByDate`. That last one would mean the category map is
not the mechanism that gates the offered set, and everything in the S128 diagnosis that rests on
it would need re-measuring rather than patching.

## SHARED SURFACES

Governed rows of one kind, `armes.tool_category`, backend `armes`: three new versions and three
archived. Nothing else in `domain_rules`. No repository file, no migration, no database function,
no git configuration, no branch, no pull request, no CI. One production turn is sent, which is
ordinary traffic. No deletions.

## DECISION RIGHTS

The owner approved `PHASE-TOOL-VISIBILITY-1` by name. This card is its part (a), split out so the
live fault closes first; the rest is ordered and unshrunk under
`OWNER-RULING-S129-SOTA-GAP-DISPOSITION-1`. Part (a) advances `API-Bank` — routing and Recall@k —
and is therefore not deferrable on convenience by anyone, the Architect included.

You decide nothing about the mapping and everything about whether the world matches this card well
enough to write. If ORDER C's trace does not show the tool offered, report that and stop; do not
publish a second row to make the first one work.

BODIES: `PLATINUM` · `SOTA-1` · `S63-1` (the write's own success is not the evidence; the trace is)
· `TOTAL-45` · `empty ≠ zero`.

fanout: personalized

```deliverables
branch: none — this card adds no repository file, not even an untracked one
report: bus row from_lane, artifact_name TOOL-VISIBILITY-A-1-<your-address>-report
```

```evidence:supersedes
This version supersedes CARD-TOOL-VISIBILITY-A-1-v1 under S37-1. v1 is immutable and is not edited.
THE VERSION STAMPS ARE EXEMPT: title and tail anchor map to the re-cut itself. Every OTHER
difference is mapped to the scout note that forced it (verdict artifact_name
SCOUT-CARD-REVIEW-TOOL-VISIBILITY-A-1-verdict, from_lane, 2026-09-03T04:52:38Z). A changed line
that maps to nothing here, and is not a version stamp, is a silent edit and finding one is a RED:
  ORDER D becomes bus-only, and       <- the scout's ruling-needed finding: ORDER D ordered an
    says why in the card                 uncommitted file while SHARED SURFACES said no repository
                                         file, and that untracked line would have tripped
                                         CARD-LANE-POSSESSION-1-v1's ON-DISAGREEMENT STOP over the
                                         same clone. Removing the file removes both at once.
  deliverables report path becomes    <- the same finding, carried into the block a lane reads last
    a bus artifact name
  the how fence attributes each       <- the scout's provenance defect: v1 said the list came from
    member to the command that found     one grep, and RoutingTab.tsx is not in that grep's output
    it, and names the third command      (grep -c returned 0 on its own lens)
  CLAIMS gains the adminService row   <- the scout's read-only narrowing of ORDER B's NOT-READ:
    and the how basis is restated        governed writes go only through api/admin, and a direct
                                         table mutation is refused by RLS with 42501
  ORDER B names api/admin, forbids    <- the same narrowing, turned into an instruction: existence
    the direct mutation, and narrows     is settled, AUTHORIZATION is what remains open
    its STOP to authorization
UNCHANGED and deliberately so: the PREMISE's three database readings remain the Architect's own,
and the scout could NOT verify them — MCP execute_sql is fenced for that window. They are the
card's central factual claims and they stand unverified by review. ORDER A re-takes them and the
ON-DISAGREEMENT arm is live; a GREEN grammar verdict is not an endorsement of unread facts.
```

TAIL ANCHOR: CARD-TOOL-VISIBILITY-A-1-v2 ends here.
