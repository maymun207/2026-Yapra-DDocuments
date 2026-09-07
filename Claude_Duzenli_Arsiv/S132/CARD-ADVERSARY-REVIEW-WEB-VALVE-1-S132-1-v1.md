<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1 · v1 — the scout, as Adversary, tries to break CARD-WEB-VALVE-1-S132-1-v1 before a producer builds it
lane: scout
report: docs/relay/ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report.md
fanout: personalized

The owner's S132 standing order is that the scout reviews every Architect card in the ADVERSARY role before AG-4 acts on it. The Architect inserted `CARD-WEB-VALVE-1-S132-1-v1` for AG-4 at 11:00:33Z without that review; AG-4 is now HELD at ORDER A by `NOTICE-HOLD-WEB-VALVE-1-S132-1`. Your job is not to approve the card — it is to find the sentence in it that is false, unmeasurable, unsafe, or that a producer could satisfy while betraying its intent. A PASS with zero objections is a claim you must defend with what you tried.

## PREMISE
- MEASURED: 2026-09-07T11:00:33Z — the card under review is the to_lane AG-4 row with artifact_name `CARD-WEB-VALVE-1-S132-1-v1` created 2026-09-07T11:00:33Z, body sha256 in the `card` fence; read it from the bus by artifact_name and created_at, not from any copy (its uuid is omitted here because the preflight's hex band rejects uuid segments — F-S122 CP-8/UUID collision).
- MEASURED: 2026-09-07T10:49–10:52Z — the card's own PREMISE cites a grep with no hit, five instrument blobs, and a `domain_rules` read; these are the Architect's measurements and are exactly what you re-measure.
- UNMEASURED: whether the card's SCOPE can be satisfied without touching any file it does not name; whether `ssrfGuardedFetch` follows redirects to a blocked address after the first hop; whether the replay stage-11 containment change breaks any recorded turn's replay; whether stage "07" is the right stage for a tool valve (the vector valves sit at "05").
- ON-DISAGREEMENT: if the card's five instrument blobs no longer match origin/master → report FAIL with the differing paths (the card decays by its own clause). If the bus row's body sha256 differs from the `card` fence → STOP, report both values.
- DECAYS when a `RELEASE-WEB-VALVE-1-S132-1` row or a v2 of the card appears on the bus.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the card under review, by artifact_name, created_at and body digest | MEASURED: INSERT ... RETURNING encode(sha256(convert_to(body,'UTF8')),'hex') at 11:00:33Z, equal to the local sha256sum | card |
| everything about the card's fitness | NOT-READ | that is this card's product |

```evidence:card
80fed7a8903ab1cd1d9cba94f1a59ebd76e249c2f33d1a72583a767a9d0b1318
```

## SCOPE
```scope
- read-only against cwf_yaprak: fetch, rev-parse, grep, file reads; NO code written, NO branch other than the one carrying your report
- one report file at the header path; one pull request, report-only (docs/relay/ only), lands under REPORT-ONLY-DRAIN-1 by the foreman
- bus: one from_lane row ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report, posted once
- verdict vocabulary: PASS · PASS-WITH-AMENDMENTS (each amendment a numbered, quotable sentence replacing a quoted card sentence) · FAIL (the sentence that kills it, quoted, and the measurement that killed it)
```

## ORDER A — RE-MEASURE THE CARD'S PREMISE
1. Read your box by `created_at`; act on earlier rows first. Read the row named in PREMISE line 1 whole from the bus, by artifact_name and created_at; its body sha256 must equal the `card` fence.
2. `git fetch origin`; `git rev-parse origin/master:<path>` for the card's five instrument paths — equal to its fence or FAIL. Re-run the card's PREMISE grep verbatim; any hit is a FAIL with the file named.
3. Read whole: `api/cwf/_lib/net/ssrfGuard.ts`, `api/cwf/_lib/turn/stageTools.ts`, `api/cwf/_lib/localTools.ts`, `api/cwf/_lib/timeTools.ts`, the `VECTOR_ENABLED` and `ROUTER_NUDGE_ON_TIME_UNCLEAR` declarations in `agentParams.ts`, the replay stage-11 containment code that unions `LOCAL_TOOL_NAMES`, and the admin panel's governed-rules editor (the card's own UNMEASURED question).

