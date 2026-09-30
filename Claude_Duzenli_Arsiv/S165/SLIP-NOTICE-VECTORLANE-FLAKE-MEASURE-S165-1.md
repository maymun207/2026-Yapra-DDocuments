SLIP-NOTICE-VECTORLANE-FLAKE-MEASURE-S165-1 · AG-1 · measure-and-propose only: no file edited, no branch, no commit, no push.
Head read: origin/master 763a54bc551572137276afa6cc55446e80c934cc (git show origin/master:<path>; the worktree's copies are byte-identical, git diff --quiet origin/master -- api/cwf/_lib/vectorLane/ → 0).

== 1 · MEASURED ==
(a) Clock: INJECTABLE, and nothing else reads time. admission.ts:169-172 AdmissionOptions has `now?: () => number` and `sleep?: (ms) => Promise<void>` ("Injected for tests"). The defaults are :187 `now = opts.now ?? (() => Date.now())` and :188 `sleep = opts.sleep ?? (ms => new Promise(r => setTimeout(r, ms)))`. Every time read in the module goes through `now` (:236, :247, :250, :254, :286) or `sleep` (:245). There is no direct Date.now, setTimeout or performance anywhere else.
(b) Which proofs read the wall clock:
  WALL-CLOCK (flake-capable):
    (a)-1 :73-102: Date.now() latency (:83, :85); fakeEncoder sleeps on a real setTimeout (:25); asserts :98 p50 ≤ idle.p50+COST×3 and :99 max ≤ idle.max+COST×4.
    (c)-1 :119-134: real elapsed ms (:123, :125) under the default real sleep; asserts :130 slow>fast and :133 ratio>1.8.
    (c)-3 :143-151: real elapsed; asserts :150 < 1000 ms.
  TIMER-ORDER (a real setTimeout(1) at :184 and a 20 ms real encode; magnitude only matters under extreme stalls):
    (d)-2 :173-195.
  ORDER/COUNT ONLY (no clock value asserted):
    (b)-1 :34-52 (completion index), (b)-2 :54-69, (a)-2 :104-115, (c)-2 :136-141, (d)-1 :155-171, (d)-3 :197-204,
    (e)-2 :220-230 (maxInFlight), (R4) :234-250 (counts; maxWaitMs asserted only as a number), :253-259.
    (e)-1 :208-218 runs the REAL incumbent encoder and asserts a digest; no clock.
(c) Throttle: yes, controllable. It is `nextIndexAt - now()` (:236), `sleep(Math.min(wait, 25))` (:245) and `nextIndexAt = now() + 1000/rate` (:250), only through the two injected functions. Both defaults also resolve Date.now/setTimeout at call time, so vi.useFakeTimers controls them without injection.

== 2 · REPRODUCED ==
Contention: a full parallel `npx vitest run` (772 files, 76.4 s, started 07:08:46Z, itself green, this file included). During it, the file was run 20 times back to back (07:08:59–07:10:01Z, all inside the window).
Result: 18 passed, 2 FAILED, both in (a)-1 "query latency under sustained index load matches its latency with none":
  run 13 07:09:36Z — AssertionError: expected 33 to be less than or equal to 26
  run 16 07:09:48Z — AssertionError: expected 23 to be less than or equal to 21
(the S164 SD1 full run failed the same test at admission.test.ts:99:28, "expected 41 to be less than or equal to 27")
Control: the same 20-run loop with NO contention → 20 passed, 0 failed ("not reproduced in 20 runs alone").
(c)-1 and (c)-3 did not fail in these 40 runs. That is "not reproduced in 40 runs", NOT "not flaky": they read the same real clock.

== 3 · PROPOSAL (one design) ==
Run the four clock-dependent tests on vitest fake timers, driven by the async timer API. admission.ts does NOT change, and every assertion stays with its current numbers.
- File: api/cwf/_lib/vectorLane/__tests__/admission.test.ts ONLY. :13 imports `vi`.
  In (a)-1 :73-102, (c)-1 :119-134, (c)-3 :143-151 and (d)-2 :173-195:
  - `vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] })` at the start, `vi.useRealTimers()` in a finally.
  - Each awaited body is started as a promise and settled by `await vi.runAllTimersAsync()`, which advances the virtual clock and flushes microtasks between timers, so the sequential query loop in :82-86 and the throttle's 25 ms re-queue loop run to completion. Then the promise is awaited.
  - :184's `setTimeout(r, 1)` becomes `await vi.advanceTimersByTimeAsync(1)`.
  - (e)-1 :208-218 and every order/count test stay on real timers: they assert no clock value, and (e)-1 must keep the real encoder untouched.
- Every numeric claim is still asserted, verbatim, against the virtual clock: :98, :99, :130, :133 (>1.8), :150 (<1000), :186 (depth 1), :193 (retryAfterSec ≥ 1). Under the controlled clock they become exact:
  - idle latency = COST (4 ms);
  - loaded latency ≤ 2×COST (one in-flight item plus its own), inside the 3×/4× margins;
  - slow = 0.45 s and fast = 0.09 s, ratio 5 > 1.8;
  - five queries at rate 1 take 0 virtual ms.
  None is loosened. The margins may be tightened in the fix card, never widened.
- Why admission.ts stays byte-identical: the module already reads time only through `now`/`sleep` (1a). The production path (no opts.now or opts.sleep) is untouched, and no injection is needed because the defaults resolve the faked globals at call time.
- Planted fault that proves the new test still guards ORDER: reverse the class walk in pump (admission.ts:227, iterate ENCODE_PRIORITY back to front). Under the fake clock this is DETERMINISTICALLY red:
  - (a)-1: a loaded query waits behind all 60 bulk items, 60×COST = 240 virtual ms, far over idle+12/16;
  - (b)-1: queryPos becomes 20.
  Second plant, for the throttle: drop the `BULK_CLASSES.has(next.cls)` guard at :235, which makes (c)-3 read 4000 virtual ms, red against < 1000.
  Both reverted after measuring.
- Not measured: the prototype itself. This notice forbids edits, so the fake-timer version was not run. The fix card should run it first under the same 20× contention loop and expect 20/20, plus both plants red.

read relay_inbox: box empty at the time of the bus slip (see its last line).
