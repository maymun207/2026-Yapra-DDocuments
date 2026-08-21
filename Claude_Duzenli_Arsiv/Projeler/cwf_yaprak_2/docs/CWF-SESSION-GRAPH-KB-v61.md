# CWF — Session Graph KB · v61
<!-- CWF-SESSION-GRAPH-KB-v61 · 2026-07-23 · supersedes v60. Covers S62,
     "THE UNDERSTANDING-LAYER SESSION". Durable knowledge only; the live shelf
     is cwf-open-items-register-v63. -->

## S62 in one line
A merge closed cleanly, a two-session-old bug fell to a three-endpoint table,
and the owner opened the session's real subject: **the understanding layer was
never given a target function.**

---

## 1 · What shipped

**PHASE LOG-TRUTH-1 v1** → `1f03bd9` → merged `194f6a8` (PR#108, rev 142,
353 files / 3735 tests, zero migrations).
- **G0 · F169 instrumentation only** (by binding constraint — no behaviour fix).
  Per-processor race replicating the SDK's own, naming the failing processor,
  cold/warm marker, real pending count (`null` never fabricated as `0`),
  late-settle vs hang distinguished.
- **G1 · deliberately empty**, reserved for the evidence-authored fix. **It
  held** — no second guessed patch shipped, which was the entire point of the
  phase's unusual shape.
- **G2 · F173 fixed** — non-uuid identity can never become a `user_id` filter.

**Delivered artifact:** `cwf-sota-understanding-layer-v1` (rev 1) — a literature
review of the understanding stack, written **before** any code, on owner
mandate.

---

## 2 · The F169 breakthrough — and the method that produced it

### The story
Two guessed patches had failed. S62 opened with the Architect pre-registering
two hypotheses on a **cold/warm** axis (cold-TLS vs stale keep-alive socket)
and declaring which log field would kill which. **Both were the wrong axis.**

What actually worked: enumerating **every** caller of
`forceFlushObservability` in code, then counting each one in production.

| Endpoint | Flush position | 3h prod |
|---|---|---|
| `chat.ts:348` | **before** `res.end()` | 3 turns, 0 failures |
| `eval-ci.ts:222` | **before** `res.json()` | 15 calls, 0 failures |
| `golden-runner.ts:97` | `finally`, **after** `res.json()` | 67 ticks, **55 failures** |

One variable differs. It is the cause. `eval-ci`'s own source comment already
stated the rule the third endpoint violates: *"RULE 27: flush spans BEFORE
responding (serverless may freeze after)."*

### Why the earlier patch failed
S61-CLEAN-1 changed `await` → `void`. But the flush was **always**
post-response — `res.status(200).json()` returns inside `try`, `finally` runs
after. It fixed blocking, never the mechanism.

### Two library facts, read from source not assumed
- `@opentelemetry/sdk-trace@2.9.0` `TracerProvider.forceFlush()` wraps **each
  processor in its own timeout** and rejects with an **array**. Production's
  one-element array ⇒ by elimination, LangfuseSpanProcessor.
- A processor settling **after** the timeout produces **byte-identical output**
  to one that never settles — so "late vs never" is genuinely unobservable
  today. G0's design was right for the right reason.

### The durable lesson → **S62-1**
> When a symptom is endpoint-specific, do not hypothesise about the mechanism.
> Enumerate every caller of the shared mechanism, count each in production, and
> read off the differing variable. **A hypothesis that does not name a
> differing variable is not yet a diagnosis.**

---

## 3 · The session's real subject — the understanding layer

The owner walked the pipeline back from first principles, rephrased it twice,
and found the seam himself. Three corrections mattered:

1. **"Ucuz eleme" names two different things.** The keyword layer (string ops,
   free) is the **outage floor**. The thing that produces the IR frame is a
   **separate small LLM call** (`path=semantic`, `latency_ms=537`). Half a
   second is not a string operation. Give them different names or the confusion
   returns every session.
2. **The lookup table's key is `(action × object)`, not words.**
   `deriveCandidateCategories(frame)` takes **only the frame**. The learned word
   map is never opened on the live path.
3. **The gate runs after everything.** `chat.ts:188` pipeline →
   `:241` clarification → `:268` stream. Tools selected, prompt assembled,
   knowledge warmed — then discarded, model never called.

### The owner's question that had no answer
*"Benim öğrenilmiş kelimelerim ne oldu? Niye canlıda öğrendim?"*

Answer established: they are **frozen, not lost**. Learning into the shared map
is suppressed on the frame path; the semantic branch records **proposals**
instead. Learning dropped **from authority to proposal** — constitutionally the
right shape. The guard's reason is sound (a floor trained on the router becomes
a distorted copy and destroys the A/B lens's comparability). **The unnamed
consequence:** the floor is now frozen AND unmeasured — insurance never tested.
Recorded as **F177**.

### The owner's verdict, and why it was right
> *"Deneme yanılma yapıyoruz gibime geliyor. Bir mantık silsilesine oturtup bir
> hedefe doğru gittiğimizi görmüyorum."*

