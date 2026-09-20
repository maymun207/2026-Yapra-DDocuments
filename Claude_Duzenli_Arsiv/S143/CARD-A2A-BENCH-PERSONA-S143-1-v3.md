<!-- relay-audit: v1 kind=card -->
CARD-A2A-BENCH-PERSONA-S143-1-v3

LANE: AG-4
fanout: personalized
SUPERSEDES v2, which the scout returned RED (SCOUT-STATUS-REVIEW-CARD-A2A-BENCH-PERSONA-S143-1-v2). Every defect it
named is answered below BY DESIGN, not by wording: the bench persona no longer adds ids to the closed segment list,
so the chat arm's prompt revision, config fingerprint and guardrail baseline cannot move.
A PRODUCT card on a NEW subject — it returns to the scout; no exemption is claimed.
Owner rulings it rests on: OWNER-APPROVAL-S143-G10-BENCH-PERSONA-1 ("evet", 2026-09-19 23:23 TSİ) and the SOTA
contract's confound rulings (cwf-sota-definition-v1_5 §7: benchmarks run in English; Tier A/B/F run CWF outside its
domain on purpose).

THE PROBLEM. The A2A arm runs the chat turn pipeline and therefore the chat system prompt, whose `identity` and
`safety.b1_scope` confine the assistant to the connected factories' production data and order a standard refusal for
everything else. A third-party benchmark task is outside that scope by construction.

THE DESIGN, after the scout's review. A per-ARM OVERLAY applied AFTER the existing resolution chain
(draft (lab) > rollout > published > floor), on the A2A arm only, replacing exactly two resolved values — `identity`
and `safety.b1_scope` — with bench texts. The closed list SEGMENT_IDS is NOT changed. The prompt revision is computed
over the overlaid map, so an A2A turn carries its own, different revision (it IS a different prompt) and a chat turn's
revision is byte-identical to master's.

PRECONDITION: origin/master is the head named in `the-seam` or a descendant not touching the SHARED SURFACES;
SEGMENT_IDS is still the closed list; no arm-scoped prompt option exists yet. If one exists, STOP — the work
exists (§12.7).

```evidence:the-seam
master          7572c3bbfeed23656fcf8a55f6e64d93ed240c14 (git ls-remote, scout, SCOUT-STATUS-REVIEW-CARD-A2A-BENCH-PERSONA-S143-1-v2)
chain           api/cwf/_lib/knowledge/resolvePromptSegments.ts:201-226 — for id of SEGMENT_IDS: draft > rollout > published > floor
revision        resolvePromptSegments.ts:95 promptRevFrom(segments) hashes every id in SEGMENT_IDS; :228 returns promptRev over the resolved map
caller          api/cwf/_lib/turn/stagesModel.ts:205 resolvePromptSegments({...}) — the turn's one call
refusal text    api/cwf/_lib/prompt/core/promptFloor.ts:56-61 'safety.b1_scope' carries the out-of-scope refusal sentence
scout RED       SCOUT-STATUS-REVIEW-CARD-A2A-BENCH-PERSONA-S143-1-v2 on the bus, 2026-09-19T20:45:57Z — promptRev rotation, four-tier selector, dangling b4/tone refs, id-count pins
a2a principal   a2a/runTask.ts:121 clampPermissions(roleRow.role, roleRow.grantedPermissions) — tool capability bounded in CODE
```

## PREMISE

MEASURED: the chain, the revision function, the caller, the refusal text and the principal clamp in `the-seam`, by sed/grep over the shared clone at master, 2026-09-19T20:52:29Z.
MEASURED: the scout's findings (revision rotation over SEGMENT_IDS, the four-tier selector, the dangling b4/tone references, the literal id-count pins), read from its RED verdict on the bus at 2026-09-19T20:45:57Z.
UNMEASURED: whether the arm refuses a live English benchmark task today — ORDER 5 measures it.
UNMEASURED: which backends the A2A actor's role and scopes reach — ORDER 5 prints them before any task is sent.

## ORDERS

ORDER 1 - BENCH TEXTS. Two English texts: a bench identity (a general-purpose assistant that completes the task it is
given with the tools it is offered; it states that it IS the identity the anti-jailbreak block tells the model never
to leave) and a bench scope (no domain restriction; it DEFINES its own standard refusal sentence in English, used for
requests the kept safety blocks forbid). Code floor constants; a governed home for them is your decision (see
DECISION RIGHTS). SEGMENT_IDS, PLACEHOLDER_WHITELIST and the segment schema tests stay untouched.

