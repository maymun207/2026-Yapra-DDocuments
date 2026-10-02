[scout-1]
ADVERSARY-VERDICT: RED card=CARD-E4-K29-PRODUCTION-CALENDAR-S170-1-v1
GRAFT: graft ask "resolve relative time phrase bugun today yesterday last 24 hours into a date range timezone" --source (found timeTools.ts resolveTimeRange and prompt/core/time.ts buildTimeContext). Every line was confirmed at master 1738e65f32f5d7519ebc5ec2b7baf81a21360602 with `git grep`/`git show`; live rows via scripts/roQuery.ts (read-only).
PROMPTS: none.

SCOUT-STATUS-PREREVIEW-E4-K29-PRODUCTION-CALENDAR-S170-1 · reply to ORDER-SCOUT-PREREVIEW-E4-K29-PRODUCTION-CALENDAR-S170-1 (id 8dd86cd9-6ea6-4891-a4a7-056f4a1aeed1)
PRECONDITION: ls-remote master = 1738e65f32f5d7519ebc5ec2b7baf81a21360602. HOLDS.

## 1 · Measurements
(1) WHERE A TIME PHRASE IS RESOLVED: ONE pure resolver, THREE call sites:
- timeTools.ts:396 resolveTimeRange → :317 parseTurkishRelativeTime.
- Caller (a): stageClarify.ts:2800, before the ANSWER model but after the router's IR frame (`frame.time.surface` comes from the semantic router, an LLM, at toolCategories.ts:1582).
- Caller (b): stageTools.ts:2409, the `resolve_time_range` TOOL, which the answer model calls mid-loop; prompt/core/time.ts rule 3 orders it to.
- Caller (c): replay clarificationLens.ts:1123.
"bugün" = `pack(todayStart, todayEnd, 'Bugun (tum gun)')` (:338-339), a CALENDAR day in the timezone. No production-day offset exists anywhere.
- Timezone: `FACTORY_TIMEZONE = process.env.FACTORY_TIMEZONE || 'Europe/Istanbul'` (timeTools.ts:17): one env value platform-wide, with a literal default. buildTimeContext prints `${FACTORY_TIMEZONE} (UTC+3)` into the MODEL PROMPT (prompt/core/time.ts), so "UTC+3" is a literal in model text.
- Shifts ARE ALREADY GOVERNED DATA, but PLATFORM-WIDE: agent param `time.shiftBoundaries` (agentParams.ts:187, floor '0,8,16' at :574), read by resolveShiftBoundaries.ts:48-53; LIVE published row value '0,8,16'. Code floor DEFAULT_SHIFT_BOUNDARIES [0,8,16] (timeTools.ts:165). Used ONLY by "bu vardiya"/"önceki vardiya" (:365-371), never by "bugün".
- HOUR LITERAL ALREADY IN THE RESOLVER: "dün gece" = `wallTimeToUtcMs(…, 20, 0, 0, tz)` → 'Dun gece (20:00 - 24:00)' (:344-346).
(2) No `calendar` kind or production-day param: `git grep -i calendar|productionDay|production_day|dayStart` over kinds.ts, dbConstants.ts, data/backends, backendData.ts, agentParams.ts → 0. Since PR 682 the per-backend GENERIC families are minted by kinds.ts genericFamilyKindDefs and provisioned for every ACTIVE backend by the self-seed reconciler (no migration). A seventh family `<backend>.calendar` fits that model and moves the KIND_REGISTRY pins.
(3) Shift tools FROM DATA (backend_tools ⋈ active backends, name ~ shift|vardiya|calendar|takvim|workday|working): 13 matches, all one backend's EMPLOYEE-shift tools (getActiveShifts, getEmployeeShiftBetween, getEmployeesByShiftAndDate, finishEmployeeShift, insertShiftNote …). None defines the PLANT's production day; it would need a per-tool interpretation of its output (a §13.1 magnet). No other active backend has any.
(4) Where the answer states the definition: resolveTimeRange already returns `interpretation` (code-literal Turkish strings, e.g. 'Bugun (tum gun)'), and prompt/core/time.ts rule 5 tells the model to report it. The digest is TurnDigestSection.tsx (open in #688).
(5) Fence overlap with open PRs: #688 touches stageTools.ts, agentParams.ts, observability/digestSink.ts, TurnDigestSection.tsx, ChatShell.tsx, chatSurface.ts and the backend-names baseline; #687 touches the baseline. A K29 fence needing stageTools.ts (caller b), agentParams.ts (params) or the digest collides with #688 and must queue behind it.

## 2 · Traps in the card
- C2 says "pre-LLM … the existing time-phrase seam". There are TWO live seams, and the model's own tool call (b) is the one that sets tool arguments. If only (a) learns the calendar, the clarify range and the tool range disagree.
- C1 says "per backend", but nothing says what "bugün" means in a turn that reads TWO backends with different day starts. Caller (a) resolves ONCE per turn.
- C1 adds a per-backend source without retiring or ranking the existing platform param `time.shiftBoundaries`. That gives two sources of shift truth.
- C3's derivation from a "shift tool" has no tool on this registry that defines a production day; deriving from employee-shift tools would need backend-shaped parsing.
- C4: a governed prompt.segment cannot carry per-turn hours. The hours must come from the resolver's data; the segment can only instruct. A prompt.segment edit also routes through the golden Layer 2 (decideGoldenPublish), which today returns 'goldenSet:absent' (allow, audited).
- C6's "no hour literal in the resolver" would fail on master's own :344-346 (20:00) and :165 (the floor) unless the card moves or exempts them.

## AMENDMENTS (paste VERBATIM):
A1. ONE RESOLUTION, TWO SEAMS: the calendar is resolved by a single pure function used by BOTH stageClarify.ts:2800 and the resolve_time_range tool (stageTools.ts:2409), plus replay clarificationLens.ts:1123. A test asserts that the same phrase, same now and same backend give byte-identical ranges at both live seams.
A2. STORAGE: a SOFT per-backend generic family `<backend>.calendar` added to kinds.ts genericFamilyKindDefs (seven families), field spec { timezone: string (IANA), dayStartHour: number 0–23, shiftBoundaries: number[] }, provisioned by the self-seed reconciler for every active backend with ZERO rows seeded (rows are owner-curated). No migration. The KIND_REGISTRY pin layers grow by one head layer (the SD1/PII precedent).
A3. PRECEDENCE, stamped: per backend, the curated `<backend>.calendar` row → else the platform param `time.shiftBoundaries` + `FACTORY_TIMEZONE` with day start 0 → else the code floor. The source (curated | platform | floor) goes on the trace/digest. An absent curated row is `calendar:unmeasured` in the stamp while behaviour equals today (calendar day). Never a silent production-day default.
A4. MULTI-BACKEND TURN: when a turn's routed backends carry DIFFERENT calendars, the turn-level phrase resolves per backend. Each backend's tool calls use their own range (the tool gains an optional backendId argument filled server-side from the tool's identity, never by the model), and the digest lists each backend's range. If one range must be shown, the answer states both windows; it never silently picks one.
A5. C3 DERIVATION IS DEFERRED: no active backend exposes a tool that defines a plant production day (13 shift-named tools, all employee-shift, one backend). This card ships owner-curated rows only. Derivation needs a declared tool contract (a tool_doc field naming a calendar-defining tool), in a later card.
A6. ANSWER HONESTY (C4): resolveTimeRange's `interpretation` is built FROM THE CALENDAR DATA ("üretim günü 07:00–07:00 (Europe/Istanbul) alındı" from dayStartHour/timezone), not from a code string per phrase. The governed prompt.segment (golden Layer 2 applies) only instructs the model to state the returned interpretation. prompt/core/time.ts stops printing the literal "(UTC+3)" and prints the resolved timezone.
A7. LITERALS: the "no hour literal in the resolver" test covers the NEW calendar path. The existing floors (timeTools.ts:165 DEFAULT_SHIFT_BOUNDARIES, :344-346 'dün gece' 20:00) are either moved into the governed floor (agentParams declaration) in this card or listed by file:line as a named residual. A planted fault (an hour literal in the calendar path) goes red.
A8. UI (§13.3): the Rules tab already shows per-backend family kinds (#682). The `<backend>.calendar` row is edited there with its source badge; the turn digest (TurnDigestSection) shows the resolved range(s), source and backend. The FENCE queues behind #688, which touches stageTools.ts, agentParams.ts, digestSink.ts, TurnDigestSection.tsx and the baseline; the card says so and starts after #688 lands.
A9. TESTS (C6) add: a day start of 07:00 with now 03:00 local → "bugün" = yesterday 07:00 → today 07:00; "dün" moves with it; "bu hafta" starts at Monday's day start; DST-free and DST zones both pass; an absent row → range identical to master plus stamp `calendar:unmeasured`.
END-AMENDMENTS
