<!-- relay-audit: v1 kind=card -->
CARD-VECTORLANE-FAKE-TIMERS-S165-1-v2

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 card" and stops). Built from YOUR proposal (SLIP-NOTICE-VECTORLANE-FLAKE-MEASURE-S165-1) — thank you.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T07:32Z
SUPERSEDES: CARD-VECTORLANE-FAKE-TIMERS-S165-1 (v1, never delivered — the bus adversary gate refused it without a seal). scout-1's SCOUT-STATUS-REVIEW-CARD-VECTORLANE-S165-1 returned RED on ONE fence line (Δ-A) after BUILDING and RUNNING the design in a scratch worktree: 14/14 unplanted, every planted fault red, 20/20 under the full parallel suite. v2 applies Δ-A and the scout's optional P3, nothing else.
SEAL: EXEMPT with ack = that review row (practice 136: this version applies exactly the scout's named deltas).
```evidence:adversary
ADVERSARY: EXEMPT
ack: cd8b72a2-16ff-413d-b528-126893903c0b
```
PRECONDITION: master 763a54bc551572137276afa6cc55446e80c934cc or later; api/cwf/_lib/vectorLane/admission.ts exposes injectable now/sleep (your measure: :169-172, :187-188).
SUBJECT: admission.test.ts is timing-dependent by construction and REPRODUCED red 2/20 under the full parallel suite, both on proof (a)-1 (33<=26, 23<=21); 20/20 green alone. A latent red that can block any unrelated landing.
SCOUT: reviewed (see SEAL). PR slot: after the landings ahead of it (647 M1B, M4a); the Architect's notice gives the slot. Build and push now.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) plan item 6 · S61-2.
NO CRON TASK. GRAFT: graft first (graft/api/cwf/_lib/vectorLane/), then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.

## DESIGN (your proposal, adopted)
D1 · In admission.test.ts ONLY, the four clock-dependent tests — (a)-1 :73-102, (c)-1 :119-134, (c)-3 :143-151, and (d)-2's timer-order case — run under vi.useFakeTimers({ toFake: ['setTimeout','clearTimeout','Date'] }) with runAllTimersAsync / advanceTimersByTimeAsync; vi.useRealTimers() in afterEach. The other proofs stay on real timers.
D2 · EVERY numeric claim stays verbatim (COST×3, COST×4, ratio > 1.8, elapsed < 1000 ms, and every other number the file asserts today). Nothing is loosened, nothing deleted.
D3 · admission.ts is NOT changed. (e)'s real-incumbent determinism proof is untouched.
D4 · PLANTED faults (three, each reverted, admission.ts byte-identical after each): P1 reverse the ENCODE_PRIORITY walk (admission.ts:227) → (a)-1, (b)-1, (b)-2 red; P2 drop the BULK guard (:235) → (c)-3 red; P3 (scout-1) disable the throttle (`… && false` at :235) → (c)-1 red. (a)-1's power rests on its MAX assertion (:99) — keep both p50 and max verbatim.

## ORDER
1. `git ls-remote origin refs/heads/master` twice; branch phase/vectorlane-fake-timers-s165-1 from that master.
2. Build D1–D3. Run the file alone 20× AND 20× under a parallel full `npx vitest run` (the condition that reproduced the red); quote both pass counts. Both must be 20/20. Then D4, quoting red and revert.
3. GATES: `npm run build` (reseal if drift) · typecheck:api · check:rule24 · check:tenant-zero · check:backend-names · relayAudit over docs/relay/. CI-only gates at the PR: Build and Test, Relay corpus, report-schema, rule26 — rule26 (Playwright) WILL run because the manifest is in the diff (scout-1: build-test.yml:203 CI-DIET sets ui=true on public/); eval-canary SKIPPED, named.
4. Report docs/relay/VECTORLANE-FAKE-TIMERS-S165-1-AG1-report.md: exactly ONE `FILE-FENCE:` line + `- <path>` lines equal to the diff — Δ-A: the test file, public/architecture/manifest.json (the test file is under Architecture Map's codeAreas `api/cwf/_lib/**`; `npm run reseal` in the SAME commit re-derives that tab only — verify the re-derived digest equals the one the gate reports), and the report. After the ORDER 2 full-suite runs, restore docs/ground/authority-conformance.latest.md with `git checkout --` (the suite rewrites its measuredAt line; it is a test side effect, not part of this commit). No bare 7–39 hex in prose.
5. ONE commit (git commit -F <file>); plain push; ls-remote. NO PR until the Architect's notice gives the slot.
6. Slip SLIP-CARD-VECTORLANE-FAKE-TIMERS-S165-1 (bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SLIP-CARD-VECTORLANE-FAKE-TIMERS-S165-1.md"). Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.
FILE-FENCE (measured by scout-1, Δ-A): api/cwf/_lib/vectorLane/__tests__/admission.test.ts · public/architecture/manifest.json · docs/relay/VECTORLANE-FAKE-TIMERS-S165-1-AG1-report.md.
FORBIDDEN: changing admission.ts; loosening or deleting any assertion; a retry wrapper or a raised tolerance; opening a PR; --force; cron; printing an environment value.

END · CARD-VECTORLANE-FAKE-TIMERS-S165-1-v2