ORDER 2 - THE OVERLAY. resolvePromptSegments gains an explicit arm option; when it names the A2A arm, the two values
are replaced AFTER the chain and BEFORE promptRevFrom. The option is set by a2a/runTask.ts only, carried on the turn
input to stagesModel.ts:205, never inferred from message content and unreachable from api/cwf/chat.ts. On the A2A arm
the overlay WINS over a lab draft or a rollout of `identity`/`safety.b1_scope`; on the chat arm nothing changes.

ORDER 3 - TESTS, failing-first:
(a) chat arm: rendered prompt text AND promptRev AND configFingerprint byte-identical to master, with and without an
    active lab draft and an active rollout;
(b) A2A arm: renders the bench identity and bench scope, not the factory ones; its promptRev differs from chat's;
(c) coherence on BOTH arms: the standard refusal sentence the kept blocks refer to is DEFINED in the rendered prompt,
    and the identity the anti-jailbreak block anchors to is present;
(d) precedence: with a lab draft and with a rollout targeting `identity`, the A2A arm still renders the bench identity;
(e) no path from chat.ts can set the arm option (grep-pinned, like a2aDisjointArms.test.ts);
(f) outage: no governed rows, both arms render their floors, overlay still applies on A2A;
(g) replay: stageContextSlice over a pre-change chat turn renders exactly as before.

ORDER 4 - Branch off current master, ONE pull request, no-ff, never a squash. `npm run build` (doc-drift — reseal in
the SAME commit if mapped) and `npm run check:tenant-zero`, print both. Report at
docs/relay/A2A-BENCH-PERSONA-S143-1-AG4-report.md; the report follows the landing and never gates it (§12.8).

ORDER 5 - WITNESS, after landing. FIRST print the A2A actor's role, effective permissions and backend scopes. If they
reach any tenant production backend, STOP before sending a task and report — the owner decides whether the bench actor
may see production data. Otherwise send ONE English task outside the factory domain through scripts/a2aClient.ts
against a configured environment; report reply language, refusal or not, the reply's first line and the digest turn id.
Spend inside the owner's R4 budget.

## FALSIFIER

If the overlay cannot sit between the chain and promptRevFrom without touching api/cwf/chat.ts, STOP and print the seam.
If any chat-arm promptRev or configFingerprint moves in ORDER 3(a), STOP — that is the defect this version exists to
prevent. If a kept safety block's meaning depends on text the overlay removes and ORDER 1's texts cannot carry it, STOP
and print the reference.

## DECISION RIGHTS

You choose whether the bench texts are code-floor only in this card or also get governed rows, provided the chat arm's
revision cannot move and no row is written outside the existing gated publish path. You choose the option's name and
where it rides on the turn input. You may refuse on evidence this card did not anticipate.

## SHARED SURFACES

```scope
- api/cwf/_lib/knowledge/resolvePromptSegments.ts (the overlay option)
- api/cwf/_lib/prompt/core/** (bench floor constants only; SEGMENT_IDS untouched)
- api/cwf/_lib/turn/stagesModel.ts and the turn-input type (carry the option)
- a2a/runTask.ts (set the option)
- api/cwf/__tests__/** (tests a-g)
- public/architecture/manifest.json (reseal, same commit, if required)
- docs/relay/A2A-BENCH-PERSONA-S143-1-AG4-report.md
```

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master head, chain, revision, caller, refusal text, principal clamp | MEASURED: sed/grep over the shared clone at master, 2026-09-19T20:52:29Z | the-seam |
| the scout's four findings this version answers | MEASURED: its RED verdict row on the bus, 2026-09-19T20:45:57Z | the-seam |
| the live refusal of an English benchmark task | NOT-READ | ORDER 5 measures it |
| the A2A actor's backend reach | NOT-READ | ORDER 5 prints it first |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is
reported as a finding in its own right.

DECAYS when origin/master moves by a commit touching resolvePromptSegments.ts, api/cwf/_lib/prompt/core/**,
stagesModel.ts or a2a/runTask.ts, or when a v4 appears.
