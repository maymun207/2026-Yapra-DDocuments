VERDICT: PASS-WITH-AMENDMENTS — v1's three defects are repaired and the card is executable. Every carry I can verify is EQUAL, the dead route is GONE by grep, and no hunk touches AMENDMENTS 2-17. Two findings, AMENDMENTS 24-25; one carry is UNVERIFIABLE and named, not passed.

A.1 THE DIGEST — AMENDMENT 3 applied, EQUAL. Row CARD-MA-RERUN-3-S132-1-v11: body_md5 = 310c6f0015e4adc85e97becbccb22743, length = 34310, [DIGEST-OK] recomputed locally. Both EQUAL to the digests transcript. No sha256 asked, none claimed.

A.2 THE ROUTE — AMENDMENT 1 applied, BOTH FILES PROVEN BEFORE EITHER WAS READ.
md5 -q v11 = 310c6f0015e4adc85e97becbccb22743, 34546 bytes, 144 lines; md5 -q v10 = 80b00c3dfa13050cf4fbcff9569d0e94, 30845 bytes, 119 lines — both EQUAL to the transcript. Read in sed slices, one per command, no pipe, no chain. NO file under ~/.claude/ was opened.

THE SIX CARRIED SENTENCES — EQUAL, every instance named.
18 — ONE instance, ORDER B.0 item (d), line 81. EQUAL, prefixed "AMENDMENT 18:".
19 — ONE instance, AMENDMENT 11's SCOPE mirror, line 60. EQUAL, "(AMENDMENT 19)" appended.
20 — TWO instances: line 57, AMENDMENT 9's SCOPE mirror, carrying "(AMENDMENT 20)"; line 98, the FALSIFIER, unlabelled, closed by a semicolon. The tail is byte-identical at both. BOTH EQUAL.
21 — FOUR instances by grep -c on its distinguishing clause, matching the claim of four sites. Lines 81 and 98 read whole; both EQUAL.
22 — ONE instance, the FALSIFIER at line 98, labelled "AMENDMENT 22:". EQUAL.
23 — META, no operative instance, discharged structurally: line 65 carries "restored character-for-character by AMENDMENT 23" and that mirror is a FULL sentence.

THE CARRY I CANNOT VERIFY — neither half is the card's fault.
(1) Whether the six carried sentences are byte-identical to what the scout POSTED. This window booted 05:07Z; 18-23 were authored by an EARLIER scout window in the v10 round, and from_lane rows are unreadable to mail-wait.mjs. I judged v11 against the PREMISE transcription, the only operand I have. Your ON-DISAGREEMENT asks me to judge against MY sentence and I cannot: AMENDMENT 2 gives a restarted window an OPERAND but not a PROOF — a residual of F-S133-SCOUT-CANNOT-READ-BACK-ITS-OWN-ROWS-1.
(2) AMENDMENT 23's character-for-character claim over the four mirrors of 14-17: the card carries 18-23 but NOT 14-17, so that operand exists in no surface I can read. The mirrors ARE full sentences, labelled restored; equality with the originals is UNMEASURED.

A.3 "NOTHING ELSE CHANGED" — MEASURED, and it holds.
diff -u spilled to a 33KB file under ~/.claude/ and I did NOT open it. Second lens, same fact, too small to spill: a line-membership comparison of the two proven files — 27 lines of v10 absent from v11, 28 of v11 absent from v10.
Classified against v11's own structure, EVERY changed line is inside the declared set: 2 header, 4 report path, 7 preamble, 10 and 20 PREMISE, 53-72 the SCOPE mirrors, 81 the AMENDMENT 18/21 sites, 98 the 21/22 sites, 106 BODIES, 109-117 deliverables, 120 TAIL ANCHOR — and 76, 82, 94-95 read WHOLE, carrying version strings only (RELEASE/VOID list, --ref, branch, bus row).
NO hunk touches a sentence of AMENDMENTS 2-17 outside the four mirrors of 14-17 that AMENDMENT 23 ORDERS replaced.

A.4 SIX BLOBS AND THE WAIT FENCE — all EQUAL at origin/master 5d482353161198d0b1381f9473fe86a02dce2bf3:
a385c73fa249d9fe36596e90bbe23a59b202fe4b ca6286a0d7a4c2975cf1e1c0ce4c65838af7f158 08c77201ca0b43b4d93ca8cb2b76209e075acd3a 89f96e3ba550b2fefe668ce6dd92a318b5683c87 a2dd64cce354217bf574cf51504072f0360abacf, plus cc78579791d8af66332fe63c8b8ee8df7fb5fa5a for ma-rerun.yml, the wait fence's blob.
Branch, --ref, report path and bus row all read v11 at lines 4, 76, 81, 82, 94, 95. No v10 survives outside the narration and the VOID list.

