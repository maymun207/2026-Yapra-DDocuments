# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v129 — S129 opens on a measured fault, an unconsented card, and a half-built bridge

CUT 2026-09-02 evening at the S128 close. Per §11: every line inherited without fresh measurement is UNVERIFIED and must be re-derived before it becomes a premise. Lines below are marked where they were measured in S128 and where they were only carried.

The Architect's first message re-writes SOTA-1 verbatim (S66-1 positive control), read from `docs/laws/constitution/SOTA-1.md` in a clone verified against the wire, not from a mirror.

## 0 · ANCHORS

* master `d8895114744dbb23ba5633d726a0814cfe0468d5` — carried from v128 and, unusually, VERIFIED in S128: the admin Control Plane header renders build `d889511` on every screen and production served the whole session from it. Nothing landed in S128, so master is unmoved. Re-verify anyway; a verified-yesterday anchor is a carried anchor today.
* Deployment observed in S128: `dpl_B3a9C6686VKDStizEPaF1gV5V9ag`.
* UNVERIFIED, carried untouched from v128 — budget fence GREEN at run 3; valves `router.askOnUnresolved` v2 published value=1 and `router.nudgeOnTimeUnclear` v1 published value=0; AG-5 CLAIMED with nonce `9364074d…`; AG-1/2/3 WORKING fossils; the S127 infra changes (EIP 52.57.7.5, CloudFront E1PRI6MRV1924J, the inline budget policy). S128 measured none of these. The daily 07:10Z fence run's conclusion is still owed (S101-L1: `total_count >= 1` before reading any bucket).
* MEASURED in S128, live DB: `domain_rules` kind `tool_category` backend `armes` — `draft=12 · published=12 · archived=29`. `tool_category_cache` = 2 rows, both pinned (`scrap→metrics`, `kb7→factory`). `router_proposals` = 20 (1 accepted, 19 rejected, none pending). `routing_drafts` = 0.
* MEASURED: `mount-probe` and `honestbench` each expose the same four `hb_*` tool names.
* 7-key / 16-criterion scoreboards: not re-measured for a third consecutive session. Quote nothing from them without `architect:open` + `cwf-sota-definition`.

## 1 · THE MODE (unchanged owner law)

OWNER-RULING-S125-SINGLE-LANE-1 stands: exactly ONE worker (AG-5's address) + ONE scout. S126 additions binding: cardPreflight GREEN before dispatch · scout verdict or NAMED bypass per card · digest-checked INSERT transport. S126 owner laws stand: LANDING CLASS, UI-SURFACE, TRUNK-SYNC eligibility, budget thresholds 160/152.

## 2 · FIRST WORK, in order

⓵ The filesystem bridge — first, because it is cheap and it unblocks reading source. In this fresh conversation, search the tool list for filesystem tools. `rust-mcp-filesystem` and `filesystem` were added to the Docker MCP gateway in S128 and both returned `0 tools` in that conversation; the standing hypothesis is that a conversation binds its tool catalogue at start. Present → configure onto the `cwf_yaprak` clone (path unmeasured — take it from Finder Copy as Pathname; the owner's proposed `/Users/tunckahveci/Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra - Codes` was not found by the only tool able to look, which is one negative probe, not proof). Absent → fall to `desktop-commander`. GitHub remains credential-blocked: `github.personal_access_token` enters the Toolkit's secret store by the owner's hand, never the transcript.

⓶ PHASE-TOOL-VISIBILITY-1 — awaiting `onay`. Full card body in CWF-S128-SESSION-CLOSE-v1 §7: (a) publish four new tools into `production` / `employee` / `material`; (b) explicit-name pin with `explicitPinned` in trace; (c) the G-5 structure-layer counter extending the existing `UNTAGGED (bug)` pattern; (d) turn id visible in chat; (e) the `mount-probe`/`honestbench` name collision. (a) is the fix, (c) is what stops the class. A live production fault is open until (a) lands.

⓷ Witness question to Hülya (owner's surface): was the `…ByDate` / `…ByFactory` family opened deliberately on 2026-09-01, and is more coming? If yes, (c) is not optional.

⓸ THE LAND.TS STEEL — carried from v128 ⓶, untouched in S128. Teach the predicate card-carried owner landing rulings; land it under the LANDING CLASS ruling itself. Priced by a byte-matched predicted refusal (S126-2) and a second owner hand-merge (S127/#486).

⓹ The ledger re-entry card — carried from v128 ⓷, untouched. v127 ⓸'s list PLUS S127's additions (S127-FINDINGS-ADDENDUM-1 §4), PLUS S128's: G-1 · G-1b · G-2 · G-3 · G-4 · G-5 · G-6 · G-7 · G-9, and A-REC-S128-1/2/3.

⓺ A1 Fly · A2 credentials/ARMES (env-only) · A5 spend — owner-approved in OWNER-RULING-S126-VALVES-AND-A-ITEMS-1; cards still not cut.

⓻ Nudge shadow watch — first `wouldHaveNudged` evidence → owner with the open/hold decision; `nudgeOnTimeUnclear` stays 0 until then.

## 3 · THE STANDING FAULT (open in production)

`getRecipeTemplatesByDate` (active in `backend_tools` since 2026-09-01 09:31Z, required `[factoryId, date]`) is in no published category, so it never enters `offeredToolNames` and the model cannot see it. It falls to `getRecipeTemplates` and asks for `materialNumber`. Three sibling tools share the condition. Reproduction prompt, and the acceptance test for (a):

```
KB7 fabrikası için 24 Ağustos 2026 tarihli reçeteleri ver ve armes backendde getRecipeTemplatesByDate toolunu kullan
```

Reference turns: `ddb30a0e158c7fa824f2a9d94b00d8f4` · `cf2149dcca67297a5c7b36b2637981ea` · `e4765b0a764ba5cc61d1e3e70856ba3f`.

## 4 · HOW TO READ A ROUTING FAULT (the S128 path, reusable)

Chat has no turn id (G-1). Traffic is sparse, so: send the prompt, then read the newest `turn_trace_digest` row — or find the session in Admin → Inspect (`24h · me`) and use its `trace` button, which opens Langfuse at `dl3644f5a7fnn.cloudfront.net/project/cwf-prod/traces/<turn_id>`. In Langfuse, search the span tree for `register-tools`, open Output, and read `path` · `matchedCategories` · `droppedCategories` · `stickyAdded` · `offeredToolNames` · `offeredCount`. Enumerate the list; do not search it — a closed count is proof of absence, a failed search is not. Then cross-read Admin → Tool Matching → Browse for what each category actually publishes.

## 5 · THE CLASS TO WATCH

S128's three Architect defects were one class in three costumes: an indicator taken for ground truth (`offeredCount` for a list; `publish 0` for another subsystem's health; a DB field assumed present on a UI). The same class had already been named as this factory's dominant failure mode. It is not cured by intending to be careful — S128's cure each time was a second, independent measurement, usually the owner's screen. Structure work accordingly: prefer two lenses over one, and enumerate rather than probe.

Related, from S128 §8: a call that does not error has not thereby succeeded. `mcp-config-set` accepted a malformed config silently; `mcp-add` reported success while exposing zero tools. Verify by using the thing, not by reading its receipt.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v129 -->
