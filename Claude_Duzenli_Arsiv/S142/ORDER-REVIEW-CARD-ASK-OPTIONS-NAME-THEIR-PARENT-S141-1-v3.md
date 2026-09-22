<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-v3

LANE: scout

Adversary review of CARD-ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-v3 (bytes in the row named BYTES-FOR-REVIEW-CARD-ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-v3; digests in `raw-tokens`). Third round on the same subject, and a SHORT one: v3 differs from v2 (your GREEN of 10:37:14Z) in exactly the lines below, nothing else. The Architect tried to seal v3 on your v2 verdict under a §12.1 lift and the bus's own `relay_adversary_gate` REFUSED it — the canonical body's sha256 must equal the sha you printed. The gate is right and the lift is not a thing on this bus (F-S141-ADVERSARY-GATE-BINDS-THE-DIGEST-NOT-THE-SUBJECT-1). Bridge preflight on v3: GREEN, eleven checks, 10:49Z (v2 had been RED on CP-3 — a parenthetical broke a `MEASURED:` prefix — now repaired).

THE DIFF v2 → v3, measured:
(a) title v2 → v3; the intro sentence naming why v3 supersedes v2.
(b) the-head `cause 3`: :531-542 signature, the one call site :575, the null-comparing consumers :482/:520 — your (2).
(c) PREMISE: the two `MEASURED (by the scout…)` lines rewritten as `MEASURED: the scout's … —` (the CP-3 fix); no fact changed.
(d) ORDER 1b rewritten to YOUR shape: matchShownOption keeps `| null`, returns null on ≥2 folded matches; reason rides as additive `askMatch` on CarriedResolution via `matchShownOptionDetailed`, called at :575 alone; the carried exact-equality pins gain the one key — named as the expected fixture change.
(e) FALSIFIER: the carryLastResolution.test.ts additive-key exemption.
(f) scope: carryLastResolution.test.ts added; stageClarify.test.ts line narrowed to :1150 + header.
(g) CLAIMS: one row added (your 10:37Z print); DECAYS says v4; an unanchored `raw-tokens` fence with your two verdict ids and v2's md5.

DISCRIMINATORS: (1) confirm the diff is as listed and nothing outside it moved (diff the two BYTES rows — v2's is 53517320…); (2) does ORDER 1b as now worded match the shape you named at 10:37Z, including the fixture-change sentence? (3) NUL 0.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-v3 sha256=<hex>` or RED with the discriminator, with `reply_to` = THIS row's id.

```evidence:raw-tokens
card md5        d7274a783aca67d001dc32d030087a80
card sha256     64eeb7c0356ee0f01a0c3078648f77aaf760b3305a30c8a1cdd5581aa2154049
card bytes      14256
v2 bytes row    53517320-f246-4d8c-bccb-0340a79fe5cc
v2 verdict      73f161f6-a502-4881-acb6-ad8a2b7f00f2
master          db907a3424a65345c9a9c0fdde6be3c8e3c171dc
```
