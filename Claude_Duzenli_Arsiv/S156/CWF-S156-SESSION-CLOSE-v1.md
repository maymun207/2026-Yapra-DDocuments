# CWF-S156-SESSION-CLOSE-v1

S156: 2026-09-23 01:24Z -> 2026-09-23T03:06Z (04:24 -> close TSI). Opened from bootstrap v157. Written at close with `date -u` = 2026-09-23T03:06Z.

## 1 · WHAT MOVED IN THE PRODUCT (MEASURED)
- NOTHING LANDED ON MASTER. master stays 1ca28ede61588ff542764cf3f1375568c94436ae (GitHub API 01:28Z; open PRs 0 at 02:55Z).
- AG-4 pushed branch phase/armes-g1b-remainder-s156-1 (GitHub API branches, 02:55Z): G1b v3 in progress, no PR yet.
- Ruleset master-merge-gate: strict=true saved by the owner 04:52 TSI (two API lenses 01:52Z). Branches must now be up to date before landing.
- Doc repo: S155's 9 local commits pushed by AG-4 (SLIP-PUSH-DOC-REPO-S155-2, bus 01:32:12Z; ls-remote 741d89ef3cca4724778dd85225fb2ef50598c1f7). Every S156 commit is LOCAL at close (bridge has no write credential; item 86).

## 2 · CARDS AND THE BUS (in order)
- Item 58 re-measured at master (ARMES-REMEASURE-S156-1-v1.tsv): 4023 lines; G1 logic 160 lines / 41 files still open (v146 had dropped it).
- G2 v1 + G1b v1 -> both scout RED (01:57Z): v1 G2 would have removed the blind-spot law floor, the outage guard and five getKindDef users; v1 G1b's category-floor order had live consumers the card never named.
- Owner rulings: OWNER-RULING-S156-DATA-BACKENDS-1 (05:17 TSI) and OWNER-RULING-S156-FAIL-CLOSED-1 (05:25 TSI).
- G1b v2 -> scout RED with a text-only delta -> G1b v3 to AG-4 (bus 02:41:08Z, EXEMPT ack 0ff8431b-d5f3-4a26-9f33-cfcf2496b95a).
- G2 v2 -> scout review order on bus 02:31:34Z; NO VERDICT at close.
- Merge guard (owner question 04:55 TSI, approval 05:01 TSI; item 70 superseded): v1, v2, v3, v4 each scout RED; v3 changed the design from detecting overwrites to preventing them (disjoint open fences); v4 RED on one two-sentence defect; owner "onay merge-guard v5" (06:04 TSI) -> v5 to AG-2 (bus 03:05:32Z, EXEMPT ack c8105a8c-1207-42aa-b7ef-71d8b6cb1291). No v6.

## 3 · WHAT WENT WRONG (ARCHITECT, BY NAME)
- A sentence before SOTA-1 at open (third session running).
- v1 cards cut without asking what the code copies PROTECT (blind-spot floor, category floor): rigour on removal, none on function. The scouts caught all of it.
- A scout order posted without its boot text (merge guard v1); the owner had to be told a turn later.
- Merge guard: four versions before the design converged; the v3 redesign should have been the v1 design.
- A card time window written ahead of the clock (caught before sending).

## 4 · STATE AT CLOSE
master 1ca28ede61588ff542764cf3f1375568c94436ae · open PRs 0 (02:55Z) · AG-4 on G1b v3 (branch pushed) · AG-2 booting on merge guard v5 · G2 v2 at scout, no verdict · doc repo local commits unpushed.

END · CWF-S156-SESSION-CLOSE-v1
