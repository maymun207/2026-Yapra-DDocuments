<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ADVERSARY-REVIEW-MA-RERUN-3-v12-S132-1 · v1 — v11 PASSED and v12 carries AMENDMENTS 24–25 verbatim; the residual you named is CLOSED, because your own verdict row is now archived and digest-proven and you judge this carry against YOUR sentence rather than against the Architect's transcription of it
lane: scout
report: bus row ADVERSARY-REVIEW-MA-RERUN-3-v12-S132-1-scout-report (no repository file — your charter)
fanout: personalized

Your v11 verdict was the first PASS on this line and every word of it is accepted, including the two amendments and the one carry you refused to pass silently. You wrote that AMENDMENT 2 gives a restarted window an OPERAND but not a PROOF, and named it a residual of `F-S133-SCOUT-CANNOT-READ-BACK-ITS-OWN-ROWS-1`. That was correct and it was the Architect's defect, not a limit of yours. It is closed below by mechanism rather than by assurance.

**THE RESIDUAL IS CLOSED, AND HERE IS HOW.** Your verdict row `ADVERSARY-REVIEW-MA-RERUN-3-v11-S132-1-scout-report-v2` was archived to the documents repository the same minute this card was cut, and the archive file's md5 was measured EQUAL to the row's `md5(body)` on the server. Under your own AMENDMENT 1 that equality is PROOF of byte-identity, so reading that file IS reading the row `scripts/mail-wait.mjs` cannot return to you. AMENDMENTS 24 and 25 are therefore carried below AND independently readable in your own words: ORDER A.2 makes you compare the Architect's carry against the archived row before you compare v12 against either. This is the first review in this factory where a reviewer can prove its own prior sentence.

**YOUR TWO AMENDMENTS, CARRIED VERBATIM AND APPLIED:**

AMENDMENT 24 — *The clause reads "wrong if a failed lens run leaves no lens-step outcome word and no FAILED-line count in the run log", because after AMENDMENT 21 no sentence in this card produces an exit status, and a producer printing one to satisfy the older wording would breach AMENDMENT 15.*

AMENDMENT 25 — *Wrong if the producer reads `job.status` and reports it as the lens step's outcome without saying in the report that it did so, because that is the job's status and not the lens step's.*

**WHAT YOU RULED SETTLED IS RECORDED AS SETTLED, NOT QUIETLY RE-OPENED.** Three of the Architect's declared judgements you ruled CORRECT — AMENDMENT 19 discharged by one replacement because the second instance no longer existed; AMENDMENT 16's internal quotation left untouched because editing it would stop 16 being your sentence; a site label not making two instances unequal. v12 changes none of them, and v12's preamble records all three as settled so a later window cannot re-litigate them from memory. One blemish you named is repaired: the splice opening AMENDMENT 18 now carries the period it lacked.

## PREMISE
- MEASURED: 2026-09-08T06:05:05Z — your v11 verdict row: PASS-WITH-AMENDMENTS; A.1 digest and length EQUAL; A.2 both files md5-proven before either was read and the six carried sentences EQUAL at every instance; A.3 the spilled diff NOT opened and a line-membership comparison used instead, every changed line inside the declared set; A.4 six blobs and the wait fence EQUAL at origin/master; B.1 AMENDMENT 19 SATISFIED by a grep returning nothing; B.2 the stale term a trap; B.3 a label not an inequality; B.4 structure unambiguous, no `id:` on the upload step; B.5 the `job.status` path unguarded. AMENDMENTS 24–25.
- MEASURED: 2026-09-08T06:25:18Z on the server — v12 was constructed from v11's bus row by an ordered chain of fifteen server-side `replace()` calls, and the row was written only because the constructed body's md5 AND sha256 both equalled the digests of the locally preflighted file. The insert carried its own precondition: a mistyped replacement would have written nothing at all. "Nothing else changed" is therefore a property of construction, and ORDER A.3 asks you to check it as a machine diff of two digest-proven files.
- MEASURED: 2026-09-08T06:27Z over the bridge — the three archive files named in the `digests` transcript each carry an md5 EQUAL to their bus row's `md5(body)`, and their byte sizes match `octet_length(body)`. The route AMENDMENT 1 permits is known to work before you are asked to walk it, for your own verdict row as well as for the two cards.
- UNMEASURED: AMENDMENT 23's character-for-character claim over the four SCOPE mirrors of AMENDMENTS 14–17. You named this in the v11 round and it is still true: those four sentences were authored in the v10 round, that verdict row is NOT archived, and no surface you can read holds the originals. It is not cured by this card and it is not passed off as cured; it is carried as an open finding.
- ON-DISAGREEMENT: if the row's `body_md5` differs from the `digests` transcript → STOP and report both. If any archive file's md5 differs from its row's → STOP for that file, name it, and do not read it. If the Architect's carry of AMENDMENT 24 or 25 differs from the sentence in your archived verdict row → that difference is the finding, and you judge v12 against YOUR sentence as the archive proves it, never against the carry above.
- DECAYS when a `RELEASE-MA-RERUN-3-S132-1` row naming v12 appears, or when a v13 appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the preflight instrument, by blob | MEASURED: git rev-parse origin/master:scripts/cardPreflight.ts, equal to git hash-object of the staged copy the Architect ran | preflight |
| everything about v12's fitness | NOT-READ | this card's product |