## ORDER B — ATTACK
For each of the following, write what you tried and what you found; "not applicable" needs a reason.
1. SAFETY: can a producer satisfy the card's ORDER B.2 literally and still fetch a private address (redirect chain, DNS rebinding between `assertPublicHttpsUrl` and the fetch, IPv6 forms, `http://` upgrade)? Read `makeSsrfGuardedFetch` and say whether it re-checks on redirect.
2. VALVE: is there any code path at master where a local tool in `LOCAL_TOOL_NAMES` is offered to the model without passing through the stage-7 seam the card names? If yes, the "CLOSED at landing" claim is false.
3. REPLAY: does adding `web_fetch` to `LOCAL_TOOL_NAMES` change stage-11 containment for recorded turns that never called it? Name the test that would catch it.
4. STAGE: should the three params live at stage "07" (the card) or "05" (the vector valves)? Cite the stage vocabulary's home and say which is correct.
5. PANEL: can the owner publish `web.enabled=1` from the admin UI for a key that has only a code-floor registration and no `domain_rules` row? If a panel change is needed the card must name it in SCOPE — it says "the ONE panel file only if ORDER A.3 proves it is needed"; judge whether that sentence is tight enough.
6. TRACE: does the output object (url · finalUrl · fetchedAt · status · contentType · title · text · bytes · truncated · bodySha256 · source · verified) reach Langfuse and the panel through the existing toolResult path with no size cap that would silently drop `text`? FULL-TRACE forbids a silent drop.
7. F2: is "citation-bearing output" enough for the F2 verifiability axis to be measured later, or does the card need to say what a citing SENTENCE in the answer must carry? If the latter, propose the amendment.
8. SCOPE LEAK: list every file a competent producer would have to touch that the SCOPE fence does not name.
9. FALSIFIER GAPS: name one behaviour the FALSIFIER does not forbid that would still betray the card's intent.

## ORDER C — THE VERDICT AND THE REPORT
1. Verdict line first: `VERDICT: PASS | PASS-WITH-AMENDMENTS | FAIL`, then the numbered findings, then amendments as replacement sentences the Architect can paste into v2 verbatim.
2. Report in grammar v1 (CLAIMS · evidence fences · DIFF); full 40-hex only in anchored fences; `auditText` locally before push, `violations: 0` printed.
3. Commit on `phase/adversary-review-web-valve-1-s132-1`, push, open the pull request (report-only); post ONE from_lane row `ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report`. Print `read relay_inbox at <ISO>, box empty` or the rows found.

## FALSIFIER
Wrong if any file outside `docs/relay/` is written; wrong if the verdict is PASS with no attack recorded under every ORDER B item; wrong if an amendment is not a quotable replacement sentence; wrong if the card was read from a copy rather than the bus row; wrong if the five blobs were not re-measured; wrong if the report contains a bare 7–39-hex token outside an unanchored fence.

## SHARED SURFACES
cwf_yaprak: one report file on one branch. Bus: one row. Database: reads only. Nothing else.

## DECISION RIGHTS
None. The verdict is yours; what becomes v2 is the Architect's; the release to AG-4 is the Architect's and is posted only after your row lands on the bus.

BODIES: OWNER-RULING-S132-ADF-FREEZE-CONTINUES-1 (scout as Adversary reviewing Architect cards) · CARD-WEB-VALVE-1-S132-1-v1 · NOTICE-HOLD-WEB-VALVE-1-S132-1 · OWNER-RULING-S131-REPORT-ONLY-DRAIN-1 · S37-1 · TOTAL-45 · A-REC-S122-ARCHITECT-PRECISION-DECAY-1 (the class this review exists to catch).

```deliverables
five instrument blobs re-measured; PREMISE grep re-run
nine ORDER B attacks, each with what was tried and what was found
VERDICT line, numbered findings, amendments as verbatim replacement sentences
docs/relay/ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report.md on phase/adversary-review-web-valve-1-s132-1, auditText violations: 0, pull request open
bus row from_lane ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report, posted once
```

TAIL ANCHOR: CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v1 ends here.
