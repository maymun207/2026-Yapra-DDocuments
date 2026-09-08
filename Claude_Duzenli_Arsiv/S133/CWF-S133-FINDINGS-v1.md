# CWF-S133-FINDINGS-v1 — every finding this session named, with its class, its measurement, and whose defect it was

Cut 2026-09-08T09:05Z, mid-session, while both lanes were quiet and the bridge was down. Written NOW rather than at the close deliberately: `A-REC-S122-ARCHITECT-PRECISION-DECAY-1` records that this Architect's measurement discipline degrades sharply once delivery pressure lifts, and the close is exactly that moment. A carrier written under no pressure and re-cut at the close as v2 costs one version; a carrier written at the close costs accuracy.

**PROVENANCE DISCIPLINE.** Each entry says whether it was MEASURED IN THIS WINDOW or CARRIED from this session's earlier record. A carried finding is a claim, not a fact, and is marked so — the same rule this session applied to the project box (`TOTAL-45`).

## THE FINDINGS

**F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1** — CARRIED. `git fetch` on the bridge VM fails with "could not read Username for 'https://github.com'" and zeroes `.git/FETCH_HEAD`; a cloud `git clone` also fails. The consequence is that the Architect cannot re-measure a ref itself and must have a lane do it. Upgraded to MEASURED earlier in the session when the foreman fast-forwarded the shared clone.

**F-S133-CARD-FENCE-IS-SHA256-BUT-THE-SCOUT-READS-MD5-1** — CARRIED. Review cards fenced a sha256 the scout has no instrument to compute; `scripts/mail-wait.mjs` emits md5 only. The Architect's defect. Cured by the scout's own AMENDMENT 3 and applied in every review card since.

**F-S133-SCOUT-CANNOT-READ-A-CARD-PAST-THE-OUTPUT-CAP-1** — CARRIED, and CORROBORATED IN THIS WINDOW by the scout's own read of `NOTICE-S133-LOOP-CLASSIFICATION-1`. A body is delivered truncated at 2048 octets, so a 39KB card cannot be read through the mail instrument at all. The Architect's defect. Cured by the md5-proven archive read route.

**F-S133-SCOUT-CANNOT-READ-BACK-ITS-OWN-ROWS-1** — MEASURED IN THIS WINDOW, and this is the session's most consequential finding. `scripts/mail-wait.mjs` reads `direction = to_lane` ONLY, so a reviewer cannot read back a single sentence it has ever written. **Every review card this factory had ever cut ordered a diff against the reviewer's own rows, and not one of them had a second operand** — the comparisons were made from window memory, which is the one thing this house forbids. The Architect's defect.
CURED FORWARD, by mechanism rather than assurance: the verdict row is archived, its md5 measured EQUAL to `md5(body)` on the server, and under the scout's own AMENDMENT 1 that equality is PROOF of byte-identity — so reading the archive file IS reading the row. Both lines used it and both confirmed it: the MA line's scout reported "the carry is FAITHFUL and I no longer take it on trust", and both scouts found the Architect's carry EQUAL character for character.
NOT CURED BACKWARDS and not pretended cured: AMENDMENTS 14–17 on the MA line and AMENDMENT 23 on the WEB line were authored by earlier windows whose rows were never archived. Both lines carry that as an open finding in the scout's own words.

**F-S133-START-PROMPT-NAMES-A-VERSION-THAT-GOES-STALE-1** — CARRIED. A producer's start prompt named a card version that was VOID by the time the window opened. The Architect's defect.

**F-S133-RECLAIM-MOVES-THE-WATERMARK-AND-BLINDS-THE-POLLER-1** — CARRIED. A lane's reclaim retroactively blinded its own poller to rows created before the new nonce. The Architect's defect, found by AG-4 at boot.

**F-S133-OWNER-RULING-NOT-READABLE-BY-LANES-1** — CARRIED. `OWNER-RULING-S133-COLD-RESTART-1` governed lane behaviour and no lane could read it. Cured by publishing its archive path with its md5 in `NOTICE-S133-LANE-READABLE-AUTHORITY-1`.

**F-S133-A-HAND-TYPED-ROW-CAN-BE-MADE-FAIL-CLOSED-1** — MEASURED IN THIS WINDOW. `A-REC-S133-3` had recorded, twice, that a hand-typed insert diverged from its preflighted file and was caught only by the `RETURNING` digest — AFTER the row was in an append-only, delete-guarded table. From this session the digest is a PRECONDITION rather than a receipt: every insert carries `where md5(body) = '<expected>' and encode(sha256(convert_to(body,'UTF8')),'hex') = '<expected>'`, so a mistyped byte produces ZERO rows instead of a wrong one. Nine inserts this window, nine first-try matches. The CLASS is not cured — a hand still mistypes — but its CONSEQUENCE is: the bus can no longer be polluted by one.

**F-S133-THE-REVIEW-ROUTE-DEPENDS-ON-THE-ARCHITECT-BRIDGE-1** — MEASURED IN THIS WINDOW. The scout can only be given an operand it can prove; the only proving route is an archive file whose md5 equals the bus row; and the only actor that can place that file is the Architect over the device bridge. When the bridge is down, no new round can start on any line whose files are not already placed. Measured twice, at 06:55Z and again at 08:38Z. The durable cure is a LANE-SIDE instrument that writes a row's body to a file — a `mail-wait.mjs` flag — so the file equals the row BY CONSTRUCTION and no transcription exists anywhere. Carded when a lane is reachable; asserted nowhere.

