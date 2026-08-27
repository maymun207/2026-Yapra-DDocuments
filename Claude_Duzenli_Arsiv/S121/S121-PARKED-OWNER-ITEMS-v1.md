# S121 · PARKED OWNER ITEMS — v1

PARKED 2026-08-27 12:05 TSİ on the owner's instruction: *"bu dört maddeyi unutma park et."*

Written to a carrier rather than carried in the Architect's head, because session state is
never carried in memory (`cwf-memory-seed-CWF5-v3` §9) and the defect this project keeps
paying for is reconstruction from memory (bootstrap v120 §8).

**PARKED means: not withdrawn, not deferred under SOTA-1, not cut into a card.** Each item
below is awaiting the owner and stays here until it is either executed or explicitly closed.
None of the four advances an acceptance criterion, which is why none was cut.

---

| # | item | who owns it | state | what it blocks |
|---|---|---|---|---|
| **P-1** | Write the four honestbench **Architect rulings** on frozen text (closed detection vocabulary · provenance marker's literal form · `runlog.jsonl` conflict · which M3 governs) | **the Architect** — one word from the owner to start | PARKED, awaiting "başlat" | items 3–6 of `PHASE-HONESTBENCH-SCORER-DESIGN-2` §5; they gate **scoring**, not running. The only queued work that moves the 0/16 acceptance contract |
| **P-2** | Write the **database half of the factory's death certificate** — mode row → `SHUTDOWN`, five lane rows → `CLOSED`, reason in the note | **the owner** — a named, one-off consent; a lane-row write is outside the Architect's declared surface (seed §7) | PARKED, not urgent while no window is open | **becomes urgent the moment any window opens.** Live mode is `READY` and all five addresses are held by dead nonces — see `F-S121-FACTORY-DB-NEVER-SHUT-1` |
| **P-3** | **Delete permission** for the connected archive folder | the owner | PARKED — the Architect's request was refused by the auto-mode classifier, not by the owner | git in the archive cannot unlink its own `.git/index.lock`; every archive commit leaves the repo locked for the next one. Workaround in force: locks are **moved aside**, never deleted (`.STALE-S121*` files remain in `.git/`) |
| **P-4** | Two S120 owner rulings still unexecuted: (a) **arm the corpus job as a required merge check** — consented, card cut, never delivered; (b) **repair the four exempted files properly**, exemption list 82 → 78 | the owner rules whether his S120 consent still stands | PARKED — surfaced, not spent | Both are factory items. Under bootstrap v120 §2 a card that names no acceptance criterion is not cut, so the Architect surfaces them rather than acting on the earlier consent |

---

## WHY P-4 IS SURFACED RATHER THAN EXECUTED

The owner consented to (a) in S120. The rule that supersedes it was written **after** that
consent, in the same session's close, and it is the single most valuable thing S120 produced.
`cwf-sota-definition-v1_5` §1's symmetry clause requires items advancing no criterion to be
**surfaced to the owner for ruling, never quietly cut** — and, by the same logic, never quietly
executed on a consent given before the rule existed. The owner decides whether the consent
survives the rule. The Architect does not decide that for him in either direction.

## STANDING CAPABILITY GAPS THAT TOUCH THESE ITEMS

- **The archive's GitHub half is unreachable from this session.** Documents reach the archive
  folder on disk and the local git repository there, and stop. `git push` fails with
  `could not read Username for 'https://github.com'` — the bridge VM holds no credential.
  Measured 2026-08-27 08:51Z. The local repository sits **1 commit ahead of `origin/main`**.
- **`gh` is proxy-gated in the Architect container** (GitHub API returns 403). The CI arbiter
  is in the lanes; a public web read is a second eye, never the arbiter.

<!-- END · S121-PARKED-OWNER-ITEMS-v1 -->