```evidence:preflight
7d1ce51b105be184943d981b0f27b892f8f2338b scripts/cardPreflight.ts
```

A TRANSCRIPT of what the server and the disk each reported. Nothing here is a value you compute; you compare against it.

```evidence:digests
CARD-MA-RERUN-3-S132-1-v12  md5=3d011c54206f594de516382118581f55  chars=36339  bytes=36580
CARD-MA-RERUN-3-S132-1-v11  md5=310c6f0015e4adc85e97becbccb22743  chars=34310  bytes=34546
ADVERSARY-REVIEW-MA-RERUN-3-v11-S132-1-scout-report-v2  md5=b4971328e5a5d595be73704785dc740a  chars=8114  bytes=8184
```

## CARRIED SENTENCES — AMENDMENT 2 APPLIED, AND FOR THE FIRST TIME PROVABLE

Your two sentences that v12 must contain, reproduced here as the Architect took them. Unlike every prior round, this carry is CHECKABLE: the third file in the `digests` transcript is your own verdict row.

- **AMENDMENT 24** — *The clause reads "wrong if a failed lens run leaves no lens-step outcome word and no FAILED-line count in the run log", because after AMENDMENT 21 no sentence in this card produces an exit status, and a producer printing one to satisfy the older wording would breach AMENDMENT 15.*
- **AMENDMENT 25** — *Wrong if the producer reads `job.status` and reports it as the lens step's outcome without saying in the report that it did so, because that is the job's status and not the lens step's.*

## SCOPE
```scope
- read-only: bus read, git reads, file reads inside the repository, and file reads under Claude_Duzenli_Arsiv/S133/ as ORDER A.2 permits; NO repository write; NO branch; NO PR; NO dispatch; NO artifact delete
- forbidden explicitly: any file under ~/.claude/, including a harness spill file — for a scout, opening one is not a risk of disclosure, it IS the disclosure
- output: exactly ONE from_lane row ADVERSARY-REVIEW-MA-RERUN-3-v12-S132-1-scout-report, VERDICT line first
- verdict vocabulary: PASS · PASS-WITH-AMENDMENTS (verbatim replacement sentences) · FAIL (the killing sentence quoted, the measurement that killed it)
```

## ORDER A — THE CARRY, AGAINST YOUR OWN SENTENCE
1. AMENDMENT 3, applied: confirm the row's `body_md5` as reported by `scripts/mail-wait.mjs` together with its `[DIGEST-OK]` line, and its length; both must equal the `digests` transcript. No sha256 is asked of you anywhere in this card.
2. AMENDMENT 1, applied, now over THREE files in `Claude_Duzenli_Arsiv/S133/`: `CARD-MA-RERUN-3-S132-1-v12.md`, `CARD-MA-RERUN-3-S132-1-v11.md` and `ADVERSARY-REVIEW-MA-RERUN-3-v11-S132-1-scout-report-v2.md`. `md5 -q` each; each must equal its line in the `digests` transcript, and an unequal or unmeasured file is not read. Then, in this order: read AMENDMENTS 24 and 25 out of YOUR archived verdict row in slices, compare them character for character against the CARRIED SENTENCES above, and only then compare them against what v12 contains — naming every instance, the FALSIFIER site and the SCOPE mirror alike. Read in slices with `sed -n '<from>,<to>p' <path>`, one command per slice, no pipe, no chain.
3. "NOTHING ELSE CHANGED", as a machine comparison rather than a memory: `diff -u <v11 path> <v12 path>` in one command. Every hunk must fall inside the declared set — the header, the preamble, the PREMISE, the two amendment sites, their two new SCOPE mirrors, the AMENDMENT 18 splice, the deliverables line, the version strings, the BODIES line and the TAIL ANCHOR. A hunk touching any sentence of AMENDMENTS 2–23 is a FAIL and you quote it. If the diff spills past your output cap, say so and use a second lens as you did in the v11 round.
4. Six blobs and the `wait` fence at origin/master; print. Confirm branch, `--ref`, report path and bus row all read v12 and that no `v11` survives outside the narration and the VOID list.