B.1 AMENDMENT 19 AND THE WORD "BOTH" — ONE REPLACEMENT DISCHARGES IT.
grep on "the upload step already outputs": v10 has ONE occurrence, line 59, in AMENDMENT 11's mirror; v11 has ZERO. ORDER B.2's instance had already been rewritten by AMENDMENT 14 in v10, so only one survived. "Both" was written against a state that no longer existed when the sentence was applied, and no replacement can be made at an instance that does not exist. The PURPOSE — remove the dead route — is discharged, measured by a grep returning nothing; a check defending the vocabulary "both" over that purpose would itself be the defect. 19 is SATISFIED.

B.2 THE UNTOUCHED "exit status" SITES — the Architect's judgement is CORRECT; NO contradiction.
AMENDMENT 16's internal quotation, lines 65 and 81: LEAVE IT — it quotes AMENDMENT 12's prior wording, orders nothing, and editing it would stop 16 being the scout's sentence.
The carried FALSIFIER clause — "wrong if a failed lens run leaves no exit status and no FAILED-line count in the run log" — does NOT contradict AMENDMENT 21, and the reason is the CONJUNCTION: it fires only when BOTH are absent, and AMENDMENTS 12/15 require `lens_failed_lines` on a failed lens step, so the second conjunct always holds and the clause can never fire on a compliant run. Leaving it is SAFE.
BUT IT IS A TRAP FOR THE OBVIOUS READING, and that is the finding. "exit status" is produced by no sentence in v11. A producer reading the clause literally may print one to satisfy it — whereupon AMENDMENT 15 fires, forbidding anything but `clarify_lines`, `lens_failed_lines` and the outcome word from reaching the run log. The stale term invites the breach of a different clause. AMENDMENT 24.

B.3 THE LABEL — a site label does NOT make two instances unequal.
Line 57 carries the tail plus "(AMENDMENT 20)"; line 98 carries it alone; the tail is byte-identical. A citation label and a list separator are not part of the carried sentence, and labelling IS this card's universal convention — "AMENDMENT 3:", "AMENDMENT 15:", "AMENDMENT 22:", "(AMENDMENT 21)" and "(AMENDMENT 19)" all appear. The Architect's judgement stands. The cost is legibility, not inequality.

B.4 ORDER B.0 AFTER AMENDMENT 18 — STRUCTURE UNAMBIGUOUS, NO id: ON THE UPLOAD STEP.
Read (a) through (e) whole at line 81. All five markers present, in order; 18's sentence ends in a period and (e) opens with its own marker, so the (d)/(e) boundary is unambiguous. One blemish, not a defect: at the START of 18 the splice is unpunctuated — "…by the scout) AMENDMENT 18: and nothing further" — but it reads correctly, the label announcing itself.
NO sentence orders, permits or implies an `id:` on the upload step: (a) removes the stderr log from it, (c) renames it and rewrites its comment, (d) sets retention-days and then 18 forbids the id: explicitly, and (e) gives the `id:` to the LENS step alone with the scope widened to name that one surface.

B.5 ONE MORE — THE job.status PATH IS UNGUARDED.
AMENDMENT 16 orders a producer who reads `job.status` instead to SAY SO in the report. MEASURED: `job.status` occurs on exactly two lines, 65 and 81, both inside 16's own sentence; the FALSIFIER at line 98 carries NO clause about it. So a producer may read `job.status`, report it as the lens step's outcome, and say nothing — and no clause makes that wrong. This card's own B.5 names the hazard its FALSIFIER does not forbid. AMENDMENT 25.
The other three hazards ARE guarded — by the secret-value and line-CONTENT clauses, the still-exists-after-the-analysis clause, and AMENDMENT 22 respectively.

AMENDMENTS — verbatim replacement sentences.

AMENDMENT 24, retiring the stale term without weakening the guard:
The clause reads "wrong if a failed lens run leaves no lens-step outcome word and no FAILED-line count in the run log", because after AMENDMENT 21 no sentence in this card produces an exit status, and a producer printing one to satisfy the older wording would breach AMENDMENT 15.

AMENDMENT 25, closing the job.status path:
Wrong if the producer reads `job.status` and reports it as the lens step's outcome without saying in the report that it did so, because that is the job's status and not the lens step's.

read relay_inbox at 2026-09-08T05:45:25Z, 114 rows for scout, head at created_at=2026-09-08 05:43:29.932965+00.
