VERDICT: PASS-WITH-AMENDMENTS — the carry is EXACT, AMENDMENT 34 is applied at BOTH instances of AMENDMENT 23 with only the numeral moved, and no hunk touches AMENDMENTS 1-29 otherwise. Five findings, AMENDMENTS 35-39; two amend MY OWN sentences.

A.1 THE DIGEST — EQUAL. Row CARD-WEB-VALVE-1-S132-1-v9, AG-4, created_at 2026-09-08 05:49:36.036428+00: body_md5 = 12b8c5e17d680e3fe6436ba3d93ccf57, length = 50709, [DIGEST-OK] recomputed locally — both EQUAL to the digests transcript. No sha256 asked, none claimed.

A.2 THE ROUTE — BOTH FILES PROVEN BEFORE EITHER WAS READ. md5 -q v9 = 12b8c5e17d680e3fe6436ba3d93ccf57, 50920 bytes, 151 lines; md5 -q v8 = dc336c724092ec26f6c09f38d7499ae7, 45315 bytes — both EQUAL to the transcript. Read in sed slices. NO file under ~/.claude/ was opened.

THE FIVE CARRIED SENTENCES — EQUAL, every instance named.
30 and 31 — TWO instances each: mirrors 90 and 91, both operative at ORDER B.6 line 113. ALL EQUAL.
32 and 33 — TWO instances each: mirrors 92 and 93, both operative at ORDER B.6b line 114. ALL EQUAL.
34 — ONE instance as an amendment sentence, mirror line 94. EQUAL.
AMENDMENT 34 APPLIED AT BOTH INSTANCES OF AMENDMENT 23, MEASURED: "eighteen sibling" occurs at line 84, AMENDMENT 23's own mirror, and line 97, the ARCHITECT CLAUSE; v8:83 vs v9:84, and v8:90 vs v9:97, differ by that ONE WORD. "eight sibling" survives at line 7 only, in the preamble's narration of what changed — correct, since you must quote the old to say what replaced it. Line 114's "(AMENDMENT 23)" is a citation, not an instance.

THE CARRY I CANNOT VERIFY: whether the five sentences are byte-identical to what I POSTED — from_lane rows are unreadable and the operand is a transcription. And AMENDMENT 23 was authored by an EARLIER scout window, so "its own author" is true of the scout ROLE, not this window.

