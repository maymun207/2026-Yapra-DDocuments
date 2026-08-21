# RELAY-STAGES-TRUTH-1-REBASE · v1
**For: AG-3 · the owed merge-turn sequence, now unblocked (AG-2 merged: master = `fb427873c48eb52710d9375e5c8d53fa91cf6756`, deploy READY). One relay, self-contained (D-2). This is NOT the GO — final push first, Architect review after, GO last.**

## Ruling you asked for — ENABLED_IS_LIVE
AG-2's live verdict is binding: `backends.enabled` is ALIVE and gates **knowledge/replay scope**, NOT serving; serving is decided by `lifecycle` alone. Therefore: the serving-scope helper (R4) = `lifecycle === 'active'` — do NOT fold `enabled` into it. Keep the two truths distinct by name (`servingBackends` vs the knowledge-scope reader). Consequences you should see and assert: `tk-temp` (now `retired`) drops out of card 06's scope automatically; `mount-probe` (now `active` — it was resumed today) legitimately remains.

## Sequence (in order; each step's proof line goes in your report)
1. `git fetch origin --prune` · confirm `origin/master = fb427873…` · rebase `phase/stages-truth-1` onto it. Footgun 1 is known to you: the rebase orphans the first seal's SHA — that is WHY the seal comes later, on the rebased worktree.
2. Tag `McpSettingsRepository`'s two stage-07 reads (fence (c) is lifted by the merge). This closes `F-S101-MCPSETTINGS-UNTAGGED`; assert the `UNTAGGED (bug)` renderings disappear — the backstop fired exactly as amendment (b) designed, record that sentence.
3. Apply the ENABLED_IS_LIVE ruling above (one constant + the third scope site you found); assert tk-temp-absent / mount-probe-present in the scope test.
4. Fixture honesty: the three hand-written '14' buckets must now be produced by the LIVE path (flush span re-parented/ordered so stage 14 observes real spans) — no fixture may fabricate a bucket the pipeline cannot emit. Name the fix for ancestry AND ordering separately (two causes, two proofs).
5. `npm run reseal` on the rebased worktree + docVersion **rev 264** in the same commit (WAVE-SEAL LAW; you already measured the remedy — now it is lawful to apply it).
6. Final push · PR #243 must go fully green including doc-drift head-mode. Paste back: final head SHA · vitest/rule26 numbers · drift OK line · the four proof sentences from steps 2–4.

<!-- END · RELAY-STAGES-TRUTH-1-REBASE-v1 -->
