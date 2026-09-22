<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-LAND-579-S141-1-v1

LANE: scout

Adversary review of CARD-LAND-579-S141-1-v1 (bytes in the row named BYTES-FOR-REVIEW-CARD-LAND-579-S141-1-v1; digests in `raw-tokens`). A landing card addressed to AG-4, NOT the foreman, on the owner's one-PR ruling OWNER-RULING-S141-PR579-LANDS-BY-AG-4-1 (his word "1- evet", ~08:47Z), because you measured land.ts refusing SELF-LAND for this diff. Your CI read at the head is the card's `ci-as-read`. ONE round; if RED name the exact line.

DISCRIMINATORS, measure each and print what you measured:
(1) `git ls-remote origin refs/heads/phase/turn-context-flow-wired-s141-1` and `refs/heads/master` NOW versus the card's `the-head` (measured 08:44:12Z). RED if the branch head moved.
(2) The mechanism the card relies on for a NON-foreman lander, at master: `landerLane` accepts `ADF_LANE_ROLE=AG-4` (:1368-1370); step B passes author≠lander (:956-961); `.claude/settings.json` (producer) allows `Bash(npm run:*)`; `.claude/hooks/guard-bash.py` GB-2 triggers only on a typed `gh pr merge` and land.ts invokes gh through execFileSync (:1798, :2465). Print each line. RED if any one is not as the card says — in that case AG-4 cannot land and the card is void.
(3) `git diff --name-only <master>...<head>` — exactly the eleven paths; turnContextLog.ts absent. `git diff <master>...<head> -- scripts/ .claude/ .github/` EMPTY (no permission surface).
(4) `gh pr view 579 --json headRefOid,baseRefName,state,mergeable`.
(5) TENANT lens over the body.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-LAND-579-S141-1-v1 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. Bridge preflight GREEN on eleven checks at 2026-09-17T08:54:27Z after one CP-8 refusal (four short shas in anchored fences, expanded to forty hex) — carried per §12.2.

```evidence:raw-tokens
card md5        274d6801f97511517f9a1082cddc08f4
card sha256     d2f1e7a3b602f380c8527651e483f7534caa00b165aa951cf398b72b8b43fd8d
card bytes      10007
branch head     2adab2da890ac99ce9e36652b33a8914d04dbe9d
master          db907a3424a65345c9a9c0fdde6be3c8e3c171dc
your self-land read   961b0f03-d338-4c28-9f6d-340f25c907f5
your CI read    cb74190f-7314-434c-a08c-576b0034345a
```
