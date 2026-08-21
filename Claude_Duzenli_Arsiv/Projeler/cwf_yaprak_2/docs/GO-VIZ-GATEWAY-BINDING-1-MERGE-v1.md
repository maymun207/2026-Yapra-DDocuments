# GO — PHASE-VIZ-GATEWAY-BINDING-1 · MERGE · v1

<!-- GO-VIZ-GATEWAY-BINDING-1-MERGE-v1 · 2026-08-06 · S82 · Architect: Claude (Opus 5).
     RULE-25 on branch @ 62c46eeb, fresh checkout. Re-derived: 477 test files ·
     7-file set matches the declaration incl. the two declared overages · deep-match
     mutation run BY THE ARCHITECT WITH A POSITIVE CONTROL (first attempt's sed did
     not apply and stayed green — the second, line-addressed and eyeballed, went
     4/16 red, restored 16/16) · ARMES fallback suite 8/8 unchanged · api/ zero. -->

**Verdict: GO, no conditions.** The two budget overages are accepted and recorded with
their reasons: `unitTruth.ts` (the regression the phase itself introduced-and-caught —
§4's acceptance does not pass without it) and its test (KNOWN LIMIT inverted, not
deleted — the limit was the customer's actual blocker).

**STEP 1:** CI green on the head that actually merges.
**STEP 2:** rebase onto current master if it moved; known-class CHANGELOG conflicts
resolved one-handed, counted not read. `--no-ff`. Verbatim message:

```
merge: VIZ-GATEWAY-BINDING-1 — the data was on screen's doorstep three times

The brief said the model names the inner tool. Production said otherwise: the
directive names call_tool, so the brief's fix — applied literally — would have
excluded the one record carrying the data. Read first, then cut: three broken
links, none of them the one the brief aimed at.

Link 2: argsContainMatch compared nested objects by identity, so a match
directive could never select a gateway call. Now containment, deep, ordered.
Link 3: findRecordGroups saw columns(2)+data(5) and refused as ambiguous —
the F111a guard doing its job on a shape it had never met. The rule that
unlocks it is data-proven, not heuristic: columns[].name equals data[0]'s key
set exactly. The describer knows the names of what it describes.
Link 1: effectiveToolName, either-or, for the day the model DOES name the
inner tool — it did exactly that on trace=8b2cb9bc's sibling.

And the phase caught its own cure's regression: the source column literally
spells "Toplam Sarfiyat (m³)", UNIT-TRUTH-1 only knew camelCase suffixes, and
stripped the source's own words as a model claim. Parenthesised units in the
FIELD NAME are now source-spoken. The treatment no longer removes the label
it exists to protect.

BUG-030 does not close on this merge. It closes when the owner's question
puts five bars on the screen with m³ from the source and get_chart_data in
the provenance line.
```

**STEP 3:** `## MERGE` appended, same push, never pre-written. While in the main clone,
resolve the 8-line uncommitted CHANGELOG note (Operator publish entry) one-handed —
commit it under its own heading; different regions, mechanical.

**Post-deploy (S63-1) — the owner asks, the Architect reads:** new session, verbatim:
*"Granit Glazür hatlarının doğalgaz sarfiyat grafiğini son 10 gün için çizer misin?"*
Acceptance: bars render · unit reads m³ from the source · provenance caption names
get_chart_data. Anything less is reported as measured, not retried until it cooperates.
