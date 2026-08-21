# OUTAGE-WINDOW-1 · v1 — one window, three proofs

**Closes on proof:** `BUG-019` · `BUG-002` · `BUG-007` (false half).
**Floor:** master `5858ce8c2a32940313bdf3c20b3dd9374ca8ffb4` ·
prod `dpl_39xeq9mLzxts4TBtxjPyAxhhQpyF` (READY, converged).
**Already banked, no window needed:** BUG-007's healthy control —
`[trace=e080e100] [RedirectPolicy] backend=armes redirectAllowed=true withheld=[]`.

---

## Why this needs a sequence rather than a switch

**Withheld ≠ failing, and the two proofs need opposite states.**

- **BUG-002 / BUG-007** need ARMES **withheld** — tools pulled from the turn.
- **BUG-019** needs ARMES **offered and its calls failing** — the opposite.

If the backend is withheld, nothing is called, so nothing can fail. One switch
cannot produce both.

**The sequence exploits a property this project already measured (S73-2): after a
backend toggle, warm discovery/health caches keep serving the old verdict for up
to one TTL.** That interval — tools still offered, backend already dead — is
exactly BUG-019's state, and it arrives for free on the way to BUG-002's.

---

## STEP 0 — AG answers three questions BEFORE the owner touches anything

**No step below is executed until these are answered from a read, not memory.**
This is `S81-4`: a claim about production behaviour comes from a read at the
anchor, never from a document or a recollection.

1. **What is the exact, reversible lever that puts a backend into
   `ctx.mcpWithheldBackends`** — health-check failure, an admin toggle, a URL
   change? Name the field and the UI affordance. **`withheld` and `disabled` are
   not the same state**: disabling may un-mount the backend entirely, which is a
   different condition and would prove nothing about BUG-002.
2. **What is the actual TTL** of the health/discovery cache, read from the code
   or the governed params — not "about five minutes"? Step 2's window is exactly
   this long.
3. **Is the revert a single action, and does it restore byte-identical state?**
   If it requires a cache flush or a redeploy, say so now.

**If the lever turns out to be a URL change, say whether the previous URL is
recoverable from the panel or must be recorded first.** The owner should not
discover that mid-window.

---

## THE WINDOW — five steps, owner-executed, minutes not hours

Pick a low-traffic time. **Total duration is one TTL plus two turns.**

### 1 · Baseline, before touching anything
Ask one ordinary factory question. **Expected:**
`[RedirectPolicy] backend=armes redirectAllowed=true withheld=[]` and a normal
answer. This is the positive control and it is not optional — without it, a later
difference cannot be attributed to the window.

### 2 · Induce, then ask INSIDE the TTL → **BUG-019**
Apply the lever from STEP 0. **Immediately** (within the TTL) ask a question that
needs ARMES data.

**PASS:** tools were still offered, ≥1 `[MCP Error]`, the answer carries the
**failure disclosure**, `answerUnbacked` is stamped, and **no refusal stands
alone**.
**FAIL:** a scope refusal with no disclosure beside it — the bug survived.
**NEITHER:** if ARMES was already withheld by the time you asked, the TTL had
already expired; this is not a fail, it is a mistimed read. **Restore, wait,
retry** (S81-3 rule 2 — a near miss is never recorded as a pass).

### 3 · Wait out the TTL, then ask again → **BUG-002 + BUG-007**
Same question, after the health verdict has flipped.

**PASS, and both halves must appear:**
- `[RedirectPolicy] backend=armes redirectAllowed=false withheld=[armes]` —
  **explicit, both fields**, never an absent line;
- the user-facing answer says the capability is **temporarily unavailable**, not
  that it **does not exist**.

### 4 · Restore, and prove the restore
Revert the lever. Ask the **same** question again.
**PASS:** the baseline answer returns and
`redirectAllowed=true withheld=[]` prints again. **A window that is not proven
closed is still open.**

### 5 · Screenshots
Steps 2, 3 and 4's answers. The log reads are mine; the user-facing wording is
only visible to you.

---

## What must NOT happen

- **Do not touch Superset, `machine-knowledge-base` or `honestbench`.** They are
  not what these three entries are about, and `honestbench`'s dial is under
  honesty control until `HONESTBENCH-RUN-1`.
- **Do not leave the window open while doing anything else.** If something
  interrupts you, execute step 4 first and re-run the window later.
- **Do not induce a second time to "get a better read".** If a step is
  mistimed, restore, then repeat the whole sequence from step 1.

---

## After the window

I read the three traces and mint `REGISTER-BUG-BUCKET-v19` carrying, in one
version: the three closures (or the precise reason each did not close), the
BUG-007 healthy control already banked at `trace=e080e100`, and **rule 13 —
`S81-4`, a frozen entry is not a live read** — which is owed from the last
exchange and is being carried deliberately, not dropped.

`TYPEGATE-TRUTH-1` (BUG-022) does not wait for this window. It is the next phase
and can start now.

<!-- END · OUTAGE-WINDOW-1-v1 -->
