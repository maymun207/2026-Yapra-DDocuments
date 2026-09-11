# F-S135-THE-NFD-UNTRACKED-NINE-ARE-A-LINUX-LENS-PHANTOM

STATUS: MEASURED and CLOSED at S135 open. It retires the second half of the v135 bootstrap's
agenda item 6 — "clear the nine untracked NFD-decomposed filenames" — as a phantom of the
instrument rather than a state of the repository.

## THE DISAGREEMENT, WHICH IS WHERE THIS STARTED

Two lenses read `git status --porcelain -uall` on the SAME working copy of the documents
archive, at the same HEAD `ee58896474b8e02d42d1cae4f0211784964d427c`, minutes apart:

- The Architect, through the Linux bridge VM's mount: 21 untracked plus 1 modified.
- The scout, on the owner's macOS directly: 12 untracked plus 1 modified, and
  `git ls-files --others --exclude-standard -- Claude_Duzenli_Arsiv/Projeler` returned NOTHING.

The scout reported the difference rather than reconciling it, and named two candidate causes
without choosing one. It was right to refuse to choose: the cause is neither of them.

## THE CAUSE, MEASURED

`git config --get core.precomposeunicode` on that repository returns `true`.

That setting is macOS-only in effect. On macOS git precomposes filenames it reads from the
filesystem — NFD, where a Turkish letter is a base letter plus a combining mark — into NFC,
the single-code-point form the index already holds. The names then MATCH their tracked
entries and the tree is clean. On Linux the setting is ignored: git sees the raw NFD bytes,
finds no index entry with those bytes, and reports nine NEW untracked files.

The twins, from `git ls-files` beside `git status`, are the proof:

```evidence:twins
tracked   (NFC, one code point):  .../GU_Ba<s-cedilla>Sistem Mimari.docx   bytes \305\237
untracked (NFD, base + combining): .../GU_Bas + combining cedilla           bytes s \314\247
tracked   (NFC):                   .../GU_DOK<U-diaeresis>MAN 6.docx        bytes \303\234
untracked (NFD):                   .../GU_DOKU + combining diaeresis        bytes U \314\210
```

Same file, two normalisations, one of which only one operating system can see.

## WHY IT MATTERS BEYOND NINE FILENAMES

The only machine that pushes this repository is the owner's Mac. On that machine those nine
paths are already tracked and the tree is clean. There is nothing to clear, and a session that
had "cleared" them would have committed nine duplicate files under NFD names, which the Mac
would then have shown as a second copy of every document.

The general form, and it is the point: A LENS THAT RUNS ON A DIFFERENT OPERATING SYSTEM FROM
THE REPOSITORY'S HOME IS A DIFFERENT INSTRUMENT, not a second look. Both readings were honest
and neither was wrong about what it saw. The agenda item was created by carrying one
instrument's output forward as a property of the repository.

## HOW IT WAS CAUGHT

Only because two lenses disagreed and the disagreement was treated as the finding rather than
as a tie to be broken by whichever answered first. The S134 addendum 12.13 says exactly that,
and this is its first payment in S135. The scout produced the disagreement by refusing to
adopt the Architect's count; the Architect measured the cause because the count it had written
into a card was falsified against it.

## WHAT IS STILL TRUE AND UNAFFECTED

On the fenced set the two lenses agreed EXACTLY: thirteen paths under Claude_Duzenli_Arsiv/S134
and /S135, one modified and twelve untracked. Those thirteen are what the archive push carried.
Nothing under Projeler was staged, committed or renamed, which is what the card ordered and
what the reading above shows was correct for a reason nobody knew when the card was written.
