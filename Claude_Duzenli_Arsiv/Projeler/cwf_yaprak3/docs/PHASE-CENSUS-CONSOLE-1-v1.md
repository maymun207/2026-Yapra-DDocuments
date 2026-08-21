# PHASE-CENSUS-CONSOLE-1 · v1 — lane AG-3 · walk item #56 · Wave 7

<!-- LANE CHECK: AG-3 only. If your window is not lane AG-3, STOP, reply "wrong lane". -->

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| S100 anchor | READ: Architect fresh clone, drift gate exercised with a positive control | anchor |
| no admin route or component renders the TOOL-BEHAVIOUR census; it has live MACHINE consumers only | READ: certified in RULING-CENSUS-UI-CLAUSE-v1 (in your box, its evidence fences carry the commands); re-verify on the S100 tree before building | ruling |
| the owner ratified Option 1 then opened #56 for the human surface | READ: same ruling, closing section | ruling |

```evidence:anchor · read 2026-08-14T06:52Z (Architect)
origin/master = bfd9153b90a002a1f1924a38120ac352738928dd
docVersion "rev 258 · 2026-08-14" · vitest ruler 601 · migrations 80 (live=80)
ADR 15 · drift [OK] 7/7 · phase/* unmerged 0
```

## STALE-WINDOW NOTICE
Anchors from earlier waves are VOID. Your S99 cards are completed, merged work
— the census work (#46) landed with the eighteen-of-eighteen finding; the
vendor list is empty by ruling. The three unconsumed rulings in your box stay
authoritative for their SUBJECTS (attribution three-list law · Option 1 ·
live-probe-owed) and this card builds on them. PRECONDITION: origin/master at
the anchor hash (docs-only advance ≠ stop).

## STANDING LAWS: S99-1..9 · hardened CI (`head_sha`; zero runs = FAILED;
`completed`+`success` only) · merge-from-master (S99-8) · pipefail + red-to-file
(S99-9) · porcelain empty before push · one exclusive worktree.

## THE CHARTER
Today the owner can learn the tool-behaviour census state only when an agent
writes prose about it (measured fact, A-REC-S99-6's record). #56 is the READ
surface: per-backend counts, each tool's verdict, and its reason IN WORDS. It
is a window onto an `operational.mirror` organ — **zero writes, zero
authority**: the console must not be able to mutate, trigger, or re-probe
anything. (The refresh rider already runs on catalog sync; a "run" button is
NOT this phase and would need its own consent design — refuse it by name if
tempted.)

## SCOPE — numbered, closed
**R1 — the read endpoint.** New `GET /api/admin/tool-behavior-census` reading
`ToolBehaviorCensusRepository` per backend. Gate on the census/telemetry READ
tier consistent with neighbouring admin reads — name the permission you chose
and why in the report; never invent a new permission kind. Response carries,
per backend: counts by verdict class, and per tool: name · verdict
(ok/error/unread) · reason IN WORDS · observed-at. Absent census table (42P01)
returns the honest "organ not present" shape, never an empty-success.

**R2 — the reason vocabulary is rendered, not summarised.** The reader must
see, verbatim per tool: `no-specimen-discovered` vs
`required-param-unresolvable` (the ruling's ratified split — a fact about the
TOOL vs a fact about US), error text where recorded, and the ADR-011
write-exclusion class rendered as DESIGNED ABSENCE ("write-annotated — probed
never, by law"), never as an error and never blank.

**R3 — attribution three-list law reaches the surface.** Where a record
carries attribution (OURS / THEIRS / unattributed), the console shows it; a
record without it shows `unattributed` — never silently sorted (the ruling's
converse clause, now pixel-law). The 13 "no access to factory" tools render
THEIRS with the backend's own words.

**R4 — render discipline.** empty≠zero at every cell: real-0 is a number,
`null` is "okunamadı", missing organ is its own sentence. No colour-only
state (label always). Playwright spec in `e2e/` asserting: the three reason
words render; null vs zero render differently; the write-excluded class
renders its designed-absence sentence. Remember the render-claim lesson (S99
register): assert the load-bearing CLASS where truncation could clip, not
only text content.

**R5 — FIRST CONSUMER, named (S98-L4).** The consumer is the OWNER'S EYE:
post-deploy the owner opens the console and reads the ARMES census unaided —
that read is the named post-deploy proof (S63-1); if the owner cannot read it,
the item REOPENS. Second consumer: the Architect's session boots, which today
must SQL for this. Before/after screenshots in the report (A-REC-S98-8).

## FALSIFIERS (D-5)
(a) mocked endpoint disagreement → component test fails (the row reads the
RESPONSE, never client memory — the mount-console lesson verbatim);
(b) census table absent → honest organ-absent render, never zeros;
(c) a write-annotated tool can never render as error/unread (test-asserted);
(d) POSITIVE control: a fixture backend with one of each verdict class renders
all classes distinctly (the surface provably shows, not just hides).

## FENCES
ZERO writes anywhere (repo → DB), zero migrations, zero governed publishes,
zero probe triggers. `mount-probe` and the lifecycle console untouched. Census
repository read methods only; if a needed read method is missing, ADD a
read-only method — never widen a write.

## DELIVERABLES (S91 completeness)
Branch `phase/census-console-1` · pushed · PR against master ·
report `docs/relay/PHASE-CENSUS-CONSOLE-1-report.md` · hardened CI on the
head · then MAIL-WAIT for GO. **#27 vector/Qdrant follows by a separate card
after this lands** — do not open it.

TAIL-ANCHOR: PHASE-CENSUS-CONSOLE-1-v1
