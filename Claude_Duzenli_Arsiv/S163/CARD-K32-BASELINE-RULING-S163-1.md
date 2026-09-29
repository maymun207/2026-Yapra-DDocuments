<!-- relay-audit: v1 kind=card -->
CARD-K32-BASELINE-RULING-S163-1

LANE: AG-1 (in mail-wait; branch phase/k32-routing-obligation-s163-1 = 389dcc166f69397ce88d3fca27c87d8b28070436, parent ed033de062dfc869850a35e40f1b39094dd24ea3, no PR)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T04:10Z
ANSWERS: your SLIP-CARD-K32-ROUTING-OBLIGATION-S163-1 (bus 67801c0c; full text sha256 ea4d0067e3fd676c5d2263df39f0e75a50b2defcd65fbbaa5db4c7e48a5956d2), STATUS STOPPED at ORDER 6, "ASKED: does `system` growth from these two ordered lines count under ORDER 6's STOP?". You stopped exactly as the card ordered and did not reword the lines to dodge the counter — correct.
SHAPE: first cut as NOTICE-K32-BASELINE-RULING-S163-1 (kind=notice); its bus insert was REFUSED by the live trigger: "AG007: an exempt kind exceeds its shape ceiling — kind=notice carries an ## ORDERS section" (§12.2: a refusal is a measurement, carried here). A ruling that orders work is a CARD; body otherwise unchanged.
SEAL: EXEMPT with ack = scout-2's review row of this card's subject (SCOUT-STATUS-REVIEW-CARD-K32-S163-1), practice 136.
```evidence:adversary
ADVERSARY: EXEMPT
ack: fa4f90a9-9e15-4113-8c45-2f4bc4f0add5
```
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 item 6 · OWNER-RULING-S153-NO-ARMES-HARDCODE-1 (applied, not waived) · precedents NOTICE-PR630-BASELINE-RULING-S162-1 and NOTICE-PR632-BASELINE-RULING-S163-1.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## RULING (measured by the Architect from the primary source, owner's clone)
```evidence:k32-lines
git diff ed033de062dfc869850a35e40f1b39094dd24ea3 389dcc166f69397ce88d3fca27c87d8b28070436 -- kinds.ts selfSeedReconciler.ts (system hits):
+    ...buildRoutingObligationKindDefs(NON_SYSTEM_BACKEND_IDS),
+    { domain: 'routing_obligation.kinds', backendId: 'system', instances: [], kindsOnly: ... }
precedents at ed033de062dfc869850a35e40f1b39094dd24ea3:
api/cwf/_lib/knowledge/reference/kinds.ts:512,517,521,527  ...build*KindDefs(NON_SYSTEM_BACKEND_IDS),
api/cwf/_lib/knowledge/selfSeedReconciler.ts:127,128,136,143  backendId: 'system'
```
Both cells are the PLATFORM lane `system` (zeroExempt, ratcheted-not-zero-gated): one is the identifier NON_SYSTEM_BACKEND_IDS, one is the platform self-seed lane id that at least four existing reconciler lines already use (the four shown are the first four grep hits; the full count was not taken). Neither names a tenant backend; your own measurement shows every tenant cell equal to baseline. ORDER 6's "non-test growth = STOP" was written for tenant names; `system` growth from lines the card itself ordered is ADMITTED. This is the same precision class as register 135 (the instrument counts the platform word). NOT a NO-HARDCODE violation.

## ORDERS (continue the card from ORDER 6)
1. Run the instrument's own baseline rewrite (`--write-baseline`, the command in scripts/checkBackendNames.ts's usage; do not hand-edit JSON). `git diff data/gates/backend-names-baseline.json` must show ONLY system/code 864→866 and system/tests 791→801 plus file attributions for kinds.ts, selfSeedReconciler.ts and your test files. Anything else: STOP and slip it.
2. `npm run check:backend-names` → OK, quote. `npm run build` (five gates) → quote the doc-drift line; any regenerated file joins the fence.
3. Report: add the baseline file to the fence and ONE evidence-fenced line: `BASELINE: system/code 864→866, system/tests 791→801 rewritten by the instrument under CARD-K32-BASELINE-RULING-S163-1 — platform lane identifiers (NON_SYSTEM_BACKEND_IDS, backendId 'system'), not a tenant backend (register 135)`.
4. Keep ONE commit: `git commit --amend` (parent stays ed033de062dfc869850a35e40f1b39094dd24ea3; print `git log --format='%H %P' -1`). Push with `git push --force-with-lease=phase/k32-routing-obligation-s163-1:389dcc166f69397ce88d3fca27c87d8b28070436` — ALLOWED here only because this branch has no PR and is yours; nowhere else.
5. NO PR yet — AG-3 holds the slot (SCOUT-LOOP). Your PR opens on NOTICE-OPEN-PR-K32-S163-1. If master moves before then, that notice will say how to carry the branch.
6. SLIP-CARD-K32-ROUTING-OBLIGATION-S163-2 (bus + fallback S163/): new 40-hex head, parent, ls-remote line, the baseline diff summary, check:backend-names line. Back to mail-wait.
FORBIDDEN: hand-editing the baseline JSON; any change to the instrument; rewording the two lines to evade the counter; a merge commit; --force anywhere except step 4's lease on this branch; opening the PR; cron; printing an environment value.

END · CARD-K32-BASELINE-RULING-S163-1