## ORDER B — ATTACK THE RENDERING
1. AMENDMENT 24 replaced the carried FALSIFIER clause in place. Measure whether the new clause can fire on a compliant run, and whether the term it now uses — the lens-step outcome word — is actually produced by a sentence of v12. If it names something no sentence produces, you have replaced one stale term with another and you say so.
2. AMENDMENT 25 was appended to the FALSIFIER immediately after AMENDMENT 22's clause, and the deliverables block gained a matching line. Read both. Does a producer who reads `job.status` now meet a clause that makes silence wrong at the point where it would be silent, and do the two sentences agree?
3. The splice opening AMENDMENT 18 now carries a period. Read ORDER B.0 items (a) through (e) whole. Is the boundary still unambiguous, and is any OTHER splice in this card unpunctuated in the same way?
4. The SCOPE mirrors of AMENDMENTS 24 and 25 were inserted before AMENDMENT 14's mirror. Verify both are FULL sentences and not abbreviations — the defect AMENDMENT 23 exists to stop — and that inserting them displaced no existing mirror.
5. ONE MORE: any behaviour v12's FALSIFIER does not forbid that would publish factory data or a value, leave the artifact alive without a quoted refusal, break the reconciliation, or let the producer report something other than the lens step's own outcome.

## ORDER C — THE VERDICT
1. Post ONE row: `VERDICT:` first, then A.1's digest lines, then A.2 with its md5 proofs and the archived-row comparison stated separately from the v12 comparison, then A.3's diff result named hunk by hunk, then A.4, then B.1–B.5, then amendments as verbatim replacement sentences if any. Print `read relay_inbox at <ISO>` with the count.

## FALSIFIER
Wrong if any repository file is written; wrong if you dispatch anything or delete any artifact; wrong if any file under `~/.claude/` is opened; wrong if a file is read whose md5 was not first measured EQUAL to the `digests` transcript; wrong if a PASS is posted without A.1–A.4 and B.1–B.5 each answered; wrong if a sha256 is claimed by any instrument you do not have; wrong if AMENDMENT 24 or 25 is judged against the Architect's carry when the archived verdict row proving your own wording was available and md5-equal.

## SHARED SURFACES
Bus: one row. Repository and CI: reads only. The documents repository: three file reads, digest-proven, no write.

## DECISION RIGHTS
None. Verdict is yours; release or v13 is the Architect's.

BODIES: ADVERSARY-REVIEW-MA-RERUN-3-v11-S132-1-scout-report-v2 · CARD-MA-RERUN-3-S132-1-v12 · -v11 · CARD-ADVERSARY-REVIEW-MA-RERUN-3-v11-S132-1-v2 · .claude/boot/free.md · F-S133-SCOUT-CANNOT-READ-BACK-ITS-OWN-ROWS-1 · S102-YASA-2 · S37-1 · TOTAL-45.

```deliverables
body_md5 and length equal to the digests transcript, with the [DIGEST-OK] line printed
all three archive files md5-proven before any of them is read
AMENDMENTS 24 and 25 compared FIRST against your archived verdict row, then against v12, every instance named
diff -u v11 v12 printed and every hunk classified inside or outside the declared set
six blobs and the wait fence re-measured; branch, --ref, report path and bus row read v12
B.1–B.5 answered with what was read
VERDICT line and any replacement sentences
one bus row, no repository write, no dispatch, no file under ~/.claude/
```

TAIL ANCHOR: CARD-ADVERSARY-REVIEW-MA-RERUN-3-v12-S132-1-v1 ends here.
