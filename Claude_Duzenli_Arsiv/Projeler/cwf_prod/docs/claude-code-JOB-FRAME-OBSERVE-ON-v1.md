# JOB FRAME-OBSERVE-ON — start IR-1 shadow-frame observation (two governed publishes)

<!-- claude-code-JOB-FRAME-OBSERVE-ON-v1 · rev 1 · 2026-07-20 · Architect: Claude (S54)
     Trigger: prod read `[RouterPrompt] source=db frame=off` (trace d4159666) —
     the live router template serves from the DB-published row, so the floor's
     `{{FRAME_BLOCK}}` never renders; observation needs (1) a router.prompt
     version WITH the placeholder + (2) router.frameEnabled=1.
     FREEZE-SAFE BY CONSTRUCTION: golden batch runs ONLY for prompt.segment
     (api/admin/golden-runs.ts:68; dbConstants.ts:493 design comment) —
     router.prompt and agent-param publishes ride the normal eval gate only.
     ZERO repo writes: no branch, no commit, no CI, no reseal — this job is
     pure governed-data operations and does not collide with any in-flight
     phase. Standing consent: ADR-006/S43-4 (AG executes gated-service
     operations; raw DB stays Operator-only — this job uses NO raw DB).
     THIS file is the ONE relay payload (S54-3). -->

## 0 · PRECONDITION
Owner consent relayed with this file. Valid while `origin/master` is
`0c0db5c` or a descendant (repo state is irrelevant to the data ops, but
report the SHA you see). If any step's gated endpoint rejects (422/4xx), STOP
and paste the full response — never work around a gate (S41-1: rejections are
born loud).

## G1 · Read the CURRENT published router.prompt
Via the established admin read path (G0: name it from the tree — the same
gated read the Rules panel uses; NEVER raw DB): fetch the currently PUBLISHED
`router.prompt` rule content + its version number. Paste the template text in
your report (it is governed config, not a secret).

## G2 · Construct v(N+1)
New template = the CURRENT PUBLISHED text (from G1 — NOT the code-floor
constant; they are not assumed identical) + the literal placeholder token
`{{FRAME_BLOCK}}` appended at the end, exactly as the floor carries it.
NOTHING else changes — byte-diff of old→new must be exactly the appended
token (paste the diff). With `frameEnabled=0` this publish is behaviorally
inert (the placeholder substitutes to '' — IR-1's dark-equivalence).

## G3 · Publish both, through the gate
Using the established gated publish mechanism (G0 names it — the same
eval-gated path all rule publishes use; the W3b-era job precedent):
1. Publish the `router.prompt` v(N+1) from G2.
2. Publish `router.frameEnabled` = 1 (agent-param, PARAM-GOV-1 precedent).
Paste both publish responses (version numbers, audit ids).

## G4 · Live verification (deterministic)
Wait for / request one real chat turn, then confirm from prod logs:
`[RouterPrompt] source=db frame=on` on the new turn. Report the trace id.
(The Architect will independently verify the first `ir_frame` telemetry row +
`cwf.route.frame.*` span attrs — your job ends at the log line.)

## Report
Numbered evidence for G1-G4. No repo changes to report (assert
`git status --porcelain` clean if you touched a checkout at all).

<!-- END · claude-code-JOB-FRAME-OBSERVE-ON-v1 · rev 1 · 2026-07-20 · amendments mint v1_2 -->
