CWF-S147-FINDINGS-v1

Cut at S147 close, 2026-09-20T09:40Z. Every finding carries its fix and its date (owner rule 2026-09-10). Each also lives by name in register v137.

## A · PRODUCT

- F-S147-ITEM7-SEAM-ALREADY-REPAIRED-THREE-WAYS-1 — the F-S117 seam (child layer read without the resolved parent) has three repairs on master, found by the archive search before any card was cut (12.5, rule 1): (i) stageClarify widens to every enabled layer on an EMPTY scoped layer; (ii) CARD-ASK-AFTER-DISCOVERY-S138-1 (37a58c34) passes a resolved peer's id into the child layer's parent_param through planDiscovery/resolvedByLayer (stageClarify.ts ~1558-1590 at 33ebbee7); (iii) the S140 carried peer (listRecentByConversation at stageClarify.ts:603-611, clarificationLens 'carried-peer'). GraphKbReader.parentsOf still has no caller (CALLER-ABSENT, unchanged). FIX: no build card; item 7 becomes a LIVE WITNESS of the original F-S117 turn ("KB7 OEE" shape, synthetic in any artefact) on production 20c1651c, read from turn_trace_digest. WHEN: first product task of S148 (2026-09-20/21), before item 5. Note: turn_trace_digest.stages never contains the string "declared-empty" in 10 days — one probe, not an absence; the witness reads the stage-03 span directly.

## B · FACTORY

- F-S147-DOC-PUSH-TRACKING-REF-NOT-WRITABLE-BY-LANE-1 — AG-4's doc-repo push succeeds (392bec9..ab53fc4, ls-remote ab53fc4dac32d5e617153533fe599b0661527b4a) but prints "failed to store: 100001" (keychain write) and "update_ref failed" (refs/remotes/origin/main): the lane's sandbox cannot write the doc repo's .git. The stale tracking ref (87d7837b since 04:05) made the session open read "ahead 11". FIX (applied S147): the Architect sets the tracking ref from the bridge to the sha in the lane's ls-remote line after every push (git update-ref with old-value guard). WHEN: every push; done for ab53fc4.
- F-S147-DOC-PUSH-NEEDED-PERMANENT-ALLOW-RULE-1 (recurrence of F-S145-DOC-PUSH-REFUSED-BY-HARNESS-CLASSIFIER-1) — in-window permission does not survive /clear. FIX (applied S147, owner consent): a permanent Bash allow rule for `git -C "<doc repo>" push origin main` added by the owner in AG-4's /permissions. WHEN: done 12:10 TSI; next push measures whether it holds after /clear.
- F-S147-BRIDGE-CAN-RUN-CARDPREFLIGHT-1 — the repository card gate runs on the bridge with ESBUILD_BINARY_PATH set to @esbuild/linux-arm64@0.27.0 unpacked in $HOME/esb (the lanes still hit tsx IPC EPERM, item 19). Three S147 artefacts went RED->fixed before insert. FIX: standing method, written into bootstrap v149. WHEN: now.
- F-S147-BOOT-TEXT-VS-NOTICE-SAME-WINDOW-1 — the push notice said "take after your current card, same window" while the boot text says "slip and stop"; AG-4 did both named cards and stopped, so LAND-FIVE needed a new boot. FIX: boot text names every notice the window must take, in order (done for LAND-FIVE + VECTOR-REPORT). WHEN: every boot from S147 on.

## C · OWNER CONTRIBUTIONS (S112-YASA-1, by name)

- The owner checked the side panel against the prior session's list and caught that item 22 (OPA runtime) had been dropped and that several rows were hidden inside other rows' descriptions. Architect blind spot: grouping rows by description text is invisible to the only reader of the panel. Cure: one panel row per register row or explicit group, 22 restored.
- The owner asked why the doc push "always fails"; the measured answer (push succeeds; local tracking ref unwritable) produced F-S147-DOC-PUSH-TRACKING-REF-NOT-WRITABLE-BY-LANE-1.

END · CWF-S147-FINDINGS-v1