A.3 "NOTHING ELSE CHANGED" — MEASURED.
diff -u would spill 50KB into ~/.claude/, which I did NOT open. Same fact by line-membership over the two proven files: 17 lines of v8 absent from v9, 24 of v9 absent from v8. Classified against v9's structure, EVERY changed line is inside the declared set: 2 header, 4 report path, 7 preamble, 10 PREMISE, 84 AMENDMENT 23's mirror per AMENDMENT 34, 90-94 the five SCOPE mirrors, 95 the NAMED-NOT-AMENDED line, 97 the ARCHITECT CLAUSE as 34's second site, 98/102/120/121 version strings read WHOLE, 113/114 the ORDER B.6/B.6b sites, 124 the four FALSIFIER clauses, 141/142/147/148 deliverables, 151 TAIL ANCHOR.
I read 113 and 114 WHOLE in BOTH versions: the pre-existing sentences (AMENDMENTS 12-29 as they appear there, and AMENDMENT 7's parenthetical) are unchanged; the additions are only 30/31, 32/33 and the two new fixtures. NO hunk touches a sentence of AMENDMENTS 1-29 other than AMENDMENT 23's amended clause.
ONE NOTE: the ARCHITECT CLAUSE is not named in the declared set. Line 97 is lawful as AMENDMENT 34's second site, but the set should name it, or a later reader marks a lawful hunk as outside.

A.4 MEASURED AT ORIGIN. Five instrument blobs all EQUAL to the fence, abbreviated to 12: a634bbac1656, ecf8ad7dcbfd, ea872702a086, 68bfaaf5e07c, 9862bf0aaf21. origin/master = 5d482353161198d0b1381f9473fe86a02dce2bf3, EQUAL to the master-read fence. Branch phase/web-valve-1-s132-1 = 5d1df6c9d49ba905f88aa776c88c448a899ca1ca, EQUAL to the branch fence, UNMOVED. gh pr list --state open → []. Report path and bus row read v9 at lines 4 and 98. No RELEASE row naming v9, no v10.

B.1 AMENDMENT 30 AS RENDERED — the fixture is genuine; MY OWN sentence is UNDER-SPECIFIED.
The url-only fixture discriminates: without the rule the date DOES occur inside the url, nothing raises, the test FAILS; with it, it raises. It falsifies what it guards.
BUT "outside every url present in the answer" is not implementable as written. The checker holds ONE url, the meta's, and can mask its occurrences cheaply. "EVERY url present" needs detection of urls the meta never named, in a string normalize() has already lowercased and whitespace-collapsed, and no sentence orders such a detector. The sentence is mine and so is the ambiguity. AMENDMENT 35.

B.2 THE FOUR NUMERIC FORMS — ANCHORING HOLDS; THE SLASH FORMS ADMIT A WRONG DATE.
Anchoring holds for the slash forms: a separator neighbour is what the rule permits, so "07/09/2026" in a path or range matches legitimately, and inside a longer number it does not — in "17/9/2026" it is preceded by "1", a digit.
THE HOLE IS CONVENTION. "7/9/2026" is day-first in Turkish, month-first in English. An answer in month-first convention citing 7/9/2026 means 9 July, yet satisfies a set built for 7 September: A WRONG DATE PASSES. I added that form in AMENDMENT 31, so the defect is mine to close. AMENDMENT 36.

B.3 AMENDMENT 33's TEST — SOURCE TEXT, BOTH FILES, NO BUILD STEP.
A union is a TYPE, ERASED at emit, so there is NO runtime member set to compare, and the two sides cannot import one another. The test reads the SOURCE TEXT of both declarations from disk and compares the member sets it parses — no build step, the technique AMENDMENT 32 fixes for the api/ check. A tsc-API parse is acceptable; a runtime comparison is not, since at runtime there is nothing to compare. AMENDMENT 37.

B.4 AMENDMENT 34 APPLIED — ONLY THE NUMERAL, AND THE ACCOUNT IS ACCURATE.
Both instances carry "eighteen" and the two before/after pairs differ by that word alone. The preamble's account of why it changed accurately renders my B.6 reasoning: a carried sentence stays verbatim against the ARCHITECT's hand, but a reviewer may amend its own. The one caveat is the authorship point above.

B.5 THE NAMED-NOT-AMENDED LINE — RIGHT TO CARRY, WRONG HOME.
Carrying it by name rather than dropping it is right, and it weakens nothing: it grants no permission and removes none. But line 95 sits INSIDE the scope block, which is NORMATIVE — where a producer reads what may be touched — and a non-normative finding there invites being read as an instruction. AMENDMENT 38 moves it without changing one word.

B.6 ONE MORE — THE RENDERED SET'S TIMEZONE IS UNPINNED.
The set is "derived from that instant". fetchedAt is an INSTANT; a DATE is a function of an instant AND a timezone, and nothing in v9 says which. Forms derived in local time against an answer written in UTC differ by one day for a fetch near midnight — barking on a correct answer, or accepting a wrong one. No FALSIFIER clause pins it. AMENDMENT 39.
The other three hazards ARE guarded: the containment throw by 28's clause, union drift by 33's, the unanchored and url paths by 26's and 30's.

AMENDMENTS — verbatim replacement sentences.

AMENDMENT 35, pinning my own AMENDMENT 30 to what is implementable:
The date must occur at least once outside every occurrence of the url carried by the meta being checked, that url being the only one the checker holds, and no url the answer names but the meta does not is masked.

AMENDMENT 36, closing the convention hole in my own AMENDMENT 31:
The slash-separated numeric forms are matched only when the answer also carries a Turkish-language marker, because 7/9/2026 is day-first in Turkish and month-first in English and would otherwise let an answer meaning 9 July satisfy a fetchedAt of 7 September.

AMENDMENT 37, naming the form of AMENDMENT 33's test:
The union-equality test reads the SOURCE TEXT of api/cwf/_lib/replay/stageContextSlice.ts and of src/lib/adminService.ts from disk and compares the member sets it parses from each declaration, because a union is erased at emit and no runtime member set exists to compare.

AMENDMENT 38, rehoming the named finding:
The NAMED, NOT AMENDED finding is carried in the PREMISE as a KNOWN-OPEN line rather than inside the scope block, because the scope block is normative and a producer reads it for what may be touched.

AMENDMENT 39, pinning the timezone:
The rendered set is derived from fetchedAt in UTC and the card says so, because a date is a function of an instant AND a timezone, and a set derived in local time differs by one day for a fetch near midnight.

read relay_inbox at 2026-09-08T06:05:58Z, 115 rows, head created_at=2026-09-08 05:52:01.338044+00.