Confirmed. **Governance architecture: coherent thesis, disciplined execution.
Understanding architecture: accretion.** Each layer answered the previous
layer's observed symptom. Root cause: *"the agent understood the question"* was
never defined, so no layer could be evaluated — only patched. → **S62-2**.

---

## 4 · What the literature says (full treatment: `cwf-sota-understanding-layer-v1`)

**We had conflated four separate, separately-studied problems:** intent/slot
extraction · entity linking · clarification policy · tool retrieval.

**The name of our error** (Zhang & Choi, arXiv:2311.09469): clarification is
legitimate only for **aleatoric** uncertainty (genuine ambiguity), never for
**epistemic** failure (our own lookup missed). `Ganit` is epistemic — the user
knows exactly what they meant. **We hand our own failure to the user.**

**The math we needed already exists** — entity linking's NIL prediction, two
thresholds:

```
s₁ < τ           → NIL        → "I don't know this name"  (DO NOT ASK)
s₁ − s₂ ≥ β      → LINK       → resolve silently, attribute visibly
s₁ − s₂ < β      → AMBIGUOUS  → ASK, and offer the candidates as options
```

Today all three produce the same sentence.

**Our closed domain is an advantage, not a limitation.** Open-domain SOTA must
*simulate* the intent distribution (INTENT-SIM: sample, NLI-cluster, entropy)
and still lands at AUROC ≈ 0.53–0.63. Our factories, lines and zones are finite
and registered — we can **read the distribution off candidate scores**.
Deterministic, no LLM judge, ADR-001-compliant. We are better positioned than
the open-domain state of the art and are not using it.

**Tool retrieval:** the mainstream is embedding + top-k, measured by
**Recall@k**. We use a symbolic `(action × object)` table — defensible under
our constitution (deterministic, governable, publishable) but **unmeasured**.
No recommendation between the two until Recall@k exists. `routerAbLens` already
computes it; F129 blocks the trigger.

**Four metrics now name the target** (SOTA doc §7): slot-level F1 · Acc@1 +
NIL-sensitive accuracy · Recall@k · AUROC under budget `b`. **Two already have
their raw material and are unused.**

---

## 5 · Method notes worth keeping

- **Vercel MCP log queries:** wide windows time out. Scope to a `deploymentId`
  and ≤30 min for detail reads. **`group_by=requestPath` is the fast path** and
  survives a 12 h window — use it to locate traffic, then narrow. **Query
  contamination is real:** `"ceiling"` matched golden-runner's `ceilingFailed`;
  `"Frame"` matched SynthTraffic's `frame-only`. A distinctive content word
  (`"Ganit"`) landed exactly on the two failing turns.
- **`api.github.com` is rate-limited from the review sandbox** (shared IP,
  403). CI cannot be verified Architect-side → fold it into the AG GO block as
  a blocking STEP 1 with an explicit pass condition. `in_progress`/`null` is
  **not** a pass. → **S62-3**.
- **Reading the emitting library's source settles arguments cheaply.**
  Installing `@opentelemetry/sdk-trace@2.9.0` and reading 70 lines converted a
  guess into an elimination proof. TOTAL-45 extends to library semantics, not
  just log fields.
- **AG used `git stash -u` for a test baseline** — an S61-1 violation. The
  value was independently corroborated by the register's floor, so no re-run
  was ordered; the rule was restated in the GO block. **Corroboration can
  rescue a value; it does not rescue a method.**

---

## 6 · The human note

The owner saw the 10-turn transcript and wrote: *"çok üzüldüm… geri gelmek bile
istemiyorum."* Seven of ten turns had failed.

What the analysis showed, and what mattered: **it was not ten architectural
failures.** Six of seven came from one wrong condition. Routing worked;
60 of 145 tools had been selected; the spine did its job. And turn 6
("barkodsuz üretim") is the empty≠zero law working exactly as designed — it did
not say zero, it said *ARMES does not track this for barcodeless zones*.

Recording this because the emotional read of a bad transcript and its
engineering read can diverge sharply, and the engineering read was the
actionable one.

---

## 7 · Standing corpus (unchanged, carried by name)
PLATINUM · GOLDEN LEDGER · FULL-TRACE MANDATE · FACTORY↔BACKEND-COVERAGE-IS-CONFIG ·
ABSENCE-ONLY LAW · ADR-001/002/004/005/006/007/008 · C1 LAW · empty≠zero ·
DB-first/code-floor · eval-gate unbypassable · GOLDEN FREEZE (to B5) ·
S30-1/2/3 · S31-1 · S32-1 · S33-1 · S34-1 · S35-1 · S37-1/2 · S41-1/2 ·
S43-2/3/4 · S47-1 · S54-1/2/3/4 · S55-1/2 · S59-2 (TOTAL-45) · S61-1/2/3 ·
**S62-1/2/3 (new)** · RULE-25 · RULE-26 · RULE-27 · RULE-28.

<!-- END · CWF-SESSION-GRAPH-KB-v61 · 2026-07-23 -->