**F-S133-PREFLIGHT-HAS-NO-GRAMMAR-FOR-A-NOTICE-1** — MEASURED IN THIS WINDOW, and confirmed by the very read that carried it. `scripts/cardPreflight.ts` knows only `kind=card`: it refused `NOTICE-S133-LOOP-CLASSIFICATION-1` for having no card header, no `## PREMISE` and no `DECAYS`. The scout's screen printed `[CARD-REFUSED] CP-1` beside `[CARD-GATE-DISARMED] CARD_GATE=REPORT` — so an ARMED gate would have BLOCKED the notice, and **no notice this factory has ever cut was checked by any instrument.** Mitigated by hand: every notice now carries a PREMISE and a DECAYS line anyway, because the checks were right where the instrument could not run them.

**F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1** — RECURRED, twice, in this window. Once as the Architect's enumeration "35, 36, 40, 41" carried unmeasured into four carriers when the true list is 36, 37, 40, 41. Once as the Architect's PREMISE citing 07:36:43Z as "the scout's own verdict rows" when that is the Architect's own producer row. The class survives every mitigation aimed at it and is re-derived, not remembered.

## THE ARCHITECT'S OWN DEFECTS

**A-REC-S133-2** — a foreman work order commanded a cross-lane reclaim that `scripts/factoryState.mjs` forbids BY CONSTRUCTION (`writeLane` and `reclaim` both refuse `self !== lane`, fenced, because "a takeover is a decision a person makes"). Withdrawn by `NOTICE-S133-WITHDRAW-FOREMAN-STEP3-1`, with the tempting workaround named and forbidden.

**A-REC-S133-3** — hand-typed inserts diverged from their preflighted files by 26 and 23 characters. Repaired each time by treating the ROW as source. Its destructive half retired by `F-S133-A-HAND-TYPED-ROW-CAN-BE-MADE-FAIL-CLOSED-1`.

**A-REC-S133-4** — a machine fallback was PUBLISHED without checking that the machine could execute it: the foreman cannot read an AG-4-addressed card or a from_lane verdict row, and would receive 2048 of 39440 octets even if it could. Same class as A-REC-S133-2 reached from the other side — there the impossibility was measured after the order; here it was already in this session's own findings and the Architect wrote past it. **Standing mitigation: a proposed path names the INSTRUMENT that executes it before it is published.**

**A-REC-S133-5** — three in one hour. (1) The 07:45Z tick ran ONE of its two mandated reads and then told the owner "no new rows" while a PASS verdict had sat on the bus for seven minutes; a negative asserted with no probe at all, on a quiet tick, invisible from the inside. Mitigation is mechanical: every tick reply now prints the bus read's ROW COUNT and newest `created_at`, and their absence is the tell. (2) The enumeration above. (3) The premise citing the Architect's own card as a scout verdict — DERIVED-NEVER-SOURCE, the Architect's unread prose laundered into a measurement by citing its timestamp.

**PLATINUM-BREACH-S133-1** — the Architect asked the owner to TYPE a ruling sentence the Architect had itself composed. His judgement was already given; transcription is machine work. Repaired by minting `OWNER-RULING-S133-COLD-RESTART-1` from his verbatim witness.

## THE OWNER'S DESIGN CONTRIBUTIONS (S112-YASA-1)

**OWNER-RULING-S133-COLD-RESTART-1** — the human-eye witness that every window was closed by his own hand, which is the lens `F-S117-LIVENESS-IS-POSITIVE-ONLY-1` says the machine does not own.

**OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1** — *"kapsiyor, sonsuz dongu nerede gorulurse durdurulmalidir."* The Architect proposed a numeric THRESHOLD; the owner replaced it with a JUDGEMENT STANDARD. A threshold is a mechanism and the P-6 freeze forbids it; a standard is an obligation on the actor and the freeze does not touch it. **The Architect had not seen that the two halves could both be satisfied.** Recorded so a later window does not re-derive the threshold and mistake it for the ruling.

**The fossil question** — the owner asked whether keeping AG-1/2/3's queues and address spaces as fossils was meaningless, and whether he was missing something. That question forced the measurement, and the measurement went the other way: no cross-lane path exists, and retiring them costs three window-openings for zero gain. The contribution was the demand for a measurement, not the conclusion.

## ONE TECHNIQUE WORTH KEEPING

**Locating a transcription divergence by line-length profile.** When a transcribed verdict row's md5 differs from the row's, do not re-type: ask the server for the row's per-line length profile (`regexp_split_to_table(body, E'\n') with ordinality`, one length per line), compute the same locally, and the single differing line is the one to fetch and correct. At 08:11Z this located an eleven-character divergence on line 3 of a fifty-line row in two queries. The ROW is the source; the file is corrected TO it, never the reverse.

## WHAT THIS SESSION DID NOT DO, NAMED AND NOT HIDDEN

No SOTA criterion was advanced. Twenty-two adversary verdicts and one supplement row were produced, ZERO `RELEASE` rows were posted, and the producer wrote no line of code. Every one of those verdicts named a defect that was really there and several were the Architect's own — but a mechanism that has never once emitted a RELEASE has not yet demonstrated that it terminates, and that is stated here rather than left for a reader to infer.

Amendments per round, re-measured at this write: MA-RERUN-3 — 6 (18–23), 2 (24–25), 1 (26), 1 (27, WORK). WEB-VALVE-1 — 5 (30–34), 5 (35–39), 2 (40–41), 1 (42, REVIEW). Both falling.
