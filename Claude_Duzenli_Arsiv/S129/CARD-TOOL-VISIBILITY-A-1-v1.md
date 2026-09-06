<!-- relay-audit: v1 kind=card -->
# CARD-TOOL-VISIBILITY-A-1 · v1 — four active tools the model cannot see: publish them, and prove it from the trace

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
| a no-code publish path exists in the admin surface, and two publish scripts stand as precedent | MEASURED: grep -rln domain_rules over src and scripts at 2026-09-03T04:4xZ | how |
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
The publish surface, from grep -rln domain_rules over src and scripts:
  src/lib/adminService.ts          — the live published tool_category rows, TOOLMATCH-IA-1 R2
  src/components/admin/RoutingTab.tsx — Browse and Curate modes over those rows
  api/admin                        — the route tree behind them
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
through the path the admin Curate surface itself uses. **NAME the path you used in the report.**

**If no write path exists that this lane can drive without adding a repository file, STOP and say
so.** That is a finding, not a failure: it means the DB half cannot be done as a DB half, and this
card becomes a script card with a pull request. Do not add a script to finish this card — the
whole point of the split is that this half carries no build.

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

Report at `docs/relay/TOOL-VISIBILITY-A-1-<your-address>-report.md` in the repository working copy
and leave it UNCOMMITTED unless ORDER B turned this into a script card; either way file the bus row
`from_lane` with artifact name `TOOL-VISIBILITY-A-1-<your-address>-report`, carrying the ORDER A
readings, the path you used, the rows you wrote by key and version, and the ORDER C trace reading
in full. A named refusal closes this card as completely as a publish does.

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
branch: none — this card adds no repository file
report: docs/relay/TOOL-VISIBILITY-A-1-<your-address>-report.md
```

TAIL ANCHOR: CARD-TOOL-VISIBILITY-A-1-v1 ends here.
