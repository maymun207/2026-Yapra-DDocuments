# GO — FLOOR-TENANT-SPLIT-1 MERGE · v1
<!-- GO-FLOOR-TENANT-SPLIT-1-MERGE-v1 · 2026-08-02 · S77 · Architect → AG. -->

## PRECONDITION (S47-1)
Branch `phase/floor-tenant-split-1` head = `1af571b08f851bfc3a752911c773b7c370333d7b` ·
merge-base with origin/master = `39590e97dbe382c4f0b5a40531ed20a51bab1831` (= tag v1.0.0) ·
CI run `30736145840` on the PR head: conclusion SUCCESS (build 20.x ✓ · 22.x ✓ ·
coverage ✓ · rule26 first-attempt ✓ · eval-canary skipped = correct PR state).
If the branch head moved after this run → STOP, report, no merge.

## RULE-25 REVIEW VERDICT
PASSED — Architect fresh-clone verification on `1af571b0`: 7 commits · 414 test
files · docVersion rev 176 · zones/glossary/types untouched (B-1) · five files
deleted (G5) · 64 migrations unchanged · independent tenant-zero census with the
phase lens: ZERO in scope · `check:tenant-zero` present with the named kb7·glazur
deferral printed every run. Parity `3cac9a47…` pre/post accepted on AG's cmp
evidence (composed-prompt resolve requires live DB — Architect-verified
structurally, AG-verified live). FTS1-F4 RULING on record: strict lens stays
(over-blocks only; synonym swap is the sanctioned remedy; the two annotated
owner-anchor swaps are the precedent).

## MERGE (AG)
```
git checkout master && git pull --ff-only
git merge --no-ff phase/floor-tenant-split-1 -F MERGE_MSG.txt
git push origin master
git rev-parse origin/master   # ← report this hash back (merge is not done until pushed and reported)
```
Squash BANNED. `MERGE_MSG.txt` = the message below, VERBATIM, byte-for-byte.

## MERGE MESSAGE (verbatim)
```
Merge PHASE-FLOOR-TENANT-SPLIT-1: the platform stops speaking the tenant's name —
the voice was already data, and now the code knows it

The G0 live read proved the strongest possible starting point: all twenty prompt
segments and the armes persona already serve from the governed DB — no
floor-serving tenant text existed, so the phase shipped zero governed writes and
the parity gate closed on arithmetic: the composed live prompt hashes 3cac9a47…
before and after the sweep, byte-identical. The Kale user's product does not move
a byte.

What leaves the repo, layer by layer: the Kale identity floor gives way to a
tenant-anonymous voice carrying the same scope discipline (fixtures re-pinned in
the same commit); tenant examples across the comment layer become neutral
placeholders with AST stripped-compare proofs; the synthetic corpus learns to
draw entity names from entity_registry at injection time (lazy, so pre-split
rows stay byte-identical); four consumed job files and one superseded doc leave
the working tree, each byte-verified consumed against the rule store first; the
sealed surfaces reword and reseal at rev 176.

And the property that outlives the phase: check:tenant-zero joins CI with a
red-first positive control, printing its own kb7·glazur deferral by name every
run — never silent — until PHASE-FLOOR-TENANT-SPLIT-2 retires the knowledge
floor. 414 files / 4614 tests; CI run 30736145840 green first attempt, rule26
included.

Findings FTS1-F1/F2/F3 classified in the CHANGELOG; two owner-anchor word swaps
disclosed in the corpus headers themselves. FTS1-F4 ruling: the strict lens
stays — it can only over-block, and a synonym swap is the sanctioned remedy.
```

## POST-MERGE (S63-1 — merge is not proof)
1. AG reports the pushed `origin/master` hash.
2. Architect (self, no owner work): confirms prod deployment READY on the merge
   SHA via list_deployments · reads runtime logs for new error classes ·
   confirms `check:tenant-zero` green inside the master CI run.
3. Then and only then: FLOOR-TENANT-SPLIT-1 CLOSED@evidence in register v80;
   SPLIT-2 design §6 census intake closes on the merged CHANGELOG's FTS1-F1/F2/F3
   detail; SPLIT-2 phase prompt authored.

TAIL ANCHOR: this GO ends at the line "END-OF-GO v1".
END-OF-GO v1
<!-- END · GO-FLOOR-TENANT-SPLIT-1-MERGE-v1 -->
