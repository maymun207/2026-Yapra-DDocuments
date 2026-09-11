# OWNER-APPROVAL-S135-WEB-CITATION-MERGE-1

Given by the owner on 2026-09-09, in his own words, verbatim:

> OWNER-APPROVAL-S135-WEB-CITATION-MERGE-1: PR 520'yi master'a indir. Tek iniş için geçerlidir.

SCOPE: ONE landing of pull request 520 — branch `phase/web-citation-contract-1-s134-1` at head
`80d03189ec4950a785c19fb7ab211ad0480dc20d` — onto master. It names an ACTION, not a list of paths.
It does not override a red gate.

## WHAT WAS MEASURED BEFORE HE WAS ASKED, AND WHY THAT ORDER MATTERS

The approval was requested only AFTER the gate state at that head was measured, and it was measured by
the scout because the Architect holds no GitHub credential.

The scout's read at 2026-09-09T18:38Z, keyed on the full forty-hex head, and taken from the SERVER via
`git ls-remote` rather than from a local remote-tracking ref that could have agreed for the wrong reason:

```evidence:ci
Build and Test   event=pull_request  completed  SUCCESS
Relay corpus     event=pull_request  completed  SUCCESS
report-schema    event=pull_request  completed  SUCCESS   (PRESENT — not a structural absence)
build (24.x): 6 RULE-40 success · 7 migration version-key success · 8 tenant-zero success
              9 BUILD success · 10 RUN TESTS success
rule26 SUCCESS
eval-canary SKIPPED, zero steps, job-level spend fence — named, never folded into the green
total_count = 3, not zero, so the read-the-zero-twice rule did not apply and the scout said so explicitly
```

STEPS 9 AND 10 ARE THE POINT. At the S134 head they were SKIPPED and SILENT. Here they RAN and PASSED,
and the scout named WHY that is not luck: steps 4 through 10 each carry a heavy-diff condition, so their
having executed IS the measurement that CI-DIET classified this diff as heavy. The build and the test
suite genuinely saw this code.

THIS ORDERING IS THE REPAIR OF A-REC-S133-7, where the owner spent an approval on a green that was no CI
run's verdict because the Architect had reported one. Here he was handed a measured verdict first, with
every step named individually, and only then asked.

## WHAT THE APPROVAL DOES NOT COVER, recorded so it is spent with eyes open

- eval-canary is SKIPPED by a deliberate spend fence: the canary has NOT spoken at this head.
- budget-fence, ma-rerun, nightly-compat, vector-live-proof, build-encoder-image and deploy-langfuse
  produced no run at this head; none carries a pull_request trigger, so their absence is STRUCTURAL.
- The standing finding that budget-fence is RED ON MASTER is unrelated to this branch and is neither
  repaired nor contradicted by this landing.
- A gate certifies a TREE. If the branch is rebased before landing, this certificate is cancelled and
  the measurement must be taken again at the new head. The landing card carries that as its
  SELF-INVALIDATION.

## WHERE IT IS SPENT

CARD-LAND-WEB-CITATION-S135-1-v1, posted to AG-5 at 2026-09-09T18:46:34Z. AG-4 is the author of the work
and AG-5 lands it, so the AUTHOR-SUBJECT seam holds and nobody merges their own work.
